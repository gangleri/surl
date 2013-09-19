var assert = require('assert'),
    isValidUrl = require('../lib/validation').isValidUrl;

// valid urls
assert.equal(isValidUrl(''), true, 'http url failed validation');

// invalid urls
assert.equal(isValidUrl(''), false, 'url cannot contain } character');
