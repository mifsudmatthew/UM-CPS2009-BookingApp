import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/User";
import { useAuth } from "../context/Auth";

import "../styles/banner.css";

function Banner() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { token } = useAuth();
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    if (token === "") {
      setButtonText("Login");
    } else if (!user.admin) {
      setButtonText("Profile");
    } else {
      setButtonText("Admin Panel");
    }
  }, [token, user.admin]);

  const toLogin = () => {
    if (token === "") {
      navigate("/login", { replace: true });
    } else if (!user.admin) {
      navigate("/profile", { replace: true });
    } else {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <div className="background-container">
      <h2>Your best tennis game</h2>
      <p>Having the best equipment</p>
      <button className="login-button" onClick={toLogin}>
        {buttonText}
      </button>
    </div>
  );
}

export default Banner;
