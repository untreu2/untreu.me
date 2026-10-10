export type Provider = 'anonymous' | 'apple.com' | 'phone'
export type ObservedProvider = Provider | 'none'
export type EventSource = 'client' | 'server'

export interface AdminSession {
  token: string
  expiresAt: string
}

export interface MetricsFilters {
  from: string
  to: string
  appVersion: string
  provider: '' | Provider
}

export interface DailyMetrics {
  date: string
  events: number
  actors: number
  sessions: number
  questions: number
  answers: number
  account_required: number
  errors: number
}

export interface RecentAction {
  id: string
  timestamp: string
  name: string
  source: EventSource
  actor: string | null
  session: string | null
  surface: string
  provider: '' | ObservedProvider
  reason: string
  error_code: string
  duration_ms: number
  app_version: string
  app_build: string
  status: number
}

export interface AdminMetrics {
  schema_version: 1
  coverage: {
    started_at: string | null; raw_retention_days: number; mode: 'first_party_actions_only'; historical_events_available: false
    cohort_filter_mode: 'first_open_version_provider_activity'; retention_return_versions: 'any'
  }
  filters: { from: string; to: string; app_version: string; provider: '' | Provider; page: number; limit: number }
  filter_options: { app_versions: string[]; providers: Provider[] }
  summary: {
    events: number; actors: number; sessions: number; questions: number; answers: number; account_required: number
    auth_failures: number; server_errors: number; latency_samples: number; p50_latency_ms: number; p95_latency_ms: number
  }
  daily: DailyMetrics[]
  funnel: { step: string; source: EventSource; events: number; actors: number }[]
  actions: { name: string; source: EventSource; events: number; actors: number }[]
  providers: { provider: ObservedProvider; sign_ins: number; links: number; failures: number }[]
  errors: { code: string; events: number }[]
  latency: { date: string; samples: number; p50_ms: number; p95_ms: number }[]
  retention: { cohort_date: string; actors: number; day_1: number | null; day_7: number | null; day_30: number | null }[]
  recent: { total: number; page: number; limit: number; items: RecentAction[] }
}

export class AdminRequestError extends Error {
  readonly kind: 'credentials' | 'expired' | 'throttled' | 'unavailable' | 'contract' | 'filters'

  constructor(kind: AdminRequestError['kind']) {
    super(kind)
    this.name = 'AdminRequestError'
    this.kind = kind
  }
}

const dayMilliseconds = 86_400_000
const datePattern = /^\d{4}-\d{2}-\d{2}$/
const versionPattern = /^[A-Za-z0-9][A-Za-z0-9._+() -]{0,63}$/
export const providers: readonly Provider[] = ['anonymous', 'apple.com', 'phone']

export function defaultFilters(now = new Date()): MetricsFilters {
  const to = now.toISOString().slice(0, 10)
  const from = new Date(Date.parse(`${to}T00:00:00Z`) - 29 * dayMilliseconds).toISOString().slice(0, 10)
  return { from, to, appVersion: '', provider: '' }
}

function dateNumber(value: string): number {
  if (!datePattern.test(value)) throw new AdminRequestError('filters')
  const time = Date.parse(`${value}T00:00:00Z`)
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== value) {
    throw new AdminRequestError('filters')
  }
  return time
}

export function validateFilters(filters: MetricsFilters): void {
  const start = dateNumber(filters.from)
  const end = dateNumber(filters.to)
  if (end < start || (end - start) / dayMilliseconds >= 90) throw new AdminRequestError('filters')
  if (filters.appVersion && !versionPattern.test(filters.appVersion)) throw new AdminRequestError('filters')
  if (filters.provider && !providers.includes(filters.provider)) throw new AdminRequestError('filters')
}

export function metricsQuery(filters: MetricsFilters, page: number, limit = 25): string {
  validateFilters(filters)
  if (!Number.isInteger(page) || page < 1 || page > 10_000 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new AdminRequestError('filters')
  }
  const params = new URLSearchParams({ from: filters.from, to: filters.to, page: String(page), limit: String(limit) })
  if (filters.appVersion) params.set('app_version', filters.appVersion)
  if (filters.provider) params.set('provider', filters.provider)
  return params.toString()
}

