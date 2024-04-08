import { useState } from "react";
import { useUser } from "../context/User";

const AccountDetails = () => {
  const { user, setUser } = useUser(); // Retrieve user data once when the component mounts

  // Initialize state with values from localStorage, or fallback to empty strings
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  // Your component JSX remains the same
  return (
    <main className="profile">
      <div className="header-title">Profile</div>
      <form>
        <label>Name</label>
        <br></br>
        <input
          className="inputBox"
          type="text"
          value={name}
          placeholder="Name Surname"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          className="inputBox"
          type="text"
          value={email}
          placeholder="email@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input className={"inputButton"} type="button" value="Save" />
      </form>
    </main>
  );
};

export default AccountDetails;
