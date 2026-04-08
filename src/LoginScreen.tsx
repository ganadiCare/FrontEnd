import React from 'react';

// --- TS 타입 정의 ---
interface IconProps {
  size: number;
  color?: string;
}

// --- SVG 아이콘 컴포넌트들 ---
const DonutIcon = ({ size }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="10" fill="none" />
      <circle cx="50" cy="50" r="20" fill="#ddd" />
    </svg>
  );
};

const PawPrintIcon = ({ size, color = 'black' }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      <circle cx="50" cy="65" r="30" />
      <circle cx="20" cy="25" r="10" />
      <circle cx="60" cy="15" r="10" />
      <circle cx="80" cy="25" r="10" />
    </svg>
  );
};

// --- 스타일 정의 (React.CSSProperties 사용) ---
const styles: { [key: string]: React.CSSProperties } = {
  mobileContainer: {
    border: '2px solid black',
    width: '360px',
    height: '720px',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    position: 'relative',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: '10px',
    marginBottom: '60px',
  },
  logoArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoBox: {
    backgroundColor: '#7fdbff',
    borderRadius: '20px',
    width: '150px',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  pawPrint: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#555',
    fontStyle: 'italic',
  },
  bottomArea: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px',
  },
  button: {
    backgroundColor: '#0091ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: '80%',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background-color 0.2s',
  },
  dividerOr: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '15px 0',
    padding: '0 10%',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#888',
  },
  orText: {
    padding: '0 10px',
    color: '#888',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontWeight: 'normal',
    fontFamily: 'monospace',
  },
};

// --- 메인 컴포넌트 ---
const LoginScreen = () => {
  return (
    <div style={styles.mobileContainer}>
      <div style={styles.header}>START</div>

      <div style={styles.logoArea}>
        <div style={styles.logoBox}>
          <DonutIcon size={80} />
          <div style={styles.pawPrint}>
            <PawPrintIcon size={24} />
          </div>
        </div>
        <p style={styles.teamText}>TEAM. animal daisuki</p>
      </div>

      <div style={styles.bottomArea}>
        <button 
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0070c0')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0091ff')}
        >
          E-Mail LOGIN
        </button>

        <div style={styles.dividerOr}>
          <div style={styles.dividerLine} />
          <div style={styles.orText}>or</div>
          <div style={styles.dividerLine} />
        </div>

        <button 
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0070c0')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0091ff')}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;