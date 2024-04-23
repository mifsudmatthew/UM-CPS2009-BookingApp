import { useState, useEffect } from "react";
import { Post } from "../../utils/ApiFunctions"; // Import the Post function to make API requests
import "../../styles/accordion.css";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

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
      <Bar
        data={{
          labels: [
            "Court 1",
            "Court 2",
            "Court 3",
            "Court 4",
            "Court 5",
            "Court 6",
            "Court 7",
          ],
          datasets: [
            {
              label: "Court Bookings",
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 1,
            },
          ],
        }}
      />
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
