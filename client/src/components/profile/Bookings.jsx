import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

/**
 * Renders the Bookings component.
 * This component displays the upcoming and previous bookings in a table format.
 *
 * @returns {JSX.Element} The Bookings component.
 */
const Bookings = () => {
  const { user, setUser } = useUser(); // Retrieve user data once when the component mounts
  const [courts, setCourts] = useState([]); // State variable to store the list of courts
  
  // Initialize state with values from localStorage, or fallback to empty strings
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  /**
   * Fetches the booked courts for a specific user.
   * @async
   * @function fetchBookedCourts
   * @returns {Promise<void>} A Promise that resolves when the booked courts are fetched.
   */
  const fetchBookedCourts = async () => {
    const user_details = {name, email};
    try {
      const response = await fetch("/api/getBookedCourts", user_details); 
      console.log(data);
      setCourts(response);
    } catch (error) {
      // Log an error if the request fails
      console.error("Error fetching booked courts: ", error);
    }
  };
  
  useEffect(() => {
    fetchBookedCourts();
  }, []);

  /**
   * Cancels a booking by sending a request to the server.
   * @param {string} id - The ID of the booking to be cancelled.
   * @returns {Promise<void>} - A Promise that resolves when the booking is successfully cancelled.
   */
  const cancelBooking = async (id) => {
    try {
      const response = await fetch(`/api/cancelBooking/${id}`, {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      // After successfully cancelling the booking, fetch the updated list of courts
      fetchBookedCourts();
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
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Court</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through upcomingBookings array and render each booking */}
            {courts.map((court) => (
              <tr key={court.id}>
                <td>{court.name}</td>
                <td>{court.date}</td>
                <td>{court.time}</td>
                <td>
                  <button onClick={() => cancelBooking(court.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Bookings;
