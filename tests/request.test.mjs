import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/request.ts';
const valid = { service: 'mixing', name: 'Test Artist', email: 'artist@example.com', fileLink: 'https://example.com/files' };
const env = { TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: 'test-chat' };
const submit = (body, headers = {}, config = env) => onRequestPost({ request: new Request('https://tymostudio.com/api/request', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) }), env: config });
test('rejects malformed shapes before delivery', async () => {
  for (const body of [null, [], 1, 'text']) assert.equal((await submit(body)).status, 400);
});
test('rejects cross-origin requests and oversized bodies', async () => {
  assert.equal((await submit(valid, { Origin: 'https://unrelated.example' })).status, 403);
  assert.equal((await submit({ ...valid, notes: 'x'.repeat(17000) })).status, 413);
});
test('validates fields and file URL protocols', async () => {
  for (const update of [{ email: 'invalid' }, { name: '' }, { service: 'unknown' }, { fileLink: 'javascript:alert(1)' }, { fileLink: 'https://user:password@example.com' }, { notes: 'x'.repeat(2001) }]) assert.equal((await submit({ ...valid, ...update })).status, 400);
});
test('honeypot never calls the delivery service', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('must not deliver'); };
  try { assert.equal((await submit({ ...valid, website: 'spam' })).status, 200); } finally { globalThis.fetch = original; }
});
test('One-Stop permits no files and carries the package into the notification', async () => {
  const original = globalThis.fetch;
  let message;
  globalThis.fetch = async (_url, init) => { message = JSON.parse(init.body); return Response.json({ ok: true }); };
  try {
    assert.equal((await submit({ ...valid, service: 'one-stop', fileLink: '', notes: 'Friday afternoon' })).status, 200);
    assert.match(message.text, /One-Stop/); assert.match(message.text, /Friday afternoon/);
    assert.equal((await submit({ ...valid, fileLink: '' })).status, 400);
  } finally { globalThis.fetch = original; }
});
test('provider rejection and network failure return generic errors', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => Response.json({ ok: false, description: 'private provider details' }, { status: 400 });
    const res = await submit(valid); assert.equal(res.status, 502); assert.doesNotMatch(await res.text(), /private provider/);
    globalThis.fetch = async () => { throw new Error('network'); };
    assert.equal((await submit(valid)).status, 502);
    assert.equal((await submit(valid, {}, {})).status, 503);
  } finally { globalThis.fetch = original; }
});
