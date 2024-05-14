/**
 * @file booking_functions.js
 * @desc Defines all the database booking functions
 */

const booking_schema = require("../schemas/booking_schema");
const court_schema = require("../schemas/courts_schema");

/**
 * Query future bookings by user ID.
 * @category Database
 * @param {string} userID_toSearch - The user ID to search for.
 * @returns {Object} An object containing the result, data, and error.
 */
async function getFutureBookings_ID(userID_toSearch) {
  try {
    // --------------------- Calculate Current Date and Time
    let currentDate = new Date();
    const currentTime = currentDate.getTime();
    currentDate.setHours(0, 0, 0, 0);

    // --------------------- Query Bookings from current date/time
    const bookings = await booking_schema.find({
      userID: userID_toSearch,
      $or: [
        { date: { $gt: currentDate } }, // Dates greater than current date
        {
          date: currentDate, // Dates equal to current date
          time: { $gte: currentTime },
        }, // Times greater than or equal to current time
      ], // Return all bookings of dates greater then current date
    });

    // --------------------- Validation of Query
    if (bookings == [] || bookings == null) {
      throw new Error("No bookings where found");
    }
    // --------------------- Bookings Found (Returning Bookings List)
    return { result: true, data: bookings, error: null };
  } catch (err) {
    console.error(`getFutureBookings_ID: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Query future secondary bookings by email.
 * @category Database
 * @param {string} email - The email to search for.
 * @returns {Object} An object containing the result, data, and error.
 */
async function getFutureSecondaryBookingsBy_ID(email) {
  try {
    // Calculate Current Date and Time
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    currentDate.setHours(0, 0, 0, 0);

    // Query Bookings from current date/time
    const bookings = await booking_schema.find({
      secondaryUsers: { $in: [email] }, // Check if the email exists in the secondaryUsers array
      $or: [
        { date: { $gt: currentDate } }, // Dates greater than current date
        {
          date: currentDate, // Dates equal to current date
          time: { $gte: currentTime },
        }, // Times greater than or equal to current time
      ], // Return all bookings with dates greater than current date
    });

    // Validation of Query
    if (!bookings || bookings.length === 0) {
      throw new Error("No bookings were found");
    }

    // Bookings Found (Returning Bookings List)
    return { result: true, data: bookings, error: null };
  } catch (err) {
    console.error(`getFutureSecondaryBookingsBy_ID: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Query future bookings by court ID.
 * @category Database
 * @param {string} courtID_toSearch - The court ID to search for.
 * @returns {Object} An object containing the result, data, and error.
 */
async function getFutureBookings_Courts(courtID_toSearch) {
  try {
    // --------------------- Calculate Current Date and Time
    currentDate = new Date();
    const currentTime = currentDate.getHours();
    currentDate.setHours(0, 0, 0, 0);
    console.log(currentDate);
    // --------------------- Query Bookings from current date/time
    const bookings = await booking_schema.find({
      courtID: courtID_toSearch,
      $or: [
        { date: { $gt: currentDate } }, // Dates greater than current date
        {
          date: currentDate, // Dates equal to current date
          time: { $gte: currentTime },
        }, // Times greater than or equal to current time
      ], // Return all bookings of dates greater then current date
    });

    // --------------------- Validation of Query
    if (bookings.length === 0 || bookings == null) {
      throw new Error("No bookings where found");
    }
    // --------------------- Bookings Found (Returning Bookings List)
    return { result: true, data: bookings, error: null };
  } catch (err) {
    console.error(`getFutureBookings_Courts: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Query future bookings by user ID and court ID.
 * @category Database
 * @param {string} userID_toSearch - The user ID to search for.
 * @param {string} courtID_toSearch - The court ID to search for.
 * @returns {Object} An object containing the result, data, and error.
 */
async function getFutureBookings_IDCourt(userID_toSearch, courtID_toSearch) {
  try {
    // --------------------- Calculate Current Date and Time
    currentDate = new Date();
    const currentTime = currentDate.getTime();
    currentDate.setHours(0, 0, 0, 0);
    // Find bookings with userEmail from the current date and time onwards
    const bookings = await booking_schema.find({
      userID: userID_toSearch,
      $or: [
        { date: { $gt: currentDate } }, // Dates greater than current date
        {
          date: currentDate, // Dates equal to current date
          time: { $gte: currentTime },
        }, // Times greater than or equal to current time
      ], // Return all bookings of dates greater then current date
    });

    // --------------------- Validation of Query
    if (bookings == [] || bookings == null) {
      throw new Error("No bookings where found");
    }

    // --------------------- Bookings Found (Returning Bookings List)
    return { result: true, data: bookings, error: null };
  } catch (err) {
    console.error(`getFutureBookings_IDCourt: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Add a new booking.
 * @category Database
 * @param {string} userID_toBook - The user ID to book for.
 * @param {string} courtID_toBook - The court ID to book.
 * @param {number} cost_toBook - The cost of the booking.
 * @param {Date} date_toBook - The date of the booking.
 * @param {number} time_toBook - The time of the booking.
 * @param {number} max_userBookings - The maximum number of bookings allowed per user.
 * @param {Array<string>} secondary_users - Array of secondary user IDs.
 * @returns {Object} An object containing the result, data, and error.
 */
async function addBooking(
  userID_toBook,
  courtID_toBook,
  cost_toBook,
  date_toBook,
  time_toBook,
  max_userBookings,
  secondary_users
) {
  try {
    const today = new Date();
    // --------------------- Check Current Date

    // If the date is today, check if the time is in the past

    if (
      today.toDateString() === date_toBook.toDateString() &&
      today.getHours() >= time_toBook
    ) {
      throw new Error("Cannot book for a past time on the current date");
    }

    // --------------------- Check if the booking is more then a week in advanced
    const maxFutureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Calculate date 7 days from now
    if (date_toBook > maxFutureDate) {
      // current date + 7 days
      throw new Error("Cannot book more than a week in advance");
    }

    // --------------------- Check if user has not reached max bookings
    future_bookings = await getFutureBookings_ID(userID_toBook);
    if (future_bookings.data.length >= max_userBookings) {
      throw new Error("User has reached max bookings");
    }

    // --------------------- Check if court has not already been booked at the date and time specified
    courts_booked_at_date_time = await booking_schema.find({
      courtID: courtID_toBook,
      date: date_toBook,
      time: time_toBook,
    });
    if (courts_booked_at_date_time.length != 0) {
      throw new Error("Court is already booked at this time/date");
    }
    // --------------------- Create Booking item
    const newBooking = new booking_schema({
      date: date_toBook,
      time: time_toBook,
      userID: userID_toBook,
      courtID: courtID_toBook,
      cost: cost_toBook,
      secondaryUsers: secondary_users,
    });

    // --------------------- Save and return
    return { result: true, data: await newBooking.save(), error: null };
  } catch (err) {
    console.error(`addBooking: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Remove a booking.
 * @category Database
 * @param {string} bookingID - The ID of the booking to be removed.
 * @returns {Object} An object containing the result, data, and error.
 */
async function removeBooking(bookingID) {
  try {
    await booking_schema.findByIdAndDelete(bookingID);
    return { result: true, data: null, error: null };
  } catch (err) {
    console.error(`removeBooking: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Get booking details.
 * @category Database
 * @param {string} bookingID - The ID of the booking to retrieve details for.
 * @returns {Object} An object containing the result, data, and error.
 */
async function getBookingDetails(bookingID) {
  try {
    const details = await booking_schema.findById(bookingID);
    return { result: true, data: details, error: null };
  } catch (err) {
    console.error(`getBookingDetails: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Retrieve a list of courts available at a specific date and time.
 * @category Database
 * @param {Date} date_toCheck - The date to check for available courts.
 * @param {number} time_toCheck - The time to check for available courts.
 * @returns {Object} An object containing the result, data, and error.
 */
async function getAvailableCourts(date_toCheck, time_toCheck) {
  try {
    // Find all bookings at the specified date and time
    const bookedCourts = await booking_schema.find({
      date: date_toCheck,
      time: time_toCheck,
    });
    // --------------------- Extract court IDs from bookedCourts
    const bookedCourtIDs = bookedCourts.map((booking) => booking.courtID);

    // --------------------- Find all courts that are not in bookedCourtIDs
    const availableCourts = await court_schema.find({
      _id: { $nin: bookedCourtIDs },
    });
    return { result: true, data: availableCourts, error: null };
  } catch (err) {
    console.error(`getAvailableCourts: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Retrieve a list of courts booked by a user.
 * @category Database
 * @param {Object} user_data - User data containing email information.
 * @returns {Object} An object containing the result, data, and error.
 */
async function getBookedCourts(user_data) {
  try {
    // Get current date and time
    const currentDate = new Date();

    // Find all bookings for the specified user that are in the future
    const upcomingBookings = await booking_schema.find({
      user_email: user_data.email,
      date: { $gte: currentDate },
    });

    // Extract court IDs from upcomingBookings
    const upcomingCourtIDs = upcomingBookings.map((booking) => booking.courtID);

    // Find all courts that are in upcomingCourtIDs
    const upcomingCourts = await court_schema.find({
      _id: { $in: upcomingCourtIDs },
    });

    return { result: true, data: upcomingCourts, error: null };
  } catch (err) {
    console.error(`getBookedCourts: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Count the number of bookings made for a specific court.
 * @category Database
 * @param {string} courtID_toCount - The ID of the court to count bookings for.
 * @returns {Object} An object containing the result, data, and error.
 */
async function countAndSumBookingsByCourtID(courtID_toCount) {
  try {
    const bookings = await booking_schema.find({ courtID: courtID_toCount });

    const count = bookings.length;
    const totalCost = bookings.reduce((acc, booking) => acc + booking.cost, 0);

    return { result: true, data: { count, totalCost }, error: null };
  } catch (err) {
    console.error(`countAndSumBookingsByCourtID: ${err}`);
    return { result: false, data: null, error: `${err}` };
  }
}

/**
 * Exported functions for booking queries.
 */
module.exports = {
  addBooking: addBooking,
  getFutureBookings_IDCourt: getFutureBookings_IDCourt,
  getFutureBookings_Courts: getFutureBookings_Courts,
  getFutureBookings_ID: getFutureBookings_ID,
  removeBooking: removeBooking,
  getAvailableCourts: getAvailableCourts,
  getBookedCourts: getBookedCourts,
  countAndSumBookingsByCourtID: countAndSumBookingsByCourtID,
  getBookingDetails: getBookingDetails,
  getFutureSecondaryBookingsBy_ID: getFutureSecondaryBookingsBy_ID,
};
