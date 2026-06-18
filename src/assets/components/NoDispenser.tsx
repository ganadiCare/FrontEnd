import styles from './../css/feed.module.css'
import Close from './../image_folder/Close Square.png'
import DispenserSetting from './DispenserSetting';
import { useState } from 'react';

const NoDispenser: React.FC = () => {

    let [show, setShow] = useState(false)
    if(show){
        return <DispenserSetting/>
    }

    return (
        <div className={styles.center}>
            <img src={Close}></img>
            <h3>연결된 Dispense가 없어요!</h3>
            <button className={styles.add_button} onClick={()=>{setShow(true)}}>📎 추가하기</button>
        </div>
    )
}
export default NoDispenser;