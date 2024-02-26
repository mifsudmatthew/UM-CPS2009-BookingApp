import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

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
        <a href="" className="forgot-password">Forgot password?</a>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" value={'Log in'} />
      </div>
      <div className="signup">
        Not a member? <a href="#" className="signup-link">Sign up</a>
      </div>
    </div>
  )
}

export default Login