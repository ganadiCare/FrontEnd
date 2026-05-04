import React, {useState} from 'react';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Thumbnail  from './components/Thumbnail';
import GalleryBar from './components/GalleryBar';

interface GalleryScreenProps {
  url?: string;
}

const GalleryScreen: React.FC<GalleryScreenProps> = (
{ 
  url='https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80'
}) => {
  const currentScreen = 'gallery';
  const [checkOn, setCheckOn] = useState(false);

  const checkOnAll = () => {
    setCheckOn(true);
  }

  return (
    <>
      <Header
        title='GALLERY'
        useRefresh={checkOn}
      />

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        <section className='main-section'>
          <div className='gallery-thumbnails'>
            <Thumbnail 
              url={url}
              checkOn={checkOn}
              onThumbnailPress={checkOnAll}
            />
            <Thumbnail 
              url={url}
              checkOn={checkOn}
              onThumbnailPress={checkOnAll}
            />
          </div>
        </section>
      </main>

      <GalleryBar visible={checkOn}/>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default GalleryScreen;