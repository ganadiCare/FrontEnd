import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useCamera } from './store/useCamera';
import type { components } from './service/api';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Loading from './components/Loading';

type UpdateCameraData = components['schemas']['UpdateCameraDTO'];
type NightVisionType = "AUTO" | "ON" | "OFF" | undefined;

const CameraScreen: React.FC = () => {
  const navigate = useNavigate();
  const currentScreen = 'camera';

  const { cameraData, isCameraLoading, updateCamera, isUpdatingCamera } = useCamera();

  //const [select, setSelect] = useState(camList?.[0]);
  const [prevData, setPrevData] = useState(cameraData);
  const [deviceName, setDeviceName] = useState(cameraData?.deviceName ?? '');
  const [nameError, setNameError] = useState('');
  const [nightVision, setNightVision] = useState(cameraData?.nightVision ?? undefined);
  const [privateMode, setPrivateMode] = useState(cameraData?.isPrivateMode ?? true);

  if (cameraData !== prevData) {
    setPrevData(cameraData);
    setDeviceName(cameraData?.deviceName ?? '');
    setNightVision(cameraData?.nightVision ?? undefined);
    setPrivateMode(cameraData?.isPrivateMode ?? true);
  }

  const updateSetting = async(name?: string, night?: NightVisionType , priv?: boolean) => {
    const targetName = name ?? deviceName;
    const targetNight = night ?? nightVision;
    const targetPriv = priv ?? privateMode;

    const updateData : UpdateCameraData = {
      deviceName: targetName,
      nightVision: targetNight,
      isPrivateMode: targetPriv,
      isAutoRecordMode: cameraData?.isAutoRecordMode ?? false
    };
    updateCamera(updateData);
  }

  const handleTogglePrivateMode = async() => {
    const mode = !privateMode;
    setPrivateMode(mode);
    updateSetting(deviceName, nightVision, mode);
  };

  const handleRadioNightVision = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const mode= e.target.value.toUpperCase() as NightVisionType;
    setNightVision(mode);
    updateSetting(deviceName, mode, privateMode);
  }

  const changeDeviceName = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDeviceName(e.target.value);
  }
  
  const saveDeviceName = async() => {
    if (!deviceName?.trim()) {
      setNameError('이름을 입력해주세요.');
    }
    else {
      setNameError('');
      updateSetting();
    }
  }

  return (
    <>
      <Header title='CAMERA'/>

      <main className="main-content">
        <section className="main-section">
          <div className='heading-wrapper'>
            <h2 className='section-heading'>카메라 설정</h2>
            <select
              className='select-input'
              id='select'
              aria-label='select'
              //value={select}
            >
            </select>
          </div>
          
          <form className='input-form' action="">
            <div className='input-box column'>
              <label className='input-label'>기기 이름
                <div className='input-box row'>
                  <input className='text-input'
                    type="text"
                    value={deviceName}
                    placeholder='카메라 이름'
                    onChange={changeDeviceName}
                  />
                  <button
                    type='button'
                    className='small-button'
                    onClick={()=>saveDeviceName()}
                  >{isUpdatingCamera ? '저장 중...' : '저장'}</button>
                </div>
              </label>
              <p className='message error'>{nameError}</p>
            </div>

            <div className='input-box row'>
              <label className='input-label'>기기 코드</label>
              <p className='input-fixed-value'>{ cameraData?.deviceCode ?? '???' }</p>
            </div>
            
            <div className='input-box row'>
              <label htmlFor="private-toggle"className='input-label'>카메라 차단</label>
              <input type="checkbox" id="private-toggle" className="toggle-input"
              checked={privateMode} onClick={handleTogglePrivateMode}/>
              <label htmlFor="private-toggle" className="toggle-input-button">
                <span className="toggle-input-switch"/>
              </label>
            </div>

            <div className='input-box column'>
              <label className='input-label'>야간 모드</label>
              <div className='radio-input-box'>
                <input type="radio" id='nightvision-auto' className='radio-input' name='nightVision'
                value='AUTO' checked={nightVision === 'AUTO'} onChange={handleRadioNightVision}/>
                <label htmlFor="nightvision-auto" className='radio-input-button'>자동</label>

                <input type="radio" id='nightvision-on' className='radio-input' name='nightVision' 
                value='ON' checked={nightVision === 'ON'} onChange={handleRadioNightVision}/>
                <label htmlFor="nightvision-on" className='radio-input-button'>켜기</label>

                <input type="radio" id='nightvision-off' className='radio-input' name='nightVision' 
                value='OFF' checked={nightVision === 'OFF'} onChange={handleRadioNightVision}/>
                <label htmlFor="nightvision-off" className='radio-input-button'>끄기</label>
              </div>
            </div>

            <div className='input-box column'>
              <button type="button" className='medium-button hide'
              onClick={()=>navigate('/camera/schedule')}
              >녹화 스케줄</button>
              <button type="button" className='medium-button'
              onClick={()=>navigate('/camera/connect')}
              >기기 관리</button>
            </div>
          </form>
        </section>
      </main>

      <Loading visible={isCameraLoading}></Loading>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default CameraScreen;