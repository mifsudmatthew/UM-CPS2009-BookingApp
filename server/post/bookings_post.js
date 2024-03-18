const express = require("express");
const bookingRounter = express.Router();
const server_functions = require("../server_functions");
const bookings_quieries =  require("../../database/schema_functions/booking_functions");
const courts_quieries = require("../../database/schema_functions/court_functions");

bookingRounter.post(
  "/getAvailableCourts",
  server_functions.authenticateToken,
  async (req, res) => {
    console.log(req.body);
    var date = new Date(req.body.date)
    var time = parseInt(req.body.time)
    var responseQ = await bookings_quieries.getAvailableCourts(date, time);
    console.log(responseQ)
    res.json(responseQ);
  }
);


module.exports = bookingRounter;