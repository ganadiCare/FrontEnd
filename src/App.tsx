import { useState } from 'react';

import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';
import LiveScreen from './assets/LiveScreen'

import TempleteScreen from './assets/TempleteScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('templete');

  return (
    <>
      {currentScreen === 'start' && (
        <StartScreen
          onLoginClick={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen 
          onBackClick={() => setCurrentScreen('start')} 
          onLoginSuccess={() => setCurrentScreen('main')}
        />
      )}

      {currentScreen === 'main' && (
        <MainScreen />
      )}

      {currentScreen === 'live' && (
        <LiveScreen />
      )}

      {currentScreen === 'templete' && (
        <TempleteScreen />
      )}
    </>
  );
}

export default App;