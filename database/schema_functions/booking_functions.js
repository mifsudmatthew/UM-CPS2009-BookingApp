const booking_schema = require("../schemas/booking_schema");
const court_schema = require("../schemas/courts_schema")
/** ===================================== Query Future Bookings By Email =========================
 * ------------ Recieving all future bookings By Email
 * Takes an email 
 * Calculates the current date and time and uses them to
 * retrieve all bookings from this future date and time
 */
async function getFutureBookings_ID(userID_toSearch) {
    try {
        // ---------------- Calculate Current Date and Time
        currentDate = new Date();
        const currentTime = currentDate.getTime();
        currentDate.setHours(0, 0, 0, 0);
        console.log(currentDate)

        // ---------------- Query Bookings from current date/time
        const bookings =  await booking_schema.find({   
            userID  : userID_toSearch,
            $or:[{ date: { $gt: currentDate } },        // Dates greater than current date
                    { date: currentDate,                // Dates equal to current date
                    time: { $gte: currentTime }}        // Times greater than or equal to current time
                ]                                       // Return all bookings of dates greater then current date
        });
        
        // ---------------- Validation of Query
        if(bookings == [] || bookings == null){ 
            return { result: false, data: null, error: "No bookings where found" };
        }
        // --------------------- Bookings Found (Returning Bookings List)
        return { result: true, data: bookings, error: null };

    } catch (error_message) {
        throw new Error("Failed to Connect to Database: "+error_message);
    }
}
/** ===================================== Query Future Bookings By Court =========================
 * ------------ Recieving all future bookings By Court
 * Takes an Court ID
 * Calculates the current date and time and uses them to
 * retrieve all bookings from this future date and time
 */
async function getFutureBookings_Courts(courtID_toSearch) {
    try {
        // ---------------- Calculate Current Date and Time
        currentDate = new Date();
        const currentTime = currentDate.getHours();
        currentDate.setHours(0, 0, 0, 0);
        console.log(currentDate)
        // ---------------- Query Bookings from current date/time
        const bookings =  await booking_schema.find({   
            courtID : courtID_toSearch,
            $or:[{ date: { $gt: currentDate } },        // Dates greater than current date
                    { date: currentDate,                // Dates equal to current date
                    time: { $gte: currentTime }}        // Times greater than or equal to current time
                ]                                       // Return all bookings of dates greater then current date 
        });
        
        // ---------------- Validation of Query
        if(bookings.length === 0|| bookings == null){ 
            return { result: false, data: null, error: "No bookings where found" };
        }
        // --------------------- Bookings Found (Returning Bookings List)
        return { result: true, data: bookings, error: null };

    } catch (error_message) {
        throw new Error("Failed to Connect to Database: "+error_message);
    }
}

/** ===================================== Query Future Bookings By Court and Email =========================
 * ------------ Recieving all future bookings By Court and Email
 * Takes an email and courtID
 * Calculates the current date and time and uses them to
 * retrieve all bookings from this future date and time
 */
async function getFutureBookings_IDCourt(userID_toSearch, courtID_toSearch) {
    try {
        // ---------------- Calculate Current Date and Time
        currentDate = new Date();
        const currentTime = currentDate.getTime();
        currentDate.setHours(0, 0, 0, 0);
        // Find bookings with userEmail from the current date and time onwards
        const bookings =  await booking_schema.find({   
            userID: userID_toSearch,
            $or:[
                    { date: { $gt: currentDate } },         // Dates greater than current date
                    { date: currentDate,                    // Dates equal to current date
                    time: { $gte: currentTime }}            // Times greater than or equal to current time
                ]                                           // Return all bookings of dates greater then current date
        });
        
        // ---------------- Validation of Query
        if(bookings == [] || bookings == null){ 
            return { result: false, data: null, error: "No bookings where found" };
        }

        // --------------------- Bookings Found (Returning Bookings List)
        return { result: true, data: bookings, error: null };

    } catch (error_message) {
        throw new Error("Failed to Connect to Database: "+error_message);
    }
}
/** ===================================== Add a new Booking =========================
 * ------------ Add a new Booking attached to an email
 * The following checks are made
 * 1. The date of the booking is checked in order to make sure its not more then a week in advanced 
 *     (this is done first to reduce the need to query if the booking is invalid)
 * 2. The user has not already booked the max possible bookings
 * 3. The court has not already been booked at the set date and time
 */
