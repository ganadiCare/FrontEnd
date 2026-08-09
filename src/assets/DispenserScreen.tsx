import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispenser } from "./store/useDispenser";
import type { components } from './service/api';
import './css/templete.css';

import Header from "./components/Header";
import Nav from "./components/Nav";

type UpdateDispenserData = components['schemas']['UpdateDispenserDTO'];

const DispenserScreen: React.FC = () => {
  const navigate = useNavigate();
  const currentScreen = 'dispenser';

  const { dispenserData, updateDispenser } = useDispenser();

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

      <main className="main-content">
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

      <Nav currentScreen={currentScreen} />
    </>
  );
}

export default DispenserScreen;