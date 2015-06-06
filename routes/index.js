var express = require('express');
var router = express.Router();
var cropCounter = require('../modules/crop-counter');


/* GET home page. */
router.get('/', function(req, res, next) {
	var totalCrops;

	cropCounter.getCrops(function(err, data) {
		if (err) {
			totalCrops = null;
			return;
		}

		console.log('crops in index route: ' + totalCrops);

		totalCrops = data['crops'];

		res.render('index', {
			title: 'Image Cropper',
			crops: totalCrops
		});
	});

});

module.exports = router;