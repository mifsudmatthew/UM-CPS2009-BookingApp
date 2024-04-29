import { useState, useEffect } from "react";
import { useProfile } from "../../context/ProfileContext";
import { Post } from "../../utils/ApiFunctions";
import { toast } from "react-toastify";
import { getUpdatedToken } from "../../utils/ApiFunctions";
import { XOctagon } from "react-bootstrap-icons";
import "../../styles/bookings.css";

/**
 * Renders the Bookings component.
 * This component displays the upcoming and previous bookings in a table format.
 *
 * @returns {JSX.Element} The Bookings component.
 */
const Bookings = () => {
    const { user, updateToken } = useProfile(); // Retrieve user data once when the component mounts
    const [courts, setCourts] = useState([]); // State variable to store the list of courts

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
                const response = await Post(
                    "/api/getFutureBookings",
                    user_details
                );
                console.log(response);
                setCourts(response);
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
                toast.success("Court Successfully Canceled!");
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
                                const courtDateTime = new Date(`${court.date}T${court.time}:00`);
                                const now = new Date();
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
                                            onClick={() =>
                                                cancelBooking(
                                                    court.id,
                                                    court.price
                                                )
                                            }
                                        >
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
        </main>
    );
};

export default Bookings;
