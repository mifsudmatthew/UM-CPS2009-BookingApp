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
bookingRouter.post("/verifyPlayer", async (req, res) => {
  var response = await user_queries.retrieveUser(req.body.email);
  res.json(response);
});

/** ============================================ booking ===========================================
 * ------------  Add Booking
 */
bookingRouter.post(
  "/booking",
  server_functions.authenticateToken,
  async (req, res) => {
    court = await courts_queries.retrieveCourt(req.body.court);
    // ----------------------------------------------- Email
    email = req.user.email;
    user = await user_queries.retrieveUser(email);
    // ----------------------------------------------- Secondary Users
    console.log(req.body);
    secondary_users_emails = req.body.players;
    secondary_users = [];
    secondary_users_id = [];
    for (const email of secondary_users_emails) {
      const secondaryUser = await user_queries.retrieveUser(email);
      if (secondaryUser.result == false) {
        return res.json({
          result: false,
          data: null,
          error: `Secondary User ${email} Does Not Exist!`,
        });
      }
      secondary_users.push(secondaryUser.data);
      secondary_users_id.push(secondaryUser.data._id);
    }
    // ----------------------------------------------- Multi User
    if (secondary_users.length > 0) {
      split_cost = court.data.price / (secondary_users.length + 1);
      if (user.data.balance < split_cost) {
        return res.json({
          result: false,
          data: null,
          error: "Insufficient Funds",
        });
      }
      for (const sec_user of secondary_users) {
        if (sec_user.balance < split_cost) {
          return res.json({
            result: false,
            data: null,
            error: "Secondary User has Insufficient Funds",
          });
        }
      }
      response = await bookings_queries.addBooking(
        req.user.id,
        req.body.court,
        court.data.price,
        new Date(req.body.date),
        parseInt(req.body.hour),
        3,
        secondary_users_id
      );
      if (response.result == true) {
        result = await user_queries.updateUserBalance(email, -split_cost);
        if (result.result == false) {
          return res.json(result);
        }

        for (const sec_user of secondary_users) {
          result = await user_queries.updateUserBalance(
            sec_user.email,
            -split_cost
          );
          if (result.result == false) {
            return res.json(result);
          }
        }
      }
      return res.json(response);

      // ----------------------------------------------- Single User Invalid
    } else if (user.data.balance < court.data.price) {
      return res.json({
        result: false,
        data: null,
        error: "Insufficient Funds",
      });

      // ----------------------------------------------- Single User Valid
    } else {
      response = await bookings_queries.addBooking(
        req.user.id,
        req.body.court,
        court.data.price,
        new Date(req.body.date),
        parseInt(req.body.hour),
        3,
        []
      );
      server_functions.sendBookingSuccessMail(
        email,
        court.data.court_name,
        req.body.date,
        req.body.hour,
        court.data.price / (1 + req.body.players.length)
      );
      if (response.result == true) {
        user_queries.updateUserBalance(email, -court.data.price);
      }

      res.json(response);
    }
  }
);

/** ============================================ Future Bookings ====================================
 * ------------  Future Bookings
 */
bookingRouter.post(
  "/getFutureBookings",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const email = req.user.email;
      const user = await user_queries.retrieveUser(email);
      const bookings = await bookings_queries.getFutureBookings_ID(
        user.data._id
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
              secondary: booking.secondaryUsers,
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
/** ============================================ Future Secondary Bookings ====================================
 * ------------  Future Secondary Bookings
 */
bookingRouter.post(
  "/getFutureSecondaryBookings",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const email = req.user.email;
      const user = await user_queries.retrieveUser(email);
      const bookings = await bookings_queries.getFutureSecondaryBookingsBy_ID(
        user.data._id
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
              secondary: booking.secondaryUsers,
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
/** ============================================ Cancel Bookings ====================================
 * ------------  Cancel
 */
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
        secondaryUsers = bookingDetails.data.secondaryUsers;

        if (secondaryUsers.length > 0) {
          split_cost = bookingDetails.data.cost / (secondaryUsers.length + 1);
          await user_queries.updateUserBalance(email, split_cost);
          for (const sec_user of secondary_users) {
            const result2 = await user_queries.updateUserBalance(
              sec_user.email,
              split_cost
            );
          }
          return res.json({ result: true });
        } else {
          await user_queries.updateUserBalance(email, bookingDetails.data.cost);
          server_functions.sendCancellationSuccessMail(
            email,
            bookingDetails.data.court_name,
            bookingDetails.data.date,
            bookingDetails.data.hour
          );
          return res.json({ result: true });
        }
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
