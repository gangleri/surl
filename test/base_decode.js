var base = require('../lib/base64'),
    assert = require('assert');

assert.deepEqual(base.decode('0'), 0);
assert.deepEqual(base.decode('a'), 10);
assert.deepEqual(base.decode('A'), 36);
assert.deepEqual(base.decode('Z'), 61);
