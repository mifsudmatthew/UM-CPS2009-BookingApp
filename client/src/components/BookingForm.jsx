import { useState, useEffect } from "react";
import { Post } from "../utils/ApiFunctions";
import bookingImage from '../assets/bookingform.jpg'; 
import '../styles/bookingform.css';

function BookingForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [court, setCourt] = useState("");
  const [courts, setCourts] = useState([]);

  const showCourtSelection = date && time;

  const fetchCourts = async () => {
    const postData = { date, time };
    try {
      const response = await Post("/api/getAvailableCourts", postData);
      setCourts(response.courts);
    } catch (error) {
      console.error("Error fetching courts: ", error);
    }
  };

  useEffect(() => {
    if (date && time) {
      fetchCourts();
    }
  }, [date, time]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const booking = { date, time, court };
    console.log(booking);
    try {
      const response = await Post("/api/booking", booking);
      console.log(response);

    } catch (error) {
      console.error("Error submitting booking: ", error);
    }
  };

  return (
    <div className="booking-container">
      <img src={bookingImage} alt="Tennis court" className="booking-image" />
      <div className="booking-form">
      <div className="booking-form-title">Book a Tennis Court</div>
      <form onSubmit={handleSubmit}> 
        <div className="form-section">
          <label className="booking-form-subtitle">Pick a Time & Date</label>
          <input type="date" placeholder="Date"
            onChange={(e) => setDate(e.target.value)}/>
          <input type="time" placeholder="Time" 
            onChange={(e) => setTime(e.target.value)}/>
        </div>
        {showCourtSelection && (
          <div className="form-section">
            <label className="booking-form-subtitle">Choose a Court</label>
            <select onChange={(e) => setCourt(e.target.value)}>
              <option value="">Select a court</option>
              {courts.map((court, index) => (
                <option key={index} value={court.value}>
                  {court.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <button className="booking-button" type="submit">Proceed</button>
      </form>
    </div>
  </div>
  );
}

export default BookingForm;