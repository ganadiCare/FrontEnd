import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';
import backArrow from './image_folder/Back.png';

interface LoginScreenProps {
  data?:string;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigate = useNavigate()

  return (
    <>
      <header className="header-bar">
        <img 
          src={backArrow} 
          alt="뒤로 가기" 
          className="back-button"
          onClick={()=>navigate(-1)} 
        />
        <h2>LOGIN</h2>
      </header>

      <div className="form-content">
        <form className="login-form">
          
          <div className="input-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input type="text" placeholder="User ID" />
          </div>

          <div className="input-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              <circle cx="12" cy="16" r="1.5" fill="#222"></circle>
            </svg>
            <input type="password" placeholder="Password" />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              <span>remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button 
            type="button" 
            className="auth-button"
            onClick={()=>navigate('/main')}
          >
            LOGIN
          </button>
          
          <a href="#" className="bottom-link">SIGN UP</a>
          
        </form>
      </div>
    </>
  );
};

export default LoginScreen;