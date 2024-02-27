import React, { useState, useEffect } from "react";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }
  , [password, confirmPassword]);

  const handleSubmit = async (event) => {
    const data = {
      email,
      password

    }
    event.preventDefault();
    console.log("Data:", data);
    try {
      const response = await fetch("/api/reset", {
        method: "GET"
      });

      if (response.ok) {
        // Handle response here
        console.log("Success:");
      } else {
        // Handle errors here
        console.error("Error:");
      }
    } catch (error) {
      console.error("Error:");
    }
  };


  return (
    <>
      <h1>Reset</h1>
      <div className={"mainContainer"}>
      <div className={"inputContainer"}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      </div>
      <br />
      <div className={"inputContainer"}>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      </div>
      <br />
      <div className={"inputContainer"}>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      </div>
      <br />
      {!passwordMatch && (
        <div style={{ color: "rgba(186, 26, 26, 1)" }}>
          Passwords do not match.
        </div>
      )}
      <br />
      <div className={"inputContainer"}>
      <button onClick={handleSubmit}>RESET PASSWORD</button>
      </div>
      </div>
    </>

  );
}
