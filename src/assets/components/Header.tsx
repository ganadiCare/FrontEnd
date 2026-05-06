import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/templete.css';

import user from '../image_folder/User.png';
import back from '../image_folder/Back.png';
import notification from '../image_folder/Notification.png';

import {noticeContext} from './../../App'

interface HeaderProps {
  title?: string;
  visible?: boolean;

  useRefresh?:boolean;
  useProfile?:boolean;
  useNotification?: boolean
}

const Header: React.FC<HeaderProps> = (
  {title, visible=true, useProfile=false, useRefresh=false, useNotification=true
}) => {
  
  const {setNotice} = useContext(noticeContext)
  const navigate = useNavigate()

  const controlBackButton = () => {
    if (useRefresh) {
      window.location.reload();
    } else {
      navigate(-1);
    }
  }
  
  return (
    <header className={visible ? "main-header" : "main-header hide"}>
      <div className='icon-wrapper'>
        <img 
          src={back} 
          alt="Back" 
          className={!useProfile?'header-icon':'header-icon hide'}
          onClick={()=>{
            controlBackButton;
            setNotice(false);
          }}
        />

        <img
          src={user}
          alt="Profile"
          className={useProfile?'header-icon':'header-icon hide'}
          onClick={() => navigate('/profile')}
        />
      </div>

      <h2 className="header-title">{title}</h2>

      <div className='icon-wrapper'>
        <div className='icon-wrapper' onClick={()=>setNotice(true)}>
          <img
            src={notification}
            alt="Notification"
            className={useNotification?'header-icon':'header-icon hide'}
          />
          <span className={useNotification?'badge':'badge hide'}>15</span>
        </div>
      </div>
    </header>
  );
};

export default Header;