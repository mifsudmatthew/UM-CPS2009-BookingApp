// reference: https://mongoosejs.com/docs/guide.html

const mongoose = require("mongoose"); // Obtaining Mongoose module
const schema = mongoose.Schema; // Obtaining Mongoose Schema

// Creating a new schema
const loginSchema = new schema({
    username: String,
    password: String
});

// Exporting created schemas to be used by database functions
const modal = mongoose.model("login",loginSchema);
module.exports = modal;
