import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/templete.css';
import './css/signup.css';

import Header from './components/Header';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  // 회원가입 폼 관리용
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  // 에러 메시지 상태 관리
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isAuthSent, setIsAuthSent] = useState(false);

  // 이메일 유효성 검사 함수
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 주소 형식 검사용 
    
    if (!email) {
      setEmailError('올바른 이메일 주소를 입력해주세요.'); 
    } else if (!emailRegex.test(email)) { // 이메일 형식이 올바르지 않은 경우 에러 메세지 띄움
      setEmailError('올바른 이메일 주소를 입력해주세요.');
    } else {
      setEmailError(''); // 정상적인 이메일이면 에러 메시지 초기화
    }
  };

  const handleSendAuthCode = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      alert('올바른 이메일 주소를 입력해주세요.');
    }
    else {
      setIsAuthSent(true); // 인증번호 칸 활성화
      alert('인증번호가 발송되었습니다.');
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,20}$/;
    // 최소 8자, 최대 20자, 영문, 숫자, 특수문자 최소 1개 이상 포함하는 정규식
    if (!password) {
      setPasswordError('비밀번호는 영문/숫자/특수문자를 포함하여 8~20자리로 입력해주세요.');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 영문/숫자/특수문자를 포함하여 8~20자리로 입력해주세요.');
    } else {
      setPasswordError(''); // 조건 만족 시 에러 메시지 초기화
    }
  };

  // 2. 비밀번호 확인 유효성 검사 함수
  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // 다음 페이지로 이동하는 함수
  const handleNext = () => {
    navigate('/signup-step2');
  };

  return (
    <>
      <Header title="회원가입" useNotification={false} />

      <div className="mobile-wrapper">
        <div className="signup-container">
          
          {/* 상단 헤더 영역 */}
          <div className="signup-header">
            <h2 className="signup-title">SIGN UP</h2>
            <div className="step-indicator">
              <span className="step active">1</span>
              <span className="step"></span>
              <span className="step"></span>
            </div>
          </div>
          <hr className="title-line" />

          <main className="signup-form-content">
            
            {/* 이메일 및 인증번호 섹션 */}
            <div className="input-section">
              <label className="input-label"> E-mail <span className="required">*</span></label>
              <div className="input-row">
                <div className="input-box">
                  <input
                    type="email"
                    className={emailError ? 'error-border' : ''}
                    placeholder="Enter your E-Mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value); // 이메일 입력값 업데이트(실시간)
                      if (emailError) setEmailError(''); // 다시 입력하기 시작하면 에러 메시지 숨김
                    }}
                    onBlur={validateEmail} // 포커스가 벗어날 때 이메일 주소 검사 실행 
                  />
                  {email.length > 0 && ( // 이메일 입력값이 있을 때만 X 버튼 표시
                    <button 
                      type="button" 
                      className="clear-btn" 
                      onClick={() => {
                        setEmail(''); // 값 초기화
                        setEmailError(''); // 에러 메시지도 함께 초기화
                      }}
                    > ✕ </button>
                  )}
                </div>
                <button 
                  type="button" 
                  className="side-btn" 
                  onClick={handleSendAuthCode}
                >발송</button>
              </div>

              {/* 이메일 주소 검사 에러 메시지 출력 */}
              {emailError && (
                <div className="error-message" style={{ color: 'red', fontSize: '0.6rem', marginTop: '0px' }}>
                  {emailError}
                </div>
              )}

              <div className="input-row" style={{ marginTop: '10px' }}>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="인증번호 6자리를 입력해주세요"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    disabled={!isAuthSent} // 인증번호 발송 버튼을 눌러야 입력 가능
                  />
                </div>
              </div>
            </div>

            {/* 비밀번호 섹션 */}
            <div className="input-section">
              <label className="input-label">password <span className="required">*</span></label>
              
              {/* 비밀번호 입력칸 */}
              <div className="input-box">
                <input
                  type="password"
                  className={passwordError ? 'error-border' : ''}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  onBlur={validatePassword} // 입력칸에서 포커스가 벗어날 때 검사 실행
                />
                {password.length > 0 && (
                  <button 
                    type="button" 
                    className="clear-btn" 
                    onClick={() => {
                      setPassword('');
                      setPasswordError('');
                    }}
                  > ✕ </button>
                )}
              </div>
              {/* 비밀번호 에러 메시지 출력 */}
              {passwordError && (
                <div className="error-message">
                  {passwordError}
                </div>
              )}

              <div className="input-box" style={{ marginTop: '10px' }}>
                <input
                  type="password"
                  className={confirmPasswordError ? 'error-border' : ''}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError) setConfirmPasswordError('');
                  }}
                  onBlur={validateConfirmPassword} // 입력칸에서 포커스가 벗어날 때 검사 실행
                  disabled={!password || passwordError !== ''}
                />
                {confirmPassword.length > 0 && (
                  <button 
                    type="button" 
                    className="clear-btn" 
                    onClick={() => {
                      setConfirmPassword('');
                      setConfirmPasswordError('');
                    }}
                  > ✕ </button>
                )} 
              </div>
              {/* 비밀번호 확인 에러 메시지 출력 */}
              {confirmPasswordError && (
                <div className="error-message">
                  {confirmPasswordError}
                </div>
              )}
            </div>

            {/* 닉네임 섹션 */}
            <div className="input-section">
              <label className="input-label">Name <span className="required">*</span></label>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Enter your nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                {nickname.length > 0 && (
                  <button 
                    type="button" 
                    className="clear-btn" 
                    onClick={() => {
                      setNickname('');
                    }}
                  > ✕ </button>
                )}
              </div>
            </div>

            {/* 하단 버튼 영역 */}
            <div className="button-section" style={{ textAlign: 'center', marginTop: '40px' }}>
              <button 
                className="next-button" 
                disabled={!email || emailError !== '' || !authCode || !password || passwordError !== '' || !confirmPassword || confirmPasswordError !== '' || !nickname}
                /* 모든 필수 입력값이 채워지고, 에러 메시지가 없는 경우에만 버튼 활성화 */
                onClick={handleNext}>
                NEXT
              </button>
            </div>

          </main>
        </div>
      </div>
    </>
  );
};

export default SignUp;