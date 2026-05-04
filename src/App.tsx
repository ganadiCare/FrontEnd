import { useState } from 'react';
import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';
import './assets/css/App.module.css'
import { Route, Routes } from 'react-router-dom';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');

  return (
    // <>
    //   {currentScreen === 'start' && (
    //     <StartScreen onLoginClick={() => setCurrentScreen('login')} />
    //   )}

    //   {currentScreen === 'login' && (
    //     <LoginScreen 
    //       onBackClick={() => setCurrentScreen('start')} 
    //       onLoginSuccess={() => setCurrentScreen('main')}
    //     />
    //   )}

    //   {currentScreen === 'main' && (
    //     <MainScreen />
    //   )}
    // </>
    <div className = "mobile-wrapper">
      <div className='app-container'>
        <Routes>
          <Route path='/' element = {<StartScreen/>}></Route>
          <Route path='/login' element = {<LoginScreen/>}></Route>
          <Route path='main' element = {<MainScreen/>}></Route>
        </Routes>
       
        
      </div>
    </div>
  
    
  );
}

export default App;