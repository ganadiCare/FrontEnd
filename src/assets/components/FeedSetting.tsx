import { useState } from 'react'
import styles from './../css/feed.module.css'
import foodPic from './../image_folder/Feed.png'
import waterPic from './../image_folder/Water.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

interface Props {
    setState: (value: string) => void;
}

export default function FeedSetting({ setState }: Props) {
    let camSlice = useSelector((state:any) =>state.camSlice)
    const [isOn, setIsOn] = useState(true);
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
        {type == 'food' &&
            <>
                <div className={styles.window}>
                    <h2 className={styles.card_title}>FOOD</h2>
                    <div className={styles.info_section}>
                        <p>STORAGE AMOUNT : {camSlice.feeding.result?.[0]?.amount}g</p>
                        <p>LEFTOVERS : {camSlice.feeding.result?.[0]?.leftovers}g</p>
                    </div>
                </div>

                <div className={styles.window}>
                    <h2 className={styles.card_title}>Feeding</h2>
                    <div className={styles.oneLine}>
                        <h2 className={styles.card_title} style={{ fontSize: '1rem', marginRight: '10px' }}>Auto</h2>
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
                    <div className={styles.info_section}>
                        <p>Next Feeding : Auto</p>
                        <button onClick={() => setState('schedule')}>FEEDING SCHEDULE</button>
                    </div>
                    <h2 className={styles.card_title} style={{ fontSize: '1rem' }}>Manual</h2>
                    <div className={styles.info_section}>
                        <div className={styles.oneLine} style={{ marginLeft: '12px' }}>
                            <input type='radio'></input>
                            <p>recommended</p>
                            <p>15g</p>
                        </div>
                        <div className={styles.oneLine} style={{ marginLeft: '12px' }}>
                            <input type='radio'></input>
                            <p>custom</p>
                            <input style={{ width: '75px', marginLeft: '20px' }}></input>
                        </div>
                        <button>FEEDING</button>
                    </div>
                </div>
            </>}
        {type == 'water' &&
            <>
                <div className={styles.window}>
                    <h2 className={styles.card_title}>WATER</h2>
                    <div className={styles.info_section}>
                        <p>STORAGE AMOUNT : {camSlice.watering.result?.[0]?.amount}g</p>
                        <p>LEFTOVERS : {camSlice.watering.result?.[0]?.leftovers}g</p>
                    </div>
                </div>

                <div className={styles.window}>
                    <h2 className={styles.card_title}>Feeding</h2>
                    <div className={styles.oneLine}>
                    <h2 className={styles.card_title} style={{ fontSize: '1rem', marginRight:'10px'}}>Auto</h2>
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
                    <h2 className={styles.card_title} style={{ fontSize: '1rem' }}>Manual</h2>
                    <div className={styles.info_section} >
                        <div className={styles.oneLine} style={{ marginLeft: '12px' }}>
                            <input type='radio'></input>
                            <p>recommended</p>
                            <p>15g</p>
                        </div>
                        <div className={styles.oneLine} style={{ marginLeft: '12px' }}>
                            <input type='radio'></input>
                            <p>custom</p>
                            <input style={{ width: '75px', marginLeft: '20px' }}></input>
                        </div>
                        <button>WATERING</button>
                    </div>
                    <h2 className={styles.card_title} style={{ fontSize: '1rem' }}>Water Setting</h2>
                    <div className={styles.info_section}>
                        <div className={styles.oneLine}>
                            <p>MIN Water</p>
                            <input style={{ width: '75px', marginLeft: '20px' }}></input>
                            <p>MAX Water</p>
                            <input style={{ width: '75px', marginLeft: '20px' }}></input>
                        </div>

                    </div>
                </div>
            </>}
        <div className={styles.setting}>
            <button className={styles.add_button} onClick={() => setState('set')}>설정 완료</button>
        </div>

    </>
}