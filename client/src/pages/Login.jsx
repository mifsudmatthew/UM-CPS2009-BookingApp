/**
 * @file Login.jsx
 * @desc Renders the login page component. A login form that sends a request to the server to create a user.
 */

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProfileContext from "../context/ProfileContext";
import NotificationContext from "../context/NotificationContext";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

import { Post } from "../utils/ApiFunctions";
import { checkEmail } from "../utils/EmailTest";

/**
 * Renders the login page.
 * @category Front-end
 * @returns {JSX.Element} The login page component.
 */
function Login() {
  const navigate = useNavigate(); // Get the navigate function from the router
  const { user, updateToken } = useContext(ProfileContext); // Get the user and updateToken function from the ProfileContext
  const { storeNotification } = useContext(NotificationContext); // Get the storeNotification function from the NotificationContext

  const [email, setEmail] = useState(""); // Creating a state variable for the email
  const [password, setPassword] = useState(""); // Creating a state variable for the password

  // Send the login details to the server
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behaviour

    // Check if the email and password fields are empty
    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    // Check if the email is valid
    if (!checkEmail(email)) {
      toast.error("Invalid email format detected.");
      return;
    }

    // Attempt to send a POST request to login with the email and password
    const response = await Post("/api/login", { email, password });
    if (!response.result) {
      console.error(`Error in: ${response.error}`);
      toast.error("Login failed. Please check your credentials and try again.");
      return;
    }

    updateToken(response.data); // Update the access token.

    // Check if the user is an admin
    if (user.admin) {
      toast.success(
        "Login successful! Admin account, redirecting to home page"
      ); // Display a success toast if the login is successful
      // Redirect to the admin home page after 2 seconds
      setTimeout(() => navigate("/", { replace: true }), 2000);
      return;
    }

    // Display a success toast if the login is successful
    toast.success("Login successful! Redirecting to home.");
    // Store a notification in local storage
    storeNotification("Login successful!");
    // Redirect to the home page after 2 seconds
    setTimeout(() => navigate("/", { replace: true }), 2000);
  };

  return (
    <main className="mainContainerLogin">
      <Form>
        <div className={"titleContainer"}>Login</div>
        <InputBox
          id="loginEmail"
          label="Email"
          type="email"
          value={email}
          placeholder="name@example.com"
          onChange={(event) => setEmail(event.target.value)}
          required={true}
        />
        <br />
        <InputBox
          id="loginPassword"
          label="Password"
          type="password"
          value={password}
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
          required={true}
        />
        <Link to="/reset" className="forgot-password">
          Forgot password?
        </Link>
        <br />
        <InputButton label="Login" type="submit" onClick={handleSubmit} />
        <br />
        <div className="signup">
          Not a member?{" "}
          <Link to="/register" className="signup-link">
            Sign up
          </Link>
        </div>
      </Form>
    </main>
  );
}

export default Login;
