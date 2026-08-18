import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';
import NavigationButton from './components/NavigationButton';
import { login } from '../api/auth';
import Header from './components/Header';
import Popup from './components/Popup';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [forgotPopup, setForgotPopup] = useState(false);

  // 뒤로가기(헤더 아이콘 포함) 시 무조건 시작 화면으로 이동
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      navigate('/', { replace: true });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  const [email, setEmail] = useState(() => localStorage.getItem('savedEmail') ?? '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('savedEmail'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await login(email, password);
      if (res.isSuccess) {
        localStorage.setItem('accessToken', res.result.accessToken);
        localStorage.setItem('memberId', String(res.result.memberId));
        if (rememberMe) {
          localStorage.setItem('savedEmail', email);
        } else {
          localStorage.removeItem('savedEmail');
        }
        navigate('/main');
      } else {
        setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch {
      setError('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title="로그인" useNotice={false} />

      <div className="form-content">
        <form className="login-form">

          <div className="input-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
            />
          </div>

          <div className="input-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              <circle cx="12" cy="16" r="1.5" fill="#222"></circle>
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
            />
          </div>

          {error && <p style={{ color: '#e53935', fontSize: '12px', margin: '-20px 0 12px' }}>{error}</p>}

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="custom-checkbox"></span>
              <span>remember me</span>
            </label>
            <a
              className="forgot-password"
              style={{ cursor: 'pointer' }}
              onClick={(e) => { e.preventDefault(); setForgotPopup(true); }}
            >Forgot password?</a>
          </div>

          <NavigationButton
            text={isLoading ? '로그인 중...' : 'LOGIN'}
            onClick={handleLogin}
            disabled={isLoading}
          />

          <a className="bottom-link" onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>SIGN UP</a>

        </form>
      </div>

      <Popup
        popupMessage={
          {
            title: '관리자에게 문의하세요.',
            type: 'OK'
          }
        }
        boxClassName="forgot"
        visible={forgotPopup}
        onOkClick={() => setForgotPopup(false)}
      />
    </>
  );
};

export default LoginScreen;
