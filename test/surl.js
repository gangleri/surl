var fs = require('fs');
var rimraf = require('rimraf');
var test = require('tap').test;
var errors = require('../lib/errors');

if (fs.existsSync(__dirname + '/test-db')) rimraf.sync(__dirname + '/test-db');

var surl = require('../index')(__dirname + '/test-db');
var assert = require('assert');

test('make sure the test database is created', function(t) {
  t.equal(fs.existsSync(__dirname + '/test-db'), true, 'test-db should have been created.');
  t.end();
});

test('Insert first url into empty database', function(t) {
  surl.shorten('http://github.com', function(err, shortId) {
    t.equal(shortId, '0', 'Short id should be 0.');
    t.equal(err, null, 'There should be no error');
    t.end();
  });
});

test('Insert second url', function(t) {
  surl.shorten('http://google.com', function(err, shortId) {
    t.equal(shortId, '1', 'Short id should be 1.');
    t.equal(err, null, 'There should be no error');
    t.end();
  });
});

test('Test resolving using first id', function(t) {
  surl.resolve('0', function(err, url) {
    t.equal(url, 'http://github.com', '0 should resolve to http://github.com');
    t.equal(err, null, 'There should be no error');
    t.end();
  });
});

test('Attempting to shorten the same url should return existing short id', function(t) {
  surl.shorten('http://github.com', function(err, shortId) {
    t.equal(shortId, '0', 'Short id should be 0.');
    t.equal(err, null, 'There should be no error');
    t.end();
  });
});

test('Attempt to resolve a non existing short url', function(t) { 
  surl.resolve('99', function(err, url) {
    t.equal(url, null, 'Should not have returned a url');
    t.notOk(err === null, 'Should have returned an error object');
    t.ok(err instanceof errors.UnknownShortId, 'Should have returned UnknownShortId erro.');
    t.equal(err.name, 'UnknownShortId', 'Error should have name [UnknownShortId]');
    t.end();
  });
});

