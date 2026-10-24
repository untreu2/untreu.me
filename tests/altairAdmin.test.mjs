import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import {
  AdminRequestError, adminServerUrl, chartPoints, completeDaily, decodeMetrics, decodeSession, defaultFilters, funnelBaseStep,
  lastMetricsPage, loadMetrics, loginAdmin, logoutAdmin, metricsQuery, percent, providerLabel, validateFilters,
} from '../src/lib/altairAdmin.ts'
import { actionLabel, errorLabel, reasonLabel, surfaceLabel } from '../src/lib/altairTelemetryLabels.ts'

const fixture = JSON.parse(readFileSync(new URL('./fixtures/altair-metrics.json', import.meta.url), 'utf8'))
const clone = () => structuredClone(fixture)
const filters = { from: '2026-10-01', to: '2026-10-10', appVersion: '', provider: '' }
const kind = (expected) => (error) => error instanceof AdminRequestError && error.kind === expected

test('decodes the agreed server contract, UUID event IDs, nullable correlation, and pre-sign-in provider', () => {
  const report = decodeMetrics(fixture)
  assert.equal(report.recent.items[0].id, '123e4567-e89b-42d3-a456-426614174000')
  assert.equal(report.recent.items[1].actor, null)
  assert.equal(report.recent.items[1].session, null)
  assert.equal(report.recent.items[2].provider, 'none')
  assert.equal(report.summary.questions, 4)
  assert.equal(report.summary.answers, 3)
  assert.equal(report.retention[0].day_1, 1)
  assert.equal(report.retention[0].day_7, null)
  assert.equal(providerLabel('none'), 'Before sign-in')
})

test('does not carry unknown content, credentials, or PII fields into the decoded dashboard model', () => {
  const value = clone()
  value.message = 'private message content'
  value.email = 'person@example.invalid'
  value.recent.items[0].body = 'private health content'
  value.recent.items[0].ip_address = '192.0.2.1'
  const decoded = JSON.stringify(decodeMetrics(value))
  for (const unwanted of ['private message content', 'person@example.invalid', 'private health content', '192.0.2.1', 'ip_address']) assert.equal(decoded.includes(unwanted), false)
})

test('rejects incompatible schemas, untyped text, raw identities, invalid counts and impossible cohorts', () => {
  const mutations = [
    (value) => { value.schema_version = 2 },
    (value) => { value.summary.actors = -1 },
    (value) => { value.summary.answers = 1.1 },
    (value) => { value.summary.p95_latency_ms = Infinity },
    (value) => { value.recent.items[0].actor = 'actual-firebase-uid' },
    (value) => { value.recent.items[0].session = 'someone@example.invalid' },
    (value) => { value.recent.items[0].id = 'abcdef123456' },
    (value) => { value.recent.items[0].reason = 'free text entered by a user' },
    (value) => { value.recent.items[0].provider = 'google.com' },
    (value) => { value.funnel[1].actors = 4 },
    (value) => { value.retention[0].day_1 = 3 },
    (value) => { value.retention[0].actors = 0 },
    (value) => { value.recent.items.push(value.recent.items[0]) },
    (value) => { value.daily.push(value.daily[0]) },
    (value) => { value.coverage.retention_return_versions = 'selected' },
  ]
  for (const mutate of mutations) {
    const value = clone()
    mutate(value)
    assert.throws(() => decodeMetrics(value), kind('contract'))
  }
})

test('accepts the newcomer intro cohort and measures the funnel against its intro_view base', () => {
  const value = clone()
  value.coverage.cohort_filter_mode = 'first_intro_view_version_provider_activity'
  value.funnel[0].step = 'intro_view'
  const report = decodeMetrics(value)
  assert.equal(report.coverage.cohort_filter_mode, 'first_intro_view_version_provider_activity')
  assert.equal(funnelBaseStep(report.coverage.cohort_filter_mode), 'intro_view')
  assert.equal(funnelBaseStep(decodeMetrics(fixture).coverage.cohort_filter_mode), 'first_open')
  value.funnel[1].actors = 4
  assert.throws(() => decodeMetrics(value), kind('contract'))
  const unknown = clone()
  unknown.coverage.cohort_filter_mode = 'all_installations'
  assert.throws(() => decodeMetrics(unknown), kind('contract'))
  assert.equal(actionLabel('intro_view'), 'Intro shown')
  assert.equal(reasonLabel('first_answer'), 'Answer prompt')
})

