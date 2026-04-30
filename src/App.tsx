import { useState } from 'react';

import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';
import LiveScreen from './assets/LiveScreen'

import TempleteScreen from './assets/TempleteScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('templete');

  const onManuClick = (state: string) => {
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
        <LiveScreen 
          onHeaderClick={onManuClick}
          onNavClick={onManuClick}
        />
      )}

      {currentScreen === 'templete' && (
        <TempleteScreen
          onHeaderClick={onManuClick}
          onNavClick={onManuClick}
        />
      )}
    </>
  );
}

export default App;