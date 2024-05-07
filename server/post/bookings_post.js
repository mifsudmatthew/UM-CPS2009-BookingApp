const express = require("express"); // Importing express
const bookingRouter = express.Router(); // Creating a router to handle requests
const server_functions = require("../server_functions"); // Importing server functions
const bookings_queries = require("../../database/schema_functions/booking_functions"); // Importing booking functions
const courts_queries = require("../../database/schema_functions/court_functions"); // Importing court functions
const user_queries = require("../../database/schema_functions/user_functions"); // Importing user functions

/**
 * @brief Route obtains all available courts for a given date and time.
 *
 * @param None
 *
 * @return {Object} The response from the server
 * - 200: Success obtaining available courts
 * - 500: Failure obtaining available courts
 */
bookingRouter.post("/getAvailableCourts", async (req, res) => {
  var date = new Date(req.body.date); // Obtaining date chosen by user
  var time = parseInt(req.body.hour); // Obtaining time chosen by user
  var responseQ = await bookings_queries.getAvailableCourts(date, time); // Getting available courts according to date and time
  if (!responseQ || responseQ.error || !responseQ.result) {
    // If there is an error
    res.status(500).json({ error: "Error fetching courts" });
  }
  res.json(responseQ.data); // Sending available courts to client
});

/**
 * @brief Route verifies if a player exists in the database.
 *
 * @param None
 *
 * @return {Object} The response from the server
 * - 200: Successful player verification
 * - 500: Failure to verify player
 */
bookingRouter.post("/verifyPlayer", async (req, res) => {
  var response = await user_queries.retrieveUser(req.body.email); // Getting user according to email
  if (!response || response.error) {
    // If there is an error
    res.status(500).json({ error: "Error fetching user" });
  }
  res.json(response); // Sending user to client
});

/** ============================================ Booking ===========================================

/**
 * @brief Route for adding a booking to the database.
 *
 * @param None
 *
 * @return {Object} The response from the server
 * - 200: Successful booking addition
 * - 500: Insufficient funds, Failed to update user balance, secondary user has insufficient funds or email does not exist
 */
