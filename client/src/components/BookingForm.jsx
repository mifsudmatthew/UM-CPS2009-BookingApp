import { useState, useEffect, useContext } from "react";
import { Post } from "../utils/ApiFunctions";
import bookingImage from "../assets/bookingform.jpg";
import "../styles/bookingform.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationContext from '../context/NavbarContext';

function BookingForm() {
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [court, setCourt] = useState("");
  const [courts, setCourts] = useState([]);
  const { addSuccessfulBooking } = useContext(NotificationContext);

  
  const showCourtSelection = date && hour;

  useEffect(() => {
    const fetchCourts = async () => {
      const postData = { date, hour };
      try {
        const response = await Post("/api/getAvailableCourts", postData);
        console.log(response);
        setCourts(response);
      } catch (error) {
        console.error("Error fetching courts: ", error);
      }
    };

    if (date && hour) {
      fetchCourts();
    }
  }, [date, hour]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!date || !hour || !court) {
      console.error("Please fill all fields");
      toast.error("Please fill all fields.");
      return;
    }
    const booking = { date, hour, court };
    try {
      const response = await Post("/api/booking", booking);
      console.log(response);
      if (response.result !== true) {
        toast.error(response.error);
      } else {
        toast.success("Court Successfully Booked, Have Fun  😀")
        addSuccessfulBooking(booking);
      }
    } catch (error) {
      console.error("Error submitting booking: ", error);
    }
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const startHour = 8; // Specify the start hour
  const endHour = 19; // Specify the end hour

  const hoursArray = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return hour < 10 ? `0${hour}` : `${hour}`;
  });

  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <div className="booking-container" >
      <ToastContainer />
      <img src={bookingImage} alt="Tennis court" className="booking-image" />
      <div className="booking-form">
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
              {hoursArray.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}:00
                </option>
              ))}
            </select>
          </div>
          {showCourtSelection && (
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
