import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  AdminRequestError, adminServerUrl, chartPoints, completeDaily, defaultFilters, loadMetrics, loginAdmin,
  logoutAdmin, lastMetricsPage, percent, providerLabel, providers, validateFilters,
} from '../lib/altairAdmin'
import type { AdminMetrics, AdminSession, EventSource, MetricsFilters, RecentAction } from '../lib/altairAdmin'
import { actionLabel, errorLabel, reasonLabel, surfaceLabel } from '../lib/altairTelemetryLabels'
import './AltairServer.css'

const integer = new Intl.NumberFormat('en-US')
const axisNumber = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
const instant = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })
const clock = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'UTC' })

function duration(value: number): string {
  return value < 1_000 ? `${integer.format(Math.round(value))} ms` : `${(value / 1_000).toFixed(value < 10_000 ? 2 : 1)} s`
}

function errorMessage(error: unknown, isLogin = false): string {
  if (!(error instanceof AdminRequestError)) return 'The server is unavailable. Try again in a moment.'
  switch (error.kind) {
    case 'credentials': return 'That password is incorrect. Try again.'
    case 'expired': return 'Your session has expired. Unlock the dashboard again.'
    case 'throttled': return 'Too many requests. Wait a moment, then try again.'
    case 'contract': return 'The server returned an unsupported metrics format. Refresh after the server update.'
    case 'filters': return 'Choose a valid date range of up to 90 days.'
    default: return isLogin ? 'Unable to reach the server. Check your connection and try again.' : 'Unable to refresh. The last successful snapshot is shown.'
  }
}

function Source({ source }: { source: EventSource }) {
  return <span className={`admin-source admin-source-${source}`}>{source === 'server' ? 'Server confirmed' : 'App observed'}</span>
}

function Panel({ title, detail, children, className = '', aside }: { title: string; detail?: string; children: ReactNode; className?: string; aside?: ReactNode }) {
  return <section className={`admin-panel ${className}`}>
    <div className="admin-panel-heading"><div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>{aside}</div>
    {children}
  </section>
}

function Metric({ label, value, detail }: { label: string; value: number | string; detail: string }) {
  return <div className="admin-metric"><p>{label}</p><strong>{typeof value === 'number' ? integer.format(value) : value}</strong><span>{detail}</span></div>
}

