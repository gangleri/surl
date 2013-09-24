var level = require('level');
var hooks = require('level-hooks');
var base64 = require('./lib/bijection')();
var isValidUrl = require('./lib/validation').isValidUrl;
var errors = require('./lib/errors');
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

  db.get('_maxId', {sync: true}, function(err, id) {
    maxId = id || 0;
  });
}
 
SUrl.prototype.shorten = function(url, cb) {
  if (isValidUrl(url)) { 
    db.get(url, function checkForExistingSortId(err, id) { 
      if (err) {
        if (err.name === 'NotFoundError') {
          var s = base64.encode(maxId++);
          db.put(s, url, function insertNewShortId(err) { 
            cb(null, s);
          });
        }
      } else { 
        cb(null, id);
      }
    });
  } else {
    cb(new errors.InValidUri('Invalid url [' + url + ']'), null); 
  }
}

SUrl.prototype.resolve = function(id, cb) {
  db.get(id, function(err, url){
    if (err) { 
      cb(new errors.UnknownShortId('No url for [' + id + ']'), null);
    } else { 
      cb(null, url);
    }
  }); 
}

