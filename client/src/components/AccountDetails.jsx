import { useState } from "react";

const AccountDetails = () => {
  // Function to safely parse JSON stored in localStorage
  const getUserData = () => {
    const userJson = localStorage.getItem('user');
    try {
      const user = JSON.parse(userJson);
      return user || {}; // Return an empty object if user does not exist
    } catch (error) {
      console.error('Parsing error on retrieving user data from localStorage', error);
      return {}; // Return an empty object in case of JSON parsing error
    }
  };

  const userData = getUserData(); // Retrieve user data once when the component mounts

  // Initialize state with values from localStorage, or fallback to empty strings
  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");

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
