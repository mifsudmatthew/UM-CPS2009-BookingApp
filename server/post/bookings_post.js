const express = require("express");
const bookingRounter = express.Router();
const server_functions = require("../server_functions");
const bookings_quieries =  require("../../database/schema_functions/booking_functions");


bookingRounter.post(
  "/getAvailableCourts",
  server_functions.authenticateToken,
  async (req, res) => {
    request = req.body;
    res.json(bookings_quieries.getAvailableCourts(request.date, request.time));
  }
);


module.exports = bookingRounter;