import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/signupStep2.css';
import { useBackGuard } from './hooks/useBackGuard';

import Header from './components/Header';
import Inputbox from './components/Inputbox';
import NavigationButton from './components/NavigationButton';
import Popup from './components/Popup';

interface Device {
  nickname: string;
  code: string;
}

const SignUpStep2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { backPopup, setBackPopup } = useBackGuard();
  const { nickname = '', email = '', password = '' } = (location.state as { nickname?: string; email?: string; password?: string }) ?? {};

  // 1. 상태 관리 (원래 코드 로직 반영)
  const [nicknameInput, setNicknameInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [nicknameError, setNicknameError] = useState(''); 
  const [deviceError, setDeviceError] = useState('');

  const [cameraList, setCameraList] = useState<Device[]>([]);
  const [dispenserList, setDispenserList] = useState<Device[]>([]);

  // 2. 기기 등록 핸들러 (보내주신 로직 그대로 반영)
  const handleAddDevice = () => {
    const nick = nicknameInput.trim();
    const code = codeInput.trim().toUpperCase();

    setNicknameError('');
    setDeviceError('');

    let hasError = false;

    if (!nick) {
      setNicknameError('기기 별명을 입력해주세요.');
      hasError = true;
    }

    if (!code) {
      setDeviceError('기기 코드를 입력해주세요.');
      hasError = true;
    } else if (!code.startsWith('C') && !code.startsWith('D')) {
      setDeviceError('올바른 기기 코드가 아닙니다. (C 또는 D로 시작)');
      hasError = true;
    }

    if (hasError) return; 

    if (code.startsWith('C')) {
      setCameraList([...cameraList, { nickname: nick, code: code }]);
    } else {
      setDispenserList([...dispenserList, { nickname: nick, code: code }]);
    }

    setNicknameInput(''); 
    setCodeInput('');     
  };

  // 3. 삭제 핸들러
  const handleRemoveCamera = (indexToRemove: number) => {
    setCameraList(cameraList.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveDispenser = (indexToRemove: number) => {
    setDispenserList(dispenserList.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="signup-wrapper">
      <Header title="회원가입" useNotice={false} />

      <div className="signup-body">

        <div className="signup-form">
          {/* --- 기기 등록 영역 --- */}
          <div className="signup-section">
            <h3 className="section-subtitle">기기 등록</h3>
            
            <Inputbox 
              placeholder="기기 별명"
              value={nicknameInput}
              onChange={(val) => {
                setNicknameInput(val);
                if (nicknameError) setNicknameError('');
              }}
              className={nicknameError ? 'error' : ''}
            />
            {nicknameError && <p className="error-txt">{nicknameError}</p>}

            <div style={{ marginTop: '10px' }}>
              <Inputbox 
                placeholder="기기 코드 (EX) C107V09881"
                value={codeInput}
                onChange={(val) => {
                  setCodeInput(val);
                  if (deviceError) setDeviceError('');
                }}
                sideButtonText="등록"
                onSideButtonClick={handleAddDevice}
                className={deviceError ? 'error' : ''}
              />
              {deviceError && <p className="error-txt">{deviceError}</p>}
            </div>
          </div>

          <hr className="divider-line" />

          {/* --- CAMERA 리스트 --- */}
          <div className="signup-section">
            <h3 className="section-subtitle">CAMERA <span className="red">*</span></h3>
            <div className="device-list">
              {cameraList.length === 0 ? (
                <div className="empty-text">등록된 카메라가 없습니다.</div>
              ) : (
                cameraList.map((camera, index) => (
                  <div className="added-device-item" key={`camera-${index}`}>
                    <span>{camera.nickname} / {camera.code}</span>
                    <button className="delete-btn" onClick={() => handleRemoveCamera(index)}>✕</button>
                  </div>
                ))
              )}
            </div>
          </div>

          <hr className="divider-line" />

          {/* --- DISPENSER 리스트 --- */}
          <div className="signup-section">
            <h3 className="section-subtitle">DISPENSER</h3>
            <div className="device-list">
              {dispenserList.length === 0 ? (
                <div className="empty-text">등록된 디스펜서가 없습니다.</div>
              ) : (
                dispenserList.map((dispenser, index) => (
                  <div className="added-device-item" key={`dispenser-${index}`}>
                    <span>{dispenser.nickname} / {dispenser.code}</span>
                    <button className="delete-btn" onClick={() => handleRemoveDispenser(index)}>✕</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        
      </div>
      <div className="signup-footer">
          <NavigationButton
            text="NEXT"
            onClick={() => navigate('/signup-step3', {
              state: {
                nickname,
                email,
                password,
                cameraCode: cameraList[0]?.code ?? '',
                dispenserCode: dispenserList[0]?.code ?? '',
              },
              replace: true
            })}
            disabled={cameraList.length === 0}
          />
        </div>

      <Popup
        popupMessage={
          {
            title: '처음 화면으로 이동하시겠습니까?',
            content: '회원가입을 다시 진행해야 합니다.',
            type: 'OX'
          }
        }
        boxClassName="signup"
        visible={backPopup}
        onBackgroundClick={() => setBackPopup(false)}
        onOkClick={() => navigate('/', { replace: true })}
        onCancelClick={() => setBackPopup(false)}
      />
    </div>
  );
};

export default SignUpStep2;