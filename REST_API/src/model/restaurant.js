import mongoose from 'mongoose';
let Schema = mongoose.Schema;

//change to appropriate schema as need be
let restaurantSchema = new Schema ({
	name: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
