import React from 'react';
import LoginScreen from './LoginScreen'; // 아래에서 만들 컴포넌트

function App() {
  return (
    // 전체 배경과 화면 중앙 정렬을 위한 컨테이너
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5', // 부드러운 배경색
    }}>
      <LoginScreen />
    </div>
  );
}

export default App;