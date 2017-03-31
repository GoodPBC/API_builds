import mongoose from 'mongoose';
import FoodTruck from './foodtruck';
let Schema = mongoose.Schema;

//change to appropriate schema as need be
let ReviewSchema = new Schema ({
	title: {
			type: String,
			required: true, 	//makes the title required
	},
	text: String,
	foodtruck: {
		type: Schema.Types.ObjectId, 		//this is where we are going to store the id of the foodtruck
		ref: FoodTruck,
		required: true
	}
});

module.exports = mongoose.model('Review', ReviewSchema);