function Traffic({ report }: { report: AdminMetrics }) {
  const [mode, setMode] = useState<'messages' | 'sessions'>('messages')
  const days = completeDaily(report.daily, report.filters.from, report.filters.to)
  const firstSeries = days.map((day) => mode === 'messages' ? day.questions : day.sessions)
  const secondSeries = days.map((day) => mode === 'messages' ? day.answers : day.actors)
  const firstLabel = mode === 'messages' ? 'App questions' : 'Correlated sessions'
  const secondLabel = mode === 'messages' ? 'Server answers' : 'Active actors'
  const observedPeak = Math.max(...firstSeries, ...secondSeries, 0)
  const peak = Math.max(2, Math.ceil(observedPeak / 2) * 2)
  return <Panel title="Daily activity" detail="Messages and correlated activity, by calendar day." className="admin-traffic" aside={<div className="admin-segment" aria-label="Daily activity metric">{(['messages', 'sessions'] as const).map((value) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)}>{value === 'messages' ? 'Messages' : 'Sessions'}</button>)}</div>}>
    <div className="admin-chart-legend"><span><i />{firstLabel}</span><span><i className="admin-line-light" />{secondLabel}</span></div>
    <figure className="admin-chart">
      <svg viewBox="0 0 680 186" role="img" aria-labelledby="admin-traffic-title admin-traffic-desc">
        <title id="admin-traffic-title">Daily {firstLabel.toLowerCase()} and {secondLabel.toLowerCase()}</title>
        <desc id="admin-traffic-desc">From {report.filters.from} to {report.filters.to}. Highest daily count: {integer.format(observedPeak)}. A table of every day follows this chart.</desc>
        {[0, 0.5, 1].map((position) => <g key={position}><line x1="36" y1={12 + position * 144} x2="676" y2={12 + position * 144} className="admin-chart-grid" /><text x="27" y={16 + position * 144} textAnchor="end">{axisNumber.format(peak * (1 - position))}</text></g>)}
        <g transform="translate(36,12)"><polyline points={chartPoints(firstSeries, 640, 144, peak)} className="admin-chart-main" /><polyline points={chartPoints(secondSeries, 640, 144, peak)} className="admin-chart-secondary" />{days.map((day, index) => <g key={day.date}><circle cx={days.length > 1 ? index * 640 / (days.length - 1) : 320} cy={144 - firstSeries[index] / peak * 144} r="2" fill="#0d0d0d"><title>{day.date}: {firstSeries[index]} {firstLabel}</title></circle><circle cx={days.length > 1 ? index * 640 / (days.length - 1) : 320} cy={144 - secondSeries[index] / peak * 144} r="2" fill="#92928b"><title>{day.date}: {secondSeries[index]} {secondLabel}</title></circle></g>)}</g>
        <text x="36" y="181">{shortDate.format(new Date(`${report.filters.from}T00:00:00Z`))}</text>
        <text x="676" y="181" textAnchor="end">{shortDate.format(new Date(`${report.filters.to}T00:00:00Z`))}</text>
      </svg>
      <figcaption>Session counts depend on app correlation headers. Zero means no retained event for that day; earlier activity is unavailable.</figcaption>
    </figure>
    <details className="admin-data-details"><summary>View daily counts</summary><div className="admin-table-scroll"><table><thead><tr><th scope="col">Day</th><th scope="col">Actors</th><th scope="col">Sessions</th><th scope="col">App questions</th><th scope="col">Server answers</th><th scope="col">Events</th><th scope="col">Errors</th></tr></thead><tbody>{days.map((day) => <tr key={day.date}><th scope="row">{day.date}</th><td>{integer.format(day.actors)}</td><td>{integer.format(day.sessions)}</td><td>{integer.format(day.questions)}</td><td>{integer.format(day.answers)}</td><td>{integer.format(day.events)}</td><td>{integer.format(day.errors)}</td></tr>)}</tbody></table></div></details>
  </Panel>
}

function Funnel({ report }: { report: AdminMetrics }) {
  const steps = report.funnel.filter((row) => row.step !== 'account_required')
  const base = steps.find((row) => row.step === 'first_open')?.actors ?? 0
  const maximum = Math.max(base, ...steps.map((row) => row.actors), 1)
  return <Panel title="Onboarding funnel" detail="Checkpoint completion for the first-tracked-open cohort in this window." className="admin-funnel">
    <ol>{steps.map((step) => <li key={`${step.step}-${step.source}`}>
      <div className="admin-funnel-label"><span>{actionLabel(step.step)}</span><strong>{integer.format(step.actors)}</strong></div>
      <div className="admin-funnel-track"><span style={{ width: `${step.actors / maximum * 100}%` }} /></div>
      <div className="admin-funnel-meta"><Source source={step.source} /><span>{base > 0 ? `${Math.min(100, percent(step.actors, base) ?? 0).toFixed(0)}% of cohort` : 'No cohort yet'}</span></div>
    </li>)}</ol>
    {!steps.length && <Empty>No onboarding checkpoints recorded in this window.</Empty>}
    <p className="admin-footnote">Version selects the first tracked open; provider selects cohort actors with that provider’s activity in this window, preserving their pre-sign-in steps. Existing installations first seen after instrumentation are included. Checkpoints are not an ordered path; older clients without first-open telemetry are excluded.</p>
  </Panel>
}

function Empty({ children }: { children: ReactNode }) {
  return <p className="admin-empty">{children}</p>
}

