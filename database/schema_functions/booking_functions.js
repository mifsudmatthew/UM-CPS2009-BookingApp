const booking_schema = require("../schemas/booking_schema");
/** ===================================== Query Future Bookings By Email =========================
 * ------------ Recieving all future bookings By Email
 * Takes an email 
 * Calculates the current date and time and uses them to
 * retrieve all bookings from this future date and time
 */
async function getFutureBookings_Email(userID_toSearch) {
    try {
        // ---------------- Calculate Current Date and Time
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        // ---------------- Query Bookings from current date/time
        const bookings =  await booking_schema.find({   userID  : userID_toSearch,
                                                        date    : { $gt : currentDate }, // Return all bookings of dates greater then current date
                                                        $or     : { date: currentDate,  // Return all bookings of current date but future time
                                                                    time: { $gte: currentTime } } 
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
        const bookings =  await booking_schema.find({courtID : courtID_toSearch,
                                                    date    : { $gt : currentDate }, // Return all bookings of dates greater then current date
                                                    $or     : { date: currentDate,  // Return all bookings of current date but future time
                                                                time: { $gte: currentTime } } 
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
async function getFutureBookings_EmailCourt(userID_toSearch, courtID_toSearch) {
    try {
        // ---------------- Calculate Current Date and Time
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        // Find bookings with userEmail from the current date and time onwards
        const bookings =  await booking_schema.find({   userID: userID_toSearch,
                                                        courtID: courtID_toSearch,
                                                        date    : { $gt : currentDate }, // Return all bookings of dates greater then current date
                                                        $or     : { date: currentDate,  // Return all bookings of current date but future time
                                                                    time: { $gte: currentTime } }
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
        if (new Date(date_toBook) > Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)) { // current date + 7 days
            return { result: false, data: null, error: "Cannot book more than a week in advance" };
        }

        // --------------------- Check if user has not reached max bookings
        if(len(getFutureBookingsEmail(userID_toBook)) >= max_userBookings){
            return { result: false, data: null, error: "User has reached max bookings"};
        }
        
        
        // --------------------- Check if court has not already been booked at the date and time specified
        courts_booked_at_date_time =  await booking_schema.find({   courtID: courtID_toBook,
                                                                    date: date_toBook,
                                                                    time: time_toBook 
                                                                });

        if(courts_booked_at_date_time != []){
            return { result: false, data: null, error: "Court is already booked at this time/date"};
        }

        // --------------------- Create Booking item
        const newBooking = new booking_schema({ date: date_toBook,
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
        const availableCourts = await courts_modal.find({
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
    getFutureBookings_EmailCourt    : getFutureBookings_EmailCourt,
    getFutureBookings_Courts        : getFutureBookings_Courts,
    getFutureBookings_Email         : getFutureBookings_Email,
    removeBooking                   : removeBooking,
    getAvailableCourts              : getAvailableCourts,
};