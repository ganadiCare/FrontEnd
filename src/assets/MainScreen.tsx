import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { components } from './service/api';
import { initAccessToken, getPets, getReports, getCameras } from './service/ApiGet';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import RingGraph from './components/RingGraph';
import LiveBox from './components/LiveBox';
import Loading from './components/Loading';

import defaultProfile from './image_folder/DefaultProfile.png'
import acivityIcon from './image_folder/Activity.png'
import feedIcon from './image_folder/Feed.png'
import waterIcon from './image_folder/Water.png';

type PetData = components['schemas']['PetDTO'];
type ReportData = components['schemas']['ReportDTO'];
type CameraData = components['schemas']['CameraDTO'];

const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const currentScreen = 'main';

  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState<PetData | undefined>(undefined);
  const [report, setReport] = useState<ReportData | undefined>(undefined);
  const [camera, setCamera] = useState<CameraData | undefined>(undefined);

  useEffect(() => {
    const fetchScreen = async () => {
      setLoading(true);
      try {
        await initAccessToken();
        const petData = await getPets().catch(err => {
          console.error('Pet 로딩 실패:', err);
          return null;
        });
        const reportData = await getReports().catch(err => {
          console.error('Report 로딩 실패:', err);
          return null;
        });
        const cameraData = await getCameras().catch(err => {
          console.error('Camera 로딩 실패:', err);
          return null;
        });

        if(petData && petData.isSuccess) setPet(petData.result);
        if (reportData && reportData.isSuccess) setReport(reportData.result);
        if (cameraData && cameraData.isSuccess) setCamera(cameraData.result);

      } catch (error) {
        console.error('데이터 로딩 오류: ', error);
      }
      setLoading(false);
    };
    fetchScreen();
  }, []);

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
                    src={defaultProfile}
                    alt="profile image"
                />
              </div>
              <span className="medium-text">{pet?.name ?? '???'}</span>
            </div>
            <RingGraph
              currentValue={report?.feeding?.totalAmount}
              fullValue={100}
              text={report ? `${report?.feeding?.totalAmount}분` : '...'}
              icon={acivityIcon}
            />
            <RingGraph
              currentValue={report?.feeding?.totalAmount}
              fullValue={100}
              text={report ? `${report?.feeding?.totalAmount}g` : '...'}
              icon={feedIcon}
            />
            <RingGraph
              currentValue={report?.watering?.totalAmount}
              fullValue={100}
              text={report ? `${report?.watering?.totalAmount}ml` : '...'}
              icon={waterIcon}
            />
          </div>
        </section>
        <hr className="main-divider" />

        {/* LIVE 섹션 */}
        <section className='main-section'>
          <div className='heading-wrapper'>
            <h3 className="section-heading">LIVE</h3>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="5" fill={camera ? "#f00" : "#aaa"}/>
            </svg>
            <p className={camera ? 'message hide' : 'message error'}
            >카메라와 연결되지 않았습니다</p>
          </div>
          <LiveBox isLive={false}/>
          <p
            className={!camera ? "medium-text text-button" : "medium-text hide"}
            onClick={()=>navigate('/camera/connect')}
          >카메라 연결 →</p>
        </section>
        <hr className="main-divider" />

        {/* AI SUMMATION 섹션 */}
        <section className="main-section">
          <h3 className="section-heading">AI 요약</h3>
          <p className="small-text">
            {report ? report.aiSummary : '...'}
          </p>

          <button 
            className={report ? "small-button" : "small-button hide"}
            onClick={()=>navigate('/report')}
          >+ 더보기</button>
        </section>
        <Loading visible={loading}/>
      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default MainScreen;