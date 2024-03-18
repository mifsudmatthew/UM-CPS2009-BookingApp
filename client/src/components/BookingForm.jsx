import { useState } from "react";
import { Post } from "../utils/ApiFunctions";

import '../styles/bookingform.css';

function BookingForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [court, setCourt] = useState("");
  const [courts, setCourts] = useState([]);

  const showCourtSelection = date && time;

  const fetchCourts = async (date, time) => {
    const postData = { date, time };
    try {
      const response = await Post("/getCcourts", postData);
      setCourts(response.courts);
    } catch (error) {
      console.error("Error fetching courts: ", error);
    }
  };

  const handleDateTimeChange = (newDate, newTime) => {
    setDate(newDate);
    setTime(newTime);
    if (newDate && newTime) {
      fetchCourts(newDate, newTime);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const booking = {
      date,
      time,
      court,
    };
    console.log(booking);
    const response = await Post("/bookings", booking);
    console.log(response);
  };

  return (
    <div className="booking-form">
      <h1>Book a Tennis Court</h1>
      <div className="form-section">
        <label>Pick a Time & Date</label>
        <input type="date" placeholder="Date"
        onChange={(e) => setDate(e.target.value)}/>
        <input type="time" placeholder="Time" 
         onChange={(e) => setTime(e.target.value)}/>
      </div>
      {showCourtSelection && (
          <div className="form-section">
            <label>Choose a Court</label>
            <select onChange={(e) => setCourt(e.target.value)}>
              <option value="">Select a court</option>
                {courts.map((courtItem, index) => (
                <option key={index} value={courtItem.value}>
                  {courtItem.label}
                </option>
              ))}
            </select>
          </div>
        )}
      <button type="submit" onClick={handleSubmit}>Proceed</button>
    </div>
  );
}

export default BookingForm;
