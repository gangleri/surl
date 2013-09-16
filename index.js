var level = require('level'),
    hooks = require('level-hooks'),
    base64 = require('./lib/base64');

var db;
var maxId;

module.exports = SUrl;

function SUrl(dbName) {
  if(!(this instanceof SUrl)) return new SUrl(dbName);

  db = level(dbName || 'surldb');
  hooks(db);

  db.hooks.pre(/^(?!.*(_maxId|https?:\/\/))/, function(change, add){
    add({type: 'put', key: '_maxId', value: maxId});
    add({type: 'put', key: change.value, value: change.key});
  });

  db.get('_maxId', {sync: true}, function(err, id){
   maxId = id||0;
  });
}

SUrl.prototype.shorten = function(url, callback) {
  db.get(url, function(err, id){
    if(err){
      if(err.name == 'NotFoundError'){
        var s = base64.encode(maxId++);
        db.put(s, url, function(err){ 
          if(err) console.log('error inserting');
          callback(null, s);
        });
      }
    } else { 
      callback(null, id);
    }
  });
}

SUrl.prototype.resolve = function(id, callback) {
  db.get(id, function(err, url){
    callback(err, url);
  });
}

