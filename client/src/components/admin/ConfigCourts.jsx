import { useState, useEffect } from "react";

/**
 * Renders a form to configure courts.
 * Allows the user to select a court, edit its details (size and price), and save the changes.
 *
 * @returns {JSX.Element} The ConfigCourts component.
 */
function ConfigCourts() {
  const [courts, setCourts] = useState([]); // State variable to store the list of courts
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
    } catch (error) {
      // Log an error if the request fails
      console.error("Error submitting booking: ", error);
    }
  };

  /**
   * Fetches all courts from the API.
   * @returns {Promise<void>} A Promise that resolves when the courts are fetched successfully.
   */

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch("/api/getAllCourts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setCourts(data);
      } catch (error) {
        console.error(`Error fetching courts: ${error}`);
      }
    };

    // fetchCourts();
  }, [setCourts]);

  /**
   * Handles the change event of the court selection.
   * Updates the state variables for court, size, and price based on the selected court.
   *
   * @param {Object} e - The event object.
   */
  const handleCourtChange = (e) => {
    const selectedCourt = courts.find((court) => court.name === e.target.value);
    setCourt(selectedCourt.name);
    setSize(selectedCourt.size);
    setPrice(selectedCourt.price);
  };

  return (
    <main className="profile">
      <div>
        <h1>Configure Courts</h1>
        <h4>Select Court</h4>
        <form>
          <div>
            <select className="inputBox" onChange={handleCourtChange}>
              {/* Display a list of courts fetched from the API in the dropdown */}
              <option value="">Select a court</option>
              {courts.map((court) => (
                <option key={court.name} value={court.name}>
                  {court.name}
                </option>
              ))}
            </select>
          </div>
          <h4>Edit details</h4>
          <input
            type="text"
            className="inputBox"
            placeholder="Court size"
            value={size} // Display the size of the selected court
            onChange={(e) => setSize(e.target.value)} // Update the court size when the user enters a value
          />
          <br></br>
          <br></br>
          <input
            type="number"
            className="inputBox"
            placeholder="€Price"
            value={price} // Display the price of the selected court
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
