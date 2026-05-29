import { useState } from "react";
import styles from './../css/feed.module.css'
import { useSelector } from "react-redux";

export default function Toggle() {
  let camSlice = useSelector((state:any) =>  state.camSlice )
  console.log('클리닝모드는',camSlice.dispenser?.result?.isCleaningMode)
  const [isOn, setIsOn] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* 라벨 영역 */}
        <div className={styles.labelBlock}>
          <div className={styles.ttitle}>CLEANING MODE</div>
          <div className={styles.subtitle}>
            * 청소모드일때는 자동 배식/급수가 작동하지 않습니다!
          </div>
        </div>

        {/* 토글 버튼 */}
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
    </div>
  );
}