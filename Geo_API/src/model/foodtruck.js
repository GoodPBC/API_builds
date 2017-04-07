import mongoose from 'mongoose';
import Review from './review';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;


//change to appropriate schema as need be
let FoodTruckSchema = new Schema ({
	name: {															//name of food truck
		type: String,
		required: true
	},
	foodtype: {															//typeof food truck
		type: String,
		required: true
	},
	avgcost: Number,
	geometry: {															//Point of food truck  to store location
		type: { type: String, default: 'Point'},
		coordinates: [Number]
	},
	reviews: [{type: ObjectId, ref: Review}]
});

module.exports = mongoose.model('FoodTruck', FoodTruckSchema);
