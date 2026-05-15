import { useState } from 'react';

export const useSignupForm = (navigate: (path: string) => void) => {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isAuthSent, setIsAuthSent] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,20}$/;

  // --- 자동 채우기 핸들러 (개발용) ---
  const handleAutoFill = () => {
    setEmail('test@example.com');
    setAuthCode('123456');
    setPassword('test1234!');
    setConfirmPassword('test1234!');
    setNickname('테스터');
    setIsAuthSent(true);
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  // --- 검증 핸들러들 ---
  
  const validateEmail = () => {
    if (email && !emailRegex.test(email)) {
      setEmailError('올바른 이메일 주소를 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  const handleSendAuthCode = () => {
    if (!email || !emailRegex.test(email)) {
      alert('올바르지 않은 이메일 형식입니다.'); 
      setEmailError('올바르지 않은 이메일 형식입니다.'); 
      return;
    }
    setEmailError('');
    setIsAuthSent(true);
    alert('인증번호가 발송되었습니다.');
  };

  const validatePassword = () => {
    if (password && !passwordRegex.test(password)) {
      setPasswordError('비밀번호는 영문/숫자/특수문자를 포함하여 8~20자리로 입력해주세요.');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  // NEXT 버튼 활성화 조건 (모든 필드 채워짐 + 에러 없음)
  const isNextDisabled = 
    !email || !!emailError || 
    !authCode || 
    !password || !!passwordError || 
    !confirmPassword || !!confirmPasswordError || 
    !nickname;

  return {
    email, authCode, password, confirmPassword, nickname,
    emailError, passwordError, confirmPasswordError, isAuthSent,
    setEmail, setAuthCode, setPassword, setConfirmPassword, setNickname,
    setEmailError, setPasswordError, setConfirmPasswordError,
    validateEmail, handleSendAuthCode, validatePassword, validateConfirmPassword,
    handleAutoFill,isNextDisabled
  };
};