import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Post } from "../utils/ApiFunctions";
import Form from "../components/Form";
import InputBox from "../components/InputBox";
import InputButton from "../components/InputButton";

function AddNewCourt() {
  const [courtName, setCourtName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = async () => {
    try {
      const courtData = { courtName, price, size };
      const response = await Post("/api/configCourts", courtData);
      /*
      This was what was here before, idk if was import to do it this particular way but we already had a method for this
      const response = await fetch("/api/configCourts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      */
      toast.success("Court added successfully.");
      console.log("Success: ", response);
      window.location.reload();
    } catch (error) {
      toast.error("Error adding court. Please try again.");
      console.error("Error: ", error);
    }
  };

  const handleNameChange = (value) => {
    setCourtName(value);
  };

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  return (
    <main className="profile">
      <ToastContainer />
      <h2>Add New Court</h2>
      <Form className="inputContainer" onSubmit={handleSubmit}>
        <InputBox
          id="NewCourtsCourtName"
          label="Enter the name of the court"
          placeholder="Court Name"
          onChange={handleNameChange}
        />
        <br />
        <InputBox
          id="NewCourtsCourtSize"
          label="Enter the size of the court"
          placeholder="Court Size"
          onChange={handleSizeChange}
        />
        <br />
        <InputBox
          id="NewCourtsCourtPrice"
          label="Enter the price of the court"
          type="number"
          placeholder="€Price"
          onChange={handlePriceChange}
        />
        <br />
        <InputButton
          className="booking-button"
          type="submit"
          label="Add Court"
        />
      </Form>
    </main>
  );
}

export default AddNewCourt;
