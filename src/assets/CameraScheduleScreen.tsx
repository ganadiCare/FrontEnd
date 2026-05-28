import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';

import close from './image_folder/Close.png'

interface ScheduleInfo{
  start: string;
  end: string;
}

interface CameraScheduleScreenProps {
  scheduleList?: Array<ScheduleInfo>;
}

const CameraScheduleScreen: React.FC<CameraScheduleScreenProps> = (
  {scheduleList=[{start: '01:00', end: '10:00'}, {start: '11:00', end: '12:00'}]}
) => {
  const currentScreen = 'camera';
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [scheduleError, setScheduleError] = useState('');

  const setScheduleList = () => {
    return <>
      {scheduleList?.map((item) => (
        <div className='list-box'>
          <img
            className='list-remove'
            src={close}
            alt="close"
          />
          <p className='list-content medium-text'>{item.start} ~ {item.end}</p>
          <div className='list-option'></div>
        </div>
      ))}
    </>
  }

  const changeStartTime = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStartTime(e.target.value);
  }
  const changeEndTime = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEndTime(e.target.value);
  }

  const saveSchedule = () => {
    if (!startTime || !endTime){
      setScheduleError('시작 시간과 종료 시간을 모두 입력해주세요.');
      return;
    }
    else if (startTime>=endTime){
      setScheduleError('종료 시간은 시작 시간보다 이후여야 합니다.');
      return;
    }
    const overlap = scheduleList?.some((schedule)=>{
      return (startTime<schedule.end) && (endTime>schedule.start);
    })
    if (overlap) {
      setScheduleError('기존 스케줄과 시간이 겹칩니다.');
      return;
    }
    else{
      setScheduleError('');
      toast('저장되었습니다.');
      return;
    }
  }

  return (
    <>
      <ToastContainer/>
      <Header title='CAMERA'/>

      <main className="main-content">
        <section className="main-section">
          <div className='heading-wrapper'>
            <h3 className='section-heading'>카메라 스케줄 설정</h3>
          </div>

          <form className='input-form' action="">
            <div className='input-box row'>
              <label htmlFor="schedule-toggle"className='input-label'>스케줄 활성화</label>
              <input type="checkbox" id="schedule-toggle" className="toggle-input" />
              <label htmlFor="schedule-toggle" className="toggle-input-button">
                <span className="toggle-input-switch"/>
              </label>
            </div>

            <div className='input-box column'>
              <label className='input-label'>시작 시간
                <input type="time"
                  className='time-input'
                  value={startTime}
                  onChange={changeStartTime}
                />
              </label>
              <label className='input-label'>종료 시간
                <input type="time"
                  className='time-input'
                  value={endTime}
                  onChange={changeEndTime}
                />
              </label>
            </div>
            <p className='message error'>{scheduleError}</p>
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
};

export default CameraScheduleScreen;