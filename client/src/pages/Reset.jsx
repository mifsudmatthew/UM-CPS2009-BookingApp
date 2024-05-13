/**
 * Reset.jsx
 * This file contains the Reset page component. This allows the user to reset their password, through a PIN sent to their email.
 */

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Post } from "../utils/ApiFunctions";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

/**
 * Reset component for resetting password.
 * @category Front-end
 * @returns {JSX.Element} The Reset component.
 */
export default function Reset() {
  const navigate = useNavigate(); // Get the navigate function from the router
  const [email, setEmail] = useState(""); // Creating a state variable for the email
  const [password, setPassword] = useState(""); // Creating a state variable for the password
  const [confirmPassword, setConfirmPassword] = useState(""); // Creating a state variable for the confirm password
  const [pin, setPin] = useState(""); // Creating a state variable for the pin
  const [EmailPostSuccess, setEmailPostSuccess] = useState(false); // Creating a state variable for whether the email was sent successfully

  // Using useMemo to memoize whether passwords match, preventing unnecessary checks when other fields change.
  const passwordMatch = useMemo(() => {
    return password === confirmPassword; // Return if password and confirm password match
  }, [password, confirmPassword]);

  // Using useMemo to memoize whether the pin is valid, preventing unnecessary checks when other fields change.
  const pinValid = useMemo(() => {
    return pin.length === 4; // Return whether the pin is 4 digits
  }, [pin]);

  // Using useMemo to memoize whether the email is valid, preventing unnecessary checks when other fields change.
  const isEmailValid = useMemo(() => {
    // Simple regex for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  // Trigger when state variable changes
  useEffect(() => {
    // Show a success toast if the email was sent successfully
    if (EmailPostSuccess) {
      toast.success("E-mail sent successfully! Please check your E-mail."); // Display success toast if the email is sent successfully
      setEmailPostSuccess(false); // Reset the state variable
    }
  }, [EmailPostSuccess]);

  // Handle submit function for sending reset email
  const handleSubmit = async () => {
    // Check if email is empty
    if (email.length === 0) {
      toast.error("Error! Please enter an email address.");
      return;
    } else if (!isEmailValid) {
      // Check if email is valid
      toast.error("Error! Please enter a valid email address.");
      return;
    }

    try {
      // Attempt to send a POST request to request a pin.
      await Post("/api/reset", { email: email });
      setEmailPostSuccess(true); // Set the EmailPostSuccess variable to true
    } catch (error) {
      toast.error("Error! Could not send reset E-mail.");
      console.error(error);
    }
  };

  // Handle change function for resetting password
  const handleChange = async (event) => {
    event.preventDefault(); // Prevent the default form submission behaviour
    // Check if any field is empty
    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0 ||
      pin.length === 0
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Check if email is valid
    if (!isEmailValid) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Check if passwords match
    if (!passwordMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    // Check if PIN is valid
    if (!pinValid) {
      toast.error("PIN must be 4 digits.");
      return;
    }

    try {
      // Attempt to send a POST request to the server with the reset password data
      await Post("/api/resetpassword", { email, password, pin });

      // Display a success toast if the password is changed successfully
      toast.success("Password changed successfully!");

      setTimeout(() => {
        navigate("/", { replace: true }); // Redirect to the home page after 2 seconds
      }, 2000);
    } catch (error) {
      // Log an error if the request fails
      toast.error("Error! Could not reset password.");
      console.error(error);
    }
  };

  return (
    <main className={"mainContainer"}>
      <Form classname="innerContainer">
        <div className="titleContainer">Reset</div>
        <div className={"inputContainer"}>
          <br />
        </div>
        <InputBox
          id="reset-email"
          placeholder="Email"
          value={email}
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <InputButton
          label="Send Pin to Email"
          colour="#3e4a36"
          onClick={handleSubmit}
        />
        <br />
        <InputBox
          id="reset-password"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <InputBox
          id="reset-password-confirm"
          placeholder="Confirm Password"
          value={confirmPassword}
          type="password"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <br />
        <InputBox
          id="reset-pin"
          placeholder="PIN (4 digits)"
          value={pin}
          type="number"
          onChange={(event) => {
            // Replacing any non-digit characters with an empty string
            const inputPin = event.target.value.replace(/\D/g, "");
            setPin(inputPin);
          }}
        />
        <InputButton
          label="Change Password"
          colour="#3e4a36"
          onClick={handleChange}
        />
      </Form>
    </main>
  );
}
