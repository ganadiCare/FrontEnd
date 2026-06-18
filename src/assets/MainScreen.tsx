import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import './css/templete.css';
import './css/profile.css';

import { fetchPetThunk } from './store/petSlice';
import { fetchReportThunk } from './store/reportSlice';
import { fetchCameraThunk } from './store/cameraSlice';

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
  const dispatch = useAppDispatch();
  const currentScreen = 'main';

  const { petData } = useAppSelector((state) => state.petSlice);
  const { reportData } = useAppSelector((state) => state.reportSlice);
  const { cameraData } = useAppSelector((state) => state.cameraSlice);

  useEffect(() => {
    if (!petData) dispatch(fetchPetThunk());
    if (!reportData) dispatch(fetchReportThunk());
    if (!cameraData) dispatch(fetchCameraThunk());
  }, [dispatch, petData, reportData, cameraData]);

  const setAiSummary = () => {
    return reportData?.aiSummary?.split("오늘의 요약:")[1]?.trim();
  }

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
              currentValue={reportData?.feeding?.totalAmount}
              fullValue={100}
              text={reportData ? `${reportData?.feeding?.totalAmount}분` : '...'}
              icon={acivityIcon}
            />
            <RingGraph
              currentValue={reportData?.feeding?.totalAmount}
              fullValue={100}
              text={reportData ? `${reportData?.feeding?.totalAmount}g` : '...'}
              icon={feedIcon}
            />
            <RingGraph
              currentValue={reportData?.watering?.totalAmount}
              fullValue={100}
              text={reportData ? `${reportData?.watering?.totalAmount}ml` : '...'}
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