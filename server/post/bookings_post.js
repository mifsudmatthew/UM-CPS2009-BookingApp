const express = require("express");
const bookingRouter = express.Router();
const server_functions = require("../server_functions");
const bookings_queries = require("../../database/schema_functions/booking_functions");
const courts_queries = require("../../database/schema_functions/court_functions");
const user_queries = require("../../database/schema_functions/user_functions");
const { findById } = require("../../database/schemas/user_schema");

bookingRouter.post("/getAvailableCourts", async (req, res) => {
  var date = new Date(req.body.date);
  var time = parseInt(req.body.hour);
  var responseQ = await bookings_queries.getAvailableCourts(date, time);

  res.json(responseQ.data);
});

bookingRouter.post(
  "/booking",
  server_functions.authenticateToken,
  async (req, res) => {
    court = await courts_queries.retrieveCourt(req.body.court);

    email = req.user.email;
    user = await user_queries.retrieveUser(email);

    if (user.data.balance <= court.data.price) {
      return res.json({
        result: false,
        data: null,
        error: "Not enough Points in Balance",
      });
    } else {
      response = await bookings_queries.addBooking(
        req.user.id,
        req.body.court,
        court.data.price,
        new Date(req.body.date),
        parseInt(req.body.hour),
        3
      );
      if (response.result == true) {
        user_queries.updateUserBalance(email, -court.data.price);
        const user = await user_queries.retrieveUser(email);
        const userData = {
          _id: user.data._id,
          email: user.data.email,
          name: user.data.name,
          admin: user.data.admin,
          balance: user.data.balance,
        };
        const accessToken = server_functions.generateAccessToken(userData);
        server_functions.sendBookingSuccessMail(
          email,
          court.data.court_name,
          req.body.date,
          req.body.hour,
          court.data.price / (1 + req.body.players.length)
        );
        return res.json({ result: true, accessToken: accessToken });
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
      const email = req.user.email;
      const user = await user_queries.retrieveUser(email);
      const bookings = await bookings_queries.getFutureBookings_ID(
        user.data.id
      );
      if (bookings.result == true) {
        const formattedBookings = await Promise.all(
          bookings.data.map(async (booking) => {
            const court = await courts_queries.retrieveCourt(booking.courtID);
            return {
              id: booking.id,
              date: booking.date.toDateString(),
              time: booking.time,
              name: court.data.court_name,
              address: court.data.address,
              price: booking.cost,
            };
          })
        );
        res.json(formattedBookings);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error("Error fetching future bookings: ", error);
      res.status(500).json({ error: "Error fetching future bookings" });
    }
  }
);
bookingRouter.post(
  "/cancelBooking",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const email = req.user.email;
      const booking_id = req.body.booking_id;
      const bookingDetails = await bookings_queries.getBookingDetails(
        booking_id
      );
      const result = await bookings_queries.removeBooking(booking_id);
      if (result.result == true) {
        await user_queries.updateUserBalance(email, req.body.price);
        const user = await user_queries.retrieveUser(email);
        const userData = {
          _id: user.data._id,
          email: user.data.email,
          name: user.data.name,
          admin: user.data.admin,
          balance: user.data.balance,
        };
        const accessToken = server_functions.generateAccessToken(userData);
        server_functions.sendCancellationSuccessMail(
          email,
          bookingDetails.data.court_name,
          bookingDetails.data.date,
          bookingDetails.data.hour
        );

        return res.json({ result: true, accessToken: accessToken });
      } else {
        res.json({ result: false });
      }
    } catch (error) {
      console.error("Error fetching future bookings: ", error);
      res.status(500).json({ error: "Error fetching future bookings" });
    }
  }
);
module.exports = bookingRouter;
