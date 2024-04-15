import { useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import Form from "../form/Form";
import InputBox from "../form/InputBox";
import InputButton from "../form/InputButton";
import { Post } from "../../utils/ApiFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

/**
 * Renders the AccountDetails component.
 *
 * @returns {JSX.Element} The rendered AccountDetails component.
 */

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AccountDetails = () => {
  const { user, updateUser, updateToken } = useProfile(); // Retrieve user data once when the component mounts
  const navigate = useNavigate();

  // Initialize state with values from localStorage, or fallback to empty strings
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setUser({ ...user, name, email });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the email is valid
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format detected.");
      return;
    }

    try {
      const response = await Post("/api/changedetails", { name, email });
      const { accessToken, ...user } = response.data;

      updateToken(accessToken);
      updateUser(user);

      toast.success("Change successful!");
      setTimeout(() => {
        // navigate("/profile", { replace: true });
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(`Error in: ${error}`);
      toast.error("Change failed!");
    }
  };

  return (
    <main className="profile">
      <ToastContainer />
      <div className="header-title">Profile</div>
      <Form>
        <InputBox
          id="AccountDetailsName"
          label="Name"
          value={name}
          placeholder="Name and Surname"
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <InputBox
          id="AccountDetailsEmail"
          label="Email"
          type="email"
          value={email}
          placeholder="bob@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <InputButton type="submit" label="Save" onClick={handleSubmit} />
      </Form>
    </main>
  );
};

export default AccountDetails;
