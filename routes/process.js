var express = require('express');
var router = express.Router();
var gm = require('gm').subClass({imageMagick: true});

router.post('/', function(req, res, next) {

	var data = req.body;

	// Process the image according to crop data.
	gm(data.path)
		.rotate('white', parseInt(data['rotatedeg']))
		.resize(data['scalewidth'], data['scaleheight'])
		.crop(data['cropwidth'], data['cropheight'], data['x'], data['y'])
		.write(__dirname + '/../tmp/' + 'cropped-' + data.filename, function(err) {
			if (err) { 
				console.log('Process failed');
				res.send('NOT OK');
				return false;
			}
		});

	res.send('OK');

});

module.exports = router;