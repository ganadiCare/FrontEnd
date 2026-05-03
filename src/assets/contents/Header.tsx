import './../css/main.css'
import userIcon from './../image_folder/User.png';
import backIcon from './../image_folder/Back.png';
import Notice from './../image_folder/Notification.png'

const Header: React.FC = () => {
    return(
        <div className='main-header'>
            <img src={userIcon}></img>
            <h1>HOME</h1>
            <img src={Notice}></img>
        </div>
    )
}
export default Header;