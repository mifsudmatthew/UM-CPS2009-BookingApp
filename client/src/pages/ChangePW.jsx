/**
 * @file ChangePW.jsx
 * @desc Renders a form that allows the user to change their password.
 */

import { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NotificationContext from "../context/NotificationContext";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

import { Post } from "../utils/ApiFunctions";

/**
 * Renders the Change Password page.
 * @category Front-end
 * @returns {JSX.Element} The Change Password page component.
 */
function ChangePW() {
  const navigate = useNavigate(); // Get the navigate function from the router
  const { storeNotification } = useContext(NotificationContext); // Get the storeNotification function from the NotificationContext

  const [password, setPassword] = useState(""); // Create a state variable for the password
  const [confirmPassword, setConfirmPassword] = useState(""); // Create a state variable for the confirm password

  // Check if the password and confirm password fields are not empty and match, when either of them changes
  const canChangePassword = useMemo(() => {
    // Check if the password and confirm password fields are not empty and match
    return password === confirmPassword;
  }, [password, confirmPassword]);

  // Function to handle the change password form submission
  const handleChangePassword = async (event) => {
    event.preventDefault(); // Prevent the default form submission behaviour

    // Check if the password and confirm password fields are empty
    if (!password.trim() || !confirmPassword.trim()) {
      // Display error toast if any field is empty
      toast.error("Please fill all fields.");
      return;
    }

    // Check if the passwords do not match
    if (!canChangePassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Attempt to send a POST request to change the password
    const response = await Post("/api/changepassword", { password });
    if (!response.result) {
      console.error("Change password error:", response.error);
      // Display error toast if an error occurs
      toast.error("An error occurred while changing password!");
    }

    console.log("Password change successful");
    // Display success toast if the password is changed successfully
    toast.success("Password change successful! Redirecting to profile.");
    // Store a notification in local storage
    storeNotification("Password changed successfully!");
    // Redirect to the profile page
    navigate("/profile", { replace: true });
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
