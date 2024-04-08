import { useState, useEffect, useContext } from "react";
import { Post } from "../utils/ApiFunctions";
import bookingImage from "../assets/bookingform.jpg";
import "../styles/bookingform.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationContext from '../context/NavbarContext';
import { Navigate } from "react-router-dom";

import { useUser } from "../context/User";
import {useAuth} from "../context/Auth";

/**
 * Renders a form for booking a tennis court.
 *
 * @returns {JSX.Element} The booking form component.
 */
function BookingForm() {
  // State variables
  const [date, setDate] = useState(""); // State variable to store the selected date
  const [hour, setHour] = useState(""); // State variable to store the selected hour
  const [court, setCourt] = useState(""); // State variable to store the selected court
  const [courts, setCourts] = useState([]); // State variable to store the available courts
  // Check if the user is an admin based on token
  const {user, setUser} = useUser();
  const { token, setToken } = useAuth();
  
  if (user.admin || token === "") {
      return <Navigate to="/" replace={true} />;
  }

  // Context for notifications
  const { addSuccessfulBooking } = useContext(NotificationContext);

  // Check if court selection should be shown
  const showCourtSelection = date && hour;

  // Fetch available courts based on selected date and hour
  useEffect(() => {
    const fetchCourts = async () => {
      const postData = { date, hour };
      try { // Send a POST request to the server with the selected date and hour
        const response = await Post("/api/getAvailableCourts", postData);
        console.log(response);
        setCourts(response);
      } catch (error) { // Log an error if the request fails
        console.error("Error fetching courts: ", error);
      }
    };

    if (date && hour) {
      fetchCourts();
    }
  }, [date, hour]);

  /**
   * Handles form submission.
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!date || !hour || !court) {
      console.error("Please fill all fields");
      toast.error("Please fill all fields.");
      return;
    }
    const booking = { date, hour, court };
    try { // Send a POST request to the server with the booking data
      const response = await Post("/api/booking", booking);
      console.log(response);
      if (response.result !== true) {
        toast.error(response.error);
      } else {
        toast.success("Court Successfully Booked, Have Fun  😀");
        addSuccessfulBooking(booking); // Add the booking to the list of successful bookings
      }
    } catch (error) { // Log an error if the request fails
      console.error("Error submitting booking: ", error);
    }
  };

  // Date and time limits for input fields
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  // Start and end hours for hour selection
  const startHour = 8; // Specify the start hour
  const endHour = 19; // Specify the end hour

  // Generate an array of hours
  const hoursArray = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return hour < 10 ? `0${hour}` : `${hour}`;
  });

  /**
   * Formats a date to a string in ISO format.
   * @param {Date} date - The date to format.
   * @returns {string} The formatted date string.
   */
  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div className="booking-container">
      <ToastContainer />
      <img src={bookingImage} alt="Tennis court" className="booking-image" />
      <div className="booking-form"> {/* Form for booking a tennis court */}
        <div className="booking-form-title">Book a Tennis Court</div>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="booking-form-subtitle">Pick a Date</label>
            <input
              type="date"
              placeholder="Date"
              onChange={(e) => setDate(e.target.value)}
              min={formatDate(today)}
              max={formatDate(maxDate)}
            />
          </div>
          <div className="form-section">
            <label className="booking-form-subtitle">Choose an Hour</label>
            <select onChange={(e) => setHour(e.target.value)}>
              <option value="">Select an hour</option>
              {hoursArray.map((hour) => ( // Map through the hours array and render each hour as an option
                <option key={hour} value={hour}>
                  {hour}:00
                </option>
              ))}
            </select>
          </div>
          {showCourtSelection && ( // Show court selection only if date and hour are selected
            <div className="form-section">
              <label className="booking-form-subtitle">Choose a Court</label>
              <select onChange={(e) => setCourt(e.target.value)}>
                <option value="">Select a court</option>
                {courts.map((court, index) => (
                  <option key={index} value={court._id}>
                    {court.court_name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button className="booking-button" type="submit">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
