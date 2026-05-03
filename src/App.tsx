import { useState } from 'react';

import StartScreen from './assets/start';
import LoginScreen from './assets/LoginScreen';
import MainScreen from './assets/MainScreen';
import GalleryScreen from './assets/GalleryScreen';
import GalleryDetailScreen from './assets/GalleryDetailScreen';
import LiveScreen from './assets/LiveScreen'

import TempleteScreen from './assets/TempleteScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('templete');
  const [refresh, setRefresh] = useState(false);

  const onManuClick = (state: string) => {
    if (state === currentScreen) {
      setRefresh(prev => !prev);
    } else {
      setCurrentScreen(state);
    }
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
        <MainScreen
          onHeaderClick={onManuClick}
          onNavClick={onManuClick}
          onPlayClick={onManuClick}
        />
      )}

      {currentScreen === 'gallery' && (
        <GalleryScreen
          key={refresh.toString()}
          onThumbnailClick={onManuClick}
          onHeaderClick={onManuClick}
          onNavClick={onManuClick}
        />
      )}

      {currentScreen === 'gallery-detail' && (
        <GalleryDetailScreen
          onHeaderClick={onManuClick}
          onNavClick={onManuClick}
        />
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