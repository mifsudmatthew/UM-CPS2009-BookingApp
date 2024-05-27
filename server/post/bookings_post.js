/**
 * @file bookings_post.js
 * @desc Defines all the routes required for booking access
 */
const express = require("express"); // Importing express
const bookingRouter = express.Router(); // Creating a router to handle requests
const sf = require("../server_functions"); // Importing server functions
const bookings_queries = require("../../database/schema_functions/booking_functions"); // Importing booking functions
const courts_queries = require("../../database/schema_functions/court_functions"); // Importing court functions
const user_queries = require("../../database/schema_functions/user_functions"); // Importing user functions

/**
 * Route obtains all available courts for a given date and time.
 * @category Back-end
 * @param None
 * @return {Object} The response from the server
 * - 200: Success obtaining available courts
 * - 500: Failure obtaining available courts
 */
bookingRouter.post(
  "/getAvailableCourts",
  sf.authenticateToken,
  async (req, res) => {
    var date = new Date(req.body.date); // Obtaining date chosen by user
    var time = parseInt(req.body.hour); // Obtaining time chosen by user
    var response = await bookings_queries.getAvailableCourts(date, time); // Getting available courts according to date and time
    if (!response.result) {
      // If there is an error
      return res.status(500).json({
        result: false,
        data: null,
        error: "Error fetching courts",
      });
    }
    // Sending available courts to client
    return res
      .status(200)
      .json({ result: true, data: response.data, error: null });
  }
);

/**
 * Route verifies if a player exists in the database.
 * @category Back-end
 * @param None
 * @return {Object} The response from the server
 * - 200: Successful player verification
 * - 500: Failure to verify player
 */
bookingRouter.post("/verifyPlayer", sf.authenticateToken, async (req, res) => {
  // Getting user according to email
  const response = await user_queries.retrieveUser(req.body.email);

  if (!response.result) {
    // If there is an error
    return res
      .status(500)
      .json({ result: false, data: null, error: "Error fetching user" });
  }
  // Sending user to client
  return res.status(200).json({ result: true, data: response, error: null });
});

/** ============================================ Booking ===========================================

/**
 * Route for adding a booking to the database.
 * @category Back-end
 * @param None
 * @return {Object} The response from the server
 * - 200: Successful booking addition
 * - 500: Insufficient funds, Failed to update user balance, secondary user has insufficient funds or email does not exist
 */
