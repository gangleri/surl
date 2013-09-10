var level = require('level')

var db = level(process.argv[2])
for(var i =0; i < 100; i++) {
	(function(key){
	db.get(key, function(err, value) {
		if(err && err.name == 'NotFoundError') return;
		console.log(key + '=' + value);
	}); 
	}('gibberish'+i));
}
