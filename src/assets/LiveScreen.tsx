import React from 'react';
import './main.css';

import backArrow from './image_folder/Back.png';
import notificationIcon from './image_folder/Notification.png';
import homeIcon from './image_folder/Home.png';
import folderIcon from './image_folder/Gallery.png';
import cameraIcon from './image_folder/Video.png';
import feedIcon from './image_folder/Feed.png';
import documentIcon from './image_folder/Report.png';

interface TempleteScreenProps {
  onBackClick?: () => void;
}

const LiveScreen: React.FC<TempleteScreenProps> = ({ onBackClick }) => {
  return (
    <div className="mobile-wrapper">
      <div className="app-container">
        
        {/* 상단 헤더 */}
        <header className="main-header">
          <img 
            src={backArrow} 
            alt="뒤로 가기" 
            className="back-button"
            onClick={onBackClick} 
          />
          <h2 className="header-title">HOME</h2>
          <div className="notification-wrapper">
            <img src={notificationIcon} alt="Notification" className="header-icon" />
            <span className="badge">15</span>
          </div>
        </header>

        {/* 스크롤 가능한 메인 콘텐츠 영역 */}
        <main className="main-content">

          {/*섹션 템플릿*/}
          <section className="my-section">
            <h3 className="section-heading">Title</h3>
            {/*요소 템플릿*/}
            <div className="nav-item active">
              <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80"
                alt="image"
                className="main-image"
              />
              <span>Home</span>
            </div>

          </section>
          
          <hr className="main-divider" />
        </main>

        {/* 하단 네비게이션 바 */}
        <nav className="bottom-nav">
          <div className="nav-item active">
            <img src={homeIcon} alt="Home" className="nav-icon" />
            <span>Home</span>
          </div>
          <div className="nav-item">
            <img src={folderIcon} alt="Gallery" className="nav-icon" />
            <span>Gallay</span>
          </div>
          <div className="nav-item">
            <img src={cameraIcon} alt="Live cam" className="nav-icon" />
            <span>Live cam</span>
          </div>
          <div className="nav-item">
            <img src={feedIcon} alt="Feed set" className="nav-icon" />
            <span>Feed set</span>
          </div>
          <div className="nav-item">
            <img src={documentIcon} alt="AI Report" className="nav-icon" />
            <span>AI Report</span>
          </div>
        </nav>

      </div>
    </div>
  );
};

export default LiveScreen;