import logo from "../../assets/logo.png";
import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={logo}></img>
      </div>
      <div className="footer-bottom">
        <h5>© 2024 ServeSpot</h5>
      </div>
    </footer>
  );
}

export default Footer;
