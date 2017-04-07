'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _foodtruck = require('../controller/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// change to proper controller as needed


var router = (0, _express2.default)();

//connect to db
(0, _db2.default)(function (db) {

	//internal middleware. we destructure
	router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

	//api routes v1 (/v1)
	//2nd foodtruck is going to be a controller for the API
	router.use('/foodtruck', (0, _foodtruck2.default)({ config: _config2.default, db: db })); // change according to the right url and controller
});

exports.default = router;
//# sourceMappingURL=index.js.map