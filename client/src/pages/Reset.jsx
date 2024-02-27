import React, { useState, useEffect } from "react";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [pinValid, setPinValid] = useState(true);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pin.length !== 4) {
      setPinValid(false);
      return;
    }

    const data = {
      email,
      password,
      pin
    };

    console.log("Data:", data);
    try {
      const response = await fetch("/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log("Success:", data);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = async (event) => {
    event.preventDefault();
    if (pin.length !== 4) {
      setPinValid(false);
      return;
    }

    const data = {
      email,
      password,
      pin
    };

    console.log("Data:", data);
    try {
      const response = await fetch("/api/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log("Success:", data);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
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
        <div className={"inputContainer"}>
          <input
            type="text"
            placeholder="PIN (4 digits)"
            value={pin}
            onChange={(event) => {
              const inputPin = event.target.value.replace(/\D/, ""); // Remove non-digit characters
              setPin(inputPin);
              if (inputPin.length === 4) {
                setPinValid(true);
              }
            }}
          />
        </div>
        {!pinValid && (
          <div style={{ color: "rgba(186, 26, 26, 1)" }}>
            PIN must be 4 digits.
          </div>
        )}
        <br />
        {!passwordMatch && (
          <div style={{ color: "rgba(186, 26, 26, 1)" }}>
            Passwords do not match.
          </div>
        )}
        <br />
        <button onClick={handleSubmit}>RESET PASSWORD</button>
        <div className={"inputContainer"}>
          <button onClick={handleChange}>CHANGE PASSWORD</button>
        </div>
      </div>
    </>
  );
}