test('allows a real empty snapshot without inventing demo activity or retention values', () => {
  const value = clone()
  value.coverage.started_at = null
  for (const key of Object.keys(value.summary)) value.summary[key] = 0
  for (const key of ['daily', 'funnel', 'actions', 'providers', 'errors', 'latency', 'retention']) value[key] = []
  value.recent = { total: 0, page: 1, limit: 25, items: [] }
  const report = decodeMetrics(value)
  assert.equal(report.coverage.started_at, null)
  assert.equal(report.summary.events, 0)
  assert.equal(report.summary.latency_samples, 0)
  assert.deepEqual(report.recent.items, [])
})

test('filters use inclusive UTC days, respect the 90-day cap, and encode static version/provider values', () => {
  assert.deepEqual(defaultFilters(new Date('2026-10-10T23:59:00-07:00')), { from: '2026-09-12', to: '2026-10-11', appVersion: '', provider: '' })
  assert.doesNotThrow(() => validateFilters({ ...filters, from: '2026-01-01', to: '2026-03-31' }))
  const query = new URLSearchParams(metricsQuery({ ...filters, appVersion: '1.1.2 (42)', provider: 'apple.com' }, 2, 50))
  assert.equal(query.get('app_version'), '1.1.2 (42)')
  assert.equal(query.get('provider'), 'apple.com')
  assert.equal(query.get('page'), '2')
  assert.equal(query.get('limit'), '50')
  assert.equal(query.has('token'), false)
  for (const input of [
    { ...filters, from: '2026-02-29' }, { ...filters, from: '2026-10-11' },
    { ...filters, from: '2026-01-01', to: '2026-04-01' }, { ...filters, provider: 'none' },
    { ...filters, appVersion: 'person@example.invalid' },
  ]) assert.throws(() => validateFilters(input), kind('filters'))
  for (const page of [0, -1, 1.5, 10_001]) assert.throws(() => metricsQuery(filters, page), kind('filters'))
})

test('protects login transport and rejects remote HTTP, credentials, paths, and misleading loopback hosts', () => {
  assert.equal(adminServerUrl(), 'https://altair.grass.build')
  assert.equal(adminServerUrl('http://127.0.0.1:7001'), 'http://127.0.0.1:7001')
  assert.equal(adminServerUrl('http://localhost:7001/'), 'http://localhost:7001')
  assert.equal(adminServerUrl('http://[::1]:7001/'), 'http://[::1]:7001')
  for (const value of ['http://example.invalid', 'http://localhost.example.invalid', 'https://user:pass@example.invalid', 'https://example.invalid/path', 'https://example.invalid?token=secret', 'not-a-url']) assert.throws(() => adminServerUrl(value), kind('unavailable'))
})

test('auth token decode accepts opaque sessions and rejects expired or malformed credentials', () => {
  const now = Date.parse('2026-10-10T06:00:00Z')
  const session = { token: 'a'.repeat(64), expiresAt: '2026-10-10T10:00:00Z' }
  assert.deepEqual(decodeSession({ ...session, ignored: 'not retained' }, now), session)
  for (const value of [{ ...session, token: 'short' }, { ...session, token: 'a'.repeat(32) + ' ' }, { ...session, expiresAt: '2026-10-10T05:00:00Z' }, { ...session, expiresAt: '2050' }]) assert.throws(() => decodeSession(value, now), kind('contract'))
})

test('login sends the supplied password only in the POST body with no cookies, redirects, caching, or referrer', async () => {
  const original = globalThis.fetch
  let request
  globalThis.fetch = async (url, options) => {
    request = { url, options }
    return Response.json({ token: 'x'.repeat(64), expiresAt: new Date(Date.now() + 3600_000).toISOString() })
  }
  try {
    await loginAdmin('https://example.invalid', 'test-only-password')
    assert.equal(request.url, 'https://example.invalid/admin/login')
    assert.equal(request.options.method, 'POST')
    assert.deepEqual(JSON.parse(request.options.body), { password: 'test-only-password' })
    assert.equal(request.options.credentials, 'omit')
    assert.equal(request.options.cache, 'no-store')
    assert.equal(request.options.redirect, 'error')
    assert.equal(request.options.referrerPolicy, 'no-referrer')
    assert.ok(request.options.signal instanceof AbortSignal)
    assert.equal(request.url.includes('test-only-password'), false)
  } finally { globalThis.fetch = original }
})

