import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePet } from './store/usePet';
import { useCamera } from './store/useCamera';
import { useReport } from './store/useReport';
import './css/templete.css';
import './css/profile.css';

import Header from './components/Header';
import Nav from './components/Nav';
import RingGraph from './components/RingGraph';
import LiveBox from './components/LiveBox';

import defaultProfile from './image_folder/DefaultProfile.png'
import acivityIcon from './image_folder/Activity.png'
import feedIcon from './image_folder/Feed.png'
import waterIcon from './image_folder/Water.png';

const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const currentScreen = 'main';
  const today = new Date().toISOString().split('T')[0];

  const { petData } = usePet();
  const { cameraData } = useCamera();
  const { reportData, activityList } = useReport(today);

  const setAiSummary = () => {
    return reportData?.aiSummary?.split("요약")[1]?.trim();
  }

  // 활동 로그 시간 합산
  const totalActivity = activityList && activityList.length > 0
  ? Math.floor(activityList.reduce((acc, cur) => acc + (cur.detectedSeconds ?? 0), 0) / 60)
  : 0;

  // 섭취량 계산
  const foodIntake = (reportData?.feeding?.totalAmount ?? 0) - (reportData?.feeding?.leftovers ?? 0);
  const waterIntake = (reportData?.watering?.totalAmount ?? 0) - (reportData?.watering?.leftovers ?? 0);

  //목표값 계산
  const maxActivity = petData?.weight && totalActivity
  ? petData?.weight * 10
  : 100;

  const maxFeed = petData?.weight && totalActivity
  ? petData?.weight * 1000 * 0.02
  : 100;

  const maxWater = petData?.weight && totalActivity
  ? petData?.weight * 55
  : 100;

  return (
    <>
      <Header title='HOME' useProfile={true}/>

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        {/* MY PET 섹션 */}
        <section className="main-section">
          <div className="section-title-box">
            <h2 className='section-heading'>MY PET</h2>
          </div>

          <div className="section-box line row">
            {/* 프로필 이미지 & 이름 */}
            <div className="pet-profile">
              <div className="profile-wrapper">
                <img
                    className="profile-image" 
                    src={defaultProfile}
                    alt="profile image"
                />
              </div>
              <span className="medium-text">{petData?.name ?? '???'}</span>
            </div>
            <RingGraph
              currentValue={totalActivity}
              fullValue={maxActivity}
              text={activityList && activityList.length > 0 ? `${totalActivity}분` : '...'}
              icon={acivityIcon}
            />
            <RingGraph
              currentValue={foodIntake}
              fullValue={maxFeed}
              text={reportData ? `${foodIntake}g` : '...'}
              icon={feedIcon}
            />
            <RingGraph
              currentValue={waterIntake}
              fullValue={maxWater}
              text={reportData ? `${waterIntake}ml` : '...'}
              icon={waterIcon}
            />
          </div>
        </section>
        <hr className="main-divider" />

        {/* LIVE 섹션 */}
        <section className='main-section'>
          <div className='heading-wrapper'>
            <h2 className="section-heading">LIVE</h2>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="5" fill={cameraData ? "#f00" : "#aaa"}/>
            </svg>
            <p className={cameraData ? 'message hide' : 'message error'}
            >카메라와 연결되지 않았습니다</p>
          </div>
          <LiveBox camera={cameraData} isLive={false}/>
          <p
            className={!cameraData ? "medium-text text-button" : "medium-text hide"}
            onClick={()=>navigate('/camera/connect')}
          >카메라 연결 →</p>
        </section>
        <hr className="main-divider" />

        {/* AI SUMMATION 섹션 */}
        <section className="main-section">
          <div className='heading-wrapper'>
            <h2 className="section-heading">AI 요약</h2>
          </div>
          <p className="small-text">
            {reportData ? setAiSummary() : '오늘의 리포트가 아직 존재하지 않아요!'}
          </p>

          <button 
            className="small-button"
            onClick={()=>navigate('/report')}
          >+ 더보기</button>
        </section>

      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default MainScreen;