import { useState, useMemo } from "react";

import { Post } from "../utils/ApiFunctions";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");

  const passwordMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const pinValid = useMemo(() => {
    return pin.length == 4;
  }, [pin]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
      pin,
    };

    console.log("Data:", data);
    try {
      const response = await Post("/api/reset", data);

      console.log("Success:", response);
    } catch (error) {
      console.error(error);
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
      pin,
    };

    console.log("Data:", data);
    try {
      const response = await Post("/api/changepassword", data);

      console.log("Success:", response);
    } catch (error) {
      console.error(error);
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
            }}
          />
        </div>
        {pinValid ? (
          <></>
        ) : (
          <div style={{ color: "rgba(186, 26, 26, 1)" }}>
            PIN must be 4 digits.
          </div>
        )}
        <br />
        {passwordMatch ? (
          <></>
        ) : (
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
