import React, { useState, useMemo } from 'react';
import { Post } from "../utils/ApiFunctions"; // Ensure this path matches where your API functions are defined
import { useNavigate } from "react-router-dom";

function ChangePW() {
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // This checks if the passwords entered match
  const passwordMatch = useMemo(() => password === confirmPassword, [password, confirmPassword]);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (!passwordMatch) {
      alert("Passwords do not match.");
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
      <h1>Change Password</h1>
      <div className={"mainContainerReset"}>
        <div className={"inputContainer"}>
          <input
            className="inputBox"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="inputBox"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleChangePassword} disabled={!passwordMatch}>
            Change Password
          </button>
        </div>
        {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match.</p>}
      </div>
    </>
  );
}

export default ChangePW;
