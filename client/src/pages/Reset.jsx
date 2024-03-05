import { useState, useMemo } from "react";
import { Post } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";

const alertUser = () => {
  alert("Eamil sent");
};

export default function Reset() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [isValid, setIsValid] = useState(false);

  const passwordMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const pinValid = useMemo(() => {
    return pin.length === 4;
  }, [pin]);

  // Email validation logic
  const isEmailValid = useMemo(() => {
    // Simple regex for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Post("/api/reset", { email: email });

      setIsValid(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
      pin,
    };

    console.log("Data:", data);
    try {
      const response = await Post("/api/resetpassword", data);

      console.log("Success:", response);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Reset</h1>
      <div className={"mainContainerReset"}>
        <div className={"inputContainer"}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <button onClick={handleSubmit} disabled={!isEmailValid}>
          RESET PASSWORD
        </button>
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
              const inputPin = event.target.value.replace(/\D/g, "");
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
        <div className={"inputContainer"}>
          <button onClick={handleChange} disabled={!passwordMatch || !pinValid}>
            CHANGE PASSWORD
          </button>
        </div>
        <br />
        {isValid ? <p>Alert woop</p> : <></>}
      </div>
    </>
  );
}
