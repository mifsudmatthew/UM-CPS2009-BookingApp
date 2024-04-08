// reference: https://mongoosejs.com/docs/guide.html

const mongoose = require("mongoose"); // Obtaining Mongoose module
const Schema = mongoose.Schema; // Obtaining Mongoose Schema

// Creating a new schema
const user_schema = new Schema({
    email: String,
    password: String,
    name: String,
    balance: Number,
    admin: { type: Boolean, default: false }
});

// Exporting created schemas to be used by database functions
const user_modal = mongoose.model("user_schema",user_schema);
module.exports = user_modal;
