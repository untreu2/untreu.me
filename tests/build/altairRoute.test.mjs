import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const dist = resolve('dist')
const dashboard = readFileSync(resolve(dist, 'altair/server/index.html'), 'utf8')

test('the production build emits a direct dashboard entrypoint with robots protection and valid assets', () => {
  assert.match(dashboard, /<meta name="robots" content="noindex, nofollow, noarchive"\s*\/>/)
  assert.match(dashboard, /<title>Altair server · untreu.me<\/title>/)
  const assets = [...dashboard.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)]
  assert.ok(assets.length >= 2)
  for (const [, asset] of assets) assert.ok(existsSync(resolve(dist, asset.slice(1))), asset)
  assert.equal(readFileSync(resolve(dist, 'index.html'), 'utf8').includes('name="robots"'), false)
  for (const route of ['altair/privacy', 'altair/health-privacy', 'altair/health-notice', 'altair/support', 'floyd/privacy']) {
    assert.equal(readFileSync(resolve(dist, route, 'index.html'), 'utf8').includes('name="robots"'), false)
  }
})

test('built public JavaScript excludes test passwords and synthetic timeline fixtures', () => {
  const javascript = readdirSync(resolve(dist, 'assets')).filter((file) => file.endsWith('.js')).map((file) => readFileSync(resolve(dist, 'assets', file), 'utf8')).join('\n')
  for (const fixtureOnly of ['test-only-password', '123e4567-e89b-42d3-a456-426614174000', 'person@example.invalid', 'private message content']) {
    assert.equal(javascript.includes(fixtureOnly), false)
  }
})
