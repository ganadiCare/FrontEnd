import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/signupcomplete.css';
import Header from './components/Header';

const SignUpComplete: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = (location.state as { nickname?: string })?.nickname ?? '반려인';

  return (
    <div className="complete-wrapper">
      <Header title="SIGN UP" useNotification={false} useBack={false} />

      <div className="complete-body">
        <div className="complete-icon">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke="#222" strokeWidth="4" />
            <polyline
              points="30,52 44,66 70,38"
              stroke="#222"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <p className="complete-text">
          <span className="complete-nickname">{nickname}님</span>
          {'\n'}회원가입을 축하드려요!
        </p>
      </div>

      <div className="complete-footer">
        <button className="complete-login-btn" onClick={() => navigate('/login', { replace: true })}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default SignUpComplete;
