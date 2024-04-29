import "../styles/bookingform.css";
import "react-toastify/dist/ReactToastify.css";

import bookingImage from "../assets/bookingform.jpg";

import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";

import { Post } from "../utils/ApiFunctions";
import { useProfile } from "../context/ProfileContext";
import NotificationContext from "../context/NavbarContext";
import { getUpdatedToken } from "../utils/ApiFunctions";
/**
 * Renders a form for booking a tennis court.
 *
 * @returns {JSX.Element} The booking form component.
 */
function Booking() {
  const navigate = useNavigate();
  // State variables
  const [date, setDate] = useState(""); // State variable to store the selected date
  const [hour, setHour] = useState(""); // State variable to store the selected hour
  const [court, setCourt] = useState(""); // State variable to store the selected court
  const [courts, setCourts] = useState([]); // State variable to store the available courts
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState(null); // Add state to store button color
  const [buttonCursor, setButtonCursor] = useState("pointer"); // Add state to store button cursor
  const [players, setPlayers] = useState([]); // State variable to store the players to split the cost with
  const [playerCount, setPlayerCount] = useState(0); // State variable to store the number of players
  // Check if the user is an admin based on accessToken
  const { user, accessToken, updateToken } = useProfile();

  // Context for notifications
  const { addSuccessfulBooking } = useContext(NotificationContext);

  // Check if court selection should be shown
  const showCourtSelection = date && hour;

  // Fetch available courts based on selected date and hour
  useEffect(() => {
    const fetchCourts = async () => {
      const postData = { date, hour };
      try {
        // Send a POST request to the server with the selected date and hour
        const response = await Post("/api/getAvailableCourts", postData);
        console.log(response);
        setCourts(response);
      } catch (error) {
        // Log an error if the request fails
        console.error("Error fetching courts: ", error);
      }
    };

    if (date && hour) {
      fetchCourts();
    }
  }, [date, hour]);

  if (user.admin || accessToken === "") {
    return <Navigate to="/" replace={true} />;
  }

  /**
   * Handles form submission.
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true); // Disable the button when the form is submitted
    setButtonCursor("not-allowed"); // Change cursor to not-allowed
    setButtonColor("#CCCCCC"); // Change button color to visually indicate disabled state
    setTimeout(() => {
      setIsButtonDisabled(false);
      setButtonCursor("pointer"); // Change cursor back to pointer
      setButtonColor(null); // Re-enable the button after 2 seconds and reset color
    }, 2000);

    if (!date || !hour || !court) {
      console.error("Please fill all fields");
      toast.error("Please fill all fields.");
      return;
    }
    const booking = { date, hour, court, players };
    try {
      // Send a POST request to the server with the booking data
      const response = await Post("/api/booking", booking);
      console.log(response);
      if (response.result !== true) {
        toast.error(response.error);
      } else {
        toast.success(
          "Court successfully booked! Redirecting to bookings page."
        );
        addSuccessfulBooking(booking); // Add the booking to the list of successful bookings
        if (response.accessToken) {
          updateToken(await getUpdatedToken());
        }
        setTimeout(() => {
          navigate("/profile/bookings", { replace: true });
        }, 2000);
      }
    } catch (error) {
      // Log an error if the request fails
      console.error("Error submitting booking: ", error);
    }
  };

  const addAnotherPlayer = () => {
    // Add another player to the booking
    if (playerCount < 4) {
      // set maximum number of players to 4
      setPlayerCount(playerCount + 1);
    }
  };

  const removePlayer = () => {
    // Remove a player from the booking
    if (playerCount > 0) {
      // Check if there are players to remove
      setPlayerCount(playerCount - 1); // Decrement the player count
      setPlayers(players.slice(0, -1)); // Remove the last player from the players array
    }
  };

  /**
   * Verifies the existence of a user with the given email.
   * Sends a POST request to the server to verify the email.
   *
   * @param {string} email - The email of the user to verify.
   */
  const verifyPlayerEmail = (email) => {
    // Verify that the user of the other player exists
    // Send a POST request to the server to verify the email
    const useEffect = async () => {
      const postData = { email };
      try {
        const response = await Post("/api/verifyPlayer", postData);
        console.log(response);
        if (response.result !== true) {
          toast.error(response.error);
        }
      } catch (error) {
        console.error("Error verifying player: ", error);
      }
    };
    useEffect();
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
    <main className="booking-container">
      <img src={bookingImage} alt="Tennis court" className="booking-image" />
      <div className="booking-form">
        {/* Form for booking a tennis court */}
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
              {hoursArray.map(
                (
                  hour // Map through the hours array and render each hour as an option
                ) => (
                  <option key={hour} value={hour}>
                    {hour}:00
                  </option>
                )
              )}
            </select>
          </div>
          <div>
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
          </div>
          <div className="form-section">
            <label className="booking-form-subtitle">Add Player</label>
            <div>Do you wish to add another player?</div>
            <button onClick={removePlayer}>-</button>
            <button onClick={addAnotherPlayer}>+</button>
            <br />
            {Array.from({ length: playerCount }).map((_, i) => (
              <div key={i}>
                <label>Enter player email:</label>
                <input
                  key={i}
                  type="email"
                  placeholder="player email"
                  onChange={async (e) => {
                    const newPlayers = [...players];
                    newPlayers[i] = e.target.value;
                    setPlayers(newPlayers);
                    await verifyPlayerEmail(e.target.value);
                  }}
                />
                <br />
              </div>
            ))}
          </div>
          <button
            className="booking-button"
            type="submit"
            disabled={isButtonDisabled} // Add the disabled attribute here
            style={{
              backgroundColor: buttonColor,
              cursor: buttonCursor, // Apply dynamic cursor style
            }}
          >
            Book
          </button>
        </form>
      </div>
    </main>
  );
}

export default Booking;
