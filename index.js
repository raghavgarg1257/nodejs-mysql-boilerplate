"use strict";

// importing our dependencies
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import logger from "morgan";

// importing our files
import Bookshelf from "./app/db";
import router from "./app/routes";


// injecting environment variables
dotenv.config();


// initializing server requirments
const port = process.env.PORT || 3000;
const app = express();


// to log every request to the console
app.use(logger('dev'));


// set static files (css and images, etc) location
app.use(express.static('./public'));


// setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// setting up routes for our app
// we made router a function so that any instance can be passed from here
// should be defined just before starting the server
app.use('/', router(express));


// ensuring db connection and starting server
Bookshelf.knex.raw(`USE \`${process.env.DB}\` `) // this way we can be sure the db is really connected
.then( resp => {
    // start the server if only db connection is succesfull
    app.listen(port, () => console.log(`App started at: ${port}`) );
})
.catch( err => {
    // console.log(err); // uncomment it to see the actual error
    console.log('Unable to connect to the database; shutting down server');
    process.exit();
});
