import { Route, Routes } from 'react-router-dom';
import './assets/css/app.css'

import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';
import ProfileScreen from './assets/ProfileScreen'
import GalleryScreen from './assets/GalleryScreen';
import GalleryDetailScreen from './assets/GalleryDetailScreen';
import LiveScreen from './assets/LiveScreen'
import Notice from './assets/components/Notice';
import FeedSet from './assets/FeedSet';

import TempleteScreen from './assets/TempleteScreen';
import { createContext, useEffect, useState } from 'react';
import { fetchInitialData } from './assets/service/ApiGet';
import { useDispatch, useSelector } from 'react-redux';
import { setCamslice } from './data/store';

export let noticeContext = createContext<any>(null);
import SignUp from './assets/SignUp';
import SignUpStep2 from './assets/SignUpStep2.tsx'; 
import SignUpStep3 from './assets/SignUpStep3.tsx';
import CameraScreen from './assets/CameraScreen';
import CameraScheduleScreen from './assets/CameraScheduleScreen';
import CameraConnectScreen from './assets/CameraConnectScreen';


import AiReport from './assets/AiReport.tsx';
import SignUpComplete from './assets/SignUpComplete';

function App() {
  const dispatch = useDispatch();
  const CamData = useSelector((state:any) => state.camSlice);

  let [notice,setNotice] = useState(false);

 useEffect(()=>{
  fetchInitialData()
  .then((res)=>{
    if(res){
    dispatch(setCamslice(res));
    console.log(CamData, '리덕스로 전달받음')
    }
  })
  .catch((err)=>{console.log('못받음 ',err)})
 },[CamData])
  
  return (
    <div className = "mobile-wrapper">
      <div className='app-container'>

        <noticeContext.Provider value={{notice, setNotice}}>
        {notice ? <Notice setNotice = {setNotice}/> : null}
        
        
        <Routes>
          <Route path='/' element = {<StartScreen/>}></Route>
          <Route path='/login' element = {<LoginScreen/>}></Route>

          <Route path='/main' element = {<MainScreen/>}></Route>
          <Route path='/profile' element = {<ProfileScreen/>}></Route>

          <Route path='/gallery' element = {<GalleryScreen/>}></Route>
          <Route path="/gallery/detail/:mediaId" element={<GalleryDetailScreen />}></Route>

          <Route path='/live' element = {<LiveScreen/>}></Route>
          <Route path='/camera' element = {<CameraScreen/>}></Route>
          <Route path='/camera/schedule' element = {<CameraScheduleScreen/>}></Route>
          <Route path='/camera/connect' element = {<CameraConnectScreen/>}></Route>

          <Route path='/templete' element = {<TempleteScreen/>}></Route>
          <Route path='/feed' element = {<FeedSet/>}></Route>
          <Route path='/signup' element = {<SignUp/>}></Route>
          <Route path='/signup-step2' element = {<SignUpStep2/>}></Route>
          <Route path='/signup-step3' element = {<SignUpStep3/>}></Route>
          <Route path='/signup-complete' element = {<SignUpComplete/>}></Route>
          <Route path='/report' element = {<AiReport/>}></Route>
        </Routes>
        </noticeContext.Provider>
      </div>
    </div>
  );
}

export default App;