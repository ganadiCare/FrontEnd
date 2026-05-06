import { Route, Routes } from 'react-router-dom';
import './assets/css/app.css'

import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';
import GalleryScreen from './assets/GalleryScreen';
import GalleryDetailScreen from './assets/GalleryDetailScreen';
import LiveScreen from './assets/LiveScreen'
import SignUp from './assets/SignUp';

import TempleteScreen from './assets/TempleteScreen';

function App() {
  return (
    <div className = "mobile-wrapper">
      <div className='app-container'>
        <Routes>
          <Route path='/' element = {<StartScreen/>}></Route>
          <Route path='/login' element = {<LoginScreen/>}></Route>
          <Route path='/main' element = {<MainScreen/>}></Route>
          <Route path='/gallery' element = {<GalleryScreen/>}></Route>
          <Route path='/gallery/detail' element = {<GalleryDetailScreen/>}></Route>
          <Route path='/live' element = {<LiveScreen/>}></Route>
          <Route path='/templete' element = {<TempleteScreen/>}></Route>
          <Route path='/signup' element = {<SignUp/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;