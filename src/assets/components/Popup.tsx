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
    boxClassName?: string;
    onBackgroundClick?: ()=>void;
    onOkClick?: ()=>void;
    onCancelClick?: ()=>void;
}

const Popup: React.FC<PopupProps> = (
{popupMessage, visible=false, boxClassName, onBackgroundClick , onOkClick, onCancelClick}
) => {
    return (
        <div
            className={`popup-background${boxClassName ? ' ' + boxClassName : ''}${visible ? '' : ' hide'}`}
        >
            <div className={`popup-box${boxClassName ? ' ' + boxClassName : ''}${visible ? '' : ' hide'}`}>
                <h2 className='section-heading'>{popupMessage?.title}</h2>
                <hr className='popup-divider'/>
                <span className='small-text'>{popupMessage?.content}</span>

                <div className={popupMessage?.type=='OK' ? 'popup-buttons' : 'popup-buttons hide'}>
                    <button type="button" className='medium-button'
                    onClick={onOkClick}>확인</button>
                </div>

                <div className={popupMessage?.type=='OKC' ? 'popup-buttons' : 'popup-buttons hide'}>
                    <button type="button" className='medium-button'
                    onClick={onOkClick}>확인</button>
                    <button type="button" className='medium-button'
                    onClick={onCancelClick}>취소</button>
                </div>
                
                <div className={popupMessage?.type=='OX' ? 'popup-buttons' : 'popup-buttons hide'}>
                    <button type="button" className='medium-button popup-confirm'
                    onClick={onOkClick}>예</button>
                    <button type="button" className='medium-button'
                    onClick={onCancelClick}>아니오</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;