function Actions({ report }: { report: AdminMetrics }) {
  const [shownSource, setShownSource] = useState<'' | EventSource>('')
  const actions = report.actions.filter((action) => !shownSource || shownSource === action.source).sort((a, b) => b.events - a.events || a.name.localeCompare(b.name))
  return <Panel title="Actions, counted" detail="Fixed action names only. Events can repeat for the same actor." className="admin-actions" aside={<div className="admin-segment" aria-label="Action source">{(['', 'client', 'server'] as const).map((source) => <button key={source} type="button" aria-pressed={shownSource === source} onClick={() => setShownSource(source)}>{source === '' ? 'All' : source === 'client' ? 'App' : 'Server'}</button>)}</div>}>
    {actions.length ? <div className="admin-table-scroll admin-table-bounded"><table><thead><tr><th scope="col">Action</th><th scope="col">Coverage</th><th scope="col">Events</th><th scope="col">Actors</th></tr></thead><tbody>{actions.map((action) => <tr key={`${action.name}-${action.source}`}><th scope="row">{actionLabel(action.name)}</th><td><Source source={action.source} /></td><td>{integer.format(action.events)}</td><td>{integer.format(action.actors)}</td></tr>)}</tbody></table></div> : <Empty>No actions recorded for this source.</Empty>}
  </Panel>
}

function Accounts({ report }: { report: AdminMetrics }) {
  return <Panel title="Account providers" detail="Sign-in and linking are separate actions." className="admin-accounts">
    {report.providers.length ? <table><thead><tr><th scope="col">Provider</th><th scope="col">Sign-ins</th><th scope="col">Links</th><th scope="col">Failures</th></tr></thead><tbody>{report.providers.map((row) => <tr key={row.provider}><th scope="row">{providerLabel(row.provider)}</th><td>{integer.format(row.sign_ins)}</td><td>{integer.format(row.links)}</td><td>{integer.format(row.failures)}</td></tr>)}</tbody></table> : <Empty>No provider activity recorded.</Empty>}
    <p className="admin-footnote">App-observed sign-in outcomes are distinct from a server-confirmed account link.</p>
  </Panel>
}

function Returning({ report }: { report: AdminMetrics }) {
  const rows = [...report.retention].sort((a, b) => b.cohort_date.localeCompare(a.cohort_date))
  const cell = (returned: number | null, total: number) => returned === null
    ? <span className="admin-not-mature" title="This cohort has not reached the observation day">Not mature</span>
    : <><strong>{(percent(returned, total) ?? 0).toFixed(0)}%</strong><span className="admin-cell-note">{integer.format(returned)} / {integer.format(total)}</span></>
  return <Panel title="Returning usage" detail="First-observed actor cohorts; returns on exact calendar days." className="admin-retention">
    {rows.length ? <div className="admin-table-scroll admin-table-bounded"><table><thead><tr><th scope="col">Cohort</th><th scope="col">Actors</th><th scope="col">Day 1</th><th scope="col">Day 7</th><th scope="col">Day 30</th></tr></thead><tbody>{rows.map((row) => <tr key={row.cohort_date}><th scope="row">{shortDate.format(new Date(`${row.cohort_date}T00:00:00Z`))}</th><td>{integer.format(row.actors)}</td><td>{cell(row.day_1, row.actors)}</td><td>{cell(row.day_7, row.actors)}</td><td>{cell(row.day_30, row.actors)}</td></tr>)}</tbody></table></div> : <Empty>No actor cohorts recorded yet.</Empty>}
    <p className="admin-footnote">Pseudonymous actors represent installations, with verified-account fallback for older clients; they are not exact people. Returns can use any app version and still accumulate during the current calendar day. A provider filter selects cohort actors with that provider’s activity in the chosen window.</p>
  </Panel>
}

