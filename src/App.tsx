import { Route, Routes } from 'react-router-dom';
import './assets/css/app.css'

import StartScreen from './assets/start';
import SignUp from './assets/SignUp';
import SignUpStep2 from './assets/SignUpStep2.tsx'; 
import SignUpStep3 from './assets/SignUpStep3.tsx';
import SignUpComplete from './assets/SignUpComplete';
import LoginScreen from './assets/LoginScreen';

import MainScreen from './assets/MainScreen';
import ProfileScreen from './assets/ProfileScreen'

import GalleryScreen from './assets/GalleryScreen';
import GalleryDetailScreen from './assets/GalleryDetailScreen';

import LiveScreen from './assets/LiveScreen.tsx';
import LiveFullScreen from './assets/LiveFullScreen.tsx';
import CameraScreen from './assets/CameraScreen';
import CameraScheduleScreen from './assets/CameraScheduleScreen';
import CameraConnectScreen from './assets/CameraConnectScreen';

import DispenserScreen from './assets/DispenserScreen.tsx';
import DispenserSettingScreen from './assets/DispenserSettingScreen.tsx';
import DispenserDetailScreen from './assets/DispenserDetailScreen.tsx';
import DispenserScheduleScreen from './assets/DispenserScheduleScreen.tsx';
import DispenserConnectScreen from './assets/DispenserConnectScreen.tsx';

import ReportScreen from './assets/ReportScreen.tsx';


function App() {
  return (
    <div className = "mobile-wrapper">
      <div className='app-container'>
        <Routes>
          <Route path='/' element = {<StartScreen/>}></Route>
          <Route path='/signup' element = {<SignUp/>}></Route>
          <Route path='/signup-step2' element = {<SignUpStep2/>}></Route>
          <Route path='/signup-step3' element = {<SignUpStep3/>}></Route>
          <Route path='/signup-complete' element = {<SignUpComplete/>}></Route>
          <Route path='/login' element = {<LoginScreen/>}></Route>

          <Route path='/main' element = {<MainScreen/>}></Route>
          <Route path='/profile' element = {<ProfileScreen/>}></Route>

          <Route path='/gallery'>
            <Route index element = {<GalleryScreen/>}></Route>
            <Route path="detail" element={<GalleryDetailScreen />}></Route>
          </Route>

          <Route path='/camera'>
            <Route index element = {<CameraScreen/>}></Route>
            <Route path='schedule' element = {<CameraScheduleScreen/>}></Route>
            <Route path='connect' element = {<CameraConnectScreen/>}></Route>
            <Route path='live' element = {<LiveScreen/>}></Route>
            <Route path='full' element = {<LiveFullScreen/>}></Route>
          </Route>

          <Route path='/dispenser'>
            <Route index element = {<DispenserScreen/>}></Route>
            <Route path='setting' element = {<DispenserSettingScreen/>}></Route>
            <Route path='detail' element = {<DispenserDetailScreen/>}></Route>
            <Route path='schedule' element = {<DispenserScheduleScreen/>}></Route>
            <Route path='connect' element = {<DispenserConnectScreen/>}></Route>
          </Route>
          
          <Route path='/report' element = {<ReportScreen/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;