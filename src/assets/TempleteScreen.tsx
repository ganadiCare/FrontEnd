import React, {useState} from 'react';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import SelectBar from './components/SelectBar';
import RingGraph from './components/RingGraph';
import BarGraph from './components/BarGraph';
import LiveBox from './components/LiveBox';
import Controller from './components/Controller';

interface TempleteScreenProps {
  data?:string
}

const TempleteScreen: React.FC<TempleteScreenProps> = (
  //{}
) => {
  const currentScreen = 'templete';
  const [direction, setDirection] = useState('center');
  const [select, setSelect] = useState('test1');

  return (
    <>
      <Header title='TEMPLETE' />

      <SelectBar
        options={['test1','test2','test3']}
        selectedValue={select}
        onSelectClick={setSelect}
      />

      {/* 메인 콘텐츠 영역 : 내부 태그 전부 삭제 후 자유롭게 사용 */}
      <main className="main-content">
        {/*섹션 템플릿*/}
        <section className="main-section">
          <h3 className="section-heading">TITLE</h3>
          {/*요소 템플릿*/}
          <span className='line'></span>

          <button
            type='button'
            className='small-button'
          >
            <p>+ Button</p>
          </button>

          <p>current state: {direction}<br></br>current select: {select}</p>

          <span className='small-text'>test text</span>

          <RingGraph currentValue={30} fullValue={100} text='TEXT' />
          <BarGraph values={[24,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}/>
          
        </section>

        <LiveBox isLive ={true}/>
        
        <hr className="main-divider" />

        <Controller onDirectionClick={setDirection}/>
      </main>

      <Nav
        currentScreen={currentScreen}
      />
    </>
  );
};

export default TempleteScreen;