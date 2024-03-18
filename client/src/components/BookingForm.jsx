import { useState, useEffect } from "react";
import { Post } from "../utils/ApiFunctions";
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
      console.log(response);
      setCourts(response.data);
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
    <div className="booking-form">
      <h1>Book a Tennis Court</h1>
      <form onSubmit={handleSubmit}> 
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
              {courts.map((court, index) => (
                <option key={index} value={court.value}>
                  {court.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">Proceed</button>
      </form>
    </div>
  );
}

export default BookingForm;