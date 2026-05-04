import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/templete.css';

import home from '../image_folder/Home.png';
import gallery from '../image_folder/Gallery.png';
import live from '../image_folder/Video.png';
import feed from '../image_folder/Feed.png';
import report from '../image_folder/Report.png';

interface NavProps {
  currentScreen?: string;
  visible?: boolean;
}

const Nav: React.FC<NavProps> = (
  {visible=true, currentScreen}
  //{currentScreen, visible=true, onNavClick}
) => {
  const navigate = useNavigate()
  const array = [
        {id:'main', name:'Home',icon:home},
        {id:'gallery', name:'Gallery',icon:gallery},
        {id:'live', name:'Live cam',icon:live},
        {id:'feed', name:'Feed set',icon:feed},
        {id:'report', name:'Ai report',icon:report},
    ]

  const activateNav = (id:string) => {
    return currentScreen == id ? 'nav-item active' : 'nav-item';
  }

  return (
    <nav className={visible? "bottom-nav" : "bottom-nav hide"}>
      {array.map((item) => (
        <div
        key={item.id}
        className={activateNav(item.id)}
        onClick={() => navigate(`/${item.id}`)}
        >
          <img src={item.icon} className='nav-icon' alt={item.name} />
          <span>{item.name}</span>
        </div>
      ))}
    </nav>
  );
};

export default Nav;