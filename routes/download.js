var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
	res.send("HEJ"); // Set disposition and send it.
});


router.get('/:file', function(req, res){
	var filepath = path.join(__dirname, '../tmp', req.params.file);
	console.log('Sending file to client: ' + filepath);
	res.download(filepath); // Set disposition and send it.
});

module.exports = router;