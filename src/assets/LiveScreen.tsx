import React, {useState} from 'react';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import SelectBar from './components/SelectBar';
import LiveBox from './components/LiveBox';
import Controller from './components/Controller';

interface TempleteScreenProps {
  data?:string;
}

const LiveScreen: React.FC<TempleteScreenProps> = (
  //{}
) => {
  const currentScreen = 'live';
  const options = ['test1', 'test2', 'test3']

  const [select, setSelect] = useState('test1');
  const [controlBar, setControlBar] = useState(false);
  const [control, setControl] = useState('control');
  const [direction, setDirection] = useState('center');
  
  
  const clickScreen = () =>{
    setControlBar(!controlBar);
    if (control=='control')
      setControl('controller');
  }

  return (
    <>
      <Header title='CAMERA' />

      <SelectBar
        options={options}
        selectedValue={select}
        onSelectClick={setSelect}
      />

      <main
        className="main-content"
        onClick={clickScreen}
      >
        <section className="full-section full">
          <div onClick={(e) => e.stopPropagation()}><LiveBox isLive={true}/></div>
          <p className='hide'>{direction}</p>
        </section>
      </main>

      <section className='control-bar'>
        <div className='control-menu'>
          <div
            className='control-menu-button'
            onClick={()=>{setControlBar(true); setControl('controller');}}
          >
            <img className='.icon' src="" alt="icon" />
          </div>
          <div
            className='control-menu-button'
            onClick={()=>{setControlBar(true); setControl('button');}}
          >
            <img className='.icon' src="" alt="icon" />
          </div>
        </div>

        <div className={controlBar && control=='controller' ? 'control-component' : 'control-component hide'}>
          <Controller onDirectionClick={setDirection}/>
          <button
              className='small-button control-reset'
            >초기화</button>
        </div>
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
            >스케줄 설정</button>
            <button
              className='medium-button'
            >카메라 설정</button>
          </div>
        </div>
      </section>

      <Nav
        currentScreen={currentScreen}
      ></Nav>
    </>
  );
};

export default LiveScreen;