test('metrics and logout send bearer headers; filters must match the returned snapshot', async () => {
  const original = globalThis.fetch
  const calls = []
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options })
    return options.method === 'POST' ? new Response(null, { status: 204 }) : Response.json(fixture)
  }
  try {
    const token = 'z'.repeat(64)
    const report = await loadMetrics('https://example.invalid', token, filters, 1)
    assert.equal(report.summary.answers, 3)
    await logoutAdmin('https://example.invalid', token)
    assert.equal(calls[0].options.headers.Authorization, `Bearer ${token}`)
    assert.equal(calls[1].url, 'https://example.invalid/admin/logout')
    assert.equal(calls[1].options.method, 'POST')
    assert.equal(calls[1].options.headers.Authorization, `Bearer ${token}`)
    assert.equal(calls[0].url.includes(token), false)
    await assert.rejects(() => loadMetrics('https://example.invalid', token, { ...filters, provider: 'phone' }, 1), kind('contract'))
  } finally { globalThis.fetch = original }
})

test('classifies wrong credentials, expiry, throttling and server failures without reading error bodies', async () => {
  const original = globalThis.fetch
  let bodyReads = 0
  try {
    for (const [status, expected] of [[401, 'credentials'], [429, 'throttled'], [503, 'unavailable']]) {
      globalThis.fetch = async () => ({ status, ok: false, json() { bodyReads++; return { sensitive: 'do not expose' } } })
      await assert.rejects(() => loginAdmin('https://example.invalid', 'test-only-password'), kind(expected))
    }
    globalThis.fetch = async () => ({ status: 401, ok: false, json() { bodyReads++ } })
    await assert.rejects(() => loadMetrics('https://example.invalid', 'x'.repeat(64), filters, 1), kind('expired'))
    assert.equal(bodyReads, 0)
  } finally { globalThis.fetch = original }
})

test('cancels an in-flight metrics request when its controller is aborted', async () => {
  const original = globalThis.fetch
  const controller = new AbortController()
  let observedSignal
  globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    observedSignal = options.signal
    options.signal.addEventListener('abort', () => reject(new DOMException('Cancelled', 'AbortError')), { once: true })
  })
  try {
    const request = loadMetrics('https://example.invalid', 'x'.repeat(64), filters, 1, controller.signal)
    controller.abort()
    await assert.rejects(request, { name: 'AbortError' })
    assert.equal(observedSignal.aborted, true)
  } finally { globalThis.fetch = original }
})

test('daily series fills only the selected UTC dates and handles empty or one-point charts', () => {
  const report = decodeMetrics(fixture)
  const days = completeDaily(report.daily, '2026-10-08', '2026-10-10')
  assert.deepEqual(days.map((day) => [day.date, day.questions, day.answers]), [['2026-10-08', 0, 0], ['2026-10-09', 1, 1], ['2026-10-10', 3, 2]])
  assert.equal(chartPoints([], 100, 50), '')
  assert.equal(chartPoints([2], 100, 50), '50,0')
  assert.equal(chartPoints([0, 2, 1], 100, 50), '0,50 50,0 100,25')
  assert.equal(percent(0, 0), null)
  assert.equal(percent(1, 4), 25)
})

test('pagination recovers after retention or deletion reduces the event count', () => {
  assert.equal(lastMetricsPage(0, 25), 1)
  assert.equal(lastMetricsPage(2, 25), 1)
  assert.equal(lastMetricsPage(26, 25), 2)
  assert.equal(lastMetricsPage(50, 25), 2)
  assert.throws(() => lastMetricsPage(1, 0), kind('contract'))
})

test('timeline labels expose only fixed static actions, surfaces, reasons and error categories', () => {
  assert.equal(actionLabel('first_open'), 'First tracked open')
  assert.equal(actionLabel('consent_submit'), 'Consent submitted')
  assert.equal(surfaceLabel('voice'), 'Voice')
  assert.equal(surfaceLabel('meal'), 'Meal')
  assert.equal(reasonLabel('add'), 'Add')
  assert.equal(reasonLabel('required'), 'Required account')
  assert.equal(errorLabel('http_503'), 'Request status 503')
  assert.equal(errorLabel('none'), null)
  assert.equal(actionLabel('some_private_information'), 'Other tracked action')
  assert.equal(surfaceLabel('some_private_information'), null)
  assert.equal(reasonLabel('some_private_information'), null)
  assert.equal(errorLabel('some_private_information'), 'Other tracked error')
})
