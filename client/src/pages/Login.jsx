import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

async function loginUser(data) {
  return await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    const token = await loginUser({ email, password });

    if (token.ok) {
      setToken(token);
    } else {
      console.log(`Error in login: Code ${token.status}: ${token.statusText}`);
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
