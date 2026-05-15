import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/signupstep3.css';

import Header from './components/Header';
import Inputbox from './components/Inputbox';
import NavigationButton from './components/NavigationButton';

const SignUpStep3: React.FC = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<'DOG' | 'CAT' | 'ETC.' | null>(null);
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | null>(null);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isUnknown, setIsUnknown] = useState(false);

  

  // 최종 가입하기 핸들러
  const handleSignUp = () => {
    alert('회원가입이 완료되었습니다!');
    navigate('/main');
  };

  return (
    <div className="signup-wrapper">
      <Header title="SIGN UP" useNotification={false} />

      <div className="signup-body">
        <div className="signup-form">
          
          {/* 1. Pet Name */}
          <div className="signup-section">
            <label className="signup-label"> 반려동물 이름 <span className="red">*</span></label>
            <Inputbox 
              placeholder="반려동물 이름을 입력하세요"
              value={petName}
              onChange={(val) => setPetName(val.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]/g, ''))}
              onClear={() => setPetName('')}
            />
          </div>

          {/* 2. Species */}
          <div className="signup-section">
            <label className="signup-label"> 종 <span className="red">*</span></label>
            <div className="selection-row species-row">
              {['DOG', 'CAT', 'ETC.'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`select-btn species-btn ${species === item ? 'active' : ''}`}
                  onClick={() => setSpecies(item as any)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Gender */}
          <div className="signup-section">
            <label className="signup-label"> 성별 <span className="red">*</span></label>
            <div className="selection-row gender-row">
              {['MALE', 'FEMALE'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`select-btn gender-btn ${gender === item ? 'active' : ''}`}
                  onClick={() => setGender(item as any)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Age */}
          <div className="signup-section">
            <label className="signup-label">나이</label>
            <Inputbox 
              placeholder="반려동물 나이를 입력하세요"
              value={age}
              onChange={(val) => setAge(val.replace(/[^0-9]/g, ''))}
              onClear={() => setAge('')}
            />
          </div>

          {/* 5. Weight */}
          <div className="signup-section">
            <label className="signup-label">몸무게</label>
            <Inputbox 
              placeholder="반려동물 몸무게를 입력하세요"
              value={weight}
              onChange={(val) => setWeight(val.replace(/[^0-9]/g, ''))}
              onClear={() => setWeight('')}
            />
          </div>

          {/* 6. Birthday */}
          <div className="signup-section">
            <label className="signup-label">생일</label>
            <div className="birthday-container">
              <div className="date-input-wrapper">
                <input 
                  type="date" 
                  className="date-input"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  disabled={isUnknown}
                  placeholder="YYYY - MM - DD"
                />
              </div>
              <label className="unknown-checkbox">
                <input 
                  type="checkbox" 
                  checked={isUnknown}
                  onChange={(e) => setIsUnknown(e.target.checked)}
                />
                <span className="checkbox-text">Unknown</span>
              </label>
            </div>
          </div>

        </div>
      </div>

      {/* 하단 가입하기 버튼 */}
      <div className="signup-footer">
        <NavigationButton 
          text="가입하기"
          onClick={handleSignUp}
          disabled={!petName || !species || !gender}
        />
      </div>
    </div>
  );
};

export default SignUpStep3;