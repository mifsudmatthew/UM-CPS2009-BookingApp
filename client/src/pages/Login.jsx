import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Save the email and password from the form
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function loginUser(data) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.body.json();
    } else {
      console.log(`${response.status}: ${response.statusText}`);
      return response;
    }
  }

  // Send the login details to the server
  async function handleSubmit(event) {
    // Check if the email and password fields are empty
    if (!email || !password) {
      alert("Please fill in all fields.");
      console.log("Email and password");
      return;
    }
    // Check if the email is valid
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      console.log("Valid email");
      return;
    }
    event.preventDefault();
    const data = {
      email,
      password,
    };
    console.log("Data:", data);
    const token = await loginUser(data);
  }

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
          onChange={handleEmailChange}
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
          onChange={handlePasswordChange}
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
