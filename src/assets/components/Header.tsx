import React from 'react';
import '../css/templete.css';

import spaceIcon from '../image_folder/User.png';
import backArrow from '../image_folder/Back.png';
import notificationIcon from '../image_folder/Notification.png';

interface HeaderProps {
  title?: string;
  previousScreen: string;
  currentScreen: string;

  onHeaderClick:(state: string) => void;
}

const Header: React.FC<HeaderProps> = (
  { 
    title, previousScreen, currentScreen,
    onHeaderClick
  }) => {
  return (
    <header className="main-header">
      <div className='icon-wrapper'>
        <img 
          src={backArrow} 
          alt="뒤로 가기" 
          className={['main'].includes(currentScreen)?'header-icon hide':'header-icon'}
          onClick={() => onHeaderClick(previousScreen)}
        />

        <img
          src={spaceIcon}
          alt="Profile"
          className={['main','live'].includes(currentScreen)?'header-icon hide':'header-icon'}
          onClick={() => onHeaderClick('profile')}
        />
      </div>

      <h2 className="header-title">{title}</h2>

      <div className='icon-wrapper'>
        <div className='icon-wrapper' onClick={() => onHeaderClick('notification')}>
          <img
            src={notificationIcon}
            alt="Notification"
            className={['main'].includes(currentScreen)?'header-icon hide':'header-icon'}
          />
          <span className={['main'].includes(currentScreen)?'badge hide':'badge'}>15</span>
        </div>
      </div>
    </header>
  );
};

export default Header;