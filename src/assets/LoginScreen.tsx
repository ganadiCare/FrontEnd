import React, { useState } from 'react'; // 👈 useState를 불러옵니다.
import { useNavigate } from 'react-router-dom';
import './css/login.css';
import backArrow from './image_folder/Back.png';
import NavigationButton from './components/NavigationButton'; // 👈 우리가 만든 버튼 컴포넌트 불러오기

interface LoginScreenProps {
  data?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigate = useNavigate();

  // 1. 사용자가 입력한 아이디와 비밀번호를 저장할 State(상태) 만들기
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 2. 임시 로그인 검증 함수 만들기
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침 되는 것을 막아줍니다.

    // 임시로 설정한 아이디와 비밀번호 (원하는 대로 수정하세요!)
    const tempValidId = 'test';
    const tempValidPassword = '1234';

    if (userId === tempValidId && password === tempValidPassword) {
      // 정보가 맞으면 메인 화면으로 이동
      navigate('/main');
    } else {
      // 정보가 틀리면 경고창 띄우기
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <header className="header-bar">
        <img 
          src={backArrow} 
          alt="뒤로 가기" 
          className="back-button"
          onClick={() => navigate(-1)} 
        />
        <h2>LOGIN</h2>
      </header>

      <div className="form-content">
        <form className="login-form">
          
          <div className="input-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input 
              type="text" 
              placeholder="User ID" 
              value={userId} // 👈 입력창의 값을 State와 연결
              onChange={(e) => setUserId(e.target.value)} // 👈 글자를 칠 때마다 State 업데이트
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
              value={password} // 👈 입력창의 값을 State와 연결
              onChange={(e) => setPassword(e.target.value)} // 👈 글자를 칠 때마다 State 업데이트
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span className="custom-checkbox"></span>
              <span>remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          {/* 3. 기존 <button> 태그 대신 우리가 만든 NavigationButton 사용 */}
          {/* navigateTo를 쓰지 않고, onClick을 통해 handleLogin 함수를 실행시킵니다. */}
          <NavigationButton 
            text="LOGIN" 
            onClick={handleLogin} 
          />
          
          {/* 목업 이미지를 보니 하단 글자가 SIGN UP이 아니라 SIGN IN(또는 그 반대)일 수 있겠네요! */}
          <a href="#" className="bottom-link">SIGN UP</a>
          
        </form>
      </div>
    </>
  );
};

export default LoginScreen;