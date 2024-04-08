import { useState, useMemo, useEffect } from "react";
import { Post } from "../utils/ApiFunctions";
import { Navigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonDisabled2, setIsButtonDisabled2] = useState(false);
  const [buttonColor, setButtonColor] = useState("#3e4a36");
  const [buttonColor2, setButtonColor2] = useState("#3e4a36");
  const [buttonCursor, setButtonCursor] = useState("pointer");
  const [buttonCursor2, setButtonCursor2] = useState("pointer");

  const passwordMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const pinValid = useMemo(() => {
    return pin.length === 4;
  }, [pin]);

  // Email validation logic
  const isEmailValid = useMemo(() => {
    // Simple regex for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  useEffect(() => {
    if (isValid) {
      toast.success("E-mail sent successfully! Please check your E-mail.");
      setIsValid(false);
    }
  }, [isValid]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsButtonDisabled(true);
    setButtonCursor("not-allowed");
    setButtonColor("#CCCCCC");

    setTimeout(() => {
      setIsButtonDisabled(false);
      setButtonCursor("pointer");
      setButtonColor("#3e4a36");
    }, 2000);

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

  const handleChange = async (event) => {
    event.preventDefault();

    setIsButtonDisabled2(true);
    setButtonCursor2("not-allowed");
    setButtonColor2("#CCCCCC");

    setTimeout(() => {
      setIsButtonDisabled2(false);
      setButtonCursor2("pointer");
      setButtonColor2("#3e4a36");
    }, 2000);

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

    const data = {
      email,
      password,
      pin,
    };

    try {
      const response = await Post("/api/resetpassword", data);

      toast.success("Password changed successfully!");

      console.log("Success:", response);

      return <Navigate to="/" replace={true} />;
    } catch (error) {
      toast.error("Error! Could not reset password.");
      console.error(error);
    }
  };

  return (
    <>
      <h1>Reset</h1>
      <div className={"mainContainerReset"}>
        <ToastContainer />
        <div className={"inputContainer"}>
          <br />
          <br />
        </div>
        <div className={"inputContainer"}>
          <input
            className="inputBox"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br></br>
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          style={{
            backgroundColor: buttonColor,
            cursor: buttonCursor,
            color: "white",
          }}>
          RESET PASSWORD
        </button>
        <br />
        <div className={"inputContainer"}>
          <input
            className="inputBox"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            className="inputBox"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            className="inputBox"
            type="text"
            placeholder="PIN (4 digits)"
            value={pin}
            onChange={(event) => {
              const inputPin = event.target.value.replace(/\D/g, "");
              setPin(inputPin);
            }}
          />
        </div>
        {pinValid ? (
          <></>
        ) : (
          <div style={{ color: "rgba(186, 26, 26, 1)" }}>
            PIN must be 4 digits.
          </div>
        )}
        <br />
        <br />
        <div className={"inputContainer"}>
          <button
            onClick={handleChange}
            disabled={isButtonDisabled2}
            style={{
              backgroundColor: buttonColor2,
              cursor: buttonCursor2,
              color: "white",
            }}>
            CHANGE PASSWORD
          </button>
        </div>
      </div>
    </>
  );
}
