var express = require('express');
var router = express.Router();
// var cropCounter = require('../modules/crop-counter'); // Not posibble to install sqlite3 module on BTH server.


/* GET home page. */
router.get('/', function(req, res, next) {
	// Not posibble to install sqlite3 module on BTH server.

	// var totalCrops;

	// cropCounter.getCrops(function(err, data) {
	// 	if (err) {
	// 		totalCrops = null;
	// 		return;
	// 	}

	// 	console.log('crops in index route: ' + totalCrops);

	// 	totalCrops = data['crops'];

	// 	res.render('index', {
	// 		title: 'Image Cropper',
	// 		crops: totalCrops
	// 	});
	// });

	res.render('index', {
		title: 'Image Cropper',
		crops: '-'
	});

});

module.exports = router;