import React from 'react';
import './templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import SelectBar from './components/SelectBar';

interface TempleteScreenProps {
  onMainClick?:() => void;
}

const TempleteScreen: React.FC<TempleteScreenProps> = (
  { 
    onMainClick
  }) => {
  return (
    <div className="mobile-wrapper">
      <div className="app-container">
        
        <Header
          currentScreen='templete'
          title='TEMPLETE'
        ></Header>

        <SelectBar></SelectBar>

        {/* 스크롤 가능한 메인 콘텐츠 영역 */}
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
          </section>
          
          <hr className="main-divider" />

        </main>

        <Nav currentScreen='templete'></Nav>

      </div>
    </div>
  );
};

export default TempleteScreen;