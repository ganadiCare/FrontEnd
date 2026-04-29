import { useState } from 'react';

import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';
import LiveScreen from './assets/LiveScreen'

import TempleteScreen from './assets/TempleteScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('templete');

  const onHeaderClick = (state: string) => {
    setCurrentScreen(state);
  }

  const onNavClick = (state: string) => {
    setCurrentScreen(state);
  }

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
        <TempleteScreen
          onHeaderClick={onHeaderClick}
          onNavClick={onNavClick}
        />
      )}
    </>
  );
}

export default App;