import { useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import Form from "../form/Form";
import InputBox from "../form/InputBox";
import InputButton from "../form/InputButton";

/**
 * Renders the AccountDetails component.
 *
 * @returns {JSX.Element} The rendered AccountDetails component.
 */
const AccountDetails = () => {
  const { user, setUser: updateUser } = useProfile(); // Retrieve user data once when the component mounts

  // Initialize state with values from localStorage, or fallback to empty strings
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ ...user, name, email });
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
