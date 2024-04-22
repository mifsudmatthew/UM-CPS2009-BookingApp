import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
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

  return (
    <Accordion>
      {courtStats.map((court, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header>{court.name}</Accordion.Header>
          <Accordion.Body>
            <p>Number of Bookings: {court.bookings}</p>
            <p>Total Money Made: {court.money}</p>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default CourtBookingStats;
