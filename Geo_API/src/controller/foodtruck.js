import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';  //to be changed according the the proper model in the Model Folder
import Review from '../model/review';
import bodyParser from 'body-parser';

export default({ config, db }) => {
	let api = Router();

	//CRUD Create, Read, Update Delete

	//CREATE API ROUTE -- '/v1/foodtruck/add'
	//this route allows us to create data and post it to the database
	//change this according to the model
	api.post('/add', (req, res) => {
		let newFoodTruck = new FoodTruck();
		newFoodTruck.name = req.body.name;
		newFoodTruck.foodtype = req.body.foodtype;
		newFoodTruck.avgcost = req.body.avgcost;
		newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;
		newFoodTruck.save(err => {
			if(err) {
				res.send(err);
			}
			res.json({ message: 'FoodTruck saved successfully' });
		});
	});

	//READ API ROUTE -- '/v1/foodtruck/'
	//this route allows us to read data and get it from the database
	//change this according to the model
	api.get('/', (req, res) => {
		//this with the empty brackets will return all records in the db
		FoodTruck.find({}, (err, foodtrucks) => {
			if(err) {
				res.send(err);
			}
			res.json(foodtrucks);
		});
	});

	//READ API ROUTE(for individual items) -- '/v1/foodtruck/:id'
	//this route allows us to read data and get it from the database
	//change this according to the model
	api.get('/:id', (req, res) => {   //the colon tells express that id is a parameter
		//this with the "findById" method will return one record in the db
		FoodTruck.findById(req.params.id, (err, foodtruck) => {
			if(err) {
				res.send(err);
			}
			res.json(foodtruck);
		});
	});

	//UPDATE API ROUTE(for individual items) -- '/v1/foodtruck/:id'
	//this PUT route allows us to pass in an item id. it will first find the item by id, then we can change properties and reseave the data to database
	//change this according to the model
	api.put('/:id', (req, res) => {
		//first we find by item id
		FoodTruck.findById(req.params.id, (err, foodtruck) => {
			if(err) {
				res.send(err);
			}
			//we grab the foodtruck object by its name and set it = to req.body.name
			foodtruck.name = req.body.name;
			foodtruck.save(err => {
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
	api.delete('/:id', (req, res) => {
		FoodTruck.remove({
			_id: req.params.id
		}, (err, foodtruck) => {
			if(err) {
				res.send(err);
			}
			res.json({ message: 'FoodTruck removed' });
		});
	});

	//CREATE a Review for a specific food truck API ROUTE -- '/v1/foodtruck/reviews/add:id'
	//this route allows us to create data,associate it with an id and post it to the database
	//change this according to the model
	api.post('/reviews/add/:id', (req, res) => {
		FoodTruck.findById(req.params.id, (err, foodtruck) => {
			if (err) {
				res.send(err);
			}
			let newReview = new Review();

			newReview.title = req.body.title;
			newReview.text = req.body.text;
			newReview.foodtruck = req.body._id;
			newReview.save((err, review) => {
				if(err) {
					res.send(err);
				}
				foodtruck.reviews.push(newReview);
				foodtruck.save(err => {
					if(err) {
						res.send(err);
					}
					res.json({ message: 'Review has been saved to the database' });
				});
			});
		});
	});
	return api;
}
