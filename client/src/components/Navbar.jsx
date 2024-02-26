import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <ul>
        <li>
          <Link to="/booking">Booking</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/profile/topup">Topup</Link>
        </li>
        <li>
          <Link to="/profile/changepassword">Change Password</Link>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
