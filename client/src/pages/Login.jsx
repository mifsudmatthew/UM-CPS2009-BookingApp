import { useState } from "react";
import { Link } from "react-router-dom";

import { Post } from "../utils/ApiFunctions";

import { useToken } from "../hooks/useToken";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useToken();

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
      const token = await Post("/api/login", { email, password });

      console.log(token);
      setToken(token);
    } catch (error) {
      console.error(`Error in ${error}`);
    }
  };

  // Form to input login detils
  return (
    <div className={"mainContainer"}>
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
      </div>
      <br />
      <div className={"inputContainer"}>
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
  );
}

export default Login;
