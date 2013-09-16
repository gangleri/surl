var base = require('../lib/base64'),
    assert = require('assert')
    _ = require('underscore'),
    alphabet = ('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');

var i = 0;
[0,1,2,3,4,5,6,7,8,9].forEach(function(item){
  var encoded = base.encode(item);
  assert.deepEqual(encoded, i, 
    'Encoded value did not match expected.[encoded: ' + encoded + ' expected: ' + item + ']');
  i++;
});

i=10;
_.range(10, 61).forEach(function(item){
  var encoded = base.encode(item);
  assert.deepEqual(encoded, alphabet[i], 
    'Encoded value did not match expected.[encoded: ' + encoded + ' expected: ' + alphabet[i] + ']');
  i++;
});

assert.deepEqual(base.encode(62), '01', 'Expected 01, received: ' + base.encode(62));


assert.deepEqual(base.encode(100), 'C1', 'Expected C1, received: ' + base.encode(100));
assert.deepEqual(base.encode(10000), 'iB2', 'Expected iB2, received: ' + base.encode(10000));

