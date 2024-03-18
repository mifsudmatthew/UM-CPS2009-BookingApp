import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";

import Auth from "../context/Auth";
import User from "../context/User";

import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add this line
  const { setToken } = Auth();
  const { setUser } = User();

  // Send the login details to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true); // Disable the button when the form is submitted
    setTimeout(() => setIsButtonDisabled(false), 2000); // Re-enable the button after 2 seconds

    // Check if the email and password fields are empty
    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }
    // Check if the email is valid
    if (!email.includes("@")) {
      toast.error("Invalid e-mail format detected.");
      return;
    }

    try {
      const response = await Post("/api/login", { email, password });
      try {
        const { accessToken, ...userData } = response;
        setToken(accessToken);
        setUser(userData);
      } finally {
        navigate("/profile");
      }
    } catch (error) {
      console.error(`Error in: ${error}`);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  // Form to input login details
  return (
    <div className={"mainContainer"}>
      <ToastContainer />
      <div className="innerContainer">
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label>Email</label>
        <input
          placeholder="name@example.com"
          className={"inputBox"}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password</label>
        <input
          placeholder="password"
          className={"inputBox"}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link to="/reset" className="forgot-password">
          Forgot password?
        </Link>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          value={"Log in"}
          onClick={handleSubmit}
          disabled={isButtonDisabled} // Add the disabled attribute here
        />
      </div>
      <div className="signup">
        Not a member?{" "}
        <Link to="/register" className="signup-link">
          Sign up
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Login;
