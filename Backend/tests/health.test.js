const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../app');

describe('Backend Server & Health Endpoints', () => {
  let server;
  let baseUrl;

  before(async () => {
    await new Promise((resolve) => {
      server = http.createServer(app);
      server.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test('GET /healthz returns 200 with status ok and uptime', async () => {
    const res = await fetch(`${baseUrl}/healthz`);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.status, 'ok');
    assert.ok(body.timestamp, 'Timestamp should exist');
    assert.ok(typeof body.uptime === 'number', 'Uptime should be a number');
    assert.ok(body.database, 'Database status should exist');
  });

  test('GET /api/health returns 200 healthy', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.status, 'healthy');
  });

  test('GET /non-existent-route returns 404', async () => {
    const res = await fetch(`${baseUrl}/non-existent-endpoint-12345`);
    assert.strictEqual(res.status, 404);
  });
});

