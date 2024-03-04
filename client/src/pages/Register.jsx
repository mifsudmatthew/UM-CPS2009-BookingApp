import { useState, useMemo } from "react";

import { Post } from "../utils/ApiFunctions";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  // Save registration details from form
  const emailMatch = useMemo(() => {
    return email === confirmEmail;
  }, [email, confirmEmail]);
  const passwordMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  // Send the registration details to the server
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the email and password fields are empty
    if (!email || !password || !name) {
      alert("Please fill in all fields.");
      return;
    }
    // Check if the email is valid
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    const data = {
      email,
      password,
      name,
    };

    console.log("Data:", data);
    try {
      const response = await Post("/api/register", data);

      console.log("Success:", response);
    } catch (err) {
      console.error(err);
    }
  };

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
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className={"inputBox"}
          type="email"
          required
        />
        <br />
        <label>Re-enter email</label>
        <input
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="name@example.com"
          className={"inputBox"}
          type="email"
          required
        />
        {emailMatch ? (
          <></>
        ) : (
          <div style={{ color: "rgba(186, 26, 26, 1)" }}>
            Emails do not match.
          </div>
        )}
        <br />
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
      {passwordMatch ? (
        <></>
      ) : (
        <div style={{ color: "rgba(186, 26, 26, 1)" }}>
          Passwords do not match.
        </div>
      )}
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          value={"Sign up"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Register;
