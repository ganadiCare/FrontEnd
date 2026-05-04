import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/start.css';
import logoImage from './image_folder/Logo.png'; 

interface StartScreenProps {
  date?: string;
}

const StartScreen: React.FC<StartScreenProps> = (
  //{}
) => {
  const navigate = useNavigate()
  return (
    <>
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
            onClick={()=>navigate('/login')}
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
            onClick={()=>navigate('/signup')}
          >
            SIGN UP
          </button>
        </div>

      </div>
    </>
  );
};

export default StartScreen;
