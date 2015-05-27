// var fs = require('fs');
// var path = require('path');
// var moment = require('moment');
// var sqlite3 = require("sqlite3").verbose();

// var sqldb = path.join(__dirname, '../', 'db.sql');

// exports.log = function(image, ip) {
// 	var imgpath = path.join(__dirname, '../', 'tmp', 'cropped-' + image);
// 	var exists = fs.existsSync(sqldb);
// 	var alreadyCropped = fs.existsSync(imgpath);

// 	if (alreadyCropped) {
// 		console.log("Already cropped. Don't count.");
// 		return alreadyCropped;
// 	}

// 	if ( ! exists) {
// 		console.log('Creating DB file');
// 		db.run('CREATE TABLE crop (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, image TEXT, ip TEXT NULL)');
// 	}

// 	var db = new sqlite3.Database(sqldb);

// 	var stmt = db.prepare('INSERT INTO crop (date, image, ip) VALUES (?, ?, ?)');

// 	stmt.run(moment().format('YYYY-MM-DD HH:mm:ss'), image, ip);
// 	stmt.finalize();

// 	console.log('Crop from ip ' + ip + ' logged in database');

// 	db.close();

// 	console.log('alreadyCropped in cropcountrer: ' + alreadyCropped);

// 	return alreadyCropped;
// };

// exports.getCrops = function(callback) {
// 	var db = new sqlite3.Database(sqldb);

// 	db.get('SELECT COUNT(id) AS crops FROM crop LIMIT 1', function(err, row) {
// 		if (err) {
// 			console.log('Could not load from crop');
// 			callback(err);
// 			db.close();

// 			return;
// 		}

// 		console.log('crops in module: ' + row.crops);
// 		callback(null, {'crops': row.crops});
// 		db.close();
// 	});
// };
