import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <ul>
        <li>
          <Link to="/booking">Booking</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/account/login">Login</Link>
        </li>
        <li>
          <Link to="/account/register">Register</Link>
        </li>
        <li>
          <Link to="/Topup">Topup</Link>
        </li>
        <li>
          <Link to="/ChangePW">Change Password</Link>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
