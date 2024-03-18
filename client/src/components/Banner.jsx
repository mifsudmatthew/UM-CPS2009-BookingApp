import { Navigate } from "react-router-dom";

import "../styles/banner.css";

function toLogin() {
  return <Navigate to="login" replace={true} />;
}

function Banner() {
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
