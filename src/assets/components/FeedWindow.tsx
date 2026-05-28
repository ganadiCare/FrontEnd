import styles from './../css/feed.module.css'
import Toggle from './../components/Toggle'
import { useSelector } from 'react-redux';

interface Props {
  setState: (value: string) => void;
}

export default function FeedWindow({ setState }: Props) {
  let camSlice = useSelector((state:any) =>  state.camSlice )

  return (
    <>
      <div className={styles.window}>
        <h2 className={styles.card_title}>FOOD</h2>
        <div className={styles.info_section}>
          <p>LATEST FEEDING : {camSlice.dispenser?.result?.food?.latestFeedTime}</p>
          <p>LEFTOVERS : {camSlice.dispenser?.result?.food?.leftovers}g</p>
        </div>
        <hr className={styles.divider} />
        <h2 className={styles.card_title}
          style={{ fontSize: 20 }}>AUTO
          <span style={{ color: 'red' }}> &lt;ON&gt;</span>
        </h2>
        <div className={styles.info_section}
          style={{ fontSize: 12 }}>
          <p>RESERVATION FEEDING : 12 : 08</p>
          <p>RESERVATION FEEDING : 12 : 08</p>
        </div>
        <button className={styles.add_button}
          onClick={() => setState('setting')}>📎 수정</button>
        <button className={styles.add_button}>➕ 추가</button>
      </div>
      <div className={styles.window}>
        <h2 className={styles.card_title}>WATER</h2>
        <div className={styles.info_section}>
          <p>LATEST FEEDING : {camSlice.dispenser?.result?.water?.latestWateringTime}</p>
          <p>LEFTOVERS : {camSlice.dispenser?.result?.water?.leftovers}g</p>
        </div>
        <hr className={styles.divider} />
        <h2 className={styles.card_title}
          style={{ fontSize: 20 }}>AUTO
          <span style={{ color: 'red' }}> &lt;ON&gt;</span>
        </h2>

        <button className={styles.add_button}>📎 수정</button>
      </div>
      <div className={styles.setting}>
        <Toggle></Toggle>
      </div>
    </>
  )
}