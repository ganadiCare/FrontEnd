import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { components } from '../service/api';
import '../css/templete.css';
import '../css/notice.css';

import close from '../image_folder/Close.png'

interface NoticeProps {
    visible?: boolean;
}

const Notice: React.FC<NoticeProps> = (
    {visible=false}
) => {
    const navigate = useNavigate()

    return (
        <section className={visible ? 'notice-background' : 'hide'}>
            <div className='notice-list'>
                <div className='notice-box'>
                    <div className='notice-title'>
                        <span className='small-text'>
                            2026.06.06 12:00
                        </span>
                        <img
                            src={close}
                            alt="close"
                            className='list-remove'
                        />
                    </div>
                    <hr className='notice-divider'/>
                    <span className='medium-text'>
                        text
                    </span>
                </div>
            </div>

            <button type="button" className='notice-all-remove'>
                알림 전체 삭제</button>
        </section>
    );
};

export default Notice;