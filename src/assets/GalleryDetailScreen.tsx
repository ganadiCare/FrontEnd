import React, {useState} from 'react';
//import { useParams } from 'react-router-dom';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import GalleryBar from './components/GalleryBar';
import Popup from './components/Popup';

interface Media{
  mediaId: number;
  fileName: string;
  url: string;
  path: string;
  type: string;
  createAt: string;
  isAutoRecorded: boolean;
  cameraName: string;
}

interface GalleryDetailScreenProps {
  media?: Media;
}

const GalleryDetailScreen: React.FC<GalleryDetailScreenProps> = (
  {media}
) => {
  const currentScreen = 'gallery-detail';
  //const { mediaId } = useParams<{ mediaId: string }>();
  const [useBar, setUseBar] = useState(true);
  const [usePopup, setUsePopup] = useState(false);
  
  const imageTypes = ['png'];
  const videoTypes = ['mp4'];

  const clickScreen = () => {
    setUseBar(!useBar);
  }
  
  const mediaTag = (url='', type='') => {
    if (imageTypes.includes(type)) {
        return <img className='media-viewer' src={url} alt='image'/>;
    } else if (videoTypes.includes(type)) {
        return <video className='media-viewer' src={url} controls/>;
    } else {
        return <p className='message media-viewer'>지원하지 않는 형식의 파일입니다</p>;
    }
  }

  const mediaInfo = () => {
    if (!media) return { title: '', content: '', type: '' };
    
    const mediaTitle = `${media.fileName}`;
    const mediaContent = `${media.createAt} \n${media.cameraName} (${media.isAutoRecorded ? 'auto' : 'manual'})`;
    return {title: mediaTitle, content: mediaContent, type:'' };
  }

  return (
    <>
      <Header
        title='GALLERY'
        visible={useBar}
      />
      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        <section className={useBar ? 'full-section' : 'full-section full'} onClick={clickScreen}>
          <>{mediaTag(media?.url, media?.type)}</>
        </section>
      </main>

      <GalleryBar
        visible={useBar}
        currentScreen={currentScreen}
        media={media}
        onclick={(icon)=>{
          if (icon == 'info') {
            setUsePopup(true); 
        }}}
      />

      <Popup
        popupMessage={mediaInfo()}
        visible={usePopup}
        onBackgroundClick={()=>setUsePopup(false)}
      />

      <Nav
        currentScreen={currentScreen}
        visible={useBar}
      />
    </>
  );
};

export default GalleryDetailScreen;