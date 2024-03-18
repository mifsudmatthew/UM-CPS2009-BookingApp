import { useNavigate } from "react-router-dom";

import "../styles/banner.css";

function Banner() {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("login", { replace: true });
  };

  return (
    <div className="background-container">
      <h2>“Your best tennis game”</h2>
      <p>Having the best equipment</p>
      <button className="login-button" onClick={toLogin}>
        Login
      </button>
    </div>
  );
}

export default Banner;
