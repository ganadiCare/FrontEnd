import React from 'react';
import './css/start.css';
import logoImage from './image_folder/Logo.png'; 
import NavigationButton from './components/NavigationButton';

interface StartScreenProps {
  date?: string;
}

const StartScreen: React.FC<StartScreenProps> = () => {

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

        {/* 로그인 & 회원가입 버튼 영역 */}
        <div className="form-section">
          
          {/* ★ 2. 첫 번째 버튼: E-Mail LOGIN */}
          <NavigationButton 
            text="E-Mail LOGIN" 
            navigateTo="/login" 
          />
          
          <div className="divider">
            <span className="line"></span>
            <span className="or-text">OR</span>
            <span className="line"></span>
          </div>
          
          {/* ★ 3. 두 번째 버튼: SIGN UP */}
          <NavigationButton 
            text="SIGN UP" 
            navigateTo="/signup" 
          />

        </div>

      </div>
    </>
  );
};

export default StartScreen;