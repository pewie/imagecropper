var express = require('express');
var router = express.Router();
var url = require('url');
var gm = require('gm').subClass({imageMagick: true});
var cropCounter = require('../modules/crop-counter');

router.get('/', function(req, res, next) {

	var query = req.body;

	var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var path = __dirname + '/../tmp/' + query.filename;
	var croppath = __dirname + '/../tmp/' + 'cropped-' + query.filename;
	var ip = req.connection.remoteAddress;

    console.log(query);

	// Log in database.
	var alreadyCropped = cropCounter.log(query.filename, ip);
	console.log('alreadyCropped: ' + alreadyCropped);

	// Process the image according to crop query.
	gm(path)
		.rotate('white', parseInt(query['rotatedeg']))
		.resize(query['scalewidth'], query['scaleheight'])
		.crop(query['cropwidth'], query['cropheight'], query['x'], query['y'])
		.noProfile() // Strip EXIF data.
		.write(croppath, function(err) {
			if (err) { 
				console.log('Process failed');
				res.send('An error occured while processing image');
				return false;
			}

			console.log('/upload: Cropping done');
			res.json({
				filename: 'cropped-' + query.filename,
				alreadyCropped: alreadyCropped
			});
		});

});

module.exports = router;