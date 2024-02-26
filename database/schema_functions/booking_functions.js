const booking_schema = require("../schemas/booking_schema");

/** ------------ Removes Mongoose Generated Stuff
 */
function removeIdAndV(document) {
    const { _id, __v, ...cleanedDocument } = document;
    return cleanedDocument;
}
//===================================== Getting Future Bookings ================================================
async function getFutureBookings_Email(userID_toSearch) {
    try {
        // Get the current date and time
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        // Find bookings with userEmail from the current date and time onwards
        const bookings = removeIdAndV( await booking_schema.find({
            userID: userID_toSearch,
            date: { $gte: currentDate },
            $or: { date: currentDate, time: { $gte: currentTime } }
        }));
        
        if(bookings == [] || bookings == null){
            return { result: false, data: null, error: "No bookings where found" };
        }

        return { result: true, data: bookings, error: null };
    } catch (error_message) {
        return { result: false, data: null, error: error_message };
    }
}

async function getFutureBookings_Courts(courtID_toSearch) {
    try {
        // Get the current date and time
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        // Find bookings with userEmail from the current date and time onwards
        const bookings = removeIdAndV( await booking_schema.find({
            courtID: courtID_toSearch,
            date: { $gte: currentDate },
            $or: { date: currentDate, time: { $gte: currentTime } }
        }));
        
        if(bookings == [] || bookings == null){
            return { result: false, data: null, error: "No bookings where found" };
        }

        return { result: true, data: bookings, error: null };
    } catch (error_message) {
        return { result: false, data: null, error: error_message };
    }
}

async function getFutureBookings_User_Courts(userID_toSearch, courtID_toSearch) {
    try {
        // Get the current date and time
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        // Find bookings with userEmail from the current date and time onwards
        const bookings = removeIdAndV( await booking_schema.find({
            userID: userID_toSearch,
            courtID: courtID_toSearch,
            date: { $gte: currentDate },
            $or: { date: currentDate, time: { $gte: currentTime } }
        }));
        
        if(bookings == [] || bookings == null){
            return { result: false, data: null, error: "No bookings where found" };
        }

        return { result: true, data: bookings, error: null };
    } catch (error_message) {
        return { result: false, data: null, error: error_message };
    }
}

async function addBooking(userID_toBook, courtID_toBook, date_toBook, time_toBook, max_userBookings) {
    try{
        if(len(getFutureBookingsEmail(userID_toBook)) >= max_userBookings){
            return { result: false, data: null, error: "User has reached max bookings"};
        }
        
        courts_booked_at_date_time = removeIdAndV( await booking_schema.find({
                                                    courtID: courtID_toBook,
                                                    date: date_toBook,
                                                    $or: time_toBook }));

        if(courts_booked_at_date_time == null || courts_booked_at_date_time != []){
            return { result: false, data: null, error: "Court is already booked at this time/date"};
        }
        
        const newBooking = new booking_schema({date: date_toBook,
                                            time: time_toBook, 
                                            userID: userID_toBook,
                                            courtID: courtID_toBook 
                                            });

        // Save the new booking
        return {result: true, data:removeIdAndV( await newBooking.save()), error: null};
    }catch (error_message) {
        return {result: false, data: null, error: error_message};
    }

}

async function removeBooking(userID_toBook, courtID_toBook, date_toBook, time_toBook, max_userBookings) {
    try {
        await UserModal.findOneAndDelete({date: date_toBook,
                                            time: time_toBook, 
                                            userID: userID_toBook,
                                            courtID: courtID_toBook 
                                            });
        return {result: true, data: null, error: null };
    } catch (error) {
        return {result: false, data: null, error: error_message };
    }
}
module.exports = {
    addBooking: addBooking,
    getFutureBookings_User_Courts: getFutureBookings_User_Courts,
    getFutureBookings_Courts: getFutureBookings_Courts,
    getFutureBookings_Email: getFutureBookings_Email,
    removeBooking: removeBooking,
};