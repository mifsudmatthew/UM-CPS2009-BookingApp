import React from 'react';
import "../styles/Login.css";

class Login extends React.Component {
  render() {
  return (
    <> 
    <div className="signin-container">
    <h2>Sign in</h2>
    <form>
      <div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <br/>
            <input type="email" placeholder="name@example.com" required/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <br/>
            <input type="password" placeholder="password" required/>
            <br/>
            <a href="" className="forgot-password">Forgot password?</a>
          </div>
      </div>
      <button type="submit" className="signin-button">Sign in</button>
    </form>
    <div className="signup">
      Not a member? <a href="#" className="signup-link">Sign up</a>
    </div>
  </div>
  </>
    );
  }
}

export default Login;
