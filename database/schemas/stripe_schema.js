/**
 * @file stripe_schema.js
 * @desc Defines the schema for a stripe session
 */

const mongoose = require("mongoose"); // Obtaining Mongoose module
const Schema = mongoose.Schema; // Obtaining Mongoose Schema

// Creating a new schema
const stripe_schema = new Schema({
  sessionID: String,
  email: String,
  amount: Number,
});

// Exporting created schemas to be used by database functions
const stripe_modal = mongoose.model("stripe_schema", stripe_schema);
module.exports = stripe_modal;
