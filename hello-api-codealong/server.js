var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle');

//config app for body-parser which lets us grab data from a POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Setup server port to listen on
//uses environment variable or defaults to 3000
var port = process.env.PORT || 3000;

//cconnect to DB using mongoose
mongoose.connect('mongodb://localhost:27017/codealong');

//create express router
var router = express.Router();

//set up API routes. all will be prefixed with '/api'
app.use('/api', router);

//middleware is useful for validations, logging, stopping and starting requests
//this is a request middleware
router.use(function(req, res, next) {
	console.log('The Program is Processing');
	next();
});


//test api route
router.get('/', function(req,res) {
	res.json({message: 'Welcome to our API!'});
});

router.route('/vehicles')
	.post(function(req,res) {

		//new instance of vehicles
		var vehicle = new Vehicle();
		vehicle.make = req.body.make;
		vehicle.model = req.body.model;
		vehicle.color = req.body.color;

		vehicle.save(function() {
			if(err) {
				res.send(err);
			}
			res.json({message: 'This vehicle was successfully manufactured'});
		});
	})
	
	.get(function(){
		Vehicle.find(function(err, vehicles){
			if(err) {
				res.send(err);
			}
			res.json(vehicles);
		});
	});

router.route('/vehicle/:vehicle_id')
	.get(function(req, res) {
		Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
			if(err) {
				res.send(err);
			}
			res.json(vehicle);
		});
	});

router.route('/vehicle/make/:make')
	.get(function(req, res) {
		Vehicle.findById({make:req.params.make}, function(err, vehicle) {
			if(err) {
				res.send(err);
			}
			res.json(vehicle);
		});
	});

	router.route('/vehicle/color/:color')
		.get(function(req, res) {
			Vehicle.findById({color:req.params.make}, function(err, vehicle) {
				if(err) {
					res.send(err);
				}
				res.json(vehicle);
			});
		});


//fire up server
app.listen(port);

//server debug
console.log('server is listening on port: ' + port);
