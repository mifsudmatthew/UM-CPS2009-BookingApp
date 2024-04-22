import { useState, useEffect } from "react";
import Form from "../form/Form";
import InputBox from "../form/InputBox";
import InputButton from "../form/InputButton";
import { Post, Get } from "../../utils/ApiFunctions";

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
  const [name, setName] = useState(""); // State variable to store the name of the court

  /**
   * Handles the form submission.
   * Sends a POST request to the server with the court data.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const courtData = { court, price, name };
    console.log(courtData);
    try {
      const response = await Post("/api/configCourts", courtData);
      console.log(response);
      setCourts((prev) => {
        return prev + response.data;
      });
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
        const response = await Get("/api/getAllCourts");
        setCourts(response);
      } catch (error) {
        console.error(`Error fetching courts: ${error}`);
      }
    };

    fetchCourts();
  }, [setCourts]);

  /**
   * Handles the change event of the court selection.
   * Updates the state variables for court, size, and price based on the selected court.
   *
   * @param {Object} e - The event object.
   */
  const handleCourtChange = (e) => {
    const selectedCourt = courts.find((court) => court.name === e.target.value);
    setCourt(selectedCourt._id);
    setName(selectedCourt.size);
    setPrice(selectedCourt.price);
  };

  return (
    <main className="profile">
      <div className="header-title">Configure Courts</div>
      <Form>
        <h4>Select Court</h4>
        <select className="inputBox" onChange={handleCourtChange}>
          {/* Display a list of courts fetched from the API in the dropdown */}
          <option value="">Select a court</option>
          {courts.map((court) => (
            <option key={court.name} value={court.name}>
              {court.name}
            </option>
          ))}
        </select>
        <h4>Edit details</h4>
        <InputBox
          id="admin-config-name"
          label="Court Name"
          placeholder={"Court Name"}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <InputBox
          id="admin-config-price"
          label="Court Price"
          placeholder="€Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)} // Update the court price when the user enters a value
        />
        <br />
        <InputButton
          label="Save"
          type={"submit"}
          className="booking-button"
          onClick={handleSubmit} // Call the handleSubmit function when the user clicks the button
        />
      </Form>
    </main>
  );
}

export default ConfigCourts;
