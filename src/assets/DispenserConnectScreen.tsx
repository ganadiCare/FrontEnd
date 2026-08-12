import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';

import close from './image_folder/Close.png'

const DispenserConnectScreen: React.FC = () => {
  const currentScreen = 'dispenser';

  const [deviceName, setDeviceName] = useState('');
  const [deviceCode, setDeviceCode] = useState('');

  const [nameError, setNameError] = useState('');
  const [codeError, setCodeError] = useState('');

  /*
  const setDeviceList = () => {
    return <>
      {camList?.map((item) => (
        <div className='list-box center'>
          <img
            className='list-remove'
            src={close}
            alt="close"
          />
          <p className='list-content medium-text'>{item.deviceName} / {item.deviceCode}</p>
          <div className='list-option'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="5" fill={item ? "#f00" : "#aaa"}/>
            </svg>
          </div>
        </div>
      ))}
    </>
  }
  */

  const changeDeviceCode = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDeviceCode(e.target.value);
  }
  const changeDeviceName = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDeviceName(e.target.value);
  }

  const connectDevice = () => {
    let check = true;

    if (!deviceCode.trim()){
      setCodeError('기기 코드를 입력해주세요')
      check = false;
    }
    else if(deviceCode.length!=10){
      setCodeError('기기 코드의 길이는 10입니다.')
      check = false;
    }
    
    if (!deviceName.trim()) {
      setNameError('이름을 입력해주세요');
      check = false;
    }
    
    if (check){
      setNameError('');
      setCodeError('');

      setDeviceCode('');
      setDeviceName('');
      toast('저장되었습니다.');
    }
    return;
  }

  return (
    <>
      <ToastContainer/>
      <Header title='DISPENSER'/>

      <main className="main-content">
        <section className="main-section">
          <div className='heading-wrapper'>
            <h3 className='section-heading'>디스펜서 연결</h3>
          </div>
          
          <form className='input-form' action="">

            <div className='input-box column'>
              <div className='input-box row'>
                <label className='input-label'>기기 코드</label>
                <input className='text-input'
                  aria-label='deviceCode'
                  type="text"
                  value={deviceCode}
                  onChange={changeDeviceCode}
                  placeholder='기기 코드'
                />
              </div>
              <p className='message error'>{codeError}</p>
              <div className='input-box row'>
                <label className='input-label'>기기 이름</label>
                <input className='text-input'
                  aria-label='deviceName'
                  type="text"
                  value={deviceName}
                  onChange={changeDeviceName}
                  placeholder='기기 이름'
                />
              </div>
              <p className='message error'>{nameError}</p>
            </div>

            <button type="button"
              className='medium-button'
              onClick={()=>connectDevice()}
            >기기 연결</button>
          </form>
        </section>
        <hr className="main-divider" />

        <section className="main-section">
          <div className='heading-wrapper'>
            <h3 className='section-heading'>연결된 기기</h3>
          </div>
        </section>
      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default DispenserConnectScreen;