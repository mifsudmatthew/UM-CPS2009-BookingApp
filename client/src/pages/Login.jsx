import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";

import Auth from "../context/Auth";
import User from "../context/User";

import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = Auth();
  const { setUser } = User();

  // Send the login details to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if the email and password fields are empty
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    // Check if the email is valid
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
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

  // Form to input login detils
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

