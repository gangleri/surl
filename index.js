var level = require('level');
var hooks = require('level-hooks');
var base64 = require('./lib/bijection')();
var isValidUrl = require('./lib/validation').isValidUrl;
var db;
var maxId;

module.exports = SUrl;

function SUrl(dbName) {
  if (!(this instanceof SUrl)) return new SUrl(dbName);

  db = level(dbName || 'surldb');
  hooks(db);

  db.hooks.pre(/\d+/, function regPreHooks(change, add) {
    add({type: 'put', key: '_maxId', value: maxId});
    add({type: 'put', key: change.value, value: change.key});
  });

  db.get('_maxId', {sync: true}, function(err, id){
    maxId = id || 0;
  });
}
 
SUrl.prototype.shorten = function(url, cb) {
  db.get(url, function checkForExistingSortId(err, id) { 
    if (err) {
      if (err.name === 'NotFoundError') {
        var s = base64.encode(maxId++);
        db.put(s, url, function insertNewShortId(err) { 
          cb(err, s);
        });
      }
    } else { 
      cb(null, id);
    }
  });
}

SUrl.prototype.resolve = function(id, cb) {
  db.get(id, cb); 
}

