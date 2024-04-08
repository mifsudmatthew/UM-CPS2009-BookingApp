import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State variable to disable the sign up button
  const [buttonColor, setButtonColor] = useState(null); // State variable for button color
  const [buttonCursor, setButtonCursor] = useState("pointer"); // State variable for button cursor

  const emailMatch = useMemo(() => {
    return email === confirmEmail; // Checks if email and confirm email match
  }, [email, confirmEmail]);

  const passwordMatch = useMemo(() => {
    return password === confirmPassword; // Checks if password and confirm password match
  }, [password, confirmPassword]);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    setButtonCursor("not-allowed");
    setButtonColor("#CCCCCC");

    setTimeout(() => {
      setIsButtonDisabled(false);
      setButtonCursor("pointer");
      setButtonColor(null);
    }, 2000);

    if (!email || !password || !name) {
      toast.error("Please fill all fields."); // Displays an error toast if any of the required fields are empty
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format detected."); // Displays an error toast if the email format is invalid
      return;
    }

    if (!emailMatch) {
      toast.error("Emails do not match."); // Displays an error toast if the email and confirm email do not match
      return;
    }

    if (!passwordMatch) {
      toast.error("Passwords do not match."); // Displays an error toast if the password and confirm password do not match
      return;
    }

    const data = {
      email,
      password,
      name,
    };

    console.log("Data:", data); // Logs the data object to the console
    try {
      const response = await Post("/api/register", data); // Sends a POST request to the "/api/register" endpoint with the data object
      toast.success("Sign up successful! Redirecting to login."); // Displays a success toast message
      setTimeout(() => {
        navigate("/login", { replace: true }); // Redirects to the login page after a delay
      }, 2000);
      console.log("Success:", response); // Logs the response object to the console
    } catch (err) {
      toast.error("Account with the same E-mail already exists."); // Displays an error toast if an account with the same email already exists
      console.error(err); // Logs the error to the console
    }
  };

  return (
    <div className={"mainContainer"}>
      <ToastContainer /> {/* Container for displaying toast messages */}
      <div className="innerContainer">
        <div className={"titleContainer"}>
          <div>Create Account</div> {/* Title for the register page */}
        </div>
        <br />
        <div className={"inputContainer"}>
          <label>Name & Surname</label> {/* Label for the name input */}
          <input
            placeholder="name surname"
            className={"inputBox"}
            type="text"
            onChange={(e) => setName(e.target.value)} // Updates the name state variable on input change
            required
          />
          <br />
          <label>Email</label> {/* Label for the email input */}
          <input
            onChange={(e) => setEmail(e.target.value)} // Updates the email state variable on input change
            placeholder="name@example.com"
            className={"inputBox"}
            type="email"
            required
          />
          <br />
          <label>Re-enter email</label> {/* Label for the confirm email input */}
          <input
            onChange={(e) => setConfirmEmail(e.target.value)} // Updates the confirm email state variable on input change
            placeholder="name@example.com"
            className={"inputBox"}
            type="email"
            required
          />
          <br />
          <label>Password</label> {/* Label for the password input */}
          <input
            onChange={(e) => setPassword(e.target.value)} // Updates the password state variable on input change
            placeholder="password"
            className={"inputBox"}
            type="password"
            required
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <label>Re-enter Password</label> {/* Label for the confirm password input */}
          <input
            onChange={(e) => setConfirmPassword(e.target.value)} // Updates the confirm password state variable on input change
            placeholder="password"
            className={"inputBox"}
            type="password"
            required
          />
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            value={"Sign up"}
            onClick={handleSubmit} // Calls the handleSubmit function on button click
            disabled={isButtonDisabled} // Disables the button if isButtonDisabled is true
            style={{
              backgroundColor: buttonColor,
              cursor: buttonCursor,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
