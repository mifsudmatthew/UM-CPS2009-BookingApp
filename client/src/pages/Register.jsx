import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../utils/ApiFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState(null);
  const [buttonCursor, setButtonCursor] = useState("pointer");

  const emailMatch = useMemo(() => {
    return email === confirmEmail;
  }, [email, confirmEmail]);
  const passwordMatch = useMemo(() => {
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    setButtonCursor("not-allowed");
    setButtonColor("#CCCCCC");

    setTimeout(() => {
      setIsButtonDisabled(false);
      setButtonCursor("pointer");
      setButtonColor(null);
    }, 2000);

    if (!email || !password || !name) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid e-mail format detected.");
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
      navigate("/login", { replace: true });
      console.log("Success:", response);
    } catch (err) {
      toast.error("Account with the same E-mail already exists.");
      console.error(err);
    }
  };

  return (
    <div className={"mainContainer"}>
      <ToastContainer />
      <div className="innerContainer">
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
        <br />
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            value={"Sign up"}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            style={{
              backgroundColor: buttonColor,
              cursor: buttonCursor,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
