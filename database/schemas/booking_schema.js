// reference: https://mongoosejs.com/docs/guide.html

const mongoose = require("mongoose"); // Obtaining Mongoose module
const Schema = mongoose.Schema; // Obtaining Mongoose Schema

// Creating a new schema
const booking_schema = new Schema({
    date: String,
    time: Number,
    userID: String,
    courtID: String
});

// Exporting created schemas to be used by database functions
const booking_modal = mongoose.model("booking_schema",booking_schema);
module.exports = booking_modal;