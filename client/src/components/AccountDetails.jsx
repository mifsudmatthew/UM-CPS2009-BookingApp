import { useState } from "react";
import { useUser } from "../context/User";
import Form from "../components/Form";
import InputBox from "../components/InputBox";
import InputButton from "../components/InputButton";

const AccountDetails = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
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
      <h2 className="header-title">Profile</h2>
      <Form onSubmit={handleSubmit}>
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
        <InputButton type="submit" label="Save" />
      </Form>
    </main>
  );
};

export default AccountDetails;
