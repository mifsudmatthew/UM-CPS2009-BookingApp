import { useState, useEffect } from "react";
import Form from "../form/Form";
import InputBox from "../form/InputBox";
import InputButton from "../form/InputButton";
import { Post, Get } from "../../utils/ApiFunctions";
import { toast } from "react-toastify";

/**
 * Renders a form to configure courts.
 * Allows the user to select a court, edit its details (size and price), and save the changes.
 *
 * @returns {JSX.Element} The ConfigCourts component.
 */
function ConfigCourts() {
  const [courts, setCourts] = useState([]); // State variable to store the list of courts
  const [courtId, setCourtId] = useState(""); // State variable to store the selected court
  const [price, setPrice] = useState(""); // State variable to store the price of the court
  const [name, setName] = useState(""); // State variable to store the name of the court

  /**
   * Fetches all courts from the API.
   * @returns {Promise<void>} A Promise that resolves when the courts are fetched successfully.
   */
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await Get("/api/getAllCourts");
        setCourts(response.data);
      } catch (error) {
        console.error(`Error fetching courts: ${error}`);
      }
    };

    fetchCourts();
  }, [setCourts]);

  /**
   * Handles the form submission.
   * Sends a POST request to the server with the court data.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if the email and password fields are empty
    if (!price || !name || !courtId) {
      // Check if amount is not a number or empty
      toast.error("Please fill all fields.");
      return;
    } else if (isNaN(price)) {
      toast.error("Error! Input is not a number, please enter a number.");
      return;
    } else if (price < 0) {
      toast.error("Error! Please enter a positive number.");
      return;
    }
    try {
      const response = await Post("/api/configCourts", {
        courtId,
        price,
        name,
      });
      const newCourts = courts.map((court) => {
        return court._id === response.data._id ? response.data : court;
      });
      setCourts(newCourts);
      toast.success("Court updated successfully!");
      // Clear input fields
      setName("");
      setPrice("");
      setCourtId("");
    } catch (error) {
      // Log an error if the request fails
      console.error("Error submitting booking: ", error);
    }
  };

  /**
   * Handles the change event of the court selection.
   * Updates the state variables for court, size, and price based on the selected court.
   *
   * @param {Object} e - The event object.
   */
  const handleCourtChange = (e) => {
    const selectedCourt = courts.find((court) => court._id === e.target.value);
    setCourtId(selectedCourt._id);
    setName(selectedCourt.court_name);
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
            <option key={court.court_name} value={court._id}>
              {court.court_name}
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
          type="number"
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
