import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import type { components } from './service/api';
import './css/templete.css';
import './css/dispenser.css'

import { fetchDispenserThunk, updateDispenserThunk } from "./store/dispenserSlice";

import Header from "./components/Header"
import Nav from "./components/Nav"

import feedIcon from './image_folder/Feed.png'
import waterIcon from './image_folder/Water.png';

type UpdateDispenserData = components['schemas']['UpdateDispenserDTO'];

const DispenserDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentScreen = 'dispenser';
  
  const { dispenserData } = useAppSelector((state) => state.dispenserSlice);
  
  useEffect(() => {
    if (!dispenserData) dispatch(fetchDispenserThunk());
  }, [dispatch, dispenserData]);

  const [type, setType] = useState(location.state.type ?? '');
  const [autoFeed, setAutoFeed] = useState(dispenserData?.food?.isAutoFeed ?? false);
  const [autoWater, setAutoWater] = useState(dispenserData?.water?.isAutoWater ?? false);
  const [minWater, setMinWater] = useState(dispenserData?.water?.minWater ?? 0);
  const [maxWater, setMaxWater] = useState(dispenserData?.water?.maxWater ?? 0);
  const [waterScheduleError, setWaterScheduleError] = useState('');

  const updateDispenser = async() => {
    const updateData : UpdateDispenserData = {
      deviceName: dispenserData?.deviceName,
      isAutoFeed: autoFeed,
      isAutoWater: autoWater,
      minWater: minWater,
      maxWater: maxWater,
      isCleaningMode: dispenserData?.isCleaningMode ?? false
    };
    await dispatch(updateDispenserThunk(updateData));
  }

  const handleToggleAutoFeed = () => {
    if (autoFeed) setAutoFeed(false);
    else setAutoFeed(true);
    updateDispenser();
  }

  const handleToggleAutoWater = () => {
    if (autoWater) setAutoWater(false);
    else setAutoWater(true);
    updateDispenser();
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
    if (!minWater || !maxWater) {
      setWaterScheduleError('값을 입력해주세요.');
      return null;
    } else if (maxWater<=minWater) {
      setWaterScheduleError('최소 잔여량은 최대 용량보다 작아야합니다.');
      return null;
    } else {
      setWaterScheduleError('');
      updateDispenser();
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

      <div className="dispenser-control">
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

      <main className="main-content">
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
            <label htmlFor="auto-toggle"className='input-label'>자동급여</label>
            <input type="checkbox" id="auto-toggle" className="toggle-input"
              checked={autoFeed} onChange={handleToggleAutoFeed}/>
            <label htmlFor="auto-toggle" className="toggle-input-button">
              <span className="toggle-input-switch"/>
            </label>
          </div>

          <div className="section-box column">
            <span className="medium-text">다음 급여 시간 : { nextSchedule ?
              `${String(nextSchedule?.scheduleHour).padStart(2, '0')} : ${String(nextSchedule.scheduleMinute).padStart(2, '0')}`
              : '...'}
            </span>
            <span className="medium-text">다음 급여량 : { nextSchedule ?
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
            <label className="medium-text"><input type="radio" name="feeding-amount"/> 추천 : </label>
            <div className='input-box row'>
              <label className="medium-text"><input type="radio" name="feeding-amount"/> 사용자 지정 : </label>
              <input className='number-input small'
                type='number'
                name="feed-amount"
                placeholder='사료량'
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
            <label htmlFor="auto-toggle"className='input-label'>자동급여</label>
            <input type="checkbox" id="auto-toggle" className="toggle-input"
              checked={autoWater} onChange={handleToggleAutoWater}/>
            <label htmlFor="auto-toggle" className="toggle-input-button">
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
            >저장하기</button>
          </div>
          
          <hr className="section-divider" />
          <span className="medium-text bold">수동 급여</span>
          <div className="section-box column">
            <label className="medium-text"><input type="radio" name="watering-amount"/> 추천 : </label>
            <div className='input-box row'>
              <label className="medium-text"><input type="radio" name="watering-amount"/> 사용자 지정 : </label>
              <input className='number-input small'
                type='number'
                name="water-amount"
                placeholder='급수량'
              />
              <span className='medium-text'>ml</span>
            </div>
            <button
              className="medium-button"
            >급여</button>
          </div>
        </section>
      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
}

export default DispenserDetailScreen;