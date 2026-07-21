import styles from './../css/feed.module.css'
import { Dropdown } from 'react-bootstrap';


const Schedule: React.FC = () => {

  let test = [1, 2];

  return (
    <div className={styles.oneColume}>
      <h4>FEEDING SCHEDULE</h4>
      <div style={{ marginLeft: '20px' }}>
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
      </div>
      <button className={styles.add_button} style={{ 'width': '100px' }}>+ 추가하기</button>
      <span className={styles.line}></span>
      <p style={{ marginLeft: '20px' }}>LIST</p>
      <div style={{ marginBottom: '20px' }}>
        {test.map(() => (
          <div className={styles.list}>
            <p>18:00</p>
            <p>20g</p>
            <span>remove</span>
          </div>
        ))}
      </div>
      <p style={{ marginLeft: '20px', marginBottom: '0' }}>FEEDSETTING</p>
      <div style={{display: 'flex', gap:'15px', flexDirection:'column'}}>
      <div className={styles.oneLine} style={{ margin: '10px 30px'}}>
        <input type='radio'></input>
        <span>Fill to target weight</span>
      </div>
      <div className={styles.oneLine} style={{ marginLeft: '30px' }}>
        <input type='radio'></input>
        <span>Skip if food remains</span>
      </div>
      </div>
    </div>
  )
}

export default Schedule;