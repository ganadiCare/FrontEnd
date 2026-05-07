import { useState } from "react";
import Header from "./components/Header"
import Nav from "./components/Nav"
import './css/feed.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // 스타일 임포트
import { Dropdown } from 'react-bootstrap';    // 컴포넌트 임포트

interface FeedSetProps {
  data?: string;
}

const FeedSet: React.FC = () => {
  const currentScreen = 'feed';

  return (<>
    <Header
      title='DISPENSER'
    />
    <div className="dispenser">
      <div className="title">
        <div className="dropdown">
          <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Feed 1
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
          </ul>
        </div>
      </div>
      <div className="overlay">
        <div className="window">
          
            <h2 className="card-title">FOOD</h2>

            <div className="info-section">
              <p>LATEST FEEDING : 12 : 08</p>
              <p>LEFTOVERS : 10g</p>
            </div>

            <hr className="divider" />

            <div className="auto-section">
              <p className="auto-status">
                AUTO <span className="status-on">&lt;ON&gt;</span>
              </p>
              <div className="reservation-list">
                <p>RESERVATION FEEDING 13 : 00</p>
                <p>RESERVATION FEEDING 18 : 00</p>
              </div>
          </div>
        </div>

                <div className="window">
          
            <h2 className="card-title">FOOD</h2>

            <div className="info-section">
              <p>LATEST FEEDING : 12 : 08</p>
              <p>LEFTOVERS : 10g</p>
            </div>

            <hr className="divider" />

            <div className="auto-section">
              <p className="auto-status">
                AUTO <span className="status-on">&lt;ON&gt;</span>
              </p>
              <div className="reservation-list">
              </div>
          </div>

        </div>
        <div className="setting">

        </div>
      </div>


    </div>


    <Nav currentScreen={currentScreen} />
  </>)
}

export default FeedSet