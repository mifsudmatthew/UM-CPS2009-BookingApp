import logo from "../../assets/logo.png";
import "../../styles/footer.css";

function Footer() {
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
              <a href="/login">Login</a>
              <br />
              <a href="/register">Register</a>
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