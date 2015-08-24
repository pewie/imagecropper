var fs = require('fs');
var path = require('path');
var moment = require('moment');
var sqlite3 = require("sqlite3").verbose();

var sqldb = path.join(__dirname, '../', 'db.sql');

exports.log = function(image, ip) {
	var imgpath = path.join(__dirname, '../', 'tmp', 'cropped-' + image);
	var alreadyCropped = fs.existsSync(imgpath);

	if (alreadyCropped) {
		console.log("Already cropped. Don't count.");
		return alreadyCropped;
	}

	initialize_db();

	var db = new sqlite3.Database(sqldb);

	var stmt = db.prepare('INSERT INTO crop (date, image, ip) VALUES (?, ?, ?)');

	stmt.run(moment().format('YYYY-MM-DD HH:mm:ss'), image, ip);
	stmt.finalize();

	console.log('Crop from ip ' + ip + ' logged in database');

	db.close();

	console.log('alreadyCropped in cropcountrer: ' + alreadyCropped);

	return alreadyCropped;
};

exports.getCrops = function(callback) {
	initialize_db(function(err) {

		if (err) {
			callback(null, {'crops': 0});
		} else {		
			var db = new sqlite3.Database(sqldb);

			db.get('SELECT COUNT(id) AS crops FROM crop LIMIT 1', function(err, row) {
				if (err) {
					console.log('Could not load from crop');
					callback(err);
					db.close();

					return;
				}

				console.log('crops in module: ' + row.crops);
				callback(null, {'crops': row.crops});
				db.close();
			});
		}	
	});

};


var initialize_db = function(callback) {
	var db_exists = fs.existsSync(sqldb);

	if ( ! db_exists) {
		console.log('Creating DB file');

		var db = new sqlite3.Database(sqldb);
		db.run('CREATE TABLE crop (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, image TEXT, ip TEXT NULL)', [], callback);
		return;
	}

	callback(null);
}