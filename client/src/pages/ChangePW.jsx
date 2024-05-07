/**
 * ChangePW.jsx
 * This file contains the Change Password page component.
 */

import { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NotificationContext from "../context/NotificationContext";

import { Post } from "../utils/ApiFunctions";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

/**
 * Renders the Change Password page.
 *
 * @returns {JSX.Element} The Change Password page component.
 */
function ChangePW() {
  const navigate = useNavigate(); // Get the navigate function from the router
  const { storeNotification } = useContext(NotificationContext); // Get the storeNotification function from the NotificationContext

  const [password, setPassword] = useState(""); // Create a state variable for the password
  const [confirmPassword, setConfirmPassword] = useState(""); // Create a state variable for the confirm password

  // Check if the password and confirm password fields are not empty and match, when either of them changes
  const canChangePassword = useMemo(() => {
    // Use useMemo to memoize the value
    return (
      password != "" && confirmPassword != "" && password === confirmPassword // Check if the password and confirm password fields are not empty and match
    );
  }, [password, confirmPassword]);

  // Function to handle the change password form submission
  const handleChangePassword = async (event) => {
    event.preventDefault(); // Prevent the default form submission behaviour
    // Check if the password and confirm password fields are empty
    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Please fill all fields."); // Display error toast if any field is empty
      return;
    }

    // Check if the passwords do not match
    if (!canChangePassword) {
      toast.error("Passwords do not match."); // Display error toast if passwords do not match
      return;
    }

    try {
      const response = await Post("/api/changepassword", { password }); // Attempt to send a POST request to change the password
      toast.success("Password change successful! Redirecting to profile."); // Display success toast if the password is changed successfully
      console.log("Password change successful:", response);
      storeNotification("Password changed successfully!"); // Store a notification in local storage
      navigate("/profile", { replace: true }); // Redirect to the profile page
    } catch (error) {
      toast.error("An error occurred while changing password!"); // Display error toast if an error occurs
      console.error("Change password error:", error);
    }
  };

  return (
    <main className="profile">
      <div className="header-title">Change Password</div>
      <Form>
        <InputBox
          label="New Password"
          className="change_inputBox"
          placeholder="New Password"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <InputBox
          label="Confirm New Password"
          placeholder="New Password"
          value={confirmPassword}
          type="password"
          className="change_inputBox"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <br />
        <InputButton
          label="Change Password"
          colour="#3e4a36"
          type="submit"
          onClick={handleChangePassword}
        />
      </Form>
    </main>
  );
}

export default ChangePW;
