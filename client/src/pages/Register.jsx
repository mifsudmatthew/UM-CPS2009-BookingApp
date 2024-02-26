import React, { useState, useEffect } from "react";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailMatch, setEmailMatch] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setEmailMatch(email === confirmEmail);
  }, [email, confirmEmail]);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Create Account</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label>Name & Surname</label>
        <input
          placeholder="name surname"
          className={"inputBox"}
          type="text"
          required
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className={"inputBox"}
          type="email"
          required
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <label>Re-enter email</label>
        <input
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="name@example.com"
          className={"inputBox"}
          type="email"
          required
        />
        {!emailMatch && (
          <div style={{ color: "rgba(186, 26, 26, 1)" }}>
            Emails do not match.
          </div>
        )}
      </div>
      <br />
      <div className={"inputContainer"}>
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className={"inputBox"}
          type="password"
          required
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <label>Re-enter Password</label>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="password"
          className={"inputBox"}
          type="password"
          required
        />
      </div>
      {!passwordMatch && (
        <div style={{ color: "rgba(186, 26, 26, 1)" }}>
          Passwords do not match.
        </div>
      )}
      <br />
      <div className={"inputContainer"}>
        <input className={"inputButton"} type="button" value={"Sign up"} />
      </div>
    </div>
  );
};

export default Register;
