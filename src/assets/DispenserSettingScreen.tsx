import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispenser } from './store/useDispenser';
import type { components } from './service/api';
import './css/templete.css';

import Header from "./components/Header";
import Nav from "./components/Nav";
import Loading from "./components/Loading";

type UpdateDispenserData = components['schemas']['UpdateDispenserDTO'];

const DispenserSettingScreen: React.FC = () => {
  const navigate = useNavigate();
  const currentScreen = 'dispenser';

  const { dispenserData, isDispenserLoading, updateDispenser, isUpdating } = useDispenser();

  //const [select, setSelect] = useState('');
  const [prevData, setPrevData] = useState(dispenserData);
  const [deviceName, setDeviceName] = useState(dispenserData?.deviceName ?? '');
  const [cleaningMode, setCleaningMode] = useState(dispenserData?.isCleaningMode ?? false);
  const [nameError, setNameError] = useState('');

  if (dispenserData !== prevData) {
    setPrevData(dispenserData);
    setDeviceName(dispenserData?.deviceName ?? '');
    setCleaningMode(dispenserData?.isCleaningMode ?? false);
  }

  const updateSetting = async(name?: string, cleaning?: boolean) => {
    const targetName = name ?? deviceName;
    const targetCleaning = cleaning ?? cleaningMode;

    const updateData : UpdateDispenserData = {
      deviceName: targetName,
      isAutoFeed: dispenserData?.food?.isAutoFeed ?? false,
      isAutoWater: dispenserData?.water?.isAutoWater ?? false,
      minWater: dispenserData?.water?.minWater ?? 0,
      maxWater: dispenserData?.water?.maxWater ?? 100,
      isCleaningMode: targetCleaning
    };
    updateDispenser(updateData);
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
      updateSetting(deviceName, cleaningMode);
    }
  }

  const handleToggleCleaningMode = () => {
    const mode = !cleaningMode;
    setCleaningMode(mode);
    updateSetting(deviceName, mode);
  };

  return (
    <>
      <Header title='DISPENSER' />

      <main className="main-content">
        <section className="main-section">
          <div className='heading-wrapper'>
            <h2 className='section-heading'>디스펜서 설정</h2>
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
                    placeholder='디스펜서 이름'
                    onChange={changeDeviceName}
                  />
                  <button
                    type='button'
                    className='small-button'
                    onClick={()=>saveDeviceName()}
                  >{isUpdating ? '저장 중...' : '저장'}</button>
                </div>
              </label>
              <p className='message error'>{nameError}</p>
            </div>

            <div className='input-box row'>
              <label className='input-label'>기기 코드</label>
              <p className='input-fixed-value'>{ dispenserData?.deviceCode ?? '???' }</p>
            </div>

            <div className='input-box row'>
              <label htmlFor="cleaning-toggle"className='input-label'>청소 모드</label>
              <input type="checkbox" id="cleaning-toggle" className="toggle-input"
              checked={cleaningMode} onChange={handleToggleCleaningMode}/>
              <label htmlFor="cleaning-toggle" className="toggle-input-button">
                <span className="toggle-input-switch"/>
              </label>
            </div>
            <span className="message">* 청소 모드일 때는 자동 급식/급수가 작동하지 않습니다.</span>

            <div className='input-box column'>
              <button type="button" className='medium-button'
              onClick={()=>navigate('/dispenser/schedule')}
              >급식 스케줄</button>
              <button type="button" className='medium-button'
              onClick={()=>navigate('/dispenser/detail', {state: {type: 'water'}})}
              >급수 설정</button>
              <button type="button" className='medium-button'
              onClick={()=>navigate('/dispenser/connect')}
              >기기 관리</button>
            </div>
          </form>
        </section>
      </main>

      <Loading visible={isDispenserLoading}></Loading>

      <Nav currentScreen={currentScreen} />
    </>
  );
}

export default DispenserSettingScreen;