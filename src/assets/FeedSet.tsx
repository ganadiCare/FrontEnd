import { useState } from "react";
import Header from "./components/Header"
import Nav from "./components/Nav"
import styles from './css/feed.module.css'
import FeedWindow from "./components/FeedWindow";
import FeedSetting from "./components/FeedSetting";
import Noreserve from "./components/Noreserve";
import Schedule from "./components/Schedule";
import NoDispenser from "./components/NoDispenser";
import 'bootstrap/dist/css/bootstrap.min.css'; // 스타일 임포트
import { Dropdown } from 'react-bootstrap';    // 컴포넌트 임포트
import { useSelector } from "react-redux";

interface FeedSetProps {
  data?: string;
}

const FeedSet: React.FC = () => {
  const currentScreen = 'feed';
  const [state, setState] = useState('set');

  //리덕스테스트
  let camSlice = useSelector((state:any) =>  state.camSlice )
  console.log('피딩데이터는',camSlice.dispenser?.result?.water)

  //디스펜서연결용 임시변수
  let online = true

  return (<>
    <Header
      title='DISPENSER'
    />
    {
      online && 
    
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
        {state=='setting'&&<FeedSetting setState = {setState}></FeedSetting>}
        {state=='schedule'&&<Schedule></Schedule>}
        
        

      </div>


    </div>
}
  {!online  && <NoDispenser></NoDispenser>}


    <Nav currentScreen={currentScreen} />
  </>)
}

export default FeedSet;