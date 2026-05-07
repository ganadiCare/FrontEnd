import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import RingGraph from './components/RingGraph';
import LiveBox from './components/LiveBox';

import waterIcon from './image_folder/Water.png'

interface Pet {
  petId: number;
  petName: string;
  petImage: string;
  species: string;
  gender: string;
  weight: number;
  age: number;
  birthday: string;
}

interface TodayReport {
  move: number;
  feed: number;
  water: number;
  aiSummation: string;
}

interface Streaming{
  deviceId: number;
  deviceName?: string;
  url: string;
  nightVision: boolean;
}


interface MainScreenProps {
  pet?: Pet;
  today?: TodayReport;
  streaming?: Streaming;
}

const MainScreen: React.FC<MainScreenProps> = (
  {pet, today, streaming}
) => {
  const navigate = useNavigate();
  const currentScreen = 'main';

  return (
    <>
      <Header title='HOME' useProfile={true}/>

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
              <div className="profile-wrapper">
                <img
                    className="profile-image" 
                    src={pet ? pet?.petImage : ''}
                    alt="profile image"
                />
              </div>
              <span className="medium-text">{pet ? pet?.petName : '???'}</span>
            </div>
            <RingGraph
              currentValue={today?.move}
              fullValue={100}
              text={today ? `${today.move/60}분` : '...'}
            />
            <RingGraph
              currentValue={today?.feed}
              fullValue={100}
              text={today ? `${today.move/60}분` : '...'}
            />
            <RingGraph
              icon={waterIcon}
              currentValue={today?.water}
              fullValue={100}
              text={today ? `${today.move/60}분` : '...'}
            />
          </div>
        </section>
        <hr className="main-divider" />

        {/* LIVE 섹션 */}
        <section className='main-section'>
          <div className='heading-wrapper'>
            <h3 className="section-heading">LIVE</h3>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="5" fill={streaming ? "#f00" : "#aaa"}/>
            </svg>
            <p className='message error'>카메라와 연결되지 않았습니다</p>
          </div>
          <LiveBox isLive={false}/>
          <p
            className={!streaming ? "medium-text text-button" : "medium-text hide"}
            onClick={()=>navigate('/camera/connect')}
          >카메라 연결 →</p>
        </section>
        <hr className="main-divider" />

        {/* AI SUMMATION 섹션 */}
        <section className="main-section">
          <h3 className="section-heading">AI 요약</h3>
          <p className="small-text">
            {today ? today.aiSummation : '...'}
          </p>

          <button 
            className={today ? "small-button" : "small-button hide"}
            onClick={()=>navigate('/report')}
          >+ 더보기</button>
        </section>
      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default MainScreen;