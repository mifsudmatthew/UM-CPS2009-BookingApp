/**
 * Bookings.jsx
 * Booking form to book courts
 */

import "../../styles/bookings.css";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { XOctagon } from "react-bootstrap-icons";

import { useProfile } from "../../context/ProfileContext";
import { useNotifications } from "../../context/NotificationContext";

import { Post } from "../../utils/ApiFunctions";
import { getUpdatedToken } from "../../utils/ApiFunctions";

/**
 * Renders the Bookings component.
 * This component displays the upcoming and previous bookings in a table format.
 *
 * @returns {JSX.Element} The Bookings component.
 */
const Bookings = () => {
  const { storeNotification } = useNotifications();

  const { user, updateToken } = useProfile(); // Retrieve user data once when the component mounts
  const [courts, setCourts] = useState([]); // State variable to store the list of courts
  const [secondary, setSecCourts] = useState([]); // State variable to store the available Secondaeycourts

  /**
   * Fetches the booked courts for a specific user.
   * @async
   * @function fetchBookedCourts
   * @returns {Promise<void>} A Promise that resolves when the booked courts are fetched.
   */
  useEffect(() => {
    const fetchBookedCourts = async () => {
      const name = user.name;
      const email = user.email;
      const user_details = { name, email };
      try {
        const response = await Post("/api/getFutureBookings", user_details);
        console.log(response);
        setCourts(response);

        const response2 = await Post(
          "/api/getFutureSecondaryBookings",
          user_details
        );
        console.log(response2);
        setSecCourts(response2);
      } catch (error) {
        // Log an error if the request fails
        console.error("Error fetching booked courts: ", error);
      }
    };
    fetchBookedCourts();
  }, [user]);

  /**
   * Cancels a booking by sending a request to the server.
   * @param {string} id - The ID of the booking to be cancelled.
   * @returns {Promise<void>} - A Promise that resolves when the booking is successfully cancelled.
   */
  const cancelBooking = async (id, price) => {
    try {
      const response = await Post("/api/cancelBooking", {
        booking_id: id,
        price: price,
      });
      if (response.result == true) {
        storeNotification("Court Successfully Cancelled!");
        toast.success("Court Successfully Cancelled!");
        updateToken(await getUpdatedToken());
        setCourts((prevCourts) =>
          prevCourts.filter((court) => court.id !== id)
        );
      } else {
        toast.error("Court Failed to Delete");
      }
    } catch (error) {
      console.error("Error cancelling booking: ", error);
    }
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
