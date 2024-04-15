import { useState, useMemo, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

import "react-toastify/dist/ReactToastify.css";

/**
 * Reset component for resetting password.
 *
 * @returns {JSX.Element} The Reset component.
 */
export default function Reset() {
  const navigate = useNavigate();
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Memoized value for password match
  const passwordMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  // Memoized value for PIN validation
  const pinValid = useMemo(() => {
    return pin.length === 4;
  }, [pin]);

  // Email validation logic
  const isEmailValid = useMemo(() => {
    // Simple regex for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  // Effect to show success toast when isValid is true
  useEffect(() => {
    if (isValid) {
      toast.success("E-mail sent successfully! Please check your E-mail.");
      setIsValid(false);
    }
  }, [isValid]);

  // Handle submit function for sending reset email
  const handleSubmit = async () => {
    if (email.length === 0) {
      toast.error("Error! Please enter an email address.");
      return;
    } else if (!isEmailValid) {
      toast.error("Error! Please enter a valid email address.");
      return;
    }

    try {
      await Post("/api/reset", { email: email });
      setIsValid(true);
    } catch (error) {
      toast.error("Error! Could not send reset E-mail.");
      console.error(error);
    }
  };

  // Handle change function for resetting password
  const handleChange = async (event) => {
    event.preventDefault();
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
      // Send a POST request to the server with the reset password data
      await Post("/api/resetpassword", { email, password, pin });

      toast.success("Password changed successfully!");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      // Log an error if the request fails
      toast.error("Error! Could not reset password.");
      console.error(error);
    }
  };

  return (
    <div className={"mainContainerReset"}>
      <ToastContainer />
      <div className="header-title">Reset</div>
      <Form classname="innerContainer">
        <div className={"inputContainer"}>
          <br />
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
          label="RESET PASSWORD"
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
            const inputPin = event.target.value.replace(/\D/g, "");
            setPin(inputPin);
          }}
        />
        <br />
        {!pinValid ? (
          <div style={{ color: "rgba(186, 26, 26, 1)" }}>
            PIN must be 4 digits.
          </div>
        ) : (
          <></>
        )}
        <br />
        <InputButton
          label="Change Password"
          colour="#3e4a36"
          onClick={handleChange}
        />
      </Form>
    </div>
  );
}
