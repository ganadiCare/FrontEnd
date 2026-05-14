import styles from './../css/feed.module.css'
import Toggle from './../components/Toggle'

interface Props {
  setState: (value: string) => void;
}

export default function FeedWindow({ setState }: Props) {

  return (
    <>
      <div className={styles.window}>
        <h2 className={styles.card_title}>FOOD</h2>
        <div className={styles.info_section}>
          <p>LATEST FEEDING : 12 : 08</p>
          <p>LEFTOVERS : 10g</p>
        </div>
        <hr className={styles.divider} />
        <h2 className={styles.card_title}
          style={{ fontSize: 20 }}>AUTO
          <span style={{ color: 'red' }}> &lt;ON&gt;</span>
        </h2>
        <div className={styles.info_section}
          style={{ fontSize: 12 }}>
          <p>LATEST FEEDING : 12 : 08</p>
          <p>LEFTOVERS : 10g</p>
        </div>
        <button className={styles.add_button}
          onClick={() => setState('setting')}>📎 수정</button>
        <button className={styles.add_button}>➕ 추가</button>
      </div>
      <div className={styles.window}>
        <h2 className={styles.card_title}>FOOD</h2>
        <div className={styles.info_section}>
          <p>LATEST FEEDING : 12 : 08</p>
          <p>LEFTOVERS : 10g</p>
        </div>
        <hr className={styles.divider} />
        <h2 className={styles.card_title}
          style={{ fontSize: 20 }}>AUTO
          <span style={{ color: 'red' }}> &lt;ON&gt;</span>
        </h2>
        <div className={styles.info_section}
          style={{ fontSize: 12 }}>
          <p>LATEST FEEDING : 12 : 08</p>
          <p>LEFTOVERS : 10g</p>
        </div>
        <button className={styles.add_button}>📎 수정</button>
        <button className={styles.add_button}>➕ 추가</button>
      </div>
      <div className={styles.setting}>
        <Toggle></Toggle>
      </div>
    </>
  )
}