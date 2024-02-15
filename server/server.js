const path = require('path');
const express = require('express'); // npm i express
const mongoose = require('mongoose'); // npm i mongoose

const PORT = process.env.PORT || 3001;
const app = express();

// ========================= MONGOOSE =================================
//Port Changed or updated depending on the generated port
const mongoport = "mongodb://127.0.0.1:27017/database"; 

const schema = require("./Mongoose/Database").default; // Loading the schema/Modal not yet used

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
        process.exit(1);
    } else {
        console.log("Mongoose Connection Error:", err);
        process.exit(1); 
    }
  });
// ========================= MONGOOSE =================================

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));


//========================================= Request Handling

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// ================================ Listening

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});