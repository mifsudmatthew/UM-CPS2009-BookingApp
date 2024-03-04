import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";

import { useToken } from "../hooks/useToken";
import { useUser } from "../hooks/useUser";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setTokens } = useToken();
  const { setUser } = useUser();

  // Send the login details to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if the email and password fields are empty
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    // Check if the email is valid
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await Post("/api/login", { email, password });

      let { accessToken, refreshToken, ...userData } = response;

      setTokens(accessToken, refreshToken);
      setUser(userData);

      navigate("/reset");
    } catch (error) {
      console.error(`Error in ${error}`);
    }
  };

  // Form to input login detils
  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label>Email</label>
        <input
          placeholder="name@example.com"
          className={"inputBox"}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password</label>
        <input
          placeholder="password"
          className={"inputBox"}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link to="/reset" className="forgot-password">
          Forgot password?
        </Link>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          value={"Log in"}
          onClick={handleSubmit}
        />
      </div>
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
