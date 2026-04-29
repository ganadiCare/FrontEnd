import React from 'react';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import SelectBar from './components/SelectBar';
import RingGraph from './components/RingGraph';
import BarGraph from './components/BarGraph';

interface TempleteScreenProps {
  onMainClick?:() => void;
  onHeaderClick:(state: string) => void;
  onNavClick:(state: string) => void;
}

const TempleteScreen: React.FC<TempleteScreenProps> = (
  { 
    onMainClick,
    onHeaderClick, onNavClick
  }) => {
  return (
    <div className="mobile-wrapper">
      <div className="app-container">
        
        <Header
          previousScreen='login'
          currentScreen='templete'
          title='TEMPLETE'
          onHeaderClick={onHeaderClick}
        ></Header>

        <SelectBar></SelectBar>

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
              onClick={onMainClick}
            >
              <p>+ Button</p>
            </button>

            <p></p>

            <span className='small-text'>test text</span>

            <RingGraph currentValue={30} fullValue={100} graphName='TEXT' />
            <BarGraph values={[1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3]}/>
            
          </section>
          
          <hr className="main-divider" />
        </main>

        <Nav
          currentScreen='templete'
          onNavClick={onNavClick}
        ></Nav>

      </div>
    </div>
  );
};

export default TempleteScreen;