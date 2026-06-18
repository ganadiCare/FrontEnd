import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';

interface CamInfo{
  deviceId: number;
  deviceName: string;
  code?: string;
  url?: string;
  isMain?: boolean;

  resolution?: string;
  motionSensitive?: number;

  nightVision?: string;
  private?: boolean;
}

interface CameraScreenProps {
  camList?: Array<CamInfo>;
}

const CameraScreen: React.FC<CameraScreenProps> = (
  {camList}
) => {
  const navigate = useNavigate();
  const currentScreen = 'camera';

  const [select, setSelect] = useState(camList?.[0]);
  const [deviceName, setDeviceName] = useState('');
  const [nameError, setNameError] = useState('');
  
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSelect((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        // 숫자 입력창이면 숫자로 변환해서 저장
        [name]: type === 'number' ? Number(value) : value,
      };
    });
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDeviceName(e.target.value);
  }

  const saveName = () => {
    if (!deviceName.trim()) {
      setNameError('이름을 입력해주세요');
      return;
    }
    else{
      setNameError('')
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
            <h2 className='section-heading'>카메라 설정</h2>
            <select
              className='select-input'
              id='select'
              aria-label='select'
              value={select?.deviceId}
            >
              {camList?.map(cam=>(
                <option
                  key={cam?.deviceId}
                  value={cam?.deviceId}
                >{cam?.deviceName}</option>
              ))}
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
                    onChange={changeName}
                  />
                  <button
                    type='button'
                    className='small-button'
                    onClick={()=>saveName()}
                  >저장</button>
                </div>
              </label>
              <p className='message error'>{nameError}</p>
            </div>

            <div className='input-box row'>
              <label className='input-label'>기기 코드</label>
              <p className='input-fixed-value'>{ '???' }</p>
            </div>
            
            <div className='input-box row'>
              <label htmlFor="private-toggle"className='input-label'>카메라 차단</label>
              <input type="checkbox" id="private-toggle" className="toggle-input" />
              <label htmlFor="private-toggle" className="toggle-input-button">
                <span className="toggle-input-switch"/>
              </label>
            </div>

            <div className='input-box column'>
              <label className='input-label'>야간 모드</label>
              <div className='radio-input-box'>
                <input type="radio" id='nightvision-auto' className='radio-input' name='nightVision'
                value='auto' onChange={handleInputChange}/>
                <label htmlFor="nightvision-auto" className='radio-input-button'>자동</label>
                <input type="radio" id='nightvision-on' className='radio-input' name='nightVision' 
                value='on' onChange={handleInputChange}/>
                <label htmlFor="nightvision-on" className='radio-input-button'>켜기</label>
                <input type="radio" id='nightvision-off' className='radio-input' name='nightVision' 
                value='off' onChange={handleInputChange}/>
                <label htmlFor="nightvision-off" className='radio-input-button'>끄기</label>
              </div>
            </div>

            <div className='input-box column'>
              <button type="button" className='medium-button'
              onClick={()=>navigate('/camera/schedule')}
              >녹화 스케줄</button>
              <button type="button" className='medium-button'
              onClick={()=>navigate('/camera/connect')}
              >기기 관리</button>
            </div>
          </form>
        </section>
      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default CameraScreen;