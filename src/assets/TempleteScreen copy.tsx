import React from 'react';
import './templete.css';

import backArrow from './image_folder/Back.png';
import notificationIcon from './image_folder/Notification.png';
import homeIcon from './image_folder/Home.png';
import folderIcon from './image_folder/Gallery.png';
import cameraIcon from './image_folder/Video.png';
import feedIcon from './image_folder/Feed.png';
import documentIcon from './image_folder/Report.png';

import SelectBar from './components/SelectBar';

interface TempleteScreenProps {
  onBackClick?: () => void;
  onNotificationClick?: () => void;
  
  onHomeClick?: () => void;
  onGallaryClick?: () => void;
  onLiveClick?: () => void;
  onFeedClick?: () => void;
  onReportClick?: () => void;

  onMainClick?:() => void;
}

const TempleteScreen: React.FC<TempleteScreenProps> = (
  { 
    onBackClick, onNotificationClick, onHomeClick, onGallaryClick, onLiveClick, onFeedClick, onReportClick, 
    onMainClick
  }) => {
  return (
    <div className="mobile-wrapper">
      <div className="app-container">
        
        {/* 상단 헤더 */}
        <header className="main-header">
          <img 
            src={backArrow} 
            alt="뒤로 가기" 
            className="header-icon"
            onClick={onBackClick} 
          />
          <h2 className="header-title">TEMPLETE</h2>

          <div className="notification-wrapper">
            <img
              src={notificationIcon}
              alt="Notification"
              className="header-icon"
              onClick={onNotificationClick}
            />
            <span className="badge">15</span>
          </div>
        </header>

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
              className='main-button'
              onClick={onMainClick}
            >
              <p>+ Button</p>
            </button>

            <p className='main-text'>test text</p>
          </section>
          
          <hr className="main-divider" />

        </main>

        {/* 하단 네비게이션 바 */}
        <nav className="bottom-nav">

          <div className="nav-item" onClick={onHomeClick}>
            <img src={homeIcon} alt="Home" className="nav-icon" />
            <span>Home</span>
          </div>
          
          <div className="nav-item" onClick={onGallaryClick}>
            <img src={folderIcon} alt="Gallery" className="nav-icon" />
            <span>Gallary</span>
          </div>

          <div className="nav-item" onClick={onLiveClick}>
            <img src={cameraIcon} alt="Live cam" className="nav-icon" />
            <span>Live cam</span>
          </div>

          <div className="nav-item" onClick={onFeedClick}>
            <img src={feedIcon} alt="Feed set" className="nav-icon" />
            <span>Feed set</span>
          </div>

          <div className="nav-item" onClick={onReportClick}>
            <img src={documentIcon} alt="AI Report" className="nav-icon" />
            <span>AI Report</span>
          </div>

        </nav>

      </div>
    </div>
  );
};

export default TempleteScreen;