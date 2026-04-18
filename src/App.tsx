import { useState } from 'react';
import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');

  return (
    <>
      {currentScreen === 'start' && (
        <StartScreen onLoginClick={() => setCurrentScreen('login')} />
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
    </>
  );
}

export default App;