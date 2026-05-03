import React from 'react';
import '../css/templete.css';

import spaceIcon from '../image_folder/User.png';
import backArrow from '../image_folder/Back.png';
import notificationIcon from '../image_folder/Notification.png';

interface HeaderProps {
  title?: string;
  previousScreen: string;
  currentScreen: string;
  visible?: boolean;

  onHeaderClick:(state: string) => void;
}

const Header: React.FC<HeaderProps> = (
  { 
    title, previousScreen, currentScreen, visible=true,
    onHeaderClick
  }) => {
  const useBackButton = ['gallery', 'gallery-detail','live','dispenser','report'];
  const useProfileButton = ['main'];
  const useNotificationButton = ['main','gallery', 'gallery-detail','live','dispenser','report'];
  

  return (
    <header className={visible ? "main-header" : "main-header hide"}>
      <div className='icon-wrapper'>
        <img 
          src={backArrow} 
          alt="뒤로 가기" 
          className={useBackButton.includes(currentScreen)?'header-icon':'header-icon hide'}
          onClick={() => onHeaderClick(previousScreen)}
        />

        <img
          src={spaceIcon}
          alt="Profile"
          className={useProfileButton.includes(currentScreen)?'header-icon':'header-icon hide'}
          onClick={() => onHeaderClick('profile')}
        />
      </div>

      <h2 className="header-title">{title}</h2>

      <div className='icon-wrapper'>
        <div className='icon-wrapper' onClick={() => onHeaderClick('notification')}>
          <img
            src={notificationIcon}
            alt="Notification"
            className={useNotificationButton.includes(currentScreen)?'header-icon':'header-icon hide'}
          />
          <span className={useNotificationButton.includes(currentScreen)?'badge':'badge hide'}>15</span>
        </div>
      </div>
    </header>
  );
};

export default Header;