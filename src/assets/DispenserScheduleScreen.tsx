import React, { useState } from "react";
import { useDispenser } from "./store/useDispenser";
import type { components } from './service/api';
import './css/templete.css';

import Header from "./components/Header"
import Nav from "./components/Nav"

import close from './image_folder/Close.png'

type UpdateDispenserData = components['schemas']['UpdateDispenserDTO'];
type CreateScheduleData = components['schemas']['CreateScheduleDTO'];


const DispenserScheduleScreen: React.FC = () => {
  const currentScreen = 'dispenser';

  const { dispenserData, updateDispenser, addSchedule, removeSchedule } = useDispenser();

  //const [select, setSelect] = useState('');
  const [prevData, setPrevData] = useState(dispenserData);
  const [autoFeed, setAutoFeed] = useState(dispenserData?.food?.isAutoFeed ?? false);
  const [time, setTime] = useState('');
  const [feedAmount, setFeedAmount] = useState(0);
  const [scheduleError, setScheduleError] = useState('');

  if (dispenserData !== prevData) {
    setPrevData(dispenserData);
    setAutoFeed(dispenserData?.food?.isAutoFeed ?? false);
  }

  const updateSetting = async(auto?:boolean) => {
    const targetAuto = auto ?? dispenserData?.food?.isAutoFeed;

    const updateData : UpdateDispenserData = {
      deviceName: dispenserData?.deviceName,
      isAutoFeed: targetAuto,
      isAutoWater: dispenserData?.water?.isAutoWater ?? false,
      minWater: dispenserData?.water?.minWater ?? 0,
      maxWater: dispenserData?.water?.maxWater ?? 0,
      isCleaningMode: dispenserData?.isCleaningMode ?? false
    };
    updateDispenser(updateData);
  }

  const addScheduleSetting = async() => {
    const addData : CreateScheduleData = {
      feedTime: time,
      amount: feedAmount
    };
    addSchedule(addData);
  }

  const handleToggleAutoFeed = () => {
    const mode = !autoFeed;
    setAutoFeed(mode);
    updateSetting(mode);
  }

  const changeTime = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTime(e.target.value);
  }

  const changeFeedAmount = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = Number(e.target.value);
    if (value<0) value=0;
    setFeedAmount(value);
  }

  const saveSchedule = () => {
    let duplicate;
    if (time==='') {
      setScheduleError('올바른 시간을 입력하세요.');
      return false;
    } else {
      duplicate =  dispenserData?.feedingSchedules?.some(
        (schedule) => schedule.feedTime === time);
    }

    if (duplicate) {
      setScheduleError('기존 스케줄과 시간이 중복됩니다.');
      return false;
    } else if (feedAmount<=0) {
      setScheduleError('사료의 양은 0g 이상이어야 합니다.');
      return false;
    } else {
      setScheduleError('');
      addScheduleSetting();
    }
  }

  const setScheduleList = () => {
    if (!dispenserData?.feedingSchedules || dispenserData?.feedingSchedules?.length===0) return null;
    const schedules = dispenserData.feedingSchedules;
    return (
      <>
        {schedules.map((schedule) => (
          <div className='list-box'>
            <img
              className='list-remove'
              src={close}
              alt="close"
              onClick={()=>removeSchedule(Number(schedule.scheduleId))}
            />
            <div className="list-content">
              <p className='medium-text'>{schedule.feedTime}</p>
              <p className='medium-text'>{schedule.amount}g</p>
            </div>
            <div className='list-option'></div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      <Header title='DISPENSER' />

      <main className="main-content">
        <section className="main-section">
          <div className='heading-wrapper'>
            <h2 className='section-heading'>급식 스케줄 설정</h2>
            <select
              className='select-input'
              id='select'
              aria-label='select'
              //value={select}
            >
            </select>
          </div>

          <form className='input-form' action="">
            <div className='input-box row'>
              <label htmlFor="schedule-toggle"className='input-label'>스케줄 활성화</label>
              <input type="checkbox" id="schedule-toggle" className="toggle-input"
                checked={autoFeed} onChange={handleToggleAutoFeed}/>
              <label htmlFor="schedule-toggle" className="toggle-input-button">
                <span className="toggle-input-switch"/>
              </label>
            </div>
            
            {/*
            <div className='input-box column'>
              <label className='input-label'>채우기 방식</label>
              <div className='radio-input-box'>
                <input type="radio" id='fill-full' className='radio-input' name='fill-method'
                value='FULL'/>
                <label htmlFor="fill-full" className='radio-input-button'>그릇의 최대치까지</label>
                <input type="radio" id='fill-skip' className='radio-input' name='fill-method' 
                value='SKIP'/>
                <label htmlFor="fill-skip" className='radio-input-button'>급식 건너뛰기</label>
              </div>
              <p className="message">*그릇에 사료가 남아있는 경우의 자동 급식 방식입니다.</p>
            </div>*/}

            <div className='input-box row'>
              <label className='input-label'>시간
                <input type="time"
                  className='time-input'
                  name='time'
                  value={time}
                  onChange={changeTime}
                />
              </label>
            </div>
            
            <div className='input-box row'>
              <label className='input-label'>급여량</label>
              <input className='number-input small'
                type='number'
                name="weight"
                value={feedAmount}
                placeholder='g 단위로 입력'
                onChange={changeFeedAmount}
              />
              <span className='medium-text'>g</span>
            </div>

            <span className='message error'>{scheduleError}</span>
            <button type="button" 
              className='medium-button'
              onClick={()=>saveSchedule()}
            >저장하기</button>
          </form>
        </section>
        <hr className="main-divider" />

        <section className='main-section'>
          {setScheduleList()}
        </section>
      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
}

export default DispenserScheduleScreen;