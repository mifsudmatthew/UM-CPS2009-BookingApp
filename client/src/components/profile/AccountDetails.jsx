/**
 * @file AccountDetails.jsx
 * @desc Renders a component that allows the user to change their account details.
 */

import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import ProfileContext from "../../context/ProfileContext";
import NotificationContext from "../../context/NotificationContext";

import Form from "../form/Form";
import InputBox from "../form/InputBox";
import InputButton from "../form/InputButton";

import { Post } from "../../utils/ApiFunctions";
import { checkEmail } from "../../utils/EmailTest";

/**
 * Renders the component for the user to change their account details.
 * @category Front-end
 * @returns {JSX.Element} The rendered AccountDetails component.
 */
const AccountDetails = () => {
  const { user, updateToken } = useContext(ProfileContext); // Retrieve user data once when the component mounts
  // Retrieve the storeNotification function from the context
  const { storeNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  // Initialize name and email with values from localStorage, or fallback to empty strings
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Check if the email is valid
    if (!checkEmail(email)) {
      toast.error("Invalid email format detected.");
      return;
    }

    // Check if user made no changes
    if (name === user.name && email === user.email) {
      toast.error("No changes detected.");
      return;
    }
    // Send a POST request to the server to update the user's details
    const response = await Post("/api/changedetails", { name, email });

    if (!response.result) {
      console.error(`Error in: ${response.error}`);
      toast.error("Change failed!");
      return;
    }

    // Extract the access token and user data from the response
    updateToken(response.data); // Update the access token
    // Store a notification in the context
    storeNotification("Details Change Successful!");
    // Display a success toast
    toast.success("Change Successful!");
    // Redirect to the profile page after 2 seconds
    setTimeout(() => navigate("/profile", { replace: true }), 2000);
  };

  return (
    <main className="profile">
      <div className="header-title">Profile</div>
      <Form>
        <InputBox
          id="AccountDetailsName"
          label="Name"
          value={name}
          placeholder="Name and Surname"
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <InputBox
          id="AccountDetailsEmail"
          label="Email"
          type="email"
          value={email}
          placeholder="bob@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <InputButton type="submit" label="Save" onClick={handleSubmit} />
      </Form>
    </main>
  );
};

export default AccountDetails;
