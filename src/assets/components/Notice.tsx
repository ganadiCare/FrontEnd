import './../css/Notice.css'
import Header from './Header';
import NoticeContent from './NoticeContent';

interface NoticeProps {
    setNotice: (value: boolean) => void;
}

const Notice: React.FC<NoticeProps> = ({ setNotice }) => {
    return (<div className='overlay1'>
        <Header title='NOTICE' onBack={() => setNotice(false)} />
        <div className='overlay2'>
            <div className='info-window'>
                {/* 상단: 날짜와 닫기 버튼 */}
                <div className='window-header'>
                    <span className='date'>2025.02.08 12:00</span>
                    <button className='close-btn'>&times;</button>
                </div>

                {/* 구분선 (CSS border로 처리해도 되지만 명시적으로 넣을 경우) */}
                {/* <hr className='divider' /> */}

                {/* 하단: 본문 텍스트 */}
                <div className='window-content'>
                    <p className='main-text'>TEXT</p>
                </div>
            </div>
            <NoticeContent/>
            <NoticeContent/>
            <NoticeContent/>
            <NoticeContent/>
            <NoticeContent/>

        </div>
        <button className='button-area'>
            전체 삭제
        </button>

    </div>
    )

}


export default Notice;