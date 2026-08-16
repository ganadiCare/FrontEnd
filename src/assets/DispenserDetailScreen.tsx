import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispenser } from "./store/useDispenser";
import type { components } from './service/api';
import './css/templete.css';
import './css/dispenser.css';

import Header from "./components/Header";
import Nav from "./components/Nav";
import Loading from "./components/Loading";

import feedIcon from './image_folder/Feed.png';
import waterIcon from './image_folder/Water.png';

type UpdateDispenserData = components['schemas']['UpdateDispenserDTO'];

const DispenserDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentScreen = 'dispenser';
  
  const { dispenserData, isDispenserLoading, updateDispenser, isUpdating } = useDispenser();

  const [prevData, setPrevData] = useState(dispenserData);
  const [type, setType] = useState(location.state.type ?? 'feed');
  const [autoFeed, setAutoFeed] = useState(dispenserData?.food?.isAutoFeed ?? false);
  const [autoWater, setAutoWater] = useState(dispenserData?.water?.isAutoWater ?? false);
  const [minWater, setMinWater] = useState(dispenserData?.water?.minWater ?? 0);
  const [maxWater, setMaxWater] = useState(dispenserData?.water?.maxWater ?? 0);
  const [waterScheduleError, setWaterScheduleError] = useState('');

  if (dispenserData !== prevData) {
    setPrevData(dispenserData);
    setAutoFeed(dispenserData?.food?.isAutoFeed ?? false);
    setAutoWater(dispenserData?.water?.isAutoWater ?? false);
    setMinWater(dispenserData?.water?.minWater ?? 0);
    setMaxWater(dispenserData?.water?.maxWater ?? 0);
  }

  const updateSetting = async(feed?: boolean, water?: boolean, min?: number, max?:number) => {
    const targetFeed = feed ?? autoFeed;
    const targetWater = water ?? autoWater;
    const targetMin = min ?? minWater;
    const targetMax = max ?? maxWater;

    const updateData : UpdateDispenserData = {
      deviceName: dispenserData?.deviceName,
      isAutoFeed: targetFeed,
      isAutoWater: targetWater,
      minWater: targetMin,
      maxWater: targetMax,
      isCleaningMode: dispenserData?.isCleaningMode ?? false
    };
    updateDispenser(updateData);
  }

  const handleToggleAutoFeed = () => {
    const mode = !autoFeed;
    setAutoFeed(mode);
    updateSetting(mode, autoWater, minWater, maxWater);
  }

  const handleToggleAutoWater = () => {
    const mode = !autoWater;
    setAutoWater(mode);
    updateSetting(autoFeed, mode, minWater, maxWater);
  }

  const changeMinWater = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = Number(e.target.value);
    if (value<0) value=0;
    setMinWater(value);
  }

  const changeMaxWater = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = Number(e.target.value);
    if (value<0) value=0;
    setMaxWater(value);
  }

  const saveWaterSchedule = () => {
    if (!maxWater) {
      setWaterScheduleError('값을 입력해주세요.');
      return null;
    } else if (maxWater<=minWater) {
      setWaterScheduleError('최소 잔여량은 최대 용량보다 작아야합니다.');
      return null;
    } else {
      setWaterScheduleError('');
      updateSetting(autoFeed, autoWater, minWater, maxWater);
    }
  }

  const feedSchedules = () => {
    if (!dispenserData?.feedingSchedules || dispenserData?.feedingSchedules.length === 0) return [];
    const schedules = dispenserData?.feedingSchedules.map(schedule => {
      const time = schedule?.feedTime ?? "00:00";
      const [hour, minute] = time.split(':').map(Number);
      const amount = schedule?.amount ?? 0;
      return {
        scheduleHour: hour,
        scheduleMinute: minute,
        scheduleAmount: amount
      }
    });
    return schedules;
  }

  const nextFeedSchedule = () => {
    const schedules = feedSchedules();
    if (schedules.length==0) return null;

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const nextSchedules = schedules.filter(schdule => {
      if (schdule.scheduleHour>hour) return true;
      if (schdule.scheduleHour===hour && schdule.scheduleMinute>minute) return true;
      return false;
    });

    if (nextSchedules.length>0) {
      return nextSchedules.sort((a, b) => {
        if (a.scheduleHour !== b.scheduleHour) return a.scheduleHour - b.scheduleHour;
        return a.scheduleMinute - b.scheduleMinute;
      })[0];
    }

    return [...schedules].sort((a, b) => {
      if (a.scheduleHour !== b.scheduleHour) return a.scheduleHour - b.scheduleHour;
      return a.scheduleMinute - b.scheduleMinute;
    })[0];
  }
  const nextSchedule = nextFeedSchedule();

  return (
    <>
      <Header title='DISPENSER' />

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

      <div className={ dispenserData?.deviceCode ? "dispenser-control" : "dispenser-control hide" }>
        <button
          className={type==='feed' ? "dispenser-control-button selected" : "dispenser-control-button"}
          onClick={()=>setType('feed')}
        >
          <img
            className="dispenser-control-icon"
            src={feedIcon}
            alt="icon"
          />
        </button>
        <button
          className={type==='water' ? "dispenser-control-button selected" : "dispenser-control-button"}
          onClick={()=>setType('water')}
        >
          <img
            className="dispenser-control-icon"
            src={waterIcon}
            alt="icon"
          />
        </button>
      </div>

      <main className={ dispenserData?.deviceCode ? "main-content" : "main-content hide" }>
        <section className={type==='feed' ? "main-section line" : "hide"}>
          <div className='heading-wrapper'>
            <h2 className="section-heading">현재 상태</h2>
          </div>
          <div className="section-box column">
            <span className="medium-text">그릇 잔여량 : { dispenserData?.food?.leftovers ? `${dispenserData?.food?.leftovers}g` : '...'}</span>
          </div>
        </section>

        <section className={type==='feed' ? "main-section line" : "hide"}>
          <div className='heading-wrapper'>
            <h2 className="section-heading">급식</h2>
          </div>

          <div className='input-box row'>
            <label htmlFor="auto-feed"className='input-label'>자동급여</label>
            <input type="checkbox" id="auto-feed" className="toggle-input"
              checked={autoFeed} onChange={handleToggleAutoFeed}/>
            <label htmlFor="auto-feed" className="toggle-input-button">
              <span className="toggle-input-switch"/>
            </label>
          </div>

          <div className="section-box column">
            <span className={ dispenserData?.feedingSchedules && dispenserData?.feedingSchedules?.length>0 ?
              "medium-text hide": "medium-text"}
            >예약된 스케줄이 없습니다.</span>
            <span className={ dispenserData?.feedingSchedules && dispenserData?.feedingSchedules?.length>0 ?
              "medium-text": "medium-text hide"}
            >다음 급여 시간 : { nextSchedule ?
              `${String(nextSchedule?.scheduleHour).padStart(2, '0')} : ${String(nextSchedule.scheduleMinute).padStart(2, '0')}`
              : '...'}
            </span>
            <span className={ dispenserData?.feedingSchedules && dispenserData?.feedingSchedules?.length>0 ?
              "medium-text": "medium-text hide"}
            >다음 급여량 : { nextSchedule ?
              `${nextSchedule.scheduleAmount}g`
              : '...'}
            </span>
            <button
              className="medium-button"
              onClick={()=>navigate('/dispenser/schedule')}
            >스케줄 설정</button>
          </div>
          <hr className="section-divider" />

          <span className="medium-text bold">수동 급여</span>
          <div className="section-box column">
            <div className='input-box row'>
              <label className="medium-text">사료량 : </label>
              <input className='number-input small'
                type='number'
                name="feed-amount"
              />
              <span className='medium-text'>g</span>
            </div>
            <button
              className="medium-button"
            >급여</button>
          </div>
        </section>

        <section className={type==='water' ? "main-section line" : "hide"}>
          <div className='heading-wrapper'>
            <h2 className="section-heading">현재 상태</h2>
          </div>
          <div className="section-box column">
            <span className="medium-text">그릇 잔여량 : { dispenserData?.water?.leftovers ? `${dispenserData?.water?.leftovers}ml` : '...'}</span>
          </div>
        </section>

        <section className={type==='water' ? "main-section line" : "hide"}>
          <div className='heading-wrapper'>
            <h2 className="section-heading">급수</h2>
          </div>
          
          <div className='input-box row'>
            <label htmlFor="auto-water"className='input-label'>자동급여</label>
            <input type="checkbox" id="auto-water" className="toggle-input"
              checked={autoWater} onChange={handleToggleAutoWater}/>
            <label htmlFor="auto-water" className="toggle-input-button">
              <span className="toggle-input-switch"/>
            </label>
          </div>
          <div className="section-box column">
            <div className='input-box row'>
              <label className="medium-text">최소 잔여량 : </label>
              <input className='number-input small'
                type='number'
                name="min-amount"
                value={minWater}
                placeholder='최소 잔여량'
                onChange={changeMinWater}
              />
              <span className='medium-text'>ml</span>
            </div>
            <div className='input-box row'>
              <label className="medium-text">최대 용량 : </label>
              <input className='number-input small'
                type='number'
                name="min-amount"
                value={maxWater}
                placeholder='최대 용량'
                onChange={changeMaxWater}
              />
              <span className='medium-text'>ml</span>
            </div>
            <p className='message error'>{waterScheduleError}</p>
            <button type="button"
              className='medium-button'
              onClick={()=>saveWaterSchedule()}
            >{isUpdating ? '저장 중...' :'저장하기'}</button>
          </div>
          
          <hr className="section-divider" />
          <span className="medium-text bold">수동 급여</span>
          <div className="section-box column">
            <div className='input-box row'>
              <label className="medium-text">급수량 : </label>
              <input className='number-input small'
                type='number'
                name="water-amount"
              />
              <span className='medium-text'>ml</span>
            </div>

            <button
              className="medium-button"
            >급여</button>
          </div>
        </section>
      </main>

      <Loading visible={isDispenserLoading}></Loading>

      <Nav currentScreen={currentScreen} />
    </>
  );
}

export default DispenserDetailScreen;