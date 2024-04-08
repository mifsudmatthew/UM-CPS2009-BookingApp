import { useState } from "react";

/**
 * Renders a form to configure courts.
 * Allows the user to select a court, edit its details (size and price), and save the changes.
 *
 * @returns {JSX.Element} The ConfigCourts component.
 */
function ConfigCourts() {
  const [court, setCourt] = useState(""); // State variable to store the selected court
  const [price, setPrice] = useState(""); // State variable to store the price of the court
  const [size, setSize] = useState(""); // State variable to store the size of the court

  /**
   * Handles the form submission.
   * Sends a POST request to the server with the court data.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const courtData = { court, price, size };
    console.log(courtData);
    try {
      const response = await fetch("/api/configCourts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courtData),
      });
      console.log(response);
    } catch (error) { // Log an error if the request fails
      console.error("Error submitting booking: ", error);
    }
  };

  return (
    <main className="profile">
      <div>
        <h1>Configure Courts</h1>
        <h4>Select Court</h4>
        <form>
          <div>
            <select
              className="inputBox"
              onChange={(e) => setCourt(e.target.value)} // Update the selected court when the user selects an option
            >
              <option value="">Select a court</option>
              <option value="court1">Court 1</option>
              <option value="court2">Court 2</option>
              <option value="court3">Court 3</option>
            </select>
          </div>
          <h4>Edit details</h4>
          <input
            type="text"
            className="inputBox"
            placeholder="Court size"
            onChange={(e) => setSize(e.target.value)} // Update the court size when the user enters a value
          />
          <br></br>
          <br></br>
          <input
            type="number"
            className="inputBox"
            placeholder="€Price"
            onChange={(e) => setPrice(e.target.value)} // Update the court price when the user enters a value
          />
          <br></br>
          <br></br>
          <button
            type="submit"
            className="booking-button"
            onClick={handleSubmit} // Call the handleSubmit function when the user clicks the button
          >
            Save
          </button>
        </form>
      </div>
    </main>
  );
}

export default ConfigCourts;
