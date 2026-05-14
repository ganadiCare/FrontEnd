import { useState } from 'react'
import styles from './../css/feed.module.css'
import foodPic from './../image_folder/Feed.png'
import waterPic from './../image_folder/Water.png'

export default function FeedSetting() {
    let [type, changeType] = useState('food');
    return <>
        <div className={styles.select}>
            <button className={styles.select_button} 
                    onClick={() => changeType('food')}>
                        <img src={foodPic} alt="아이콘" /></button>
            <button className={styles.select_button} 
            onClick={() => changeType('water')}>
                <img src={waterPic} alt="아이콘" /></button>
        </div>
        <div className={styles.window}>
            <h2 className={styles.card_title}>FOOD</h2>
            <div className={styles.info_section}>
                <p>STORAGE AMOUNT : 1000g</p>
                <p>LEFTOVERS : 10g</p>
            </div>
        </div>

        <div className={styles.window}>
            <h2 className={styles.card_title}>Feeding</h2>
            <h2 className={styles.card_title} style={{ fontSize: '1rem' }}>Auto</h2>
            <div className={styles.info_section}>
                <p>Next Feeding : Auto</p>
                <button>FEEDING SCHEDULE</button>
            </div>
            <h2 className={styles.card_title} style={{ fontSize: '1rem' }}>Manual</h2>
            <div className={styles.info_section}>
                <div className={styles.oneLine}>
                    <input type='radio'></input>
                    <p>recommended</p>
                </div>
                <div className={styles.oneLine}>
                    <input type='radio'></input>
                    <p>recommended</p>
                </div>
                <button>FEEDING</button>

            </div>
        </div>
        <div className={styles.setting}>
            <button className={styles.add_button}>설정 완료</button>
        </div>

    </>
}