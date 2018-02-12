// BEGIN SERVER

// Required libs to include
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var fs = require('fs');
var mongoose = require('mongoose');
var app = express();
var https = require('https');
var http = require('http');
var settings = require('./settings.json');

// Set the server port for Node to listen on
var server = http.Server(app).listen(3010);

// Route to the test data API
var testData = require('./apis/test-api-controller.js');

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));

/*
Routes
*/
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/form', function (req, res) {
    res.sendFile(__dirname + '/views/form.html');
});

app.get('/getDatabase', function(req, res) {
	res.contentType("application/csv");
	res.download(__dirname + '/database.csv')	
});

// Send file for download
app.get('/:file', function(req, res, next){
  var file = req.params.file
    , path = __dirname + '/' + file;
	
	res.download(path);
});

app.post('/updateSettings', function(obj) {
	fs.writeFile(__dirname + '/settings.json', JSON.stringify(settings), function (err) {
		if (err) return console.log(err);
	});
});

app.post('/api/testData/CreateTestData', testData.CreateTestData);
app.get('/api/testData/GetTestData', testData.GetTestData);
app.delete('/api/testData/DeleteTestData/:id', testData.DeleteTestData);
app.put('/api/testData/UpdateTestData', testData.UpdateTestData);

// END SERVER








