import logo from "../../assets/logo.png";
import "../../styles/footer.css";
import { useState, useEffect } from "react";
import { useProfile } from "../../context/ProfileContext";

// Function to check if the user is authenticated
const isAuthenticated = (accessToken) => {
  if (!accessToken) return false; // If the access token is not defined, return false
  // Otherwise, make a request to authenticate the user
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

// Function to check if the user is an admin
const isAdmin = (user) => {
  if (!user) return false; // If the user is not defined, return false
  return user.admin ? true : false; // Return true if the user is an admin, else return false
};

function Footer() {
  const [authenticated, setAuthenticated] = useState(false); // State variable to store the login status of the user
  const { user, accessToken } = useProfile(); // Get the user and access token from the ProfileContext

  // Check if the user is authenticated every time the access token changes
  useEffect(() => {
    // Function to check the authentication status
    const authenticatedResult = async () => {
      setAuthenticated(await isAuthenticated(accessToken)); // Set the authentication status based on the access token
    };
    authenticatedResult(); // Call the function to check the authentication status
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
          <div className="footer-heading">Links</div>
          <a href="/">Home</a>
          <br />
          {
            /*Display login page and register page if not authenticated*/ !authenticated ? (
              <>
                <a href="/login">Login</a>
                <br />
                <a href="/register">Register</a>
              </>
            ) : (
              <>
                {
                  /*Display profile page and topup page if authenticated but not admin*/ !isAdmin(user) ? (
                    <>
                      <a href="/profile">Profile</a>
                      <br />
                      <a href="/profile/topup">Topup</a>
                    </>
                  ) : (/**Otherwise display admin page */
                    <a href="/admin">Admin Panel</a>
                  )
                }
              </>
            )
          }
        </nav>
      </div>
      <div>
        <div className="footer-heading">Contact Us</div>
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
