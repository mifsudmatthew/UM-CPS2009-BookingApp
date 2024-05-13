import "../styles/bookingform.css";

import bookingImage from "../assets/bookingform.webp";

import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";

import ProfileContext from "../context/ProfileContext";
import NotificationContext from "../context/NotificationContext";

import { Post, getUpdatedToken } from "../utils/ApiFunctions";
/**
 * Renders a form for booking a tennis court.
 *
 * @returns {JSX.Element} The booking form component.
 */
function Booking() {
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook
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
  const { user, accessToken, updateToken } = useContext(ProfileContext); // Get the user, accessToken, and updateToken function from the ProfileContext.
  const { storeNotification } = useContext(NotificationContext); // Get the storeNotification function from the NotificationContext.

  // Check if court selection should be shown
  const showCourtSelection = date && hour;

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Fetch available courts based on selected date and hour
  useEffect(() => {
    // Function to fetch available courts
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
      // Fetch courts only if date and hour are selected
      fetchCourts();
    }
  }, [date, hour]);

  // Redirect the user to the home page if they are an admin or not logged in
  if (user.admin || accessToken === "") {
    return <Navigate to="/" replace={true} />;
  }

  /**
   * Handles form submission.
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setIsButtonDisabled(true); // Disable the button when the form is submitted
    setButtonCursor("not-allowed"); // Change cursor to not-allowed
    setButtonColor("#CCCCCC"); // Change button color to visually indicate disabled state
    setTimeout(() => {
      // Reset button state after 2 seconds
      setIsButtonDisabled(false); // Re-enable the button
      setButtonCursor("pointer"); // Change cursor back to pointer
      setButtonColor(null); // Reset button color
    }, 2000);

    // Check if the date, hour, and court are selected
    if (!date || !hour || !court) {
      console.error("Please fill all fields");
      toast.error("Please fill all fields.");
      return;
    }

    let uniqueEmails = []; // Array to store unique emails

    // Check if player emails are valid
    for (let i = 0; i < players.length; i++) {
      // Loop through the players array
      if (
        (!players[i] || !players[i].trim()) && // Check if the player email is empty
        players.length > 0 // Check if there are players
      ) {
        toast.error(`Please fill all fields`);
        return;
      } else if (!emailRegex.test(players[i])) {
        // Check if the player email is valid
        toast.error(`Invalid email format detected: ${players[i]}`);
        return;
      } else if (players[i] === user.email) {
        // Check if the player email is the same as the user's email
        toast.error(`You cannot add yourself as a player`);
        return;
      } else if (uniqueEmails.includes(players[i])) {
        // Check if the player email is already added
        toast.error(`Duplicate player email detected: ${players[i]}`);
        return;
      } else {
        uniqueEmails.push(players[i]); // Add email to uniqueEmails array
      }
    }

    const booking = { date, hour, court, players }; // Create a booking object with the date, hour, court, and players

    // Call the Post function with the URL and data
    try {
      // Send a POST request to the server with the booking data
      const response = await Post("/api/booking", booking);

      // Display a success or error message based on the response
      if (response.result !== true) {
        toast.error(response.error);
      } else {
        toast.success(
          "Court successfully booked! Redirecting to bookings page."
        );
        storeNotification("Court successfully booked!"); // Store a notification in the context
        updateToken(getUpdatedToken()); // Update the access token
        setTimeout(() => {
          navigate("/profile/bookings", { replace: true }); // Redirect to the bookings page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      // Log an error if the request fails
      console.error("Error submitting booking: ", error);
    }
  };

  // Function to add another player to the booking
  const addAnotherPlayer = () => {
    // If the player count is less than 4, add another player
    if (playerCount < 4) {
      setPlayers([...players, ""]); // Add an empty string to the players array
      setPlayerCount((prev) => prev + 1); // Increment the player count
    }
  };

  // Function to remove a player from the booking
  const removePlayer = () => {
    // If there are players
    if (playerCount > 0) {
      setPlayerCount(playerCount - 1); // Decrement the player count
      setPlayers(players.slice(0, -1)); // Remove the last player from the players array
    }
  };

  // Date and time limits for input fields
  const today = new Date(); // Creating a new date object to store today's date
  const maxDate = new Date(); // Create a new date object to store the maximum date
  maxDate.setDate(today.getDate() + 7); // Set the maximum date to 7 days from today

  // Start and end hours for hour selection
  const startHour = 8; // Specify the start hour
  const endHour = 19; // Specify the end hour

  // Generate an array of hours to select from based on the start and end hours
  const hoursArray = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i; // Calculate the hour
    return hour < 10 ? `0${hour}` : `${hour}`; // Formatting the hour and returning it
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
          <div className="form-section-player">
            <label className="booking-form-subtitle">Add Player</label>

            <div className="add-sub-div">
              Do you wish to add another player?
              <div className="combined-buttons">
                <button
                  type="button"
                  className="button_add"
                  onClick={addAnotherPlayer}
                >
                  +
                </button>
                <button
                  type="button"
                  className="button_sub"
                  onClick={removePlayer}
                >
                  -
                </button>
              </div>
            </div>

            <br />
            {players.map((_, i) => (
              <div key={i}>
                <input
                  className="input-email-player"
                  key={i}
                  placeholder="Enter Player Email"
                  onChange={async (e) => {
                    const newPlayers = [...players];
                    newPlayers[i] = e.target.value;
                    setPlayers(newPlayers);
                  }}
                />
                <br />
              </div>
            ))}
          </div>
          <div className="submit-div">
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
          </div>
        </form>
      </div>
    </main>
  );
}

export default Booking;
