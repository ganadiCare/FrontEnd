import React from 'react';
import '../css/gallery.css';

import download from '../image_folder/Download.png'
import share from '../image_folder/Share.png'
import infomation from '../image_folder/Information.png'
import trash from '../image_folder/Trash.png'

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

interface GalleryBarProps {
    currentScreen?: string;
    visible?: boolean;
    selectedId?: Array<number>;
    media?: Media;
    onclick?:(icon:string) => void;
}

const GalleryBar: React.FC<GalleryBarProps> = (
{
    currentScreen, visible=true,
    onclick
}) => {
    return (
        <div className={visible ? 'gallery-bar' : 'gallery-bar hide'}>
            <div
                className='bar-icon-wrapper'
                onClick={()=>onclick?.('download')}
            >
                <img 
                src={download} 
                alt='download' 
                className='bar-icon'
                />
            </div>
            <div
                className='bar-icon-wrapper'
                onClick={()=>onclick?.('share')}
            >
                <img 
                src={share} 
                alt='share' 
                className='bar-icon'
                />
            </div>
            <div
                className={currentScreen=='gallery' ? 'bar-icon-wrapper hide' : 'bar-icon-wrapper' }
                onClick={()=>onclick?.('info')}
            >
                <img 
                src={infomation} 
                alt='infomation' 
                className='bar-icon'
                />
            </div>
            <div
                className='bar-icon-wrapper'
                onClick={()=>onclick?.('trash')}
            >
                <img 
                src={trash} 
                alt='trash' 
                className='bar-icon'
                />
            </div>
        </div>
    );
};

export default GalleryBar;