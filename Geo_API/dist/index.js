'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//url schemas come from this folder

//ODM that helps us connect to mongo with ease

//express
var app = (0, _express2.default)(); //
//allows us to parse JSON from request body
//create a server

app.server = _http2.default.createServer(app);

//middleware

//parse app json
app.use(_bodyParser2.default.json({
	//limits the size of the data that can be passed in
	limit: _config2.default.bodyLimit
}));

//passport config

// api routes version 1
app.use('/v1', _routes2.default);

app.server.listen(_config2.default.port);
console.log('Started on port ' + app.server.address().port);

exports.default = app;
//# sourceMappingURL=index.js.map