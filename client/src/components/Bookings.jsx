const Bookings = () => {
    const upcomingBookings = [
        { id: 1, date: "2024-04-10", time: "10:00", court: "Court 3", status: "Confirmed" },
    ];
    const previousBookings = [
        { id: 2, date: "2024-03-05", time: "12:00", court: "Court 1", status: "Completed" },
    ];
    return (
        <main className="profile">
            <div className="header-title">Bookings</div> 
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
            <section>
                <h4>Previous Bookings</h4>
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
                        {previousBookings.map((booking) => (
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
}

export default Bookings;
