import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../store/useNotification'
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
  useNotice?: boolean;
  useBack?: boolean;
}

const Header: React.FC<HeaderProps> = (
  {title, visible=true, useProfile=false, useRefresh=false, useNotice=true, useBack=true
}) => {
  const navigate = useNavigate()

  const { notifications } = useNotification();

  const [noticeOn, setNoticeOn] = useState(false);

  const controlBackButton = () => {
    if (useRefresh) {
      window.location.reload();
    } else if(noticeOn){
      setNoticeOn(false);
    } else {
      navigate(-1);
    }
  }

  const controlNoticeButton = () => {
    setNoticeOn(!noticeOn);
  }
  
  return (
    <>
      <header className={visible ? "main-header" : "main-header hide"}>
        <div className='icon-wrapper'>
          <img
            src={back}
            alt="Back"
            className={(useBack && !useProfile) || noticeOn ? 'header-icon' : 'header-icon hide'}
            onClick={controlBackButton}
          />

          <img
            src={user}
            alt="Profile"
            className={useProfile && !noticeOn ?'header-icon':'header-icon hide'}
            onClick={() => navigate('/profile')}
          />
        </div>

        <h2 className="header-title">{noticeOn ? 'NOTIFICATION' : title}</h2>

        <div className='icon-wrapper'>
          <div className={useNotice ?'icon-wrapper':'hide'} onClick={controlNoticeButton}>
            <img
              src={notification}
              alt="Notification"
              className='header-icon'
            />
            <span className={ (notifications?.length>0) && !noticeOn ? 'badge' : 'badge hide' }
              >{notifications?.length}</span>
          </div>
        </div>
      </header>
      
      <Notice visible={noticeOn}/>
    </>
  );
};

export default Header;