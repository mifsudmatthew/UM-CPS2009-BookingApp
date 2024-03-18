import { useState, useEffect } from "react";

const AccountDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Retrieve the user object from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // If the user object exists and has name and email properties, update the state
    if (user && user.name) setName(user.name);
    if (user && user.email) setEmail(user.email);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <main className="profile">
      <div className="header-title">Profile</div>
      <form className="profile-form">
        <label>Name</label>
        <input disabled
          type="text"
          value={name}
          placeholder="Name Surname"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input disabled
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
