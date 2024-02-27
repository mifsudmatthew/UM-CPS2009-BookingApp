import { NavLink } from 'react-router-dom'
import logo from '../assets/racket.png';
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
      <div className="navbar-logo">
        <img src={logo} alt="logo" />
      </div>
        <div className="nav-elements">
          <ul>
            <li>
             <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar