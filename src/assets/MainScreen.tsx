import React from 'react';
import './css/main.css';
import Header from './contents/Header';
import Bottom from './contents/Bottom';

import spaceIcon from './image_folder/User.png';
import notificationIcon from './image_folder/Notification.png';
import homeIcon from './image_folder/Home.png';
import folderIcon from './image_folder/Gallery.png';
import cameraIcon from './image_folder/Video.png';
import feedIcon from './image_folder/Feed.png';
import documentIcon from './image_folder/Report.png';

const MainScreen: React.FC = () => {
  return (
    <div>
        
        {/* 상단 헤더 */}
        <Header/>

        {/* 스크롤 가능한 메인 콘텐츠 영역 */}
        

        {/* 하단 네비게이션 바 */}
        <Bottom/>

      </div>
  );
};

export default MainScreen;