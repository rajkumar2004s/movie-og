import Cookie from "js-cookie"

import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import WelcomeToTraiflix from '../WelcomeToTraiflix/WelcomeToTraiflix';
import HomePage from '../HomePage/HomePage';
import ReactContext from '../../ReactContext/ReactContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate= useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [trailRedirect, settraiRedirect]=useState(false)
  const {loggedCheck} = useContext(ReactContext)


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please fill all fields.'); 
      return;
    }

    try {
      const response = await fetch('https://movie-app-server-to5u.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.json();
      setMessage(text.message || text.error);
      if (response.ok) {
        Cookie.set("jwt_token", text.token);
        setPassword('');
        setEmail('');
        loggedCheck()
        settraiRedirect(true);
      }
    } catch (err) {
      console.error(err);
      setMessage('Login failed. Please try again.');
    }
  };
  const registerPage = ()=>{
    navigate('/register')
  }
  useEffect(() => {
  if (trailRedirect) {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [trailRedirect, navigate]);

  if (trailRedirect){
    return <WelcomeToTraiflix/>
  }

  return (
    <div className="loginLoginDiv">
      <form className="loginLoginForm" onSubmit={handleLogin}>
        <h1 className="loginWelcomeHead">Welcome Back</h1>
        <p className="loginWelcomeDes">Sign in to continue your streaming experience</p>

        <div className="loginInputloginContainer">
          <label htmlFor="loginEmail" className="loginEmailLabel">Email</label>
          <div className="loginInputWrapper">
            <i className="fas fa-envelope loginIcon"></i>
            <input
              type="text"
              placeholder="Email"
              id="loginEmail"
              className="loginEmailInput"
               autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="loginInputContainer">
          <label htmlFor="loginPassword" className="loginPasswordLabel">Password</label>
          <div className="loginInputWrapper">
            <i className="fas fa-lock loginIcon"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              id="loginPassword"
              className="loginPasswordInput"
               autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPassword(prev => !prev)}
              style={{ cursor: 'pointer', marginLeft: '8px' }}
            ></i>
          </div>
        </div>

        {/* <div className="loginCheckboxDiv">
          <input type="checkbox" id="rememberMe" />
          <p className="loginCheckPara">Remember Me</p>
        </div> */}

        <button type="submit" className="loginCreateBtn" >Sign In</button>

        <p className="loginAlreadyPara">
          Don't have an account? <span className="loginAlreadySpan" onClick={registerPage}>Register here</span>
        </p>

        <div className="loginSocialDivider">
          <div className="loginLine"></div>
          <span className="loginOrText">Or continue with</span>
          <div className="loginLine"></div>
        </div>

        <div className="loginSocialButtons">
          <button type="button" className="loginSocialBtn">Google</button>
          <button type="button" className="loginSocialBtn">Facebook</button>
        </div>

        <p style={{ color: '#ffb347', textAlign: 'center', minHeight: 24 }}>{message}</p>
      </form>
    </div>
  );
};

export default Login;
