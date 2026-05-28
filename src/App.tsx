import { Route, Routes } from 'react-router-dom';
import './assets/css/app.css'

import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';
import ProfileScreen from './assets/ProfileScreen'
import GalleryScreen from './assets/GalleryScreen';
import GalleryDetailScreen from './assets/GalleryDetailScreen';
import LiveScreen from './assets/LiveScreen'
import SignUp from './assets/SignUp';
import SignUpStep2 from './assets/SignUpStep2.tsx'; 
import SignUpStep3 from './assets/SignUpStep3.tsx';
import CameraScreen from './assets/CameraScreen';
import CameraScheduleScreen from './assets/CameraScheduleScreen';
import CameraConnectScreen from './assets/CameraConnectScreen';

import TempleteScreen from './assets/TempleteScreen';
import AiReport from './assets/AiReport.tsx';
import SignUpComplete from './assets/SignUpComplete';

function App() {
  return (
    <div className = "mobile-wrapper">
      <div className='app-container'>
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
          <Route path='/signup' element = {<SignUp/>}></Route>
          <Route path='/signup-step2' element = {<SignUpStep2/>}></Route>
          <Route path='/signup-step3' element = {<SignUpStep3/>}></Route>
          <Route path='/signup-complete' element = {<SignUpComplete/>}></Route>
          <Route path='/report' element = {<AiReport/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;