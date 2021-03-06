'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _foodtruck = require('./foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.Types.ObjectId;

//change to appropriate schema as need be
var ReviewSchema = new Schema({
	title: {
		type: String,
		required: true },
	text: String,
	foodtruck: {
		type: ObjectId, //this is where we are going to store the id of the foodtruck
		ref: _foodtruck2.default,
		required: true
	}
});

module.exports = _mongoose2.default.model('Review', ReviewSchema);
//# sourceMappingURL=review.js.map