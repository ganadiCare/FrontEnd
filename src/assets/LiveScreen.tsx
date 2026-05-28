import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import SelectBar from './components/SelectBar';
import LiveBox from './components/LiveBox';
import Controller from './components/Controller';
import Move from './image_folder/Move.png';
import Camera from './image_folder/Camera.png'

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

interface LiveScreenProps {
  camList?: Array<CamInfo>;
}

const LiveScreen: React.FC<LiveScreenProps> = (
  {camList}
) => {
  const currentScreen = 'live';
  const navigate = useNavigate()
  const getOptions = () =>{
    return camList?.map((cam) => ({
      id: cam.deviceId, name: cam.deviceName
    })) || [];
  }
  const options = getOptions();

  const [select, setSelect] = useState(options[0]);
  const [controlBar, setControlBar] = useState(false);
  const [control, setControl] = useState('control');
  const [direction, setDirection] = useState('center');
  const [fullMode, setFullMode] = useState(false);

  const currentCam = camList?.find(cam => cam.deviceId === select?.id);
  
  
  const clickScreen = () =>{
    setControlBar(!controlBar);
    if (control=='control')
      setControl('controller');
  }

  return (
    <>
      <Header 
        title='CAMERA'
        visible={!fullMode}
      />

      <SelectBar
        options={options}
        visible={!fullMode}
        selectedValue={select}
        onSelectClick={setSelect}
      />

      <main
        className="main-content full"
        onClick={clickScreen}
      >
        <section className="full-section full">
          <div onClick={(e) => e.stopPropagation()}>
            <LiveBox 
              isLive={true}
              isFull={fullMode}
              camInfo={currentCam}
              onFullClick={()=>setFullMode(!fullMode)}
            />
          </div>
          <p className='hide'>{direction}</p>
        </section>
      </main>

      {/* 세로모드 컨트롤 */}
      <section className={!fullMode ? 'control-bar' : 'control-bar hide'}>
        <div className='control-menu'>
          <div
            className='control-menu-button'
            onClick={()=>{setControlBar(true); setControl('controller');}}
          >
            <img className='icon' src={Move} alt="icon" />
          </div>
          <div
            className='control-menu-button'
            onClick={()=>{setControlBar(true); setControl('button');}}
          >
            <img className='icon' src={Camera} alt="icon" />
          </div>
        </div>
        {/* 컨트롤러 영역 */}
        <div className={controlBar && control=='controller' ? 'control-component' : 'control-component hide'}>
          <Controller onDirectionClick={setDirection}/>
          <button
              className='small-button control-reset'
            >초기화</button>
        </div>
        {/* 버튼 영역 */}
        <div className={controlBar && control=='button' ? 'control-component' : 'control-component hide'}>
          <div className='control-buttons'>
            <button
              className='medium-button'
            >화면 녹화</button>
            <button
              className='medium-button'
            >화면 캡처</button>
            <button
              className='medium-button'
            >카메라 차단</button>
            <button
              className='medium-button'
            >야간 모드</button>
            <button
              className='medium-button'
              onClick={()=>navigate('/camera/schedule')}
            >스케줄 설정</button>
            <button
              className='medium-button'
              onClick={()=>navigate('/camera')}
            >카메라 설정</button>
          </div>
        </div>
      </section>

      {/* 가로모드 컨트롤 */}
      <div className={fullMode ? 'full-controller' : 'full-controller hide'}>
        <Controller isFull={true} onDirectionClick={setDirection}/>
      </div>
      <div className={fullMode ? 'full-buttons' : 'full-buttons hide'}>
        <button className='full-button' aria-label="캡쳐">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
        <button className='full-button' aria-label='녹화'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" fill="#ff4d4d" stroke="none" />
          </svg>
        </button>
      </div>

      <Nav
        currentScreen={currentScreen}
        visible={!fullMode}
      />
    </>
  );
};

export default LiveScreen;