bookingRouter.post(
  "/booking",
  server_functions.authenticateToken,
  async (req, res) => {
    court = await courts_queries.retrieveCourt(req.body.court); // Getting court according to ID of court chosen by user
    // ----------------------------------------------- Email
    email = req.user.email; // Obtaining email of user from token
    user = await user_queries.retrieveUser(email); // Getting user according to email of user
    // ----------------------------------------------- Secondary Users
    console.log(req.body);
    secondary_users_emails = req.body.players; // Obtaining secondary users from request
    secondary_users = []; // Initialising an array to store secondary users
    secondary_users_id = []; // Initialising an array to store secondary users' IDs
    for (const email of secondary_users_emails) {
      // Looping through secondary users
      const secondaryUser = await user_queries.retrieveUser(email); // Getting secondary user according to email
      if (secondaryUser.result == false) {
        // If secondary user does not exist
        return res.status(500).json({
          // Return error
          result: false,
          data: null,
          error: `Secondary User ${email} Does Not Exist!`,
        });
      }
      secondary_users.push(secondaryUser.data); // Add secondary user to array
      secondary_users_id.push(secondaryUser.data._id); // Add secondary user ID to array
    }
    // ----------------------------------------------- Multi User
    if (secondary_users.length > 0) {
      // If there are secondary users
      split_cost = (court.data.price / (secondary_users.length + 1)).toFixed(2); // Calculate split cost
      if (user.data.balance < split_cost) {
        // If user has insufficient funds
        return res.status(500).json({
          // Return error
          result: false,
          data: null,
          error: "Insufficient Funds",
        });
      }
      for (const sec_user of secondary_users) {
        // Loop through secondary users
        if (sec_user.balance < split_cost) {
          // If secondary user has insufficient funds
          return res.status(500).json({
            // Return error
            result: false,
            data: null,
            error: "Secondary User has Insufficient Funds",
          });
        }
      }
      // If all users have sufficient funds
      response = await bookings_queries.addBooking(
        req.user.id,
        req.body.court,
        court.data.price,
        new Date(req.body.date),
        parseInt(req.body.hour),
        3,
        secondary_users_id
      ); // Add booking to database
      if (response.result == true) {
        // If booking was successful
        result = await user_queries.updateUserBalance(email, -split_cost); // Update user balance
        if (result.result == false) {
          return res.status(500).json(result);
        }

        for (const sec_user of secondary_users) {
          // Loop through secondary users
          result = await user_queries.updateUserBalance(
            // Update secondary user balance
            sec_user.email,
            -split_cost
          );
          if (result.result == false) {
            // If update failed
            return res.status(500).json(result);
          }
        }
      }
      // If booking was successful
      server_functions.sendBookingSuccessMail(
        // Send booking success email
        email,
        court.data.court_name,
        req.body.date,
        req.body.hour,
        split_cost
      );
      return res.json(response);

      // ----------------------------------------------- Single User Invalid
    } else if (user.data.balance < court.data.price) {
      // If user has insufficient funds
      return res.status(500).json({
        // Return error
        result: false,
        data: null,
        error: "Insufficient Funds",
      });

      // ----------------------------------------------- Single User Valid
    } else {
      // If user has sufficient funds
      response = await bookings_queries.addBooking(
        // Add booking to database
        req.user.id,
        req.body.court,
        court.data.price,
        new Date(req.body.date),
        parseInt(req.body.hour),
        3,
        []
      );
      server_functions.sendBookingSuccessMail(
        // Send booking success email
        email,
        court.data.court_name,
        req.body.date,
        req.body.hour,
        court.data.price.toFixed(2)
      );

      if (response.result == true) {
        // If booking was successful
        user_queries.updateUserBalance(email, -court.data.price); // Update user balance
      }

      res.json(response); // Return response
    }
  }
);

/** ============================================ Future Bookings ====================================
/**
 * @brief Route for obtaining current bookings of a user.
 *
 * @param None
 *
 * @return {Object} The response from the server
 * - 200: Successful retrieval of future bookings
 * - 500: Failure to retrieve future bookings
 */
bookingRouter.post(
  "/getFutureBookings",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const email = req.user.email; // Obtaining email of user from token
      const user = await user_queries.retrieveUser(email); // Getting user according to email of user
      // Obtaining future bookings of user from database
      const bookings = await bookings_queries.getFutureBookings_ID(
        user.data._id
      );
      if (bookings.result == true) {
        // If bookings were successfully retrieved
        // Format bookings to send to client
        const formattedBookings = await Promise.all(
          // Loop through bookings and map each booking to a formatted booking
          bookings.data.map(async (booking) => {
            const court = await courts_queries.retrieveCourt(booking.courtID); // Get court according to booking
            return {
              // Return formatted booking
              id: booking.id,
              date: booking.date.toDateString(),
              time: booking.time,
              name: court.data.court_name,
              address: court.data.address,
              price: booking.cost / (booking.secondaryUsers.length + 1),
              secondary: booking.secondaryUsers,
            };
          })
        );
        res.json(formattedBookings); // Send formatted bookings to client
      } else {
        res.json([]); // Send empty array to client
      }
    } catch (error) {
      console.error("Error fetching future bookings: ", error);
      res.status(500).json({ error: "Error fetching future bookings" });
    }
  }
);
/** ============================================ Future Secondary Bookings ====================================
/**
 * @brief Route for obtaining current secondary bookings of a user.
 *
 * @param None
 *
 * @return {Object} The response from the server
 * - 200: Successful retrieval of future secondary bookings
 * - 500: Failure to retrieve future secondary bookings
 */
