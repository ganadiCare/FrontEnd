import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/templete.css';
import './css/signupstep2.css'; 

import Header from './components/Header';

interface Device {
  nickname: string;
  code: string;
}

const SignUpStep2: React.FC = () => {
  const navigate = useNavigate();

  const [nicknameInput, setNicknameInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [nicknameError, setNicknameError] = useState(''); 
  const [deviceError, setDeviceError] = useState('');


  const [cameraList, setCameraList] = useState<Device[]>([]);
  const [dispenserList, setDispenserList] = useState<Device[]>([]);


  const handleAddDevice = () => {
    const nick = nicknameInput.trim();
    const code = codeInput.trim().toUpperCase();

    // 등록 버튼 누를 때 일단 기존 에러 메시지 초기화
    setNicknameError('');
    setDeviceError('');

    let hasError = false; // 에러가 하나라도 있는지 체크하는 변수

    // 1. 별명 검사
    if (!nick) {
      setNicknameError('기기 별명을 입력해주세요.');
      hasError = true;
    }

    // 2. 코드 검사
    if (!code) {
      setDeviceError('기기 코드를 입력해주세요.');
      hasError = true;
    } else if (!code.startsWith('C') && !code.startsWith('D')) {
      setDeviceError('올바른 기기 코드가 아닙니다. (C 또는 D로 시작)');
      hasError = true;
    }

    // 둘 중 하나라도 에러가 발생했다면 등록 안 하고 여기서 멈춤
    if (hasError) return; 

    // 완벽하게 통과했을 경우 리스트에 추가
    if (code.startsWith('C')) {
      setCameraList([...cameraList, { nickname: nick, code: code }]);
    } else { // 위에서 C, D 검사를 마쳤으므로 여기는 무조건 D입니다.
      setDispenserList([...dispenserList, { nickname: nick, code: code }]);
    }

    // 성공 시 입력칸 비우기
    setNicknameInput(''); 
    setCodeInput('');     
  };
  

  // 삭제 함수
  const handleRemoveCamera = (indexToRemove: number) => {
    setCameraList(cameraList.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveDispenser = (indexToRemove: number) => {
    setDispenserList(dispenserList.filter((_, index) => index !== indexToRemove));
  };

  const handleNext = () => {
    navigate('/signup-step3');
  };

  return (
    <>
      <Header title="회원가입" useNotification={false} />

      <div className="mobile-wrapper">
        <div className="signup-container">
          
          <div className="signup-header">
            <h2 className="signup-title">SIGN UP</h2>
            <div className="step-indicator">
              <span className="step"></span>
              <span className="step active">2</span>
              <span className="step"></span>
            </div>
          </div>
          <hr className="title-line" />

          <main className="signup-form-content">
            
            {/* --- 1. 기기 등록 입력 영역 --- */}
            <div className="device-registration-section">
              <h3 className="section-subtitle">기기 등록</h3>
              
              {/* 기기 별명 입력칸 */}
              <div className="input-section" style={{ marginBottom: '10px' }}>
                <div className="input-row">
                  <div className="input-box">
                    <input
                      type="text"
                      className={nicknameError ? 'error-border' : ''} // 에러 시 붉은 테두리
                      placeholder="기기 별명"
                      value={nicknameInput}
                      onChange={(e) => {
                        setNicknameInput(e.target.value);
                        if (nicknameError) setNicknameError(''); // 타이핑 시작하면 에러 지움
                      }}
                    />
                  </div>
                  {/* 길이 맞춤용 투명 버튼 */}
                  <button type="button" className="register-btn" style={{ visibility: 'hidden' }}>
                    등록
                  </button>
                </div>
                {/* 별명 에러 메시지 */}
                {nicknameError && (
                  <div className="error-message" style={{ marginTop: '5px' }}>{nicknameError}</div>
                )}
              </div>

              {/* 기기 코드 입력칸 + 등록 버튼 */}
              <div className="input-section">
                <div className="input-row">
                  <div className="input-box">
                    <input
                      type="text"
                      className={deviceError ? 'error-border' : ''} // 에러 시 붉은 테두리
                      placeholder="기기 코드 (EX) C107V09881"
                      value={codeInput}
                      onChange={(e) => {
                        setCodeInput(e.target.value);
                        if (deviceError) setDeviceError(''); // 타이핑 시작하면 에러 지움
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddDevice();
                      }}
                    />
                  </div>
                  <button type="button" className="register-btn" onClick={handleAddDevice}>
                    등록
                  </button>
                </div>
                {/* 코드 에러 메시지 */}
                {deviceError && (
                  <div className="error-message" style={{ marginTop: '5px' }}>{deviceError}</div>
                )}
              </div>
            </div>

            <hr className="divider-line" style={{ marginTop: '15px', marginBottom: '  0px' }} />

            {/* --- 2. CAMERA 리스트 영역 --- */}
            <div className="device-list-section">
              <h3 className="section-subtitle">CAMERA <span className="required">*</span></h3>
              
              <div className="list-container">
                {cameraList.length === 0 ? (
                  <div className="empty-text">등록된 카메라가 없습니다.</div>
                ) : (
                  cameraList.map((camera, index) => (
                    <div className="device-item-box" key={`camera-${index}`}>
                      <span className="device-info-text">{camera.nickname} / {camera.code}</span>
                      <button type="button" className="close-icon-btn" onClick={() => handleRemoveCamera(index)}>
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <hr className="divider-line" style={{ marginTop: '15px', marginBottom: '0px' }} />

            {/* --- 3. DISPENSER 리스트 영역 --- */}
            <div className="device-list-section">
              <h3 className="section-subtitle">DISPENSER</h3>
              
              <div className="list-container">
                {dispenserList.length === 0 ? (
                  <div className="empty-text">등록된 디스펜서가 없습니다.</div>
                ) : (
                  dispenserList.map((dispenser, index) => (
                    <div className="device-item-box" key={`dispenser-${index}`}>
                      <span className="device-info-text">{dispenser.nickname} / {dispenser.code}</span>
                      <button type="button" className="close-icon-btn" onClick={() => handleRemoveDispenser(index)}>
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* --- 하단 버튼 영역 --- */}
            <div className="button-section" style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '40px' }}>
              <button className="next-button" onClick={handleNext}>
                NEXT
              </button>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}

export default SignUpStep2;