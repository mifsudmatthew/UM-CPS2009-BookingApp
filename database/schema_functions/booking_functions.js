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
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        // ---------------- Query Bookings from current date/time
        const bookings =  await booking_schema.find({   userID  : userID_toSearch,
                                                        $or:[{ date: { $gt: currentDate } },        // Dates greater than current date
                                                             { date: currentDate,                   // Dates equal to current date
                                                               time: { $gte: currentTime }}         // Times greater than or equal to current time
                                                            ]                                       // Return all bookings of dates greater then current date
                                                    });
        
        // ---------------- Validation of Query
        if(bookings == [] || bookings == null){ 
            return { result: false, data: null, error: "No bookings where found" };
        }
        // --------------------- Bookings Found (Returning Bookings List)
        return { result: true, data: bookings, error: null };

    } catch (error_message) {
        throw new Error("Failed to Connect to Database");
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
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        // ---------------- Query Bookings from current date/time
        const bookings =  await booking_schema.find({   courtID : courtID_toSearch,
                                                        $or:[{ date: { $gt: currentDate } },        // Dates greater than current date
                                                             { date: currentDate,                   // Dates equal to current date
                                                               time: { $gte: currentTime }}         // Times greater than or equal to current time
                                                            ]                                       // Return all bookings of dates greater then current date 
                                                    });
        
        // ---------------- Validation of Query
        if(bookings == [] || bookings == null){ 
            return { result: false, data: null, error: "No bookings where found" };
        }
        // --------------------- Bookings Found (Returning Bookings List)
        return { result: true, data: bookings, error: null };

    } catch (error_message) {
        throw new Error("Failed to Connect to Database");
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
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        // Find bookings with userEmail from the current date and time onwards
        const bookings =  await booking_schema.find({   userID: userID_toSearch,
                                                        $or:[{ date: { $gt: currentDate } },        // Dates greater than current date
                                                             { date: currentDate,                   // Dates equal to current date
                                                               time: { $gte: currentTime }}         // Times greater than or equal to current time
                                                        ]                                           // Return all bookings of dates greater then current date
                                                    });
        
        // ---------------- Validation of Query
        if(bookings == [] || bookings == null){ 
            return { result: false, data: null, error: "No bookings where found" };
        }

        // --------------------- Bookings Found (Returning Bookings List)
        return { result: true, data: bookings, error: null };

    } catch (error_message) {
        throw new Error("Failed to Connect to Database");
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
async function addBooking(userID_toBook, courtID_toBook, date_toBook, time_toBook, max_userBookings) {
    try{
        // --------------------- Check if the booking is more then a week in advanced
        const today = new Date(); // get current date
        const maxFutureDate = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000)); // Calculate date 7 days from now
        if (date_toBook > maxFutureDate) { // current date + 7 days
            return { result: false, data: null, error: "Cannot book more than a week in advance" };
        }
        
        // --------------------- Check if user has not reached max bookings
        if(getFutureBookings_ID(userID_toBook).length >= max_userBookings){
            return { result: false, data: null, error: "User has reached max bookings"};
        }
        
        console.log("HERE 0 ");
        
        // --------------------- Check if court has not already been booked at the date and time specified
        courts_booked_at_date_time =  await booking_schema.find({   courtID: courtID_toBook,
                                                                    date: date_toBook,
                                                                    time: time_toBook 
                                                                });
        console.log(courts_booked_at_date_time.length)
        if(courts_booked_at_date_time.length != 0){
            return { result: false, data: null, error: "Court is already booked at this time/date"};
        }

        // --------------------- Create Booking item
        const newBooking = new booking_schema({ 
                                                date: date_toBook,
                                                time: time_toBook, 
                                                userID: userID_toBook,
                                                courtID: courtID_toBook 
                                                });

        
        // --------------------- Save and return
        return {result: true, data: await newBooking.save(), error: null};

    }catch (error_message) {
        throw new Error("Failed to Connect to Database");
    }

}
/** ===================================== Remove Booking =========================
 * ------------ Remove a booking
 * you will need to specify all the values related to the booking
 */
async function removeBooking(userID_toBook, courtID_toBook, date_toBook, time_toBook) {
    try {
        await booking_schema.findOneAndDelete({ date: date_toBook,
                                                time: time_toBook, 
                                                userID: userID_toBook,
                                                courtID: courtID_toBook 
                                              });

        // --------------------- Deletion Successfull
        return {result: true, data: null, error: null };

    } catch (error) {
        throw new Error("Failed to Connect to Database");
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
        throw new Error("Failed to Connect to Database");
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
};