import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import ProfileImage from './components/ProfileImage';
import RingGraph from './components/RingGraph';
import LiveBox from './components/LiveBox';

import waterIcon from './image_folder/Water.png'

interface MainScreenProps {
  data?:string;
}

const MainScreen: React.FC<MainScreenProps> = (
  //{ }
) => {
  const navigate = useNavigate()
  const currentScreen = 'main';

  return (
    <>
      <Header title='HOME' />

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        {/* MY PET 섹션 */}
        <section className="main-section">
          <div className="section-title-box">
            <span className='section-heading'>MY PET</span>
          </div>

          <div className="section-box row">
            {/* 프로필 이미지 & 이름 */}
            <div className="pet-profile">
              <ProfileImage src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80" />
              <span className="large-text">MOCA</span>
            </div>
            <RingGraph
              currentValue={20}
              fullValue={100}
              text='1h 25m'
            />
            <RingGraph
              currentValue={60}
              fullValue={100}
              text='60g'
            />
            <RingGraph
              icon={waterIcon}
              currentValue={30}
              fullValue={100}
              text='150ML'
            />
          </div>
        </section>
        <hr className="main-divider" />

        {/* LIVE 섹션 */}
        <section className='main-section'>
          <h3 className="section-heading">LIVE
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="5" fill="#f00"/>
            </svg>
          </h3>
          <LiveBox isLive={false}/>
        </section>
        <hr className="main-divider" />

        {/* AI SUMMATION 섹션 */}
        <section className="main-section">
          <h3 className="section-heading">AI SUMMATION</h3>
          <p className="small-text">
            모카는 오늘 <strong>7번의 음수(150ml)</strong>와 <strong>3번의 식사(60g)</strong>로 영양을 충분히 챙기고, 오후 2시경 가장 활발하게 움직이며 총 <strong>1시간 25분</strong> 동안 건강하고 활기찬 하루를 보냈습니다.
          </p>
          <button className="small-button" onClick={()=>navigate('/report')}>+ 더보기</button>
        </section>
      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default MainScreen;