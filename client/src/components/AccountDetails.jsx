import { useState } from "react";
import { useUser } from "../context/User";
import Form from "../components/Form";
import InputBox from "../components/InputBox";
import InputButton from "../components/InputButton";

/**
 * Renders the AccountDetails component.
 *
 * @returns {JSX.Element} The rendered AccountDetails component.
 */
const AccountDetails = () => {
  const { user, setUser } = useUser(); // Retrieve user data once when the component mounts

  // Initialize state with values from localStorage, or fallback to empty strings
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser({ name, email, ...user });
  };

  const handleName = (value) => {
    setName(value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  return (
    <main className="profile">
      <div className="header-title">Profile</div>
      <Form>
        <InputBox
          id="AccountDetailsName"
          label="Name"
          value={name}
          placeholder="Name and Surname"
          onChange={handleName}
        />
        <br />
        <InputBox
          id="AccountDetailsEmail"
          label="Email"
          type="email"
          value={email}
          placeholder="bob@gmail.com"
          onChange={handleEmail}
        />
        <br />
        <InputButton type="submit" label="Save" onClick={handleSubmit} />
      </Form>
    </main>
  );
};

export default AccountDetails;