async function addBooking(userID_toBook, courtID_toBook, cost_toBook, date_toBook, time_toBook, max_userBookings) {
    try{
        const today = new Date();
        // --------------------- Check Current Date
        
        // If the date is today, check if the time is in the past
        
        if(today.toDateString() === date_toBook.toDateString() ){
            if(today.getHours() >= time_toBook){
                return { result: false, data: null, error: "Cannot book for a past time on the current date" };
            }
        }
        
        // --------------------- Check if the booking is more then a week in advanced
        const maxFutureDate = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000)); // Calculate date 7 days from now
        if (date_toBook > maxFutureDate) { // current date + 7 days
            return { result: false, data: null, error: "Cannot book more than a week in advance" };
        }

        // --------------------- Check if user has not reached max bookings
        future_bookings = await getFutureBookings_ID(userID_toBook)
        console.log(future_bookings)
        if(future_bookings.data.length >= max_userBookings){
            return { result: false, data: null, error: "User has reached max bookings"};
        }
        
        // --------------------- Check if court has not already been booked at the date and time specified
        courts_booked_at_date_time =  await booking_schema.find({   
            courtID: courtID_toBook,
            date: date_toBook,
            time: time_toBook 
        });
        if(courts_booked_at_date_time.length != 0){
            return { result: false, data: null, error: "Court is already booked at this time/date"};
        }
        // --------------------- Create Booking item
        const newBooking = new booking_schema({ 
            date: date_toBook,
            time: time_toBook, 
            userID: userID_toBook,
            courtID: courtID_toBook,
            cost : cost_toBook
        });

        
        // --------------------- Save and return
        return {result: true, data: await newBooking.save(), error: null};

    }catch (error_message) {
        throw new Error("Failed to Connect to Database" + error_message);
    }

}
/** ===================================== Remove Booking =========================
 * ------------ Remove a booking
 * you will need to specify all the values related to the booking
 */
async function removeBooking(bookingID) {
    try {
        await booking_schema.findByIdAndDelete(bookingID);
        return { result: true, data: null, error: null };
    } catch (error) {
        throw new Error("Failed to Connect to Database: "+error_message);
    }
}

/** ===================================== Query Available Courts =========================
 * ------------ Retrieve a list of courts available at a specific date and time
 * Takes a date and time
 * Retrieves all courts that are not booked at the specified date and time
 */
async function getAvailableCourts(date_toCheck, time_toCheck) {
    try {
        
        // Find all bookings at the specified date and time
        const bookedCourts = await booking_schema.find({
            date: date_toCheck,
            time: time_toCheck
        });
        // --------------------- Extract court IDs from bookedCourts
        const bookedCourtIDs = bookedCourts.map(booking => booking.courtID);
        
        // --------------------- Find all courts that are not in bookedCourtIDs
        const availableCourts = await court_schema.find({
            _id: { $nin: bookedCourtIDs }
        });
        return { result: true, data: availableCourts, error: null };
    } catch (error_message) {
        throw new Error("Failed to Connect to Database: "+error_message);
    }
}

async function getBookedCourts(user_data) {
    try {
        // Get current date and time
        const currentDate = new Date();

        // Find all bookings for the specified user that are in the future
        const upcomingBookings = await booking_schema.find({
            user_email: user_data.email,
            date: { $gte: currentDate }
        });

        // Extract court IDs from upcomingBookings
        const upcomingCourtIDs = upcomingBookings.map(booking => booking.courtID);

        // Find all courts that are in upcomingCourtIDs
        const upcomingCourts = await court_schema.find({
            _id: { $in: upcomingCourtIDs }
        });

        return { result: true, data: upcomingCourts, error: null };
    } catch (error_message) {
        throw new Error("Failed to Connect to Database: "+error_message);
    }
}

/** ===================================== Count & Sum Bookings By Court ID =========================
 * ------------ Count the number of bookings made for a specific court.
 * Takes a courtID.
 * Retrieves the count of bookings associated with the specified courtID.
 */
async function countAndSumBookingsByCourtID(courtID_toCount) {
    try {
        const result = await booking_schema.aggregate([
            { $match: { courtID: courtID_toCount } },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }, // Count the number of bookings
                    totalCost: { $sum: "$cost" } // Sum the total cost of bookings
                }
            }
        ]);

        // Extract the count and total cost from the result
        const { count, totalCost } = result[0] || { count: 0, totalCost: 0 };

        return { result: true, data: { count, totalCost }, error: null };
    } catch (error_message) {
        throw new Error("Failed to Connect to Database: " + error_message);
    }
}

/** ===================================== Exporting ======================================================
 * ------------ Exportation of functions
 * Export the functions
 * Can rename them
 */

module.exports = {
    addBooking                      : addBooking,
    getFutureBookings_IDCourt       : getFutureBookings_IDCourt,
    getFutureBookings_Courts        : getFutureBookings_Courts,
    getFutureBookings_ID            : getFutureBookings_ID,
    removeBooking                   : removeBooking,
    getAvailableCourts              : getAvailableCourts,
    getBookedCourts                 : getBookedCourts,
    countAndSumBookingsByCourtID    : countAndSumBookingsByCourtID
};