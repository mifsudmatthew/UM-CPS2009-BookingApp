import { useState, useMemo } from "react";
import { Post } from "../utils/ApiFunctions"; // Ensure this path matches where your API functions are defined
import { useNavigate } from "react-router-dom";

function ChangePW() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // This checks if the passwords entered match and are not empty
  const canChangePassword = useMemo(
    () => password.length > 0 && confirmPassword.length > 0 && password === confirmPassword,
    [password, confirmPassword]
  );

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (!canChangePassword) {
      alert("Passwords do not match or fields are empty.");
      return;
    }

    // Assuming your API requires just the new password for a change password functionality
    const data = { password };

    try {
      const response = await Post("/api/changepassword", data); // Adjust the endpoint as per your API's specification
      console.log("Password change successful:", response);
      navigate("/profile"); // Navigate to login or any other page as required
    } catch (error) {
      alert("Error changing password.");
      console.error("Change password error:", error);
    }
  };

  return (
    <>
      <main className="profile">
        <h1 className="header-title">Change Password</h1>
        <div className={"inputContainer"}>
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
          <button className="inputButton" onClick={handleChangePassword} disabled={!canChangePassword}>
            Change Password
          </button>
        </div>
        {!canChangePassword && password.length > 0 && confirmPassword.length > 0 && (
          <div style={{ color: "rgba(186, 26, 26, 1)" }}>
            Passwords do not match.
          </div>
        )}
      </main>
    </>
  );
}

export default ChangePW;
