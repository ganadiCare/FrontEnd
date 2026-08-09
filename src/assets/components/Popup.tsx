import React from 'react';
import '../css/templete.css';
import '../css/popup.css'

interface PopupMessage{
    title?: string;
    content?: string | React.ReactNode;
    type?: string
}

interface PopupProps {
    popupMessage?: PopupMessage;
    visible?: boolean;
    onBackgroundClick?: ()=>void;
    onOkClick?: ()=>void;
    onCancelClick?: ()=>void;
}

const Popup: React.FC<PopupProps> = (
{popupMessage, visible=false, onBackgroundClick , onOkClick, onCancelClick}
) => {
    return (
        <div
            className={visible ? 'popup-background' : 'popup-background hide'}
            onClick={onBackgroundClick}
        >
            <div className={visible ? 'popup-box' : 'popup-box hide'}>
                <h2 className='section-heading'>{popupMessage?.title}</h2>
                <hr className='popup-divider'/>
                <span className='small-text'>{popupMessage?.content}</span>

                <div className={popupMessage?.type=='OK' ? 'popup-buttons' : 'popup-buttons hide'}>
                    <button type="button" className='medium-button'
                    onClick={onOkClick} >확인</button>
                </div>
                
                <div className={popupMessage?.type=='OX' ? 'popup-buttons' : 'popup-buttons hide'}>
                    <button type="button" className='medium-button'
                    onClick={onOkClick} >예</button>
                    <button type="button" className='medium-button'
                    onClick={onCancelClick} >아니오</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;