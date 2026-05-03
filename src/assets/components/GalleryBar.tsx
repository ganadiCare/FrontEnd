import React from 'react';
import '../css/gallery.css';

import download from '../image_folder/Download.png'
import share from '../image_folder/Share.png'
import infomation from '../image_folder/Information.png'
import trash from '../image_folder/Trash.png'


interface GalleryBarProps {
    visible?: boolean
    onIconClick?(): void;
}

const GalleryBar: React.FC<GalleryBarProps> = (
{
    visible=true,
    onIconClick
}) => {
    return (
        <div className={visible ? 'gallery-bar' : 'gallery-bar hide'}>
            <div className='bar-icon-wrapper' onClick={onIconClick}>
                <img 
                src={download} 
                alt='download' 
                className='bar-icon'
                />
            </div>
            <div className='bar-icon-wrapper' onClick={onIconClick}>
                <img 
                src={share} 
                alt='share' 
                className='bar-icon'
                />
            </div>
            <div className='bar-icon-wrapper' onClick={onIconClick}>
                <img 
                src={infomation} 
                alt='infomation' 
                className='bar-icon'
                />
            </div>
            <div className='bar-icon-wrapper' onClick={onIconClick}>
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