function Reliability({ report }: { report: AdminMetrics }) {
  const hasLatency = report.summary.latency_samples > 0
  return <Panel title="Latency & errors" detail="Measured server requests. Client errors are counted as observations." className="admin-reliability" aside={<span className="admin-small-stat">{integer.format(report.summary.server_errors)} server errors</span>}>
    <div className="admin-latency-kpis"><Metric label="Median · p50" value={hasLatency ? duration(report.summary.p50_latency_ms) : '—'} detail={`${integer.format(report.summary.latency_samples)} samples`} /><Metric label="Tail · p95" value={hasLatency ? duration(report.summary.p95_latency_ms) : '—'} detail="Selected date window" /></div>
    {report.latency.some((row) => row.samples > 0) && <details className="admin-data-details"><summary>View latency by day</summary><div className="admin-table-scroll"><table><thead><tr><th scope="col">Day</th><th scope="col">Samples</th><th scope="col">p50</th><th scope="col">p95</th></tr></thead><tbody>{report.latency.map((row) => <tr key={row.date}><th scope="row">{row.date}</th><td>{integer.format(row.samples)}</td><td>{row.samples ? duration(row.p50_ms) : '—'}</td><td>{row.samples ? duration(row.p95_ms) : '—'}</td></tr>)}</tbody></table></div></details>}
    {report.errors.length ? <div className="admin-error-list">{[...report.errors].sort((a, b) => b.events - a.events).map((row) => <div key={row.code}><span>{errorLabel(row.code)}</span><strong>{integer.format(row.events)}</strong></div>)}</div> : <Empty>No error events in this window.</Empty>}
  </Panel>
}

function Recent({ report, isLoading, onPage }: { report: AdminMetrics; isLoading: boolean; onPage: (page: number) => void }) {
  const { total, page, limit, items } = report.recent
  const pages = lastMetricsPage(total, limit)
  const outcome = (row: RecentAction) => row.status > 0
    ? `${row.source === 'server' && row.status < 400 && errorLabel(row.error_code) ? 'Reported error · ' : ''}Status ${row.status}`
    : 'Observed'
  return <Panel title="Recent action timeline" detail="Pseudonyms and fixed event metadata. No message, profile, or health content." className="admin-recent" aside={<span className="admin-small-stat">{integer.format(total)} events</span>}>
    {items.length ? <div className="admin-table-scroll"><table><thead><tr><th scope="col">Time</th><th scope="col">Action / source</th><th scope="col">Actor / session</th><th scope="col">App / provider</th><th scope="col">Result</th></tr></thead><tbody>{items.map((row) => <tr key={row.id}>
      <td className="admin-time"><time dateTime={row.timestamp}>{instant.format(new Date(row.timestamp))}</time></td>
      <th scope="row">{actionLabel(row.name)}<span className="admin-cell-note">{[surfaceLabel(row.surface), reasonLabel(row.reason)].filter(Boolean).join(' · ')}</span><span className="admin-cell-note"><Source source={row.source} /></span></th>
      <td className="admin-pseudonym">{row.actor ? row.actor.slice(0, 12) : 'Uncorrelated'}<span className="admin-cell-note">{row.session ? `Session ${row.session.slice(0, 8)}` : 'No session supplied'}</span></td>
      <td>{row.app_version || 'Unknown version'}<span className="admin-cell-note">{row.provider ? providerLabel(row.provider) : 'Unknown provider'}{row.app_build ? ` · build ${row.app_build}` : ''}</span></td>
      <td>{outcome(row)}{errorLabel(row.error_code) && row.error_code !== `http_${row.status}` && <span className="admin-cell-note">{errorLabel(row.error_code)}</span>}<span className="admin-cell-note">{row.duration_ms > 0 ? duration(row.duration_ms) : 'No duration'}</span></td>
    </tr>)}</tbody></table></div> : <Empty>No actions match these filters.</Empty>}
    <div className="admin-pagination"><span>{items.length ? `${integer.format((page - 1) * limit + 1)}–${integer.format((page - 1) * limit + items.length)} of ${integer.format(total)}` : total ? 'No events on this page' : '0 events'} · Page {integer.format(page)} of {integer.format(pages)}{pages > 10_000 && <span className="admin-cell-note">The server supports 10,000 pages. Narrow the filters to browse more events.</span>}</span><div><button className="admin-button admin-button-quiet" type="button" disabled={page <= 1 || isLoading} onClick={() => onPage(page - 1)}>Previous</button><button className="admin-button admin-button-quiet" type="button" disabled={page >= pages || page >= 10_000 || isLoading} onClick={() => onPage(page + 1)}>Next</button></div></div>
  </Panel>
}

