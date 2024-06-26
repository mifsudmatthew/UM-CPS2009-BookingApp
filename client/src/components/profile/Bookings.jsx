/**
 * @file Bookings.jsx
 * @desc Renders a component that displays the upcoming and previous bookings in a table format.
 */

import "../../styles/bookings.css";

import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { XOctagon } from "react-bootstrap-icons";

import ProfileContext from "../../context/ProfileContext";
import NotificationContext from "../../context/NotificationContext";

import { Post, Get } from "../../utils/ApiFunctions";

/**
 * Renders the Bookings component.
 * This component displays the upcoming and previous bookings in a table format.
 * @category Front-end
 * @returns {JSX.Element} The Bookings component.
 */
const Bookings = () => {
  const { user, updateToken } = useContext(ProfileContext); // Retrieve user data once when the component mounts
  // Retrieve the storeNotification function from the context
  const { storeNotification } = useContext(NotificationContext);

  const [courts, setCourts] = useState([]); // State variable to store the list of courts
  const [secondary, setSecCourts] = useState([]); // State variable to store the available Secondary courts

  /**
   * Fetches the booked courts for a specific user.
   * @category Front-end
   * @async
   * @function fetchBookedCourts
   * @returns {Promise<void>} A Promise that resolves when the booked courts are fetched.
   */
  useEffect(() => {
    // Fetch the booked courts when the user data changes
    const fetchBookedCourts = async () => {
      const name = user.name; // Get the user's name
      const email = user.email; // Get the user's email
      const user_details = { name, email }; // Create an object with the user's details
      // Send a POST request to the server to get the booked courts
      let response = await Post("/api/getFutureBookings", user_details);

      // Log an error if the request fails
      if (!response.result) {
        console.error("Error fetching booked courts: ", response.error);
        return;
      }

      // Set the booked courts in the state variable
      setCourts(response.data);

      // Send a POST request to the server to get the booked courts
      response = await Post("/api/getFutureSecondaryBookings", user_details);

      // Log an error if the request fails
      if (!response.result) {
        console.error("Error fetching booked courts: ", response.error);
        return;
      }

      // Set the booked courts in the state variable
      setSecCourts(response.data);
    };

    fetchBookedCourts(); // Call the fetchBookedCourts function
  }, [user]);

  /**
   * Cancels a booking by sending a request to the server.
   * @param {string} id - The ID of the booking to be cancelled.
   * @returns {Promise<void>} - A Promise that resolves when the booking is successfully cancelled.
   */
  const cancelBooking = async (id, price) => {
    // Send a POST request to the server to cancel the booking
    const response = await Post("/api/cancelBooking", {
      booking_id: id,
      price: price,
    });

    if (!response.result) {
      console.error("Error cancelling booking: ", response.error);
      toast.error("Court Failed to Delete");
      return;
    }

    // Display a success message if the booking is successfully cancelled
    // Display a success toast
    toast.success("Court Successfully Cancelled!");
    // Store a notification in local storage
    storeNotification("Court Successfully Cancelled!");

    // Update the access token
    const token = await Get("/api/token");
    updateToken(token.data);
    // Remove the cancelled booking from the list of courts
    setCourts((prevCourts) => prevCourts.filter((court) => court.id !== id));
  };

  return (
    <main className="profile">
      {/* Header */}
      <div className="header-title">Bookings</div>
      {/* Upcoming Bookings */}
      <section>
        <h4>Upcoming Bookings</h4>
        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Address</th>
                <th>Price</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through upcomingBookings array and render each booking */}
              {courts.map((court) => {
                const courtDateTime = new Date(
                  new Date(court.date).setHours(
                    // Set the date and time of the booking
                    Number(court.time),
                    0 // Since the minutes are always 0
                  )
                );
                const now = new Date(); // Get the current date and time
                const diffInHours = (courtDateTime - now) / 1000 / 60 / 60;
                return (
                  <tr key={court.id}>
                    <td>{court.name}</td>
                    <td>{court.date}</td>
                    <td>{court.time}:00</td>
                    <td>{court.address}</td>
                    <td>€{court.price.toFixed(2)}</td>
                    <td>
                      {/* Calculate the time difference, if more than 24 hours allow cancellation */}
                      {diffInHours > 24 ? (
                        <button
                          onClick={() => cancelBooking(court.id, court.price)}>
                          <XOctagon />
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h4>Upcoming Secondary Bookings</h4>
        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Address</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through upcomingBookings array and render each booking */}
              {secondary.map((court) => {
                return (
                  <tr key={court.id}>
                    <td>{court.name}</td>
                    <td>{court.date}</td>
                    <td>{court.time}:00</td>
                    <td>{court.address}</td>
                    <td>€{court.price.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Bookings;
