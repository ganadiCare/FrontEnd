import React from 'react';
import '../css/templete.css';

import homeIcon from '../image_folder/Home.png';
import folderIcon from '../image_folder/Gallery.png';
import cameraIcon from '../image_folder/Video.png';
import feedIcon from '../image_folder/Feed.png';
import documentIcon from '../image_folder/Report.png';

interface NavProps {
  currentScreen?: string;

  onNavClick:(state: string) => void;
}

const Nav: React.FC<NavProps> = (
  { 
    currentScreen,
    onNavClick
  }) => {
  return (
    <nav className="bottom-nav">
      <div
        className={currentScreen=="main"?"nav-item active":"nav-item"}
        onClick={() => onNavClick('main')}
      >
        <img src={homeIcon} alt="Home" className="nav-icon" />
        <span>Home</span>
      </div>
      
      <div
        className={currentScreen=="gallery"?"nav-item active":"nav-item"}
        onClick={() => onNavClick('gallery')}
      >
        <img src={folderIcon} alt="Gallery" className="nav-icon" />
        <span>Gallary</span>
      </div>

      <div
        className={currentScreen=="live"?"nav-item active":"nav-item"}
        onClick={() => onNavClick('live')}
      >
        <img src={cameraIcon} alt="Live cam" className="nav-icon" />
        <span>Live cam</span>
      </div>

      <div
        className={currentScreen=="feed"?"nav-item active":"nav-item"}
        onClick={() => onNavClick('feed')}
      >
        <img src={feedIcon} alt="Feed set" className="nav-icon" />
        <span>Feed set</span>
      </div>

      <div
        className={currentScreen=="report"?"nav-item active":"nav-item"}
        onClick={() => onNavClick('report')}
      >
        <img src={documentIcon} alt="AI Report" className="nav-icon" />
        <span>AI Report</span>
      </div>
    </nav>
  );
};

export default Nav;