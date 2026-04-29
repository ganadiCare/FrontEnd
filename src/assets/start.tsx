import React from 'react';
import './css/start.css';
import logoImage from './image_folder/Logo.png'; 

interface StartScreenProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onLoginClick, onSignUpClick }) => {
  return (
    <div className="mobile-wrapper">
      
      <div className="login-container">
        
        <div className="logo-section">
          <img 
            src={logoImage} 
            alt="TEAM. animal daisuki Logo" 
            className="logo-image" 
          />
          <h1 className="brand-title">TEAM. animal daisuki</h1>
        </div>

        {/* 로그인 버튼 */}
        <div className="form-section">
          <button 
            type="button" 
            className="auth-button"
            onClick={onLoginClick}
          >
            E-Mail LOGIN
          </button>
          
          <div className="divider">
            <span className="line"></span>
            <span className="or-text">OR</span>
            <span className="line"></span>
          </div>
          
          <button 
            type="button" 
            className="auth-button"
            onClick={onSignUpClick}
          >
            SIGN UP
          </button>
        </div>

      </div>
    </div>
  );
};

export default StartScreen;
