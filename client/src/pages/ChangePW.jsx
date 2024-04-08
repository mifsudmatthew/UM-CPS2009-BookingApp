import { useState, useMemo } from "react";
import { Post } from "../utils/ApiFunctions";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function toProfile() {
  return <Navigate to="/profile" replace={true} />;
}

/**
 * Renders the Change Password page.
 *
 * @returns {JSX.Element} The Change Password page component.
 */
function ChangePW() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("#3e4a36"); // Add state to store button color
  const [buttonCursor, setButtonCursor] = useState("pointer");

  const canChangePassword = useMemo(
    () =>
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword,
    [password, confirmPassword]
  );

  const handleChangePassword = async (event) => {
    event.preventDefault();

    setIsButtonDisabled(true); // Disable the button
    setButtonCursor("not-allowed"); // Change cursor style
    setButtonColor("#CCCCCC"); // Change button color to visually indicate disabled state
    setTimeout(() => {
      setIsButtonDisabled(false);
      setButtonCursor("pointer"); // Change cursor back to pointer
      setButtonColor("#3e4a36"); // Re-enable the button after 2 seconds and reset color
    }, 2000);

    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Please fill all fields."); // Display error toast if any field is empty
      return;
    }

    if (!canChangePassword) {
      toast.error("Passwords do not match."); // Display error toast if passwords do not match
      return;
    }

    const data = { password };

    try {
      const response = await Post("/api/changepassword", data); // Send a POST request to change the password
      toast.success("Password change successful! Redirecting to profile."); // Display success toast
      console.log("Password change successful:", response);
      toProfile(); // Redirect to the profile page
      setTimeout(() => {
        navigate("/profile", { replace: true });
        setIsButtonDisabled(false); // Re-enable the button after timeout
        setButtonCursor("pointer"); // Restore cursor style
        setButtonColor(null); // Reset button color
      }, 2000);
    } catch (error) {
      toast.error("An error occurred while changing password!"); // Display error toast if an error occurs
      console.error("Change password error:", error);
      setIsButtonDisabled(false); // Re-enable the button on error
      setButtonCursor("pointer"); // Restore cursor style
      setButtonColor(null); // Reset button color
    }
  };

  return (
    <>
      <main className="profile"> 
        <ToastContainer />
        <h1 className="header-title">Change Password</h1>
        <div className={"inputContainer"}> {/* Form to change the user password */}
          <label>New Password</label>
          <input
            className="change_inputBox"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <label>Confirm New Password</label>
          <input
            className="change_inputBox"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br></br>
          <button
            className={"inputButton"} 
            disabled={isButtonDisabled}
            style={{
              color: "white",
              cursor: buttonCursor,
              backgroundColor: buttonColor,
            }}
            onClick={handleChangePassword}>
            Change Password
          </button>
        </div>
      </main>
    </>
  );
}

export default ChangePW;