export function AltairServer() {
  const [session, setSession] = useState<AdminSession | null>(null)
  const [password, setPassword] = useState('')
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [lockedMessage, setLockedMessage] = useState('')
  const [filters, setFilters] = useState<MetricsFilters>(() => defaultFilters())
  const [draftFilters, setDraftFilters] = useState<MetricsFilters>(() => defaultFilters())
  const [page, setPage] = useState(1)
  const [refresh, setRefresh] = useState(0)
  const [report, setReport] = useState<AdminMetrics | null>(null)
  const [error, setError] = useState('')
  const [filterError, setFilterError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const loginController = useRef<AbortController | null>(null)
  const requestController = useRef<AbortController | null>(null)
  const sessionRef = useRef<AdminSession | null>(null)
  const versionOptions = useRef<string[]>([])
  const serverUrl = import.meta.env.VITE_ALTAIR_SERVER_URL || 'https://altair.grass.build'

  useEffect(() => {
    const oldTitle = document.title
    document.title = 'Altair admin · untreu.me'
    const previousRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    const robots = previousRobots ?? document.createElement('meta')
    const previousContent = previousRobots?.content
    robots.name = 'robots'
    robots.content = 'noindex, nofollow, noarchive'
    if (!previousRobots) document.head.append(robots)
    return () => {
      document.title = oldTitle
      if (!previousRobots) robots.remove()
      else robots.content = previousContent ?? ''
      loginController.current?.abort()
      requestController.current?.abort()
      if (sessionRef.current) void logoutAdmin(serverUrl, sessionRef.current.token).catch(() => {})
    }
  }, [serverUrl])

  const lock = useCallback((message = 'Dashboard locked.') => {
    loginController.current?.abort()
    requestController.current?.abort()
    setSession(null)
    sessionRef.current = null
    setReport(null)
    setPassword('')
    setUpdatedAt(null)
    setError('')
    setIsLoading(false)
    setIsUnlocking(false)
    versionOptions.current = []
    setLockedMessage(message)
  }, [])

  useEffect(() => {
    if (!session) return
    const timeout = window.setTimeout(() => lock('Your session has expired. Unlock the dashboard again.'), Math.max(0, Date.parse(session.expiresAt) - Date.now()))
    return () => window.clearTimeout(timeout)
  }, [session, lock])

  useEffect(() => {
    if (!session) return
    const controller = new AbortController()
    requestController.current?.abort()
    requestController.current = controller
    let current = true
    setIsLoading(true)
    setError('')
    void loadMetrics(serverUrl, session.token, filters, page, controller.signal).then((data) => {
      if (!current || controller.signal.aborted) return
      const lastPage = lastMetricsPage(data.recent.total, data.recent.limit)
      if (page > lastPage) { setPage(lastPage); return }
      setReport(data)
      versionOptions.current = data.filter_options.app_versions
      setUpdatedAt(new Date())
    }).catch((failure: unknown) => {
      if (!current || controller.signal.aborted) return
      if (failure instanceof AdminRequestError && failure.kind === 'expired') lock(errorMessage(failure))
      else setError(errorMessage(failure))
    }).finally(() => { if (current && !controller.signal.aborted) setIsLoading(false) })
    return () => { current = false; controller.abort() }
  }, [session, serverUrl, filters, page, refresh, lock])

  useEffect(() => {
    if (!session) return
    let interval: number | undefined
    const updatePolling = () => {
      window.clearInterval(interval)
      if (document.visibilityState === 'visible') interval = window.setInterval(() => setRefresh((value) => value + 1), 45_000)
    }
    updatePolling()
    document.addEventListener('visibilitychange', updatePolling)
    return () => { window.clearInterval(interval); document.removeEventListener('visibilitychange', updatePolling) }
  }, [session])

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isUnlocking || !password) return
    const submittedPassword = password
    setPassword('')
    setLockedMessage('')
    setIsUnlocking(true)
    loginController.current?.abort()
    const controller = new AbortController()
    loginController.current = controller
    try {
      const nextSession = await loginAdmin(serverUrl, submittedPassword, controller.signal)
      if (controller.signal.aborted) return
      sessionRef.current = nextSession
      setSession(nextSession)
      setPage(1)
    } catch (failure) {
      if (!controller.signal.aborted) setLockedMessage(errorMessage(failure, true))
    } finally { if (!controller.signal.aborted) setIsUnlocking(false) }
  }

  async function logout() {
    const token = sessionRef.current?.token
    lock()
    if (!token) return
    try { await logoutAdmin(serverUrl, token) }
    catch { if (!sessionRef.current) setLockedMessage('Dashboard locked. The server could not confirm logout; the server session will expire automatically.') }
  }

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try { validateFilters(draftFilters) }
    catch { setFilterError('Choose a valid date range of up to 90 inclusive calendar days.'); return }
    requestController.current?.abort()
    setFilterError('')
    setReport(null)
    setUpdatedAt(null)
    setPage(1)
    setFilters({ ...draftFilters })
  }

  let configured = true
  try { adminServerUrl(serverUrl) } catch { configured = false }
  return <div className="admin-dashboard">
    <div className="admin-shell">
      <nav className="admin-breadcrumb" aria-label="Breadcrumb"><Link to="/">untreu.me</Link><span aria-hidden="true">/</span><span>Altair</span><span aria-hidden="true">/</span><span>Admin</span></nav>
      {!session ? <div className="admin-lock-screen">
        <div className="admin-login-intro"><div className="admin-eyebrow">Altair operations</div><h1>A clear view<br />of Altair.</h1><p>Follow the journey from first open to first answer, then understand how the app is used.</p><div className="admin-login-topics"><span>01 <strong>Onboarding</strong></span><span>02 <strong>Usage & actions</strong></span><span>03 <strong>Reliability</strong></span></div></div>
        <section className="admin-login-card" aria-labelledby="admin-login-title"><h2 id="admin-login-title">Unlock the dashboard</h2><p>Private, first-party action analytics.</p><form onSubmit={(event) => void unlock(event)}><label htmlFor="admin-password">Dashboard password</label><input id="admin-password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false} required disabled={isUnlocking || !configured} aria-describedby="admin-login-status admin-password-note" /><button className="admin-button admin-button-primary" disabled={isUnlocking || !password || !configured} type="submit">{isUnlocking ? 'Unlocking…' : 'Unlock dashboard'}</button></form><div id="admin-login-status" role="status" className={lockedMessage || !configured ? 'admin-status-message' : ''}>{!configured ? 'The server address is not configured for a secure connection.' : lockedMessage}</div><p id="admin-password-note" className="admin-login-note">The session stays in this tab’s memory. Reloading locks the dashboard. No message or health content is included.</p></section>
      </div> : <>
        <header className="admin-header"><div><div className="admin-eyebrow">Altair operations</div><h1>From first open<br className="admin-mobile-break" /> to everyday use.</h1><p>First-party action telemetry · Pseudonymous actors</p></div><div className="admin-header-controls"><span className="admin-live">{isLoading ? 'Refreshing…' : updatedAt ? `Updated ${clock.format(updatedAt)}` : 'Waiting for data'}</span><div><button className="admin-button admin-button-quiet" disabled={isLoading} onClick={() => setRefresh((value) => value + 1)} type="button">Refresh</button><button className="admin-button admin-button-quiet" type="button" onClick={() => void logout()}>Lock</button></div></div></header>
        <form className="admin-filters" onSubmit={applyFilters} aria-label="Metrics filters"><div><label htmlFor="admin-from">From</label><input id="admin-from" type="date" value={draftFilters.from} onChange={(event) => setDraftFilters((value) => ({ ...value, from: event.target.value }))} required /></div><div><label htmlFor="admin-to">Through</label><input id="admin-to" type="date" value={draftFilters.to} onChange={(event) => setDraftFilters((value) => ({ ...value, to: event.target.value }))} required /></div><div><label htmlFor="admin-version">App version</label><select id="admin-version" value={draftFilters.appVersion} onChange={(event) => setDraftFilters((value) => ({ ...value, appVersion: event.target.value }))}><option value="">All versions</option>{versionOptions.current.map((version) => <option key={version} value={version}>{version}</option>)}</select></div><div><label htmlFor="admin-provider">Provider</label><select id="admin-provider" value={draftFilters.provider} onChange={(event) => setDraftFilters((value) => ({ ...value, provider: event.target.value as MetricsFilters['provider'] }))}><option value="">All providers</option>{providers.map((provider) => <option key={provider} value={provider}>{providerLabel(provider)}</option>)}</select></div><button className="admin-button admin-button-primary" type="submit">Apply filters</button>{filterError && <p className="admin-filter-error" role="alert">{filterError}</p>}</form>
        <div className="admin-status-region" aria-live="polite">{error && <p className="admin-status-message">{error}</p>}</div>
        {!report ? <section className="admin-loading" aria-live="polite" aria-busy={isLoading}>{isLoading ? <><span className="admin-loading-dot" />Fetching retained action counts…</> : <><h2>Metrics are unavailable</h2><p>Refresh to request a new snapshot.</p><button className="admin-button admin-button-quiet" type="button" onClick={() => setRefresh((value) => value + 1)}>Try again</button></>}</section> : <div className="admin-results" aria-busy={isLoading}>
          <div className="admin-coverage"><div>{report.coverage.started_at ? `First retained event: ${instant.format(new Date(report.coverage.started_at))}` : 'No events recorded yet'}<span>Retained {report.coverage.raw_retention_days} days · Earlier activity unavailable</span></div><p><Source source="client" /> Reports from the app <Source source="server" /> Recorded by the server</p></div>
          <p className="admin-snapshot-window">Snapshot: {report.filters.from} through {report.filters.to} · {report.filters.app_version || 'All versions'} · {report.filters.provider ? providerLabel(report.filters.provider) : 'All providers'}</p>
          {!report.summary.events && <div className="admin-zero-state"><h2>A clean slate.</h2><p>No retained action events match this window. Counts will appear as supported app versions are used. No sample activity is shown.</p></div>}
          <div className="admin-metrics"><Metric label="Active actors" value={report.summary.actors} detail="Pseudonymous installations / fallback accounts" /><Metric label="Sessions" value={report.summary.sessions} detail="Distinct correlated session identifiers" /><Metric label="Questions submitted" value={report.summary.questions} detail="App observed" /><Metric label="Completed answers" value={report.summary.answers} detail="Server confirmed" /><Metric label="Server account requirements" value={report.summary.account_required} detail="Server required a saved account" /><Metric label="Sign-in failures" value={report.summary.auth_failures} detail="Observed failure events" /></div>
          <div className="admin-grid"><Traffic report={report} /><Funnel report={report} /><Actions report={report} /><Accounts report={report} /><Returning report={report} /><Reliability report={report} /></div>
          <Recent report={report} isLoading={isLoading} onPage={setPage} />
          <p className="admin-footer-note">Refreshes every 45 seconds while this tab is visible. Dates and times use coordinated universal time (zero offset). Coverage begins with the tracking release; no historical backfill, message text, or health content.</p>
        </div>}
      </>}
    </div>
  </div>
}
