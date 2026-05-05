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
        <h1>테스트용</h1>
      </main>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default MainScreen;