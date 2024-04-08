import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";
import { ToastContainer, toast } from "react-toastify";

import Form from "../components/Form";
import InputBox from "../components/InputBox";
import InputButton from "../components/InputButton";

import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const emailMatch = useMemo(() => {
    return email === confirmEmail;
  }, [email, confirmEmail]);
  const passwordMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format detected.");
      return;
    }

    if (!emailMatch) {
      toast.error("Emails do not match.");
      return;
    }

    if (!passwordMatch) {
      toast.error("Passwords do not match.");
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
      toast.success("Sign up successful! Redirecting to login.");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
      console.log("Success:", response);
    } catch (err) {
      toast.error("Account with the same E-mail already exists.");
      console.error(err);
    }
  };

  return (
    <div className={"mainContainer"}>
      <ToastContainer />
      <div className={"titleContainer"}>
        <div>Create Account</div>
      </div>
      <br />
      <Form className="innerContainer">
        <InputBox
          label="Name & Surname"
          placeholder="name surname"
          onChange={setName}
          required={true}
        />
        <br />
        <InputBox
          label="Email"
          onChange={setEmail}
          placeholder="name@example.com"
          type="email"
          required={true}
        />
        <br />
        <InputBox
          label="Re-enter Email"
          onChange={setConfirmEmail}
          placeholder="name@example.com"
          type="email"
          required={true}
        />
        <br />
        <InputBox
          label="Password"
          type="password"
          placeholder="password"
          onChange={setPassword}
          required={true}
        />
        <br />
        <InputBox
          label="Re-enter Password"
          type="password"
          placeholder="password"
          onChange={setConfirmPassword}
          required={true}
        />
        <br />
        <InputButton label="Sign Up" type="submit" onClick={handleSubmit} />
      </Form>
    </div>
  );
}

export default Register;
