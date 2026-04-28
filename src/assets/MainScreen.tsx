import React from 'react';
import './main.css';

import spaceIcon from './image_folder/User.png';
import notificationIcon from './image_folder/Notification.png';
import homeIcon from './image_folder/Home.png';
import folderIcon from './image_folder/Gallery.png';
import cameraIcon from './image_folder/Video.png';
import feedIcon from './image_folder/Feed.png';
import documentIcon from './image_folder/Report.png';

const MainScreen: React.FC = () => {
  return (
    <div className="mobile-wrapper">
      <div className="app-container">
        
        {/* 상단 헤더 */}
        <header className="main-header">
          <img src={spaceIcon} alt="Profidle" className="header-icon" />
          <h2 className="header-title">HOME</h2>
          <div className="notification-wrapper">
            <img src={notificationIcon} alt="Notification" className="header-icon" />
            <span className="badge">15</span>
          </div>
        </header>

        {/* 스크롤 가능한 메인 콘텐츠 영역 */}
        <main className="main-content">
          
          {/* MY PET 섹션 */}
          <section className="my-pet-section">
            <div className="section-title-box">
              <span className="box-title">MY PET</span>
            </div>
            <div className="my-pet-card">
              
              {/* 프로필 이미지 & 이름 */}
              <div className="pet-profile">
                <div className="profile-img-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80" 
                    alt="MOCA" 
                    className="pet-image" 
                  />
                  <div className="edit-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </div>
                </div>
                <span className="pet-name">MOCA</span>
              </div>

              {/* 상태 아이콘 1: 활동량 (얼굴) */}
              <div className="stat-item">
                <div className="progress-ring">
                  <svg className="ring-svg" width="56" height="56">
                    <circle cx="28" cy="28" r="24" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                    <circle cx="28" cy="28" r="24" stroke="#FF0000" strokeWidth="4" fill="none" strokeDasharray="150" strokeDashoffset="40" strokeLinecap="round" transform="rotate(-90 28 28)" />
                  </svg>
                  <div className="ring-inner">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"></circle><path d="M8 9.05v-.1"></path><path d="M16 9.05v-.1"></path><path d="M16 14c-1.5 1.5-6.5 1.5-8 0"></path>
                    </svg>
                  </div>
                </div>
                <span className="stat-text">1h 25m</span>
              </div>

              {/* 상태 아이콘 2: 식사량 (밥그릇) */}
              <div className="stat-item">
                <div className="progress-ring">
                  <svg className="ring-svg" width="56" height="56">
                    <circle cx="28" cy="28" r="24" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                    <circle cx="28" cy="28" r="24" stroke="#0099FF" strokeWidth="4" fill="none" strokeDasharray="150" strokeDashoffset="100" strokeLinecap="round" transform="rotate(-90 28 28)" />
                  </svg>
                  <div className="ring-inner">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                      <path d="M6 12l-2 8h16l-2-8"></path><path d="M6 12c0-2 2-3 4-3s2 2 2 2 0-2 2-2 4 1 4 3"></path>
                    </svg>
                  </div>
                </div>
                <span className="stat-text">60g</span>
              </div>

              {/* 상태 아이콘 3: 음수량 (물방울) */}
              <div className="stat-item">
                <div className="progress-ring">
                  <svg className="ring-svg" width="56" height="56">
                    <circle cx="28" cy="28" r="24" stroke="#E5E7EB" strokeWidth="4" fill="none" />
                    <circle cx="28" cy="28" r="24" stroke="#0099FF" strokeWidth="4" fill="none" strokeDasharray="150" strokeDashoffset="20" strokeLinecap="round" transform="rotate(-90 28 28)" />
                  </svg>
                  <div className="ring-inner">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                    </svg>
                  </div>
                </div>
                <span className="stat-text">150ML</span>
              </div>

            </div>
          </section>

          <hr className="main-divider" />

          {/* LIVE 섹션 */}
          <section className="live-section">
            <h3 className="section-heading">LIVE <span className="red-dot"></span></h3>
            <div className="video-player-box">
              {/* 우측 상단 태양(밝기) 아이콘 */}
              <svg className="brightness-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              {/* 중앙 재생 버튼 */}
              <div className="play-button">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </section>

          <hr className="main-divider" />

          {/* AI SUMMATION 섹션 */}
          <section className="ai-section">
            <h3 className="section-heading">AI SUMMATION</h3>
            <p className="ai-text">
              모카는 오늘 <strong>7번의 음수(150ml)</strong>와 <strong>3번의 식사(60g)</strong>로 영양을 충분히 챙기고, 오후 2시경 가장 활발하게 움직이며 총 <strong>1시간 25분</strong> 동안 건강하고 활기찬 하루를 보냈습니다.
            </p>
            <button className="more-btn">+ 더보기</button>
          </section>

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

export default MainScreen;