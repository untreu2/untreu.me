# Altair server dashboard

`/altair/server` is a private action-analytics dashboard for Altair. The frontend is a lazily loaded React route before the `/altair/:slug` legal routes. Vite generates `dist/altair/server/index.html` for a successful static deep link with a `noindex, nofollow, noarchive` robots tag. The page adds the same tag while mounted. Backend authentication, rather than the URL or robots tag, protects metrics.

## Local review

```sh
npm run build
npm test
npm run test:build
VITE_ALTAIR_SERVER_URL=http://127.0.0.1:7001 npm run dev -- --host 127.0.0.1
```

Open `/altair/server` and use the backend-configured dashboard password. `VITE_ALTAIR_SERVER_URL` defaults to `https://altair.grass.build`. This setting is public configuration; never put a password, digest, or token in it or another Vite environment variable. The client permits HTTPS origins and HTTP loopback origins for local review. Remote HTTP URLs, embedded credentials, paths, query strings, and fragments are rejected.

The current Node runtime can run the tests directly with built-in TypeScript stripping and `node:test`; no test or chart dependencies were added. The JSON fixture under `tests/fixtures` is synthetic test data and is never imported into the dashboard or used as a live fallback. All live numbers come from the authenticated metrics endpoint.

## API contract

The client uses the Altair backend’s `/admin` routes:

- `POST /admin/login`, JSON `{ "password": "…" }`, returns `{ "token": "…", "expiresAt": "RFC3339 UTC" }`.
- `GET /admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&app_version=…&provider=…&page=1&limit=25`, authenticated with `Authorization: Bearer …`.
- `POST /admin/logout`, with the same bearer header, revokes the token and returns 204.

Dates are inclusive UTC days with a maximum 90-day window. App version is exact; provider filters are `anonymous`, `apple.com`, or `phone`. The decoder can read `none` as an observed pre-sign-in provider for compatibility; the current backend normalizes it to an empty provider. It is not a filter. The metrics response is `schema_version: 1` and contains `coverage`, `filters`, `filter_options`, `summary`, `daily`, `funnel`, `actions`, `providers`, `errors`, `latency`, `retention`, and paginated `recent` items. The typed decoder lives in `src/lib/altairAdmin.ts`; fixed display labels live in `src/lib/altairTelemetryLabels.ts`.

Metrics are decoded into explicitly listed fields. Raw response bodies, unknown content fields, Firebase UIDs, emails, IPs, message text, and health values are never displayed. Actor/session values must be 32-character hexadecimal pseudonyms; event IDs use UUID format. Unknown action or error enum values receive a generic fixed label; unknown surface/reason strings are hidden. Error responses are classified by status without reading or logging their bodies.

## Session and request behavior

The password is sent in the login POST body and cleared from the form as submission starts. The opaque token is kept only in React/ref memory. No cookies, localStorage, sessionStorage, URL tokens, or persistent metrics cache are used. Reloading requires login again. Lock clears the token, metrics, and version options immediately and asks the backend to revoke the session. Expiry or HTTP 401 returns to the locked screen. A failed revocation is stated on the locked screen; the backend expiry remains authoritative.

Requests omit credentials and referrer, disable cache and redirects, and have a 20-second timeout. Changing applied filters, logging out, or leaving the route aborts in-flight work; stale responses cannot update the dashboard. Polling runs every 45 seconds only while the tab is visible, with manual refresh available. Pagination returns to the last valid page if retention/deletion reduces the total. Each snapshot states its applied filters so a failed refresh is distinguishable from a current result.

## Reading the numbers

- **App observed** (`source: client`) means a fixed action was reported by the app. **Server confirmed** (`source: server`) means the API recorded the operation. A client observation is not proof that its server operation succeeded.
- Questions submitted are app `question_submit` events. Completed answers are server `answer_completed` events. These are separate counters and daily chart series.
- Actors represent hashed installations where correlation headers are available, with verified-account fallback for older clients. They are not exact people. Session counts are distinct correlated session pseudonyms, not inferred session durations.
- The funnel uses actors whose first tracked open is in the selected window. That first tracked open can belong to an existing installation first seen after instrumentation. Version selects the first-open version; provider selects cohort actors with that provider’s activity in the window and preserves their pre-sign-in steps. Checkpoints can occur through different prompts and are not a mandatory ordered path. Clients without first-open telemetry are excluded from this cohort.
- Returning usage measures actor returns on exact UTC calendar days 1, 7, and 30. Return activity can use any version; immature windows remain `null` and are labeled “Not mature,” rather than shown as zero. Coverage starts with the first currently retained event and advances as old events expire; it is not a claim of tracking’s all-time start. There is no historical backfill.
- Latency comes from measured server requests. Typed handler/stream failures are shown even when streaming has already returned HTTP 200; the dashboard does not infer success from that status. Empty snapshots show zero counts, no latency value, and an explicit empty state. No live demo data is fabricated.

The companion Altair server owns ingestion allowlists, hashing, 90-day event retention, account deletion/retired installation enforcement, rate limiting, token expiry, CORS, and the password digest. Publication and backend deployment are separate approval steps; this dashboard change prepares a reviewable local build and does not publish it.
