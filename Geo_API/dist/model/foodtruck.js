'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _review = require('./review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.Types.ObjectId;

//change to appropriate schema as need be
var FoodTruckSchema = new Schema({
	name: { //name of food truck
		type: String,
		required: true
	},
	foodtype: { //typeof food truck
		type: String,
		required: true
	},
	avgcost: Number,
	geometry: { //Point of food truck  to store location
		type: { type: String, default: 'Point' },
		coordinates: [Number]
	},
	reviews: [{ type: ObjectId, ref: _review2.default }]
});

module.exports = _mongoose2.default.model('FoodTruck', FoodTruckSchema);
//# sourceMappingURL=foodtruck.js.map