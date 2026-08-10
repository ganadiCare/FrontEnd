import { useState } from 'react';
import { sendVerificationEmail, verifyEmailCode } from '../../api/auth';

export const useSignupForm = () => {
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailError, setEmailError] = useState('');
  const [authCodeError, setAuthCodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isAuthSent, setIsAuthSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,20}$/;

  // --- 이메일 형식 검사 ---
  const validateEmail = () => {
    if (email && !emailRegex.test(email)) {
      setEmailError('올바른 이메일 주소를 입력해주세요.');
    } else {
      setEmailError('');
    }
  };

  // --- 인증번호 발송 ---
  const handleSendAuthCode = async () => {
    if (!email || !emailRegex.test(email)) {
      setEmailError('올바른 이메일 주소를 입력해주세요.');
      return;
    }
    setEmailError('');
    setIsSending(true);
    try {
      const res = await sendVerificationEmail(email);
      if (res.isSuccess) {
        setIsAuthSent(true);
        setIsVerified(false);
        setAuthCode('');
        setAuthCodeError('');
        alert('인증번호가 발송되었습니다.');
      } else {
        setEmailError(res.message || '인증번호 발송에 실패했습니다.');
      }
    } catch {
      setEmailError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSending(false);
    }
  };

  // --- 인증번호 확인 ---
  const handleVerifyCode = async () => {
    if (!authCode) {
      setAuthCodeError('인증번호를 입력해주세요.');
      return;
    }
    setIsVerifying(true);
    try {
      const res = await verifyEmailCode(email, authCode);
      if (res.isSuccess) {
        setIsVerified(true);
        setAuthCodeError('');
      } else {
        setIsVerified(false);
        setAuthCodeError(res.message || '인증번호가 올바르지 않습니다.');
      }
    } catch {
      setAuthCodeError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsVerifying(false);
    }
  };

  // --- 비밀번호 검사 ---
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

  // NEXT 버튼 활성화 조건: 이메일 인증 완료 필수
  const isNextDisabled =
    !email || !!emailError ||
    !isVerified ||
    !password || !!passwordError ||
    !confirmPassword || !!confirmPasswordError ||
    !nickname;

  return {
    email, authCode, password, confirmPassword, nickname,
    emailError, authCodeError, passwordError, confirmPasswordError,
    isAuthSent, isVerified, isSending, isVerifying,
    setEmail, setAuthCode, setPassword, setConfirmPassword, setNickname,
    setEmailError, setAuthCodeError, setPasswordError, setConfirmPasswordError,
    validateEmail, handleSendAuthCode, handleVerifyCode,
    validatePassword, validateConfirmPassword,
    isNextDisabled,
  };
};
