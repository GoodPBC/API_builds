import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import restaurant from '../controller/restaurant'; // change to proper controller as needed


let router = express();

//connect to db
initializeDb(db => {

	//internal middleware. we destructure
	router.use(middleware({ config, db }));

	//api routes v1 (/v1)
	//2nd restaurant is going to be a controller for the API
	router.use('/restaurant', restaurant({ config, db }));  // change according to the right url and controller

});

export default router;