bookingRouter.post(
  "/getFutureSecondaryBookings",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const email = req.user.email; // Obtaining email of user from token
      const user = await user_queries.retrieveUser(email); // Getting user according to email of user
      const bookings = await bookings_queries.getFutureSecondaryBookingsBy_ID(
        user.data._id
      ); // Obtaining future secondary bookings of user from database
      if (bookings.result == true) {
        // If bookings were successfully retrieved
        const formattedBookings = await Promise.all(
          // Loop through bookings and map each booking to a formatted booking
          bookings.data.map(async (booking) => {
            const court = await courts_queries.retrieveCourt(booking.courtID); // Get court according to booking
            return {
              // Return formatted booking
              id: booking.id,
              date: booking.date.toDateString(),
              time: booking.time,
              name: court.data.court_name,
              address: court.data.address,
              price: booking.cost / (booking.secondaryUsers.length + 1),
              secondary: booking.secondaryUsers,
            };
          })
        );
        res.json(formattedBookings); // Send formatted secondary bookings to client
      } else {
        res.json([]); // Send empty array to client
      }
    } catch (error) {
      console.error("Error fetching future bookings: ", error);
      res.status(500).json({ error: "Error fetching future bookings" });
    }
  }
);
/** ============================================ Cancel Bookings ====================================
/**
 * @brief Route for canceling a booking.
 *
 * @param None
 *
 * @return {Object} The response from the server
 * - 200: Successful cancellation of booking
 * - 500: Failure to fetch future bookings
 */
bookingRouter.post(
  "/cancelBooking",
  server_functions.authenticateToken,
  async (req, res) => {
    try {
      const email = req.user.email; // Obtaining email of user from token
      const booking_id = req.body.booking_id; // Obtaining booking ID from request
      const bookingDetails = await bookings_queries.getBookingDetails(
        booking_id
      ); // Getting booking details according to booking ID

      const courtName = (
        await courts_queries.retrieveCourt(bookingDetails.data.courtID)
      ).data.court_name; // Getting court name according of booking

      let courtTime = bookingDetails.data.time; // Getting time of booking

      // Formatting time to send in email in 24-hour format
      if (courtTime < 10) {
        courtTime = "0" + courtTime;
      }
      const result = await bookings_queries.removeBooking(booking_id); // Removing booking from database
      if (result.result == true) {
        // If booking was successfully removed
        secondaryUsers = bookingDetails.data.secondaryUsers; // Obtaining secondary users from booking
        bookingDate = new Date(bookingDetails.data.date); // Obtaining date of booking
        year = bookingDate.getFullYear(); // Obtaining year of booking
        month = bookingDate.getMonth() + 1; // Obtaining month of booking, but adding 1 since month is 0-indexed
        day = bookingDate.getDate(); // Obtaining day of booking
        formattedDate =
          year +
          "-" +
          (month < 10 ? "0" + month : month) +
          "-" +
          (day < 10 ? "0" + day : day); // Formatting date to send in email

        // If there are secondary users
        if (secondaryUsers.length > 0) {
          split_cost = // Calculate split cost
            (bookingDetails.data.cost / (secondaryUsers.length + 1)).toFixed(2);

          await user_queries.updateUserBalance(email, split_cost); // Update user balance
          for (const sec_user of secondary_users) {
            // Loop through secondary users
            // Update secondary user balance
            await user_queries.updateUserBalance(sec_user.email, split_cost);
            // Send cancellation success email
            server_functions.sendCancellationSuccessMail(
              sec_user.email,
              courtName,
              formattedDate,
              courtTime,
              split_cost
            );
          }
          return res.json({ result: true }); // Return success
        } else {
          // If there are no secondary users
          await user_queries.updateUserBalance(email, bookingDetails.data.cost); // Update user balance
          // Send cancellation success email
          server_functions.sendCancellationSuccessMail(
            email,
            courtName,
            formattedDate,
            courtTime,
            court.data.price.toFixed(2)
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
