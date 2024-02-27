import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Save the email and password from the form
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  // Send the login details to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    console.log("Data:", data);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle response 
        console.log("Success:", data);
      } else {
        // Handle errors 
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


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
          required
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <label>Password</label>
        <input
          placeholder="password"
          className={"inputBox"}
          type="password"
          required
        />
        <a href="/reset" className="forgot-password">
          Forgot password?
        </a>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input className={"inputButton"} type="button" value={"Log in"} />
      </div>
      <div className="signup">
        Not a member?{" "}
        <Link to="/register" className="signup-link">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
