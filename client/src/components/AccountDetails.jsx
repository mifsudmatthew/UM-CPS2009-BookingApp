import { useState } from "react";

const AccountDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <main className="profile">
      <div className="header-title">Profile</div>
      <form >
        <label>Name</label>
        <br></br>
        <input
          className="inputBox"
          type="text"
          value={name}
          placeholder="Name Surname"
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <br></br>
        <label>Email</label>
        <br></br>
        <input
          className="inputBox"
          type="text"
          value={email}
          placeholder="email@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          className={"inputButton"}
          type="button"
          value="Save"
        />
      </form>
    </main>
  );
};

export default AccountDetails;
