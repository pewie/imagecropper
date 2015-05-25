var express = require('express');
var router = express.Router();
var url = require('url');
var gm = require('gm').subClass({imageMagick: true});

router.get('/', function(req, res, next) {

	var query = req.body;

	var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var path = __dirname + '/../tmp/' + query.filename;
	var croppath = __dirname + '/../tmp/' + 'cropped-' + query.filename;

    console.log(query);

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
			res.json({filename: 'cropped-' + query.filename});
		});

});

module.exports = router;