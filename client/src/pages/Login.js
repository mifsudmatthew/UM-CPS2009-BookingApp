import {Link} from "react-router-dom";

const Login = () => {

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <label>Email</label>
        <input
          placeholder="name@example.com"
          className={'inputBox'}
          type='email'
          required
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <label>Password</label>
        <input
          placeholder="password"
          className={'inputBox'}
          type='password'
          required
        />
        <a href="/reset" className="forgot-password">Forgot password?</a>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" value={'Log in'} />
      </div>
      <div className="signup">
        Not a member? <Link to="/register" className="signup-link">Sign up</Link>
      </div>
    </div>
  )
}

export default Login