import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispenser } from "./store/useDispenser";
import type { components } from './service/api';
import './css/templete.css';

import Header from "./components/Header";
import Nav from "./components/Nav";
import Loading from './components/Loading';

type UpdateDispenserData = components['schemas']['UpdateDispenserDTO'];

const DispenserScreen: React.FC = () => {
  const navigate = useNavigate();
  const currentScreen = 'dispenser';

  const { dispenserData, isDispenserLoading, updateDispenser } = useDispenser();

  const [prevData, setPrevData] = useState(dispenserData);
  const [cleaningMode, setCleaningMode] = useState(dispenserData?.isCleaningMode ?? false);

  if (dispenserData !== prevData) {
    setPrevData(dispenserData);
    setCleaningMode(dispenserData?.isCleaningMode ?? false);
  }

  const updateSetting = async(cleaning?: boolean) => {
    const targetCleaning = cleaning ?? cleaningMode;

    const updateData : UpdateDispenserData = {
      deviceName: dispenserData?.deviceName,
      isAutoFeed: dispenserData?.food?.isAutoFeed ?? false,
      isAutoWater: dispenserData?.water?.isAutoWater ?? false,
      minWater: dispenserData?.water?.minWater ?? 0,
      maxWater: dispenserData?.water?.maxWater ?? 0,
      isCleaningMode: targetCleaning
    };
    updateDispenser(updateData);
  }

  const handleToggleCleaningMode = () => {
    const mode = !cleaningMode;
    setCleaningMode(mode);
    updateSetting(mode);
  };

  return (
    <>
      <Header title='DISPENSER' useBack={false} />

      <main className={ isDispenserLoading || dispenserData?.deviceCode ? "main-content hide" : "main-content" }>
        <section className="full-section">
          <div>
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 8L16 16M16 8L8 16" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <p className="large-text">연결된 디스펜서가 없어요!</p>

          <button
            className='medium-button'
            onClick={()=>navigate('/dispenser/connect')}
          >+ 연결하기</button>
        </section>
      </main>

      <main className={ dispenserData?.deviceCode ? "main-content" : "main-content hide" }>
        <section className="main-section line">
          <div className='heading-wrapper'>
            <h2 className="section-heading">급식</h2>
          </div>

          <div className="section-box column">
            <span className="medium-text">마지막 급여 시간 : {dispenserData?.food?.latestFeedTime ?? '...'}</span>
            <span className="medium-text">그릇 잔여량 : { dispenserData?.food ? `${dispenserData?.food?.leftovers}g` : '...'}</span>
          </div>

          <button
            className="small-button"
            onClick={()=>navigate('/dispenser/detail', {state: {type: 'feed'}})}
          >+ 자세히</button>
        </section>

        <section className="main-section line">
          <div className='heading-wrapper'>
            <h2 className="section-heading">급수</h2>
          </div>

          <div className="section-box column">
            <span className="medium-text">마지막 급여 시간 : {dispenserData?.water?.latestWateringTime ?? '...'}</span>
            <span className="medium-text">그릇 잔여량 : { dispenserData?.water ? `${dispenserData?.water?.leftovers}ml` : '...'}</span>
          </div>

          <button
            className="small-button"
            onClick={()=>navigate('/dispenser/detail', {state: {type: 'water'}})}
          >+ 자세히</button>
        </section>
      
        <section className="main-section line">
          <div className='heading-wrapper'>
            <h2 className="section-heading">설정</h2>
          </div>

          <div className="section-box column">
            <div className='input-box row'>
              <label htmlFor="cleaning-toggle"className='input-label'>청소 모드</label>
              <input type="checkbox" id="cleaning-toggle" className="toggle-input"
              checked={cleaningMode} onChange={handleToggleCleaningMode}/>
              <label htmlFor="cleaning-toggle" className="toggle-input-button">
                <span className="toggle-input-switch"/>
              </label>
            </div>
            <span className="message">* 청소 모드일 때는 자동 급식/급수가 작동하지 않습니다.</span>
            <button
              className="small-button"
              onClick={()=>navigate('/dispenser/setting')}
            >디스펜서 설정</button>
          </div>
        </section>
      </main>

      <Loading visible={isDispenserLoading}></Loading>

      <Nav currentScreen={currentScreen} />
    </>
  );
}

export default DispenserScreen;