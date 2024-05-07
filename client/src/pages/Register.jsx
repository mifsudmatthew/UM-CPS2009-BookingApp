import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Post } from "../utils/ApiFunctions";
import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

import { useNotifications } from "../context/NotificationContext";

/**
 * Renders the Register page component.
 *
 * @returns {JSX.Element} The Register page component.
 */
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // State variable for name input
  const [email, setEmail] = useState(""); // State variable for email input
  const [password, setPassword] = useState(""); // State variable for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State variable for confirm password input
  const [confirmEmail, setConfirmEmail] = useState(""); // State variable for confirm email input
  const { storeNotification } = useNotifications();

  // Using useMemo to memoize whether emails match, preventing unnecessary checks when other fields change
  const emailMatch = useMemo(() => {
    return email === confirmEmail; // Return if email and confirm email match
  }, [email, confirmEmail]);

  // Using useMemo to memoize whether passwords match, preventing unnecessary checks when other fields change.
  const passwordMatch = useMemo(() => {
    return password === confirmPassword; // Return if password and confirm password match
  }, [password, confirmPassword]);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behaviour

    // Checks if any of the required fields are empty
    if (!email || !password || !name) {
      // Displays an error toast if any of the required fields are empty
      toast.error("Please fill all fields.");
      return;
    }

    // Checks if the email is in a valid format
    if (!emailRegex.test(email)) {
      // Displays an error toast if the email is not in a valid format
      toast.error("Invalid email format detected.");
      return;
    }

    // Checks if the email and confirm email match
    if (!emailMatch) {
      // Displays an error toast if the email and confirm email do not match
      toast.error("Emails do not match.");
      return;
    }

    // Checks if the password and confirm password match
    if (!passwordMatch) {
      // Displays an error toast if the password and confirm password do not match
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Attempt to send a POST request to "/api/register" with the data
      await Post("/api/register", { email, password, name });

      // Displays a success toast message
      toast.success("Sign up successful! Redirecting to login.");

      storeNotification("Sign up successful!"); // Stores a notification in local storage

      // Redirects to the login page after 2 seconds
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (err) {
      // Displays an error toast if an account with the same email already exists
      toast.error("Account with the same E-mail already exists.");
      // Logs the error to the console
      console.error(err);
    }
  };

  return (
    <main className={"mainContainer"}>
      {/* Container for displaying toast messages */}
      <Form className="innerContainer">
        <div className={"titleContainer"}>Create Account</div>
        <InputBox
          id="register-name-surname"
          label="Name & Surname"
          placeholder="name surname"
          onChange={(event) => setName(event.target.value)}
          required={true}
        />
        <br />
        <InputBox
          id="register-email"
          label="Email"
          placeholder="name@example.com"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required={true}
        />
        <br />
        <InputBox
          id="register-email-confirm"
          label="Re-enter Email"
          placeholder="name@example.com"
          type="email"
          value={confirmEmail}
          onChange={(event) => setConfirmEmail(event.target.value)}
          required={true}
        />
        <br />
        <InputBox
          id="register-password"
          label="Password"
          placeholder="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required={true}
        />
        <br />
        <InputBox
          id="register-password-confirm"
          label="Re-enter Password"
          type="password"
          placeholder="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required={true}
        />
        <br />
        <InputButton label="Sign Up" type="submit" onClick={handleSubmit} />
      </Form>
    </main>
  );
}

export default Register;
