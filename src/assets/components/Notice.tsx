import './../css/Notice.css'
import Header from './Header';

interface NoticeProps {
  setNotice: (value: boolean) => void;
}

const Notice: React.FC<NoticeProps> = ({setNotice}) => {
    return (<div className='overlay'>
        <Header title='notice'/>
        <div>
            <div className='info-window'>
                <h2>제목</h2>
                <p>정보창 제목</p>
            </div>

            <div className='button-area'>
                <button
                onClick={()=>{setNotice(false)}}
                >뒤로가기</button>
            </div>
        </div>
        </div>
    )

}


export default Notice;