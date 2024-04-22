// reference: https://mongoosejs.com/docs/guide.html

const mongoose = require("mongoose"); // Obtaining Mongoose module
const Schema = mongoose.Schema; // Obtaining Mongoose Schema

// Creating a new schema
const courts_schema = new Schema({
    court_name: String,
    price: Number,
    address: String,
    longitude: Number,
    latitude: Number,
    area: Number,
    type: String,
});

// Exporting created schemas to be used by database functions
const courts_modal = mongoose.model("courts_schema",courts_schema);
module.exports = courts_modal;