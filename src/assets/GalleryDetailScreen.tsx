import React, {useState} from 'react';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import GalleryBar from './components/GalleryBar';

interface GalleryDetailScreenProps {
  url?: string;
  type?: string;
  
  onHeaderClick:(state: string) => void;
  onNavClick:(state: string) => void;
}

const GalleryDetailScreen: React.FC<GalleryDetailScreenProps> = (
{ 
  url='https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80', type='png',
  onHeaderClick, onNavClick
}) => {
  const currentScreen = 'gallery-detail';
  const [useBar, setUseBar] = useState(true);

  const clickScreen = () => {
    setUseBar(!useBar);
  }

  const imageTypes = ['png'];
  const videoTypes = ['mp4'];
  const mediaTag = (url='', type='') => {
    if (imageTypes.includes(type)) {
        return <img className='media-viewer' src={url} alt='image'/>;
    } else if (videoTypes.includes(type)) {
        return <video className='media-viewer' src={url} controls/>;
    } else {
        return <p>media not found</p>;
    }
  }

  return (
    <div className="mobile-wrapper">
      <div className="app-container">
        
        <Header
          previousScreen='gallery'
          currentScreen={currentScreen}
          title='GALLERY'
          visible={useBar}
          onHeaderClick={onHeaderClick}
        />

        {/* 메인 콘텐츠 영역 */}
        <main className="main-content">
          <section className={useBar ? 'full-section' : 'full-section full'} onClick={clickScreen}>
            <>{mediaTag(url, type)}</>
          </section>
        </main>

        <GalleryBar visible={useBar}/>

        <Nav
          currentScreen={currentScreen}
          visible={useBar}
          onNavClick={onNavClick}
        />

      </div>
    </div>
  );
};

export default GalleryDetailScreen;