export function adminServerUrl(configured?: string): string {
  const candidate = configured?.trim() || 'https://altair.grass.build'
  let url: URL
  try { url = new URL(candidate) } catch { throw new AdminRequestError('unavailable') }
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
  if ((url.protocol !== 'https:' && !(url.protocol === 'http:' && loopback))
      || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new AdminRequestError('unavailable')
  }
  return url.origin
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new AdminRequestError('contract')
  return value as Record<string, unknown>
}

function count(value: unknown): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) throw new AdminRequestError('contract')
  return value
}

function measurement(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) throw new AdminRequestError('contract')
  return value
}

function list<T>(value: unknown, decode: (item: Record<string, unknown>) => T): T[] {
  if (!Array.isArray(value) || value.length > 10_000) throw new AdminRequestError('contract')
  return value.map((item) => decode(record(item)))
}

function date(value: unknown): string {
  if (typeof value !== 'string') throw new AdminRequestError('contract')
  try { dateNumber(value) } catch { throw new AdminRequestError('contract') }
  return value
}

function timestamp(value: unknown): string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(value) || !Number.isFinite(Date.parse(value))) {
    throw new AdminRequestError('contract')
  }
  return value
}

function staticKey(value: unknown): string {
  if (typeof value !== 'string' || !/^[a-z][a-z0-9_]{0,79}$/.test(value)) throw new AdminRequestError('contract')
  return value
}

function optionalKey(value: unknown): string {
  return value === '' ? '' : staticKey(value)
}

function version(value: unknown): string {
  if (typeof value !== 'string' || (value !== '' && !versionPattern.test(value))) throw new AdminRequestError('contract')
  return value
}

function provider(value: unknown, optional: true): '' | Provider
function provider(value: unknown, optional?: false): Provider
function provider(value: unknown, optional = false): '' | Provider {
  if (optional && value === '') return ''
  if (typeof value !== 'string' || !providers.includes(value as Provider)) throw new AdminRequestError('contract')
  return value as Provider
}

function source(value: unknown): EventSource {
  if (value !== 'client' && value !== 'server') throw new AdminRequestError('contract')
  return value
}

function observedProvider(value: unknown, optional: true): '' | ObservedProvider
function observedProvider(value: unknown, optional?: false): ObservedProvider
function observedProvider(value: unknown, optional = false): '' | ObservedProvider {
  if (value === 'none') return 'none'
  return optional ? provider(value, true) : provider(value)
}

function pseudonym(value: unknown): string | null {
  if (value === null) return null
  if (typeof value !== 'string' || !/^[a-f0-9]{32}$/.test(value)) throw new AdminRequestError('contract')
  return value
}

function eventID(value: unknown): string {
  if (typeof value !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value)) {
    throw new AdminRequestError('contract')
  }
  return value
}

function retainedCount(value: unknown, total: number): number | null {
  if (value === null) return null
  const result = count(value)
  if (result > total) throw new AdminRequestError('contract')
  return result
}

export function decodeMetrics(value: unknown): AdminMetrics {
  const item = record(value)
  if (item.schema_version !== 1) throw new AdminRequestError('contract')
  const coverage = record(item.coverage)
  if (coverage.mode !== 'first_party_actions_only' || coverage.historical_events_available !== false
      || coverage.cohort_filter_mode !== 'first_open_version_provider_activity' || coverage.retention_return_versions !== 'any') {
    throw new AdminRequestError('contract')
  }
  const filters = record(item.filters)
  const filterOptions = record(item.filter_options)
  const summary = record(item.summary)
  const recent = record(item.recent)
  if (!Array.isArray(filterOptions.app_versions) || !Array.isArray(filterOptions.providers)) throw new AdminRequestError('contract')
  const decodedFilters = {
    from: date(filters.from), to: date(filters.to), app_version: version(filters.app_version),
    provider: provider(filters.provider, true), page: count(filters.page), limit: count(filters.limit),
  }
  try { validateFilters({ from: decodedFilters.from, to: decodedFilters.to, appVersion: decodedFilters.app_version, provider: decodedFilters.provider }) }
  catch { throw new AdminRequestError('contract') }
  if (decodedFilters.page < 1 || decodedFilters.page > 10_000 || decodedFilters.limit < 1 || decodedFilters.limit > 100) throw new AdminRequestError('contract')
  const result: AdminMetrics = {
    schema_version: 1,
    coverage: {
      started_at: coverage.started_at === null ? null : timestamp(coverage.started_at),
      raw_retention_days: count(coverage.raw_retention_days),
      mode: 'first_party_actions_only', historical_events_available: false,
      cohort_filter_mode: 'first_open_version_provider_activity', retention_return_versions: 'any',
    },
    filters: decodedFilters,
    filter_options: { app_versions: filterOptions.app_versions.map(version), providers: filterOptions.providers.map((item) => provider(item)) },
    summary: {
      events: count(summary.events), actors: count(summary.actors), sessions: count(summary.sessions), questions: count(summary.questions), answers: count(summary.answers),
      account_required: count(summary.account_required), auth_failures: count(summary.auth_failures), server_errors: count(summary.server_errors),
      latency_samples: count(summary.latency_samples), p50_latency_ms: measurement(summary.p50_latency_ms), p95_latency_ms: measurement(summary.p95_latency_ms),
    },
    daily: list(item.daily, (row) => ({
      date: date(row.date), events: count(row.events), actors: count(row.actors), sessions: count(row.sessions), questions: count(row.questions),
      answers: count(row.answers), account_required: count(row.account_required), errors: count(row.errors),
    })),
    funnel: list(item.funnel, (row) => ({ step: staticKey(row.step), source: source(row.source), events: count(row.events), actors: count(row.actors) })),
    actions: list(item.actions, (row) => ({ name: staticKey(row.name), source: source(row.source), events: count(row.events), actors: count(row.actors) })),
    providers: list(item.providers, (row) => ({ provider: observedProvider(row.provider), sign_ins: count(row.sign_ins), links: count(row.links), failures: count(row.failures) })),
    errors: list(item.errors, (row) => ({ code: staticKey(row.code), events: count(row.events) })),
    latency: list(item.latency, (row) => ({ date: date(row.date), samples: count(row.samples), p50_ms: measurement(row.p50_ms), p95_ms: measurement(row.p95_ms) })),
    retention: list(item.retention, (row) => {
      const actors = count(row.actors)
      if (actors < 1) throw new AdminRequestError('contract')
      return { cohort_date: date(row.cohort_date), actors, day_1: retainedCount(row.day_1, actors), day_7: retainedCount(row.day_7, actors), day_30: retainedCount(row.day_30, actors) }
    }),
    recent: {
      total: count(recent.total), page: count(recent.page), limit: count(recent.limit),
      items: list(recent.items, (row) => ({
        id: eventID(row.id), timestamp: timestamp(row.timestamp), name: staticKey(row.name), source: source(row.source),
        actor: pseudonym(row.actor), session: pseudonym(row.session), surface: optionalKey(row.surface), provider: observedProvider(row.provider, true),
        reason: optionalKey(row.reason), error_code: optionalKey(row.error_code), duration_ms: measurement(row.duration_ms),
        app_version: version(row.app_version), app_build: version(row.app_build), status: count(row.status),
      })),
    },
  }
  if (result.recent.page !== result.filters.page || result.recent.limit !== result.filters.limit
      || result.recent.items.length > result.recent.limit || result.recent.total < result.recent.items.length) {
    throw new AdminRequestError('contract')
  }
  const cohortSize = result.funnel.find((step) => step.step === 'first_open')?.actors ?? 0
  if (result.funnel.some((step) => step.actors > cohortSize)
      || new Set(result.recent.items.map((row) => row.id)).size !== result.recent.items.length
      || new Set(result.daily.map((row) => row.date)).size !== result.daily.length) {
    throw new AdminRequestError('contract')
  }
  return result
}

export function decodeSession(value: unknown, now = Date.now()): AdminSession {
  const item = record(value)
  if (typeof item.token !== 'string' || !/^[A-Za-z0-9._~-]{20,512}$/.test(item.token)
      || typeof item.expiresAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(item.expiresAt) || !Number.isFinite(Date.parse(item.expiresAt))
      || Date.parse(item.expiresAt) <= now) {
    throw new AdminRequestError('contract')
  }
  return { token: item.token, expiresAt: item.expiresAt }
}

async function adminFetch(baseUrl: string, path: string, options: RequestInit, isLogin = false): Promise<Response> {
  let response: Response
  try {
    response = await fetch(`${adminServerUrl(baseUrl)}${path}`, {
      ...options,
      signal: options.signal ? AbortSignal.any([options.signal, AbortSignal.timeout(20_000)]) : AbortSignal.timeout(20_000),
      credentials: 'omit',
      cache: 'no-store',
      redirect: 'error',
      referrerPolicy: 'no-referrer',
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw error
    throw new AdminRequestError('unavailable')
  }
  if (response.status === 401) throw new AdminRequestError(isLogin ? 'credentials' : 'expired')
  if (response.status === 429) throw new AdminRequestError('throttled')
  if (response.status === 400 || response.status === 422) throw new AdminRequestError('filters')
  if (!response.ok) throw new AdminRequestError('unavailable')
  return response
}

async function responseJson(response: Response): Promise<unknown> {
  try { return await response.json() } catch { throw new AdminRequestError('contract') }
}

export async function loginAdmin(baseUrl: string, password: string, signal?: AbortSignal): Promise<AdminSession> {
  const response = await adminFetch(baseUrl, '/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ password }),
    signal,
  }, true)
  return decodeSession(await responseJson(response))
}

export async function logoutAdmin(baseUrl: string, token: string): Promise<void> {
  await adminFetch(baseUrl, '/admin/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function loadMetrics(baseUrl: string, token: string, filters: MetricsFilters, page: number, signal?: AbortSignal): Promise<AdminMetrics> {
  const response = await adminFetch(baseUrl, `/admin/metrics?${metricsQuery(filters, page)}`, {
    method: 'GET', headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }, signal,
  })
  const result = decodeMetrics(await responseJson(response))
  if (result.filters.from !== filters.from || result.filters.to !== filters.to
      || result.filters.app_version !== filters.appVersion || result.filters.provider !== filters.provider || result.filters.page !== page) {
    throw new AdminRequestError('contract')
  }
  return result
}

export function providerLabel(provider: string): string {
  return ({ anonymous: 'Anonymous', 'apple.com': 'Apple', phone: 'Phone', none: 'Before sign-in' } as Record<string, string>)[provider] || 'Unknown'
}

export function percent(value: number, total: number): number | null {
  return total > 0 ? (value / total) * 100 : null
}

export function lastMetricsPage(total: number, limit: number): number {
  if (!Number.isSafeInteger(total) || total < 0 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
    throw new AdminRequestError('contract')
  }
  return Math.max(1, Math.ceil(total / limit))
}

export function chartPoints(values: readonly number[], width = 640, height = 144, maximum?: number): string {
  if (!values.length) return ''
  const peak = Math.max(maximum ?? 0, ...values, 1)
  return values.map((value, index) => `${values.length > 1 ? index * width / (values.length - 1) : width / 2},${height - value / peak * height}`).join(' ')
}

export function completeDaily(rows: DailyMetrics[], from: string, to: string): DailyMetrics[] {
  validateFilters({ from, to, appVersion: '', provider: '' })
  const byDate = new Map(rows.map((row) => [row.date, row]))
  const result: DailyMetrics[] = []
  for (let time = dateNumber(from); time <= dateNumber(to); time += dayMilliseconds) {
    const date = new Date(time).toISOString().slice(0, 10)
    result.push(byDate.get(date) ?? { date, events: 0, actors: 0, sessions: 0, questions: 0, answers: 0, account_required: 0, errors: 0 })
  }
  return result
}
