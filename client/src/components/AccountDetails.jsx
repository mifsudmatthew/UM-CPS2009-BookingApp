import { useState } from "react";

const AccountDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <main className="profile">
      <div className="header-title">Profile</div>
      <form className="profile-form">
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Name Surname"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          placeholder="email@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
    </main>
  );
};

export default AccountDetails;
