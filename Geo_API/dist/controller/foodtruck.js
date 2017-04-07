'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../model/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//to be changed according the the proper model in the Model Folder
exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	//CRUD Create, Read, Update Delete

	//CREATE API ROUTE -- '/v1/foodtruck/add'
	//this route allows us to create data and post it to the database
	//change this according to the model
	api.post('/add', function (req, res) {
		var newFoodTruck = new _foodtruck2.default();
		newFoodTruck.name = req.body.name;
		newFoodTruck.foodtype = req.body.foodtype;
		newFoodTruck.avgcost = req.body.avgcost;
		newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;
		newFoodTruck.save(function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'FoodTruck saved successfully' });
		});
	});

	//READ API ROUTE -- '/v1/foodtruck/'
	//this route allows us to read data and get it from the database
	//change this according to the model
	api.get('/', function (req, res) {
		//this with the empty brackets will return all records in the db
		_foodtruck2.default.find({}, function (err, foodtrucks) {
			if (err) {
				res.send(err);
			}
			res.json(foodtrucks);
		});
	});

	//READ API ROUTE(for individual items) -- '/v1/foodtruck/:id'
	//this route allows us to read data and get it from the database
	//change this according to the model
	api.get('/:id', function (req, res) {
		//the colon tells express that id is a parameter
		//this with the "findById" method will return one record in the db
		_foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
			if (err) {
				res.send(err);
			}
			res.json(foodtruck);
		});
	});

	//UPDATE API ROUTE(for individual items) -- '/v1/foodtruck/:id'
	//this PUT route allows us to pass in an item id. it will first find the item by id, then we can change properties and reseave the data to database
	//change this according to the model
	api.put('/:id', function (req, res) {
		//first we find by item id
		_foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
			if (err) {
				res.send(err);
			}
			//we grab the foodtruck object by its name and set it = to req.body.name
			foodtruck.name = req.body.name;
			foodtruck.save(function (err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'FoodTruck info was updated' });
			});
		});
	});

	//DELETE API ROUTE -- '/v1/foodtruck/:id'
	//this DELETE(remove) route allows us to pass in an item id. and delete if from the database
	//change this according to the model
	api.delete('/:id', function (req, res) {
		_foodtruck2.default.remove({
			_id: req.params.id
		}, function (err, foodtruck) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'FoodTruck removed' });
		});
	});

	//CREATE a Review for a specific food truck API ROUTE -- '/v1/foodtruck/reviews/add:id'
	//this route allows us to create data,associate it with an id and post it to the database
	//change this according to the model
	api.post('/reviews/add/:id', function (req, res) {
		_foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
			if (err) {
				res.send(err);
			}
			var newReview = new _review2.default();

			newReview.title = req.body.title;
			newReview.text = req.body.text;
			newReview.foodtruck = foodtruck._id;
			newReview.save(function (err, review) {
				if (err) {
					res.send(err);
				}
				foodtruck.reviews.push(newReview);
				foodtruck.save(function (err) {
					if (err) {
						res.send(err);
					}
					res.json({ message: 'Food truck review saved' });
				});
			});
		});
	});
	return api;
};
//# sourceMappingURL=foodtruck.js.map