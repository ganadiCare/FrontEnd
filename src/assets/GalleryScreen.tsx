import React, {useState} from 'react';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Thumbnail  from './components/Thumbnail';
import GalleryBar from './components/GalleryBar';

interface GalleryScreenProps {
  url?: string;
  
  onHeaderClick:(state: string) => void;
  onNavClick:(state: string) => void;
  onThumbnailClick:(state: string) => void;
}

const GalleryScreen: React.FC<GalleryScreenProps> = (
{ 
  url='https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80',
  onThumbnailClick,
  onHeaderClick, onNavClick
}) => {
  const currentScreen = 'gallery';
  const [checkOn, setCheckOn] = useState(false);

  const checkOnAll = () => {
    setCheckOn(true);
  }

  return (
    <div className="mobile-wrapper">
      <div className="app-container">
        
        <Header
          previousScreen={checkOn ? 'gallery' : 'main'}
          currentScreen={currentScreen}
          title='GALLERY'
          onHeaderClick={onHeaderClick}
        />

        {/* 메인 콘텐츠 영역 */}
        <main className="main-content">
          <section className='main-section'>
            <div className='gallery-thumbnails'>
              <Thumbnail 
                url={url}
                checkOn={checkOn}
                onThumbnailClick={onThumbnailClick}
                onThumbnailPress={checkOnAll}
              />
              <Thumbnail 
                url={url}
                checkOn={checkOn}
                onThumbnailClick={onThumbnailClick}
                onThumbnailPress={checkOnAll}
              />
            </div>
          </section>
        </main>

        <GalleryBar visible={checkOn}/>

        <Nav
          currentScreen={currentScreen}
          onNavClick={onNavClick}
        />

      </div>
    </div>
  );
};

export default GalleryScreen;