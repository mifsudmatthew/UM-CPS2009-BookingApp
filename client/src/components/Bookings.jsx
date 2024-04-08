/**
 * Renders the Bookings component.
 * This component displays the upcoming and previous bookings in a table format.
 *
 * @returns {JSX.Element} The Bookings component.
 */
const Bookings = () => {
  // Mock data for upcoming and previous bookings
  // Needs to be replaced with actual data fetched from the server
  const upcomingBookings = [
    {
      id: 1,
      date: "2024-04-10",
      time: "10:00",
      court: "Court 3",
      status: "Confirmed",
    },
  ];
  const previousBookings = [
    {
      id: 2,
      date: "2024-03-05",
      time: "12:00",
      court: "Court 1",
      status: "Completed",
    },
  ];
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
            {upcomingBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.court}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Bookings;
