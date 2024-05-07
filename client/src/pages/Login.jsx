/**
 * Login.jsv
 * Login form that sends a request to the server to ceate a user
 */

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProfileContext from "../context/ProfileContext";
import NotificationContext from "../context/NotificationContext";

import { Post } from "../utils/ApiFunctions";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Renders the login page.
 *
 * @returns {JSX.Element} The login page component.
 */
function Login() {
  const navigate = useNavigate();
  const { user, updateToken } = useContext(ProfileContext);
  const { storeNotification } = useContext(NotificationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Send the login details to the server
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the email and password fields are empty
    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    // Check if the email is valid
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format detected.");
      return;
    }

    try {
      const { accessToken } = await Post("/api/login", { email, password });

      updateToken(accessToken);

      if (user.admin) {
        toast.success("Login successful! Redirecting to admin panel.");
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 2000);
        return;
      }

      toast.success("Login successful!");
      storeNotification("Login successful!");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      console.error(`Error in: ${error}`);
      toast.error("Login failed. Please check your credentials and try again.");
    }
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
