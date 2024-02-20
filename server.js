require('dotenv').config(); // Allowing files to use .env configurations
const path = require('path'); // Obtaining the path module
const express = require('express'); // Obtaining express module
const mongoose = require('./database/mongoose'); // Running the database
const db = require('./database/database_functions');
db.saveTestCase()

// Defining PORT of the server to listen on, if PORT is not defined in .env then it will listen on 3001
const PORT = process.env.PORT || 3001;

// Creating an ExpressJS application, by calling the variable express as a function.
const app = express();

// Parsing incoming JSON requests and placing parsed data in req.body
app.use(express.json());

// Have Node serve static files located in the client/build directory when a matching route is requested
app.use(express.static(path.resolve(__dirname, 'client/build')));

//Request Handling
// Handle POST requests to /api route
app.route("/api")
    .post((req, res) => {
        res.json({ message: "Hello from server!" });
        console.log("Request has been received!")
    });

// All other GET requests not handled before will return our React app
app.route("*")
    .get((req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    });

// Listen on specified port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});