/**
 * @file Reset.jsx
 * @desc The Reset component renders a form which allows the user to reset their password, through a PIN sent to their email.
 */

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

import { Post } from "../utils/ApiFunctions";
import { checkEmail } from "../utils/EmailTest";

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

  // Using useMemo to memoize certain conditions, preventing unnecessary checks when other fields change.

  // Return if password and confirm password match
  const passwordMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  // Return whether the pin is 4 digits
  const pinValid = useMemo(() => {
    return pin.length === 4;
  }, [pin]);

  // Simple regex for basic email validation
  const isEmailValid = useMemo(() => {
    return checkEmail(email);
  }, [email]);

  // Trigger when state variable changes
  useEffect(() => {
    // Show a success toast if the email was sent successfully
    if (EmailPostSuccess) {
      // Display success toast if the email is sent successfully
      toast.success("E-mail sent successfully! Please check your E-mail.");
      setEmailPostSuccess(false); // Reset the state variable
    }
  }, [EmailPostSuccess]);

  // Handle submit function for sending reset email
  const handleSubmit = async () => {
    // Check if email is empty
    if (email.length === 0) {
      toast.error("Error! Please enter an email address.");
      return;
    }

    // Check if email is valid
    if (!isEmailValid) {
      toast.error("Error! Please enter a valid email address.");
      return;
    }

    // Attempt to send a POST request to request a pin.
    const response = await Post("/api/reset", { email: email });
    if (response.result) {
      setEmailPostSuccess(true); // Set the EmailPostSuccess variable to true
    } else {
      toast.error("Error! Could not send reset E-mail.");
      console.error(response.error);
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

    // Attempt to send a POST request to the server with the reset password data
    const response = await Post("/api/resetpassword", { email, password, pin });
    if (!response.result) {
      // Log an error if the request fails
      toast.error("Error! Could not reset password.");
      console.error(response.error);
      return;
    }

    // Display a success toast if the password is changed successfully
    toast.success("Password changed successfully!");

    // Redirect to the home page after 2 seconds
    setTimeout(() => navigate("/", { replace: true }), 2000);
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