bookingRouter.post("/booking", sf.authenticateToken, async (req, res) => {
  const court = await courts_queries.retrieveCourt(req.body.court); // Getting court according to ID of court chosen by user
  // ----------------------------------------------- Email
  const email = req.user.email; // Obtaining email of user from token
  const user = await user_queries.retrieveUser(email); // Getting user according to email of user
  // ----------------------------------------------- Secondary Users
  const secondary_users_emails = req.body.players; // Obtaining secondary users from request
  const secondary_users = []; // Initialising an array to store secondary users
  const secondary_users_id = []; // Initialising an array to store secondary users' IDs
  for (const email of secondary_users_emails) {
    // Looping through secondary users
    const secondaryUser = await user_queries.retrieveUser(email); // Getting secondary user according to email
    if (!secondaryUser.result) {
      // If secondary user does not exist
      return res.status(400).json({
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
    const split_cost = (
      court.data.price /
      (secondary_users.length + 1)
    ).toFixed(2); // Calculate split cost
    if (user.data.balance < split_cost) {
      // If user has insufficient funds
      return res.status(400).json({
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
        return res.status(400).json({
          // Return error
          result: false,
          data: null,
          error: "Secondary User has Insufficient Funds",
        });
      }
    }
    // If all users have sufficient funds
    const response = await bookings_queries.addBooking(
      req.user.id,
      req.body.court,
      court.data.price,
      new Date(req.body.date),
      parseInt(req.body.hour),
      3,
      secondary_users_id
    ); // Add booking to database
    if (response.result) {
      // If booking was successful
      let result = await user_queries.updateUserBalance(email, -split_cost); // Update user balance
      if (!result.result) {
        return res.status(400).json({
          // Return error
          result: false,
          data: null,
          error: result.error,
        });
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
          return res.status(400).json({
            // Return error
            result: false,
            data: null,
            error: result.error,
          });
        }
      }
    } else {
      return res
        .status(400)
        .json({ result: false, data: null, error: response.error });
    }
    // If booking was successful
    sf.sendBookingSuccessMail(
      // Send booking success email
      email,
      court.data.court_name,
      req.body.date,
      req.body.hour,
      split_cost
    );
    return res
      .status(200)
      .json({ result: true, data: response.data, error: null });

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

    sf.sendBookingSuccessMail(
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

    // Return response
    return res
      .status(200)
      .json({ result: true, data: response.data, error: null });
  }
});

/** ============================================ Future Bookings ====================================
/**
 * Route for obtaining current bookings of a user.
 * @category Back-end
 * @param None
 * @return {Object} The response from the server
 * - 200: Successful retrieval of future bookings
 * - 500: Failure to retrieve future bookings
 */
bookingRouter.post(
  "/getFutureBookings",
  sf.authenticateToken,
  async (req, res) => {
    const email = req.user.email; // Obtaining email of user from token
    const user = await user_queries.retrieveUser(email); // Getting user according to email of user
    if (!user.result) {
      return res.status(500).json({
        result: true,
        data: [],
        error: "Error fetching future bookings",
      });
    }

    // Obtaining future bookings of user from database
    const bookings = await bookings_queries.getFutureBookings_ID(user.data._id);

    if (bookings.result == false) {
      return res.status(200).json({ result: true, data: [], error: null }); // Send empty array to client
    }

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

    return res
      .status(200)
      .json({ result: true, data: formattedBookings, error: null }); // Send formatted bookings to client
  }
);
/** ============================================ Future Secondary Bookings ====================================
/**
 * Route for obtaining current secondary bookings of a user.
 * @category Back-end
 * @param None
 * @return {Object} The response from the server
 * - 200: Successful retrieval of future secondary bookings
 * - 500: Failure to retrieve future secondary bookings
 */
bookingRouter.post(
  "/getFutureSecondaryBookings",
  sf.authenticateToken,
  async (req, res) => {
    const email = req.user.email; // Obtaining email of user from token
    const user = await user_queries.retrieveUser(email); // Getting user according to email of user
    if (!user.result) {
      return res.status(500).json({
        result: false,
        data: null,
        error: "Error fetching future bookings",
      });
    }

    const bookings = await bookings_queries.getFutureSecondaryBookingsBy_ID(
      user.data._id
    ); // Obtaining future secondary bookings of user from database

    if (!bookings.result) {
      // Send empty array to client
      return res.status(200).json({ result: true, data: [], error: null });
    }

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
    // Send formatted secondary bookings to client
    return res
      .status(200)
      .json({ result: true, data: formattedBookings, error: null });
  }
);
/** ============================================ Cancel Bookings ====================================
/**
 * Route for canceling a booking.
 * @category Back-end
 * @param None
 * @return {Object} The response from the server
 * - 200: Successful cancellation of booking
 * - 500: Failure to fetch future bookings
 */
bookingRouter.post("/cancelBooking", sf.authenticateToken, async (req, res) => {
  const email = req.user.email; // Obtaining email of user from token
  const booking_id = req.body.booking_id; // Obtaining booking ID from request

  // Getting booking details according to booking ID
  let response = await bookings_queries.getBookingDetails(booking_id);

  if (!response.result) {
    return res.status(400).json({
      result: false,
      data: null,
      error: `${response.error}`,
    });
  }

  const bookingDetails = response.data;
  const courtTime = bookingDetails.time; // Getting time of booking

  // Getting court name according of booking
  response = await courts_queries.retrieveCourt(bookingDetails.courtID);

  if (!response.result) {
    return res.status(400).json({
      result: false,
      data: null,
      error: `${response.error}`,
    });
  }

  const courtName = response.data.court_name;

  // Formatting time to send in email in 24-hour format
  if (courtTime < 10) {
    courtTime = "0" + courtTime;
  }

  // Removing booking from database
  response = await bookings_queries.removeBooking(booking_id);

  if (response.result == false) {
    return res.status(400).json({ result: false, data: null, error: null });
  }

  // If booking was successfully removed

  // Obtaining secondary users from booking
  secondaryUsers = bookingDetails.secondaryUsers;
  // Obtaining date of booking
  bookingDate = new Date(bookingDetails.date);
  // Obtaining year of booking
  year = bookingDate.getFullYear();
  // Obtaining month of booking, but adding 1 since month is 0-indexed
  month = bookingDate.getMonth() + 1;
  // Obtaining day of booking
  day = bookingDate.getDate();
  // Formatting date to send in email
  formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;

  let split_cost = bookingDetails.cost;

  // If there are secondary users
  if (secondaryUsers.length > 0) {
    // Calculate split cost
    split_cost = (bookingDetails.cost / (secondaryUsers.length + 1)).toFixed(2);

    // Loop through secondary users
    for (const sec_user of secondaryUsers) {
      // Update secondary user balance
      response = await user_queries.updateUserBalance(
        sec_user.email,
        split_cost
      );

      // Send cancellation success email
      sf.sendCancellationSuccessMail(
        sec_user.email,
        courtName,
        formattedDate,
        courtTime,
        split_cost.toFixed(2)
      );
    }
  }
  // If there are no secondary users

  // Update user balance
  response = await user_queries.updateUserBalance(email, split_cost);
  // Send cancellation success email
  sf.sendCancellationSuccessMail(
    email,
    courtName,
    formattedDate,
    courtTime,
    split_cost.toFixed(2)
  );

  // Return success
  return res.status(200).json({ result: true, data: null, error: null });
});

module.exports = bookingRouter;
