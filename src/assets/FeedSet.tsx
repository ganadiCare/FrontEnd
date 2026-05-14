import { useState } from "react";
import Header from "./components/Header"
import Nav from "./components/Nav"
import styles from './css/feed.module.css'
import FeedWindow from "./components/FeedWindow";
import FeedSetting from "./components/FeedSetting";
import Noreserve from "./components/Noreserve";
import Schedule from "./components/Schedule";
import 'bootstrap/dist/css/bootstrap.min.css'; // 스타일 임포트
import { Dropdown } from 'react-bootstrap';    // 컴포넌트 임포트

interface FeedSetProps {
  data?: string;
}

const FeedSet: React.FC = () => {
  const currentScreen = 'feed';
  const [state, setState] = useState('schedule');
  return (<>
    <Header
      title='DISPENSER'
    />
    <div className={styles.dispenser}>
      <div className={styles.title}>
        <div className="dropdown">
          <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Feed 1
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.overlay}>
        {state=='None'&&<Noreserve></Noreserve>}
        {state=='set'&&<FeedWindow setState = {setState}></FeedWindow>}
        {state=='setting'&&<FeedSetting></FeedSetting>}
        {state=='schedule'&&<Schedule></Schedule>}
        
        

      </div>


    </div>


    <Nav currentScreen={currentScreen} />
  </>)
}

export default FeedSet;