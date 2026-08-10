import React from 'react';
import { useNotification } from '../store/useNotification'
import '../css/templete.css';
import '../css/notice.css';

import close from '../image_folder/Close.png'

interface Notification {
    id: string;
    message: string;
    date: string;
}

interface NoticeProps {
    visible?: boolean;
}

const Notice: React.FC<NoticeProps> = (
    {visible=false}
) => {
    const { notifications, removeNotification, removeAllNotification } = useNotification();

    const setNoticeList = (notice: Notification) => (
        <div className='notice-box' key={notice.id}>
            <div className='notice-title'>
                <span className='small-text'>{notice.date}</span>
                <img
                    src={close}
                    alt="close"
                    className='list-remove'
                    onClick={() => removeNotification(notice.id)}
                />
            </div>
            <hr className='notice-divider'/>
            <span className='medium-text'>{notice.message}</span>
        </div>
    )

    return (
        <section className={visible ? 'notice-background' : 'hide'}>
            <div className='notice-list'>
                <p
                    className={notifications.length>0 ? 'small-text dark hide' : 'small-text dark'}
                >알림이 없습니다.</p>
                {notifications.map(setNoticeList)}
            </div>

            <button
                type="button"
                className={notifications.length>0 ? 'notice-all-remove' : 'notice-all-remove hide'}
                onClick={removeAllNotification}
            >알림 전체 삭제</button>
        </section>
    );
};

export default Notice;