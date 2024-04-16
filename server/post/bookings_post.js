const express = require("express");
const bookingRounter = express.Router();
const server_functions = require("../server_functions");
const bookings_quieries = require("../../database/schema_functions/booking_functions");
const courts_quieries = require("../../database/schema_functions/court_functions");
const user_quieries = require ("../../database/schema_functions/user_functions");

bookingRounter.post("/getAvailableCourts", async (req, res) => {
  var date = new Date(req.body.date);
  var time = parseInt(req.body.hour);
  var responseQ = await bookings_quieries.getAvailableCourts(date, time);

  res.json(responseQ.data);
});

bookingRounter.post(
  "/booking",
  server_functions.authenticateToken,
  async (req, res) => {
    court = await courts_quieries.retrieveCourt(req.body.court);

    email = req.user.email;
    user = await user_quieries.retrieveUser(email);
    if(user.data.balance <= court.data.price){
      return res.json({ result: false, data: null, error: "Not enough Points in Balance" });
    }else{
      response = await bookings_quieries.addBooking(
        req.user.id,
        req.body.court,
        new Date(req.body.date),
        parseInt(req.body.hour),
        3
      );
      if(response.result == true){
        user_quieries.updateUserBalance(email, -court.data.price);
      }
      res.json(response);
    }
  }
);

bookingRounter.post("/getFutureBookings", async (req, res) => {
  email = req.user.email;
  user = await user_quieries.retrieveUser(email);
  console.log(user)
  var responseQ = await bookings_quieries.getFutureBookings_ID(user.data.id);

  res.json(responseQ.data);
});



module.exports = bookingRounter;
