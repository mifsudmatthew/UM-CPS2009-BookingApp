import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/Auth";
import { useUser } from "../context/User";
import { Post } from "../utils/ApiFunctions";
import Form from "../components/Form";
import InputBox from "../components/InputBox";
import InputButton from "../components/InputButton";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const { setToken } = useAuth();

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Send the login details to the server
  const handleSubmit = async () => {
    // Check if the email and password fields are empty
    if (!email || !password) {
      toast.error("Please fill all fields.");
      return;
    }
    // Check if the email is valid
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format detected.");
      return;
    }

    try {
      const response = await Post("/api/login", { email, password });
      const { accessToken, ...user } = response;

      setToken(accessToken);
      setUser(user);

      if (user.admin) {
        toast.success("Login successful! Redirecting to admin panel.");
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 2000);
        return;
      }

      toast.success("Login successful! Redirecting to profile.");

      setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 2000);
    } catch (error) {
      console.error(`Error in: ${error}`);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="mainContainer">
      <ToastContainer />
      <Form classname="innerContainer" onSubmit={handleSubmit}>
        <div className={"titleContainer"}>Login</div>
        <br />
        <InputBox
          id="loginEmail"
          label="Email"
          type="email"
          value={email}
          placeholder="name@example.com"
          onChange={setEmail}
          required={true}
        />
        <br />
        <InputBox
          id="loginPassword"
          label="Password"
          type="password"
          value={password}
          placeholder="password"
          onChange={setPassword}
          required={true}
        />
        <Link to="/reset" className="forgot-password">
          Forgot password?
        </Link>
      </Form>
      <InputButton label="login" type="submit" />
      <br />
      <div className="signup">
        Not a member?{" "}
        <Link to="/register" className="signup-link">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
