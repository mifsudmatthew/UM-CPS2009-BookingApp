import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import "../../styles/accordion.css";

/**
 * Renders a component that displays the booking statistics for each court.
 * @returns {JSX.Element} The CourtBookingStats component.
 */
function CourtBookingStats() {
  const [courtBookings, setCourtBookings] = useState([]); // Array of court bookings

  useEffect(() => {
    /**
     * Fetches a list of courts and associated bookings from the server.
     * @returns {Promise<void>} A Promise that resolves when the court bookings are fetched successfully.
     */
    const fetchCourtBookings = async () => {
      try {
        const response = await Post("/api/getCourtsAndBookings");
        console.log(response);
        setCourtBookings(response);
      } catch (error) {
        console.error(`Error fetching courts: ${error}`);
      }
    };
    fetchCourtBookings();
  });

  return (
    <Accordion defaultActiveKey="0">
      {/* Display the list of courts */}
      {courtBookings.map((court, index) => (
        <Accordion.Item eventKey={index.toString()} key={court.id}>
          <Accordion.Header className="custom-accordion-header">
            {court.name}
          </Accordion.Header>
          <Accordion.Body style={{ backgroundColor: "#b4c69d9a" }}>
            <ul>
              {/* Display the list of associated court bookings for the court */}
              {court.bookings.map((booking) => (
                <li key={booking.id}>{booking}</li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default CourtBookingStats;
