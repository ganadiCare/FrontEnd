import React from 'react';
import '../css/templete.css';

interface PopupMessage{
    title?: string;
    content?: string;
    type?: string
}

interface PopupProps {
    popupMessage?: PopupMessage;
    visible?: boolean;
    onBackgroundClick?: ()=>void;
}

const Popup: React.FC<PopupProps> = (
{popupMessage, visible=false, onBackgroundClick}
) => {
    return (
        <div
            className={visible ? 'popup-background' : 'popup-background hide'}
            onClick={onBackgroundClick}
        >
            <div className={visible ? 'popup-box' : 'popup-box hide'}>
                <h3 className='section-heading'>{popupMessage?.title}</h3>
                <hr className='popup-divider'/>
                <span className='small-text'>{popupMessage?.content}</span>
            </div>
        </div>
    );
};

export default Popup;