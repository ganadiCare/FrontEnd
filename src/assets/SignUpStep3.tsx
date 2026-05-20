import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/signupstep3.css';

import Header from './components/Header';
import Inputbox from './components/Inputbox';
import NavigationButton from './components/NavigationButton';
import DatePicker from './components/DatePicker';
import { signup } from '../api/auth';

const SignUpStep3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    nickname = '',
    email = '',
    password = '',
    cameraCode = '',
    dispenserCode = '',
  } = (location.state as {
    nickname?: string;
    email?: string;
    password?: string;
    cameraCode?: string;
    dispenserCode?: string;
  }) ?? {};

  // 상태 관리
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<'DOG' | 'CAT' | 'ETC' | null>(null);
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | null>(null);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isUnknown, setIsUnknown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 최종 가입하기 핸들러
  const handleSignUp = async () => {
    setIsSubmitting(true);
    try {
      const res = await signup({
        email,
        password,
        nickname,
        device: {
          cameraCode,
          dispenserCode: dispenserCode || 'string',
        },
        pet: {
          name: petName,
          species: species ?? '',
          gender: gender ?? '',
          age: age ? parseInt(age) : 0,
          weight: weight ? parseFloat(weight) : 0,
          birthday: birthday || '1900-01-01',
        },
      });
      if (res.isSuccess) {
        navigate('/signup-complete', { state: { nickname } });
      } else {
        alert(res.message || '회원가입에 실패했습니다.');
      }
    } catch {
      alert('서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
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
              {['DOG', 'CAT', 'ETC'].map((item) => (
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
              <div className={`date-input-wrapper${isUnknown ? ' date-input-disabled' : ''}`}>
                <span className="birthday-date-text">
                  {birthday ? birthday.replace(/-/g, '. ') : '날짜를 선택하세요'}
                </span>
                <DatePicker
                  selectedDate={birthday}
                  onChange={setBirthday}
                  disabled={isUnknown}
                  maxDate={new Date().toISOString().split('T')[0]}
                />
              </div>
              <label className="unknown-checkbox">
                <input
                  type="checkbox"
                  checked={isUnknown}
                  onChange={(e) => {
                    setIsUnknown(e.target.checked);
                    if (e.target.checked) setBirthday('');
                  }}
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
          text={isSubmitting ? '처리 중...' : '가입하기'}
          onClick={handleSignUp}
          disabled={!petName || !species || !gender || isSubmitting}
        />
      </div>
    </div>
  );
};

export default SignUpStep3;