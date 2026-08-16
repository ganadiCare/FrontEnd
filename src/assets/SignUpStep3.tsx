import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/templete.css';
import './css/signupstep3.css';
import { useBackGuard } from './hooks/useBackGuard';

import Header from './components/Header';
import Inputbox from './components/Inputbox';
import NavigationButton from './components/NavigationButton';
import Popup from './components/Popup';
import { signup } from '../api/auth';

const SignUpStep3: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { backPopup, setBackPopup } = useBackGuard();
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
  const [birthMonth, setBirthMonth] = useState('01');
  const [birthDay, setBirthDay] = useState('01');
  const [isUnknown, setIsUnknown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 최종 가입하기 핸들러
  const handleSignUp = async () => {
    setIsSubmitting(true);
    try {
      // 한국 나이 기준: 태어난 해에 이미 1살이므로 출생연도 = 현재연도 - 나이 + 1
      const birthYear = age ? new Date().getFullYear() - parseInt(age) + 1 : null;
      const birthday = (!isUnknown && birthYear)
        ? `${birthYear}-${birthMonth}-${birthDay}`
        : '1900-01-01';

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
          birthday,
        },
      });
      if (res.isSuccess) {
        navigate('/signup-complete', { state: { nickname }, replace: true });
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
      <Header title="회원가입" useNotice={false} />

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
              onChange={(val) => setAge(val.replace(/[^0-9]/g, '').slice(0, 2))}
              onClear={() => setAge('')}
              suffix="살"
            />
          </div>

          {/* 5. Weight */}
          <div className="signup-section">
            <label className="signup-label">몸무게</label>
            <Inputbox
              placeholder="반려동물 몸무게를 입력하세요"
              value={weight}
              onChange={(val) => {
                const filtered = val.replace(/[^0-9.]/g, '');
                if (/^\d*\.?\d{0,1}$/.test(filtered)) setWeight(filtered);
              }}
              onClear={() => setWeight('')}
              suffix="kg"
            />
          </div>

          {/* 6. Birthday */}
          <div className="signup-section">
            <label className="signup-label">생일</label>
            <div className="birthday-container">
              <div className="select-input-box">
                <select
                  className="select-input"
                  value={birthMonth}
                  aria-label="month"
                  disabled={isUnknown}
                  onChange={(e) => setBirthMonth(e.target.value)}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const m = String(i + 1).padStart(2, '0');
                    return <option key={m} value={m}>{m}월</option>;
                  })}
                </select>
                <select
                  className="select-input"
                  value={birthDay}
                  aria-label="day"
                  disabled={isUnknown}
                  onChange={(e) => setBirthDay(e.target.value)}
                >
                  {Array.from({ length: 31 }, (_, i) => {
                    const d = String(i + 1).padStart(2, '0');
                    return <option key={d} value={d}>{d}일</option>;
                  })}
                </select>
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
          text={isSubmitting ? '처리 중...' : '가입하기'}
          onClick={handleSignUp}
          disabled={!petName || !species || !gender || isSubmitting}
        />
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

export default SignUpStep3;