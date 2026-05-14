import styles from './../css/feed.module.css'
import { Dropdown } from 'react-bootstrap';


const Schedule: React.FC = () => {
  return (
    <div className={styles.oneColume}>
      <h4>FEEDING SCHEDULE</h4>
      <div className="dropdown">
        <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Feed 1
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Action</a></li>
        </ul>
      </div>
      <p>AUTO FEEDING</p>
      <div className={styles.oneLine}>
        <span>Time</span>
        <input type='number' style={{ 'width': '15%' }} defaultValue={10}></input>
        <span> : </span>
        <input type='number' style={{ 'width': '15%' }} defaultValue={10}></input>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>amount</span>
        <input style={{ 'width': '15%' }} defaultValue={10}></input>
      </div>
      <button className={styles.add_button} style={{ 'width': '100px' }}>+ 추가하기</button>
      <span className={styles.line}></span>
      <p>LIST</p>
      <div></div>
    </div>
  )
}

export default Schedule;