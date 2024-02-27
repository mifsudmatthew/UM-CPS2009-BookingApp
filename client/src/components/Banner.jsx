import '../styles/banner.css'; 
import { useNavigate } from 'react-router-dom';

function Banner() {
  let navigate = useNavigate();

  function handleLogin() {
    navigate('/login'); // Replace '/login' with the path to your login page
  }

  return (
    <div className="background-container">
        <h2>“Your best tennis game”</h2>
        <p>Having the best equipment</p>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
    </div>
  );
}

export default Banner;