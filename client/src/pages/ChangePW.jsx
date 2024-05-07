/**
 * ChangePW.jsx
 */

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useNotifications } from "../context/NotificationContext";

import { Post } from "../utils/ApiFunctions";

import Form from "../components/form/Form";
import InputBox from "../components/form/InputBox";
import InputButton from "../components/form/InputButton";

/**
 * Renders the Change Password page.
 *
 * @returns {JSX.Element} The Change Password page component.
 */
function ChangePW() {
  const navigate = useNavigate();
  const { storeNotification } = useNotifications();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const canChangePassword = useMemo(() => {
    return (
      password != "" && confirmPassword != "" && password === confirmPassword
    );
  }, [password, confirmPassword]);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Please fill all fields."); // Display error toast if any field is empty
      return;
    }

    if (!canChangePassword) {
      toast.error("Passwords do not match."); // Display error toast if passwords do not match
      return;
    }

    try {
      const response = await Post("/api/changepassword", { password }); // Send a POST request to change the password
      toast.success("Password change successful! Redirecting to profile."); // Display success toast
      console.log("Password change successful:", response);
      storeNotification("Password changed successfully!"); // Store a notification
      navigate("/profile", { replace: true });
    } catch (error) {
      toast.error("An error occurred while changing password!"); // Display error toast if an error occurs
      console.error("Change password error:", error);
    }
  };

  return (
    <main className="profile">
      <div className="header-title">Change Password</div>
      <Form>
        <InputBox
          label="New Password"
          className="change_inputBox"
          placeholder="New Password"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <InputBox
          label="Confirm New Password"
          placeholder="New Password"
          value={confirmPassword}
          type="password"
          className="change_inputBox"
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <br />
        <InputButton
          label="Change Password"
          colour="#3e4a36"
          type="submit"
          onClick={handleChangePassword}
        />
      </Form>
    </main>
  );
}

export default ChangePW;
