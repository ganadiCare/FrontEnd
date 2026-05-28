import './../css/Notice.css'

const NoticeContent: React.FC = () => {

return(
    <div className='info-window'>
                {/* 상단: 날짜와 닫기 버튼 */}
                <div className='window-header'>
                    <span className='date'>2025.02.08 12:00</span>
                    <button className='close-btn'>&times;</button>
                </div>

                {/* 하단: 본문 텍스트 */}
                <div className='window-content'>
                    <p className='main-text'>TEXT</p>
                </div>
            </div>
)
}

export default NoticeContent;