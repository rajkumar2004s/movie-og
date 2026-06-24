import React, { useState,useEffect } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import RedirectToLogin from '../RedirectToLogin/RedirectToLogin';
const Registration = () => {
  const navi = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState(''); // fixed typo to match backend
  const [email, setEmail] = useState('');
  const [showpassword, setShowPassword] = useState(false);
  const [createshowpassword, setShowCreatePassword] = useState(false);
  const [message, setMessage] = useState('');
  const [redirecting,setRedirecting] = useState(false)

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!username || !email || !password || !confirmpassword) {
    setMessage('Please fill all fields.');
    return;
  }

  if (password !== confirmpassword) {
    setMessage('Passwords do not match.');
    return;
  }
  

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      confirmpassword,
      email,
    }),
  };

  try {
    const response = await fetch('https://movie-app-server-to5u.onrender.com/register', options);
    const text = await response.json();
    setMessage(text.message || text.error);
     if (response.ok) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setRedirecting(true);
      }
  } catch (error) {
    setMessage('Registration failed. Please try again.');
    console.error('Error:', error);
  }
};
 useEffect(() => {
  if (redirecting) {
    const timer = setTimeout(() => {
      navi('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [redirecting, navi]);



  if (redirecting) {
    return <RedirectToLogin />;
  }

const directToLogin = ()=>{
    // e.preventDefault()
    navi('/login')
  }
  return (
    <div className="registrationDiv">
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1 className="traiHead">Join Traiflix</h1>
        <p className="traiDes">Create your account to start streaming</p>

        <div className="userDiv inputContainer">
          <label htmlFor="userId" className="userLabel">Username</label>
          <div className="inputWrapper">
            <i className="fas fa-user icon"></i>
            <input
              type="text"
              placeholder="Username"
               autoComplete="off"
              className="userInput"
              id="userId"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="emailDiv inputContainer">
          <label htmlFor="emailId" className="emailLabel">Email</label>
          <div className="inputWrapper">
            <i className="fas fa-envelope icon"></i>
            <input
              type="email"
               autoComplete="off"
              placeholder="Email"
              className="emailInput"
              id="emailId"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="passwordDiv inputContainer">
          <label htmlFor="passwordId" className="passwordLabel">Password</label>
          <div className="inputWrapper">
            <i className="fas fa-lock icon"></i>
            <input
              type={showpassword ? 'text' : 'password'}
              placeholder="Password"
              className="passwordInput"
               autoComplete="off"
              id="passwordId"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fa-regular ${showpassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPassword(prev => !prev)}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>
        </div>

        <div className="confirmpasswordDiv inputContainer">
          <label htmlFor="confirmpasswordId" className="confirmpasswordLabel">Confirm Password</label>
          <div className="inputWrapper">
            <i className="fas fa-lock icon"></i>
            <input
              type={createshowpassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="confirmpasswordInput"
              id="confirmpasswordId"
               autoComplete="off"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i
              className={`fa-regular ${createshowpassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowCreatePassword(prev => !prev)}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>
        </div>

        {/* <div className="checkboxDiv">
          <input type="checkbox" id="checkId" />
          <p className="checkPara">
            I agree to the <span className="checkSpan">Terms of Service</span> and{' '}
            <span className="checkSpan">Privacy Policy</span>
          </p>
        </div> */}

        <div className="createBtnDiv">
          <button type="submit" className="createBtn">
            Create Account
          </button>
        </div>

        <p className="alreadyPara">
          Already have an account? <span className="alreadySpan" onClick={directToLogin}>Sign in here</span>
        </p>
        <p style={{ color: '#ffb347', textAlign: 'center', minHeight: 24 }}>{message}</p>
      </form>
    </div>
  );
};

export default Registration;