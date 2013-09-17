var fs = require('fs'),
    surl = require('../index')(__dirname + 'test-db'),
    assert = require('assert');

assert.equal(fs.existsSync(__dirname + 'test-db'), true, 'Failed to create test db');

surl.shorten('http://github.com', function(err, shortId){
  assert.deepEqual(shortId, '0', 'Expected id[0] did not match actual.');
  Test2();
});

function Test2() { 
  surl.shorten('http://google.com', function(err, shortId){
    assert.deepEqual(shortId, '1', 'Expected id[1] did not match actual.');
    Test3();
  });
}

function Test3() { 
  surl.resolve('0', function(err, url){
    assert.deepEqual(url, 'http://github.com');
    Test4();
  });
}

function Test4(){ 
  surl.shorten('http://github.com', function(err, shortId){
    assert.equal(shortId, '0', 'The same url should have generated the same shortId. Expected[0] Actual[' + shortId + ']')
  });
}

