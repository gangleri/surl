var level = require('level')

var db = level(process.argv[2]);

var o = JSON.parse(process.argv[3]);

for(var key in o) {
	db.put(key, o[key], function(err){
	});
}
