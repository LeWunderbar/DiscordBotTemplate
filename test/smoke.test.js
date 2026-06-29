const test = require('node:test');
const assert = require('node:assert/strict');

const { config } = require('../src/configurator');

test('config exposes a normalized DEVS array', () => {
  assert.ok(Array.isArray(config.DEVS));
  assert.ok(config.DEVS.length >= 0);
});
