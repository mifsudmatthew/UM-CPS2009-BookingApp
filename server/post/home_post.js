const express = require("express");
const home_router = express.Router();
const server_functions = require("../server_functions");
const bookings_queries = require("../../database/schema_functions/booking_functions");
const courts_queries = require("../../database/schema_functions/court_functions");
const user_queries = require("../../database/schema_functions/user_functions");

home_router.post("/getAllCourts", async (req, res) => {
    response = courts_queries.getAllCourts();
    res.json(response);
});


module.exports = home_router;