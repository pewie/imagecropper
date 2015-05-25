var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var process = require('./routes/process');
var download = require('./routes/download');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tmp', express.static(path.join(__dirname, 'tmp')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));

// Configure multer
app.post('/upload', multer({
	'dest': __dirname + '/tmp/',
	'rename': function(fieldname, filename) {
		return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
	},
	'onFileUploadStart': function(file) {
		console.log(file.originalname + ' is starting ...' + file.size);
	},
	'onFileUploadComplete': function(file, req, res) {
		var splitpath = file.path.split('/');
		file.newfilename = splitpath[splitpath.length-1];

		console.log(file.originalname + ' uploaded to  ' + file.path);

		res.send(file);
	}
}));

app.use('/', routes);
app.use('/users', users);
app.use('/upload', upload);
app.use('/process', process);
app.use('/download', download);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
