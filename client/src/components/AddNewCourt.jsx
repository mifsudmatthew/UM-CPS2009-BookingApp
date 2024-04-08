import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

/**
 * Renders a form to add a new court.
 *
 * @returns {JSX.Element} The AddNewCourt component.
 */
function AddNewCourt() {
    // State variables to store the court name, price, and size
    const [courtName, setCourtName] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const courtData = { courtName, price, size };
        try {
            // Send a POST request to the server to add the new court
            const response = await fetch("/api/configCourts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courtData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("Success: ", response);
            // Display a success toast message
            toast.success("Court added successfully.");
            // Refresh the page to update the court list
            window.location.reload();
        } catch (error) {
            // Display an error toast message
            toast.error("Error adding court. Please try again.");
            console.error("Error: ", error);
        }
    }

    return (
        <main className="profile">
            <div>
                <ToastContainer />
                <h1>Add New Court</h1>
                <form>
                    <div className={"inputContainer"}>
                        <label>Enter the name of the court</label>
                        {/* Input field to enter the court name */}
                        <input type="text" className="inputBox" placeholder="Court Name" onChange={(e) => setCourtName(e.target.value)} />
                    </div>
                    <br></br>
                    <div className={"inputContainer"}>
                        <label>Enter the size of the court</label>
                        {/* Input field to enter the court size */}
                        <input type="text" className="inputBox" placeholder="Court size" onChange={(e) => setSize(e.target.value)} />
                    </div>
                    <br></br>
                    <div className={"inputContainer"}>
                        <label>Enter the price of the court</label>
                        {/* Input field to enter the court price */}
                        <input type="number" className="inputBox" placeholder="€Price" onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <br></br>
                    <br></br>
                    {/* Button to submit the form */}
                    <button type="submit" className="booking-button" onClick={handleSubmit}>
                        Add Court
                    </button>
                </form>
            </div>
        </main>
    );
}

export default AddNewCourt;