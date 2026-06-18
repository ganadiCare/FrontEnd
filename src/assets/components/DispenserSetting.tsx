import { useState } from 'react';
import styles from './../css/feed.module.css'

const DispenserSetting: React.FC = () => {
    const [isOn, setIsOn] = useState(true);

    return (
        <div className={styles.oneColume}>
            <h4 style={{ 'fontWeight': 'bold' }}>DISPENSER</h4>
            <div className={styles.oneColume} style={{ marginLeft: '20px'}}>
                <div className="dropdown" >
                    <button style = {{margin:'0'}} className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Feed 1
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                    </ul>
                </div>
                <div className={styles.oneLine}>
                    <p style={{'margin':0}}>Devide name : </p>
                    <input></input>
                </div>
                <p style={{margin : '0'}}>Devide code : Text</p>
                <div className={styles.oneLine}>
                <h2 className={styles.card_title} style={{ fontSize: '1rem', marginRight:'10px'}}>Clean Mode</h2>
                
                    <div
                        className={styles.track}
                        onClick={() => setIsOn((prev) => !prev)}
                        style={{ backgroundColor: isOn ? "#34c759" : "#e0e0e0" }}
                    >
                        <div
                            className={styles.thumb}
                            style={{ transform: isOn ? "translateX(20px)" : "translateX(0px)" }}
                        />
                    </div>
                </div>
                <button className={styles.add_button} style={{width:'50%', margin : '0'}}> 배식 스케쥴러</button>
                <button className={styles.add_button} style={{width:'50%', margin : '0'}}> 급수 스케쥴러</button>
                <button className={styles.add_button} style={{width:'50%', margin : '0'}}> 공급기 등록/해제</button>
            </div>
            
        </div>
    )
}
export default DispenserSetting
