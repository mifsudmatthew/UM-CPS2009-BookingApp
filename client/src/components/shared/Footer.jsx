import logo from "../../assets/logo.png";
import "../../styles/footer.css";
import { useState, useEffect } from "react";
import { useProfile } from "../../context/ProfileContext";

const isAuthenticated = (accessToken) => {
  if (!accessToken) return false;

  return fetch("/api/authenticate", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((response) => {
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return false;
    });
};

const isAdmin = (user) => {
  if (!user) return false;
  return user.admin ? true : false;
};

function Footer() {
  const [authenticated, setAuthenticated] = useState(false); // State variable to store the login status of the user
  const { user, accessToken } = useProfile();
  useEffect(() => {
    const authenticatedResult = async () => {
      setAuthenticated(await isAuthenticated(accessToken));
    };
    authenticatedResult();
  }, [accessToken, setAuthenticated]);
  return (
    <footer className="footer">
      <div>
        <br />
        <div className="footer-content">
          <img src={logo} alt="Logo" />
        </div>
        <div className="footer-bottom">
          <h5>© 2024 ServeSpot</h5>
        </div>
      </div>
      <div>
        <nav>
          <h4>Links</h4>
          <a href="/">Home</a>
          <br />
          {!authenticated ? (
            <>
              <a href="/login">Login</a>
              <br />
              <a href="/register">Register</a>
            </>
          ) : (
            <>
              {!isAdmin(user) ? (
                <>
                  <a href="/profile">Profile</a>
                  <br />
                  <a href="/profile/topup">Topup</a>
                </>
              ) : (
                <a href="/admin">Admin Panel</a>
              )}
            </>
          )}
        </nav>
      </div>
      <div>
        <h4>Contact us</h4>
        <h8>Email: servespot@servspot.com</h8>
        <br />
        <h8>Telephone: 123456789</h8>
        <br />
        <h8>Address: Malta, Malta, MLT123</h8>
      </div>
    </footer>
  );
}

export default Footer;
