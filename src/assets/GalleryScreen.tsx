import React, {useState} from 'react';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import Thumbnail  from './components/Thumbnail';
import GalleryBar from './components/GalleryBar';

interface MediaThumbnail{
  mediaId: number;
  url: string;
  createAt: string;
}

interface GalleryScreenProps {
  mediaList?: Array<MediaThumbnail>;
}

const GalleryScreen: React.FC<GalleryScreenProps> = (
  {mediaList=[{mediaId:1, url:'', createAt:''}]}
) => {
  const currentScreen = 'gallery';
  const [checkOn, setCheckOn] = useState(false);
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const checkOnAll = (id: number) => {
    setCheckOn(true);
    setSelectedId([id]);
  }

  const useSelected = (id: number) => {
    setSelectedId((item)=>
      item.includes(id) ? item.filter(itemId => itemId !== id) : [...item, id]
    );
  }

  const setGrid = () => {
    return <div className='gallery-grid'>
      {mediaList?.map((item) => (
      <Thumbnail 
        mediaThumbnail={item}
        checkOn={checkOn}
        isSelected={selectedId.includes(item.mediaId)}
        onThumbnailPress={checkOnAll}
        onSelect={useSelected}
      />
    ))}
    </div>
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
            {mediaList && mediaList.length>0 ? setGrid()
            : <p className='message media-viewer'>저장된 파일이 없습니다</p>}
        </section>
      </main>

      <GalleryBar visible={checkOn} currentScreen={currentScreen} selectedId={selectedId}/>

      <Nav currentScreen={currentScreen} />
    </>
  );
};

export default GalleryScreen;