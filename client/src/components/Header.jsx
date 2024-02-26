import "../styles/App.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="background">
      <h1>Tennis Booking App</h1>
      <Link to="/">
        <img
          src="https://static.vecteezy.com/system/resources/previews/027/504/381/original/a-tennis-ball-on-a-transparent-background-free-png.png"
          className="logo"
          alt="Tennis Booking App logo"
        />
      </Link>
    </div>
  );
}

export default Header;
