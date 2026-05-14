import styles from './../css/feed.module.css'
import Toggle from "./../components/Toggle";
import History from './../image_folder/History.png'
const Noreserve: React.FC = () => {
    return (
        <div className={styles.center}>
            <img src={History}></img>
            <h3>등록되어있는 예약이 없어요!</h3>
            <button className={styles.add_button}>+ 추가하기</button>
            <div className={styles.setting}>
                <Toggle></Toggle>
            </div>

        </div>
    )
}
export default Noreserve;