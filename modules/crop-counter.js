var fs = require('fs');
var path = require('path');
var moment = require('moment');
var sqlite3 = require("sqlite3").verbose();

exports.log = function(image, ip) {
	var sqldb = path.join(__dirname, '../', 'db.sql');
	var exists = fs.existsSync(sqldb);

	if ( ! exists) {
		console.log('Creating DB file');
		db.run('CREATE TABLE crop (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, image TEXT, ip TEXT NULL)');
	}

	var db = new sqlite3.Database(sqldb);

	var stmt = db.prepare('INSERT INTO crop (date, image, ip) VALUES (?, ?, ?)');

	stmt.run(moment().format('YYYY-MM-DD HH:mm:ss'), image, ip);
	stmt.finalize();

	console.log('Crop from ip ' + ip + ' logged in database');

	db.close();
};
