import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/signup.css';
import { useSignupForm } from './hooks/useSignupForm';

import Header from './components/Header';
import Inputbox from './components/Inputbox'; 
import NavigationButton from './components/NavigationButton'; 

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  
  // Custom Hook에서 모든 데이터와 로직을 가져옵니다.
  const {
    email, authCode, password, confirmPassword, nickname,
    emailError, passwordError, confirmPasswordError, isAuthSent,
    setEmail, setAuthCode, setPassword, setConfirmPassword, setNickname,
    setEmailError, setPasswordError, setConfirmPasswordError,
    validateEmail, handleSendAuthCode, validatePassword, validateConfirmPassword,
    handleAutoFill,isNextDisabled
  } = useSignupForm(navigate);

  return (
    <div className="signup-wrapper">
      {/* 1. 상단 헤더 */}
      <Header title="회원가입" useNotification={false} />

      {import.meta.env.DEV && (
      <button 
        onClick={handleAutoFill}
        type="button"
        style={{ 
          position: 'absolute', 
          right: '10px', 
          top: '60px', 
          zIndex: 100, 
          fontSize: '10px', 
          opacity: 0.5,
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >자동채우기</button>)}

      <div className="signup-body">
        <div className="signup-form">
          
          {/* 이메일 섹션 */}
          <div className="signup-section">
            <label className="signup-label">이메일 <span className="red">*</span></label>
            <Inputbox 
              placeholder="email@example.com"
              value={email}
              onChange={setEmail}
              onClear={() => { setEmail(''); setEmailError(''); }}
              onBlur={validateEmail}
              sideButtonText="인증하기"
              onSideButtonClick={handleSendAuthCode}
              className={emailError ? 'error' : ''}
            />
            {emailError && <p className="error-txt">{emailError}</p>}
            
            <div style={{ marginTop: '8px' }}>
              <Inputbox 
                placeholder="인증 번호를 입력해 주세요"
                value={authCode}
                onChange={setAuthCode}
                disabled={!isAuthSent}
              />
            </div>
          </div>

          {/* 비밀번호 섹션 */}
          <div className="signup-section">
            <label className="signup-label">비밀번호 <span className="red">*</span></label>
            <Inputbox 
              type="password"
              placeholder="영문/숫자/특수문자 포함 8~20자리"
              value={password}
              onChange={setPassword}
              onClear={() => { setPassword(''); setPasswordError(''); }}
              onBlur={validatePassword}
              className={passwordError ? 'error' : ''}
            />
            {passwordError && <p className="error-txt">{passwordError}</p>}

            <div style={{ marginTop: '8px' }}>
              <Inputbox 
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={setConfirmPassword}
                onClear={() => { setConfirmPassword(''); setConfirmPasswordError(''); }}
                onBlur={validateConfirmPassword}
                className={confirmPasswordError ? 'error' : ''}
              />
            </div>
            {confirmPasswordError && <p className="error-txt">{confirmPasswordError}</p>}
          </div>

          {/* 닉네임 섹션 */}
          <div className="signup-section">
            <label className="signup-label">닉네임 <span className="red">*</span></label>
            <Inputbox 
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={setNickname}
              onClear={() => setNickname('')}
            />
          </div>
        </div>

        {/* 2. 하단 고정 버튼 영역 */}
        <div className="signup-footer">
          <NavigationButton 
            text="NEXT"
            onClick={() => navigate('/signup-step2')}
            disabled={isNextDisabled} // 모든 필드가 채워지고 에러가 없을 때만 활성화
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;