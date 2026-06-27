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
        {id:'main', url: 'main', name:'Home', icon:home},
        {id:'gallery', url: 'gallery', name:'Gallery', icon:gallery},
        {id:'camera', url: 'camera/live', name:'Live cam', icon:live},
        {id:'dispenser', url: 'dispenser', name:'Feed set', icon:feed},
        {id:'report', url: 'report', name:'AI Report', icon:report},
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
        onClick={() => navigate(`/${item.url}`)}
        >
          <img src={item.icon} className='nav-icon' alt={item.name} />
          <span>{item.name}</span>
        </div>
      ))}
    </nav>
  );
};

export default Nav;