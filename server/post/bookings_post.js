const express = require("express");
const bookingRouter = express.Router();
const server_functions = require("../server_functions");
const bookings_quieries = require("../../database/schema_functions/booking_functions");
const courts_quieries = require("../../database/schema_functions/court_functions");
const user_quieries = require("../../database/schema_functions/user_functions");

bookingRouter.post("/getAvailableCourts", async (req, res) => {
  var date = new Date(req.body.date);
  var time = parseInt(req.body.hour);
  var responseQ = await bookings_quieries.getAvailableCourts(date, time);

  res.json(responseQ.data);
});

bookingRouter.post(
  "/booking",
  server_functions.authenticateToken,
  async (req, res) => {
    court = await courts_quieries.retrieveCourt(req.body.court);

    email = req.user.email;
    user = await user_quieries.retrieveUser(email);
    if (user.data.balance <= court.data.price) {
      return res.json({
        result: false,
        data: null,
        error: "Not enough Points in Balance",
      });
    } else {
      response = await bookings_quieries.addBooking(
        req.user.id,
        req.body.court,
        new Date(req.body.date),
        parseInt(req.body.hour),
        3
      );
      if (response.result == true) {
        user_quieries.updateUserBalance(email, -court.data.price);
      }
      res.json(response);
    }
  }
);

bookingRouter.post(
  "/getFutureBookings",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      console.log("HERE");
      const email = req.user.email;
      const user = await user_quieries.retrieveUser(email);
      const bookings = await bookings_quieries.getFutureBookings_ID(
        user.data.id
      );

      console.log(bookings);

      const formattedBookings = await Promise.all(
        bookings.data.map(async (booking) => {
          const court = await courts_quieries.retrieveCourt(booking.courtID);
          console.log(court);
          return {
            id: booking.id,
            date: booking.date.toDateString(),
            time: booking.time,
            name: court.data.court_name,
            address: court.data.address,
            price: court.data.price,
          };
        })
      );

      res.json(formattedBookings);
    } catch (error) {
      console.error("Error fetching future bookings: ", error);
      res.status(500).json({ error: "Error fetching future bookings" });
    }
  }
);

module.exports = bookingRouter;
