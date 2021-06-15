/**
 * 
 * Windows 10 OS
 * Works in every browser
 * Used google chrome for testing however
 * Used visual studio as an ide
 * 
 * Michael Alexey Tuohy
 * 19517549
 * The two working links are as follows:
 *  http://localhost:8000/physiotherapist-api/physiotherapist-page
 *  and
 *  http://localhost:8000/client-api/client-page
 * 
 * This is all my code.
 * All of the html code, schema is reused from assignements
 * The only new code is in routes and app.js which is just a combination of code from assignment 05 and various documentation from express.js
 * 
 * Unfortunately i only got part c done for crud functionality for the client and physiotherapist
 * Crud funcitonality still exists for the session model but just not with an interface.
 * 
 */

// Modules
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");

// Url routes with api within
const clientRoute = require('./api/routes/client');
const physiotherapistRoute = require('./api/routes/physiotherapist');
const sessionRoute = require('./api/routes/session');

// Connnect to database
const mongoPath = 'mongodb+srv://cs230:cs230@cluster.f0xng.mongodb.net/CS230?retryWrites=true&w=majority';
mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Modules for processing data
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Header information
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requseted-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Listening for these urls
app.use('/client-api', clientRoute);
app.use('/physiotherapist-api', physiotherapistRoute);
app.use('/session-api', sessionRoute);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// More error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

// Exports to server.js to run the web app on a http server
module.exports = app;