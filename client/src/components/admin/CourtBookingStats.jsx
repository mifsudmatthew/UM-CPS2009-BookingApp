import { useState, useEffect } from "react";
import { Post } from "../../utils/ApiFunctions"; // Import the Post function to make API requests
import "../../styles/accordion.css";

/**
 * Renders a component that displays the booking statistics for each court.
 * @returns {JSX.Element} The CourtBookingStats component.
 */
function CourtBookingStats() {
  const [courtStats, setCourtStats] = useState([]); // Array of court bookings

  useEffect(() => {
    /**
     * Fetches a list of courts and associated bookings from the server.
     * @returns {Promise<void>} A Promise that resolves when the court bookings are fetched successfully.
     */
    const fetchCourtBookings = async () => {
      try {
        const response = await Post("/api/getBasicStatistics");
        console.log(response);
        setCourtStats(response.data); // Update state with the received court statistics
      } catch (error) {
        console.error(`Error fetching courts: ${error}`);
      }
    };
    fetchCourtBookings();
  }, []); // Ensure useEffect runs only once on component mount

  const toggleAccordion = (index) => {
    setCourtStats((prevStats) =>
      prevStats.map((court, i) =>
        i === index ? { ...court, isOpen: !court.isOpen } : court
      )
    );
  };

  return (
    <div className="accordion">
      {courtStats.map((court, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-header ${court.isOpen ? "open" : "close"}`}
            onClick={() => toggleAccordion(index)}
          >
            {court.name}
          </div>
          <div className={`accordion-body ${court.isOpen ? "open" : "close"}`}>
            <table>
              <thead>
                <tr>
                  <th>Bookings Count</th>
                  <th>Total Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{court.bookings}</td>
                  <td>{court.money}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourtBookingStats;
