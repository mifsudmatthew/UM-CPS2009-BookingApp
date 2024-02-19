const path = require('path');
const express = require('express'); // npm i express
const mongoose = require('mongoose'); // npm i mongoose

const PORT = process.env.PORT || 3001;
const app = express();

let database_data = [];
app.use(express.json());

// ========================= MONGOOSE =================================
//Port Changed or updated depending on the generated port
const mongoport = "mongodb://127.0.0.1:27017/database";

const schema = require("./mongoose/database").default; // Loading the schema/Modal not yet used

mongoose.connect(mongoport)
    .then(() => {
        console.log("Mongoose Successfully Connected");
    })
    .catch(err => {
        // IF you want to see the full error remove the if statement 
        // This is here to simplyfy the error message since it can be long
        // this should only catch and cover up the error when the server doesn't connect 
        // All other errors should be outputed as normal
        if (err.name === 'MongooseServerSelectionError') {
            console.log("Mongoose Connection Error: Failed to connect to database");
        } else {
            console.log("Mongoose Connection Error:", err);
        }
    });
// Connection event handlers
mongoose.connection.on('disconnected', () => {
    console.log("Mongoose Disconnected: Lost connection to database");
});

mongoose.connection.on('close', () => {
    console.log("Mongoose Connection Closed: Database connection closed");
});

// Error event handler
mongoose.connection.on('error', err => {
    console.log("Mongoose Connection Error:", err);
    process.exit(1);
});
// ========================= MONGOOSE =================================

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, 'client/build')));


//========================================= Request Handling

// Handle GET requests to /api route
app.post("/api", (req, res) => {
    database_data.push(req.body);
    console.log(database_data);
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

// ================================ Listening

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});