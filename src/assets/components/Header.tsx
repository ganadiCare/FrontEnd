import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/templete.css';

import Notice from './Notice';

import user from '../image_folder/User.png';
import back from '../image_folder/Back.png';
import notification from '../image_folder/Notification.png';

interface HeaderProps {
  title?: string;
  visible?: boolean;
  useRefresh?: boolean;
  useProfile?: boolean;
  useNotification?: boolean;
  useBack?: boolean;
}

const Header: React.FC<HeaderProps> = (
  {title, visible=true, useProfile=false, useRefresh=false, useNotification=true, useBack=true
}) => {
  const navigate = useNavigate()

  const [notice, setNotice] = useState(false);

  const controlBackButton = () => {
    if (useRefresh) {
      window.location.reload();
    } else if(notice){
      setNotice(false);
    } else {
      navigate(-1);
    }
  }

  const controlNoticeButton = () => {
    setNotice(!notice);
  }
  
  return (
    <>
      <header className={visible ? "main-header" : "main-header hide"}>
        <div className='icon-wrapper'>
          <img
            src={back}
            alt="Back"
            className={(useBack && !useProfile) || notice ? 'header-icon' : 'header-icon hide'}
            onClick={controlBackButton}
          />

          <img
            src={user}
            alt="Profile"
            className={useProfile && !notice ?'header-icon':'header-icon hide'}
            onClick={() => navigate('/profile')}
          />
        </div>

        <h2 className="header-title">{notice ? 'NOTIFICATION' : title}</h2>

        <div className='icon-wrapper'>
          <div className={useNotification?'icon-wrapper':'hide'} onClick={controlNoticeButton}>
            <img
              src={notification}
              alt="Notification"
              className='header-icon'
            />
            <span className='badge'>99</span>
          </div>
        </div>
      </header>
      
      <Notice visible={notice}/>
    </>
  );
};

export default Header;