import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/signup.css';
import { useSignupForm } from './hooks/useSignupForm';
import { useBackGuard } from './hooks/useBackGuard';

import Header from './components/Header';
import Inputbox from './components/Inputbox';
import NavigationButton from './components/NavigationButton';
import Popup from './components/Popup';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { backPopup, setBackPopup } = useBackGuard();

  // Custom Hook에서 모든 데이터와 로직을 가져옵니다.
  const {
    email, authCode, password, confirmPassword, nickname,
    emailError, authCodeError, passwordError, confirmPasswordError,
    isAuthSent, isVerified, isSending, isVerifying,
    setEmail, setAuthCode, setPassword, setConfirmPassword, setNickname,
    setEmailError, setPasswordError, setConfirmPasswordError,
    validateEmail, handleSendAuthCode, handleVerifyCode,
    validatePassword, validateConfirmPassword,
    isNextDisabled,
  } = useSignupForm();

  return (
    <div className="signup-wrapper">
      {/* 1. 상단 헤더 */}
      <Header title="회원가입" useNotice={false} />

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
              sideButtonText={isSending ? '발송중...' : '인증하기'}
              onSideButtonClick={handleSendAuthCode}
              className={emailError ? 'error' : ''}
            />
            {emailError && <p className="error-txt">{emailError}</p>}

            <div style={{ marginTop: '8px' }}>
              <Inputbox
                placeholder="인증 번호를 입력해 주세요"
                value={authCode}
                onChange={setAuthCode}
                disabled={!isAuthSent || isVerified}
                sideButtonText={isVerifying ? '확인중...' : '확인'}
                onSideButtonClick={handleVerifyCode}
                className={authCodeError ? 'error' : isVerified ? 'success' : ''}
              />
            </div>
            {authCodeError && <p className="error-txt">{authCodeError}</p>}
            {isVerified && <p className="success-txt">인증이 완료되었습니다.</p>}
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
            onClick={() => navigate('/signup-step2', { state: { nickname, email, password }, replace: true })}
            disabled={isNextDisabled}
          />
        </div>
      </div>

      <Popup
        popupMessage={
          {
            title: '처음 화면으로 이동하시겠습니까?',
            content: '회원가입을 다시 진행해야 합니다.',
            type: 'OKC'
          }
        }
        boxClassName="signup"
        visible={backPopup}
        onBackgroundClick={() => setBackPopup(false)}
        onOkClick={() => navigate('/', { replace: true })}
      />
    </div>
  );
};

export default SignUp;