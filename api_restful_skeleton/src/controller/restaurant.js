import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';  //to be changed according the the proper model in the Model Folder

export default({ config, db }) => {
	let api = Router();

	//CRUD Create, Read, Update Delete

	//CREATE API ROUTE -- '/v1/restaurant/add'
	//this route allows us to create data and post it to the database
	//change this according to the model
	api.post('/add', (req, res) => {
		let newRest = new Restaurant();
		newRest.name = req.body.name

		newRest.save(err => {
			if(err) {
				res.send(err);
			}
			res.json({ message: 'Restaurant saved successfully' });
		});
	});

	//READ API ROUTE -- '/v1/restaurant/'
	//this route allows us to read data and get it from the database
	//change this according to the model
	api.get('/', (req, res) => {
		//this with the empty brackets will return all records in the db
		Restaurant.find({}, (err, restaurants) => {
			if(err) {
				res.send(err);
			}
			res.json(restaurants);
		});
	});

	//READ API ROUTE(for individual items) -- '/v1/restaurant/:id'
	//this route allows us to read data and get it from the database
	//change this according to the model
	api.get('/:id', (req, res) => {   //the colon tells express that id is a parameter
		//this with the "findById" method will return one record in the db
		Restaurant.findById(req.params.id, (err, restaurant) => {
			if(err) {
				res.send(err);
			}
			res.json(restaurant);
		});
	});

	//UPDATE API ROUTE(for individual items) -- '/v1/restaurant/:id'
	//this PUT route allows us to pass in an item id. it will first find the item by id, then we can change properties and reseave the data to database
	//change this according to the model
	api.put('/:id', (req, res) => {
		//first we find by item id
		Restaurant.findById(req.params.id, (err, restaurant) => {
			if(err) {
				res.send(err);
			}
			//we grab the restaurant object by its name and set it = to req.body.name
			restaurant.name = req.body.name;
			restaurant.save(err => {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Restaurant info was updated' });
			});
		});
	});

	//DELETE API ROUTE -- '/v1/restaurant/:id'
	//this DELETE(remove) route allows us to pass in an item id. and delete if from the database
	//change this according to the model
	api.delete('/:id', (req, res) => {
		Restaurant.remove({
			_id: req.params.id
		}, (err, restaurant) => {
			if(err) {
				res.send(err);
			}
			res.json({ message: 'Restaurant removed' });
		});
	});
	return api;
}
