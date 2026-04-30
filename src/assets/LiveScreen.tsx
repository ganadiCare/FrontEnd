import React from 'react';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import SelectBar from './components/SelectBar';

interface TempleteScreenProps {
  onMainClick?:() => void;

  onHeaderClick:(state: string) => void;
  onNavClick:(state: string) => void;
}

const LiveScreen: React.FC<TempleteScreenProps> = ({
  onHeaderClick, onNavClick
}) => {
  return (
    <div className="mobile-wrapper">
      <div className="app-container">
        
        <Header
          previousScreen='main'
          currentScreen='live'
          title='CAMERA'
          onHeaderClick={onHeaderClick}
        ></Header>

        <SelectBar></SelectBar>

        {/* 메인 콘텐츠 영역 : 내부 태그 전부 삭제 후 자유롭게 사용 */}
        <main className="main-content">
          {/*섹션 템플릿*/}
          <section className="main-section">
          </section>
        </main>

        <Nav
          currentScreen='live'
          onNavClick={onNavClick}
        ></Nav>

      </div>
    </div>
  );
};

export default LiveScreen;