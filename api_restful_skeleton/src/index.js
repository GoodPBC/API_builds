import http from 'http';	 //create a server
import express from 'express';  	//express
import bodyParser from 'body-parser'; 	//allows us to parse JSON from request body
import mongoose from 'mongoose'; 	//ODM that helps us connect to mongo with ease

import config from './config'; 	//
import routes from './routes';  //url schemas come from this folder

let app = express();
app.server = http.createServer(app);

//middleware

//parse app json
app.use(bodyParser.json ({
	//limits the size of the data that can be passed in
	limit: config.bodyLimit
}));

//passport config

// api routes version 1
app.use('/v1', routes);

app.server.listen(config.port);
console.log(`Started on port ${app.server.address().port}`);

export default app;
