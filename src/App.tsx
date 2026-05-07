import { Route, Routes } from 'react-router-dom';
import './assets/css/app.css'

import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';
import GalleryScreen from './assets/GalleryScreen';
import GalleryDetailScreen from './assets/GalleryDetailScreen';
import LiveScreen from './assets/LiveScreen'
import Notice from './assets/components/Notice';
import FeedSet from './assets/FeedSet';


import TempleteScreen from './assets/TempleteScreen';
import { createContext, useState } from 'react';

export let noticeContext = createContext<any>(null);

function App() {
  let [notice,setNotice] = useState(false);
  return (
    <div className = "mobile-wrapper">
      <div className='app-container'>

        <noticeContext.Provider value={{notice, setNotice}}>
        {notice ? <Notice setNotice = {setNotice}/> : null}
        
        
        <Routes>
          <Route path='/' element = {<StartScreen/>}></Route>
          <Route path='/login' element = {<LoginScreen/>}></Route>
          <Route path='/main' element = {<MainScreen/>}></Route>
          <Route path='/gallery' element = {<GalleryScreen/>}></Route>
          <Route path='/gallery/detail' element = {<GalleryDetailScreen/>}></Route>
          <Route path='/live' element = {<LiveScreen/>}></Route>
          <Route path='/templete' element = {<TempleteScreen/>}></Route>
          <Route path='/feed' element = {<FeedSet/>}></Route>
        </Routes>
        </noticeContext.Provider>
      </div>
    </div>
  );
}

export default App;