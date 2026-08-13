import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCamera } from './store/useCamera';
//import type { components } from './service/api';
import './css/templete.css';

import Header from './components/Header';
import Nav from './components/Nav';
import LiveBox from './components/LiveBox';
import Controller from './components/Controller';
import Move from './image_folder/Move.png';
import Camera from './image_folder/Camera.png'
import Loading from './components/Loading';

//type CameraData = components['schemas']['CameraDTO'];

const LiveScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentScreen = 'camera';

  const { cameraData, isCameraLoading } = useCamera();

  const [controlBar, setControlBar] = useState(() => {
    if (isCameraLoading) return false;
    const stateData = location.state as { controlBar?: boolean } | null;
    return stateData?.controlBar ?? false;
  });
  const [control, setControl] = useState(() => {
    const stateData = location.state as { control?: string } | null;
    return stateData?.control ?? 'control';
  });
  const [direction, setDirection] = useState('center');
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    window.history.replaceState(
      {
        ...window.history.state,
        usr: {
          ...window.history.state?.usr,
          controlBar: controlBar,
          control: control,
        }
      }, ''
    );
  }, [controlBar, control]);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const sessionIdRef = useRef<string>('');

  //WebRTC 시그널링 및 커넥션 수립 함수
  const startWebRTC = async () => {
    const signalingUrl = import.meta.env.VITE_SIGNALING_URL;
    const turnUrls = [
      import.meta.env.VITE_TURN_URL_UDP,
      import.meta.env.VITE_TURN_URL_TCP,
    ].filter((url): url is string => Boolean(url));
    const turnUsername = import.meta.env.VITE_TURN_USERNAME;
    const turnCredential = import.meta.env.VITE_TURN_CREDENTIAL;

    if (!signalingUrl) {
      console.error('VITE_SIGNALING_URL이 설정되지 않았습니다.');
      return;
    }

    const hasTurnConfig = Boolean(
      turnUrls.length > 0 && turnUsername && turnCredential,
    );

    if (turnUrls.length > 0 && !hasTurnConfig) {
      console.error('TURN 서버 주소, 사용자 이름, 자격 증명을 모두 설정해야 합니다.');
      return;
    }

    sessionIdRef.current = crypto.randomUUID();

    wsRef.current = new WebSocket(signalingUrl);

    wsRef.current.onopen = async () => {
      wsRef.current?.send(JSON.stringify({
        type: 'register', role: 'browser', sessionId: sessionIdRef.current
      }));

      const iceServers: RTCIceServer[] = hasTurnConfig
        ? [{
            urls: turnUrls,
            username: turnUsername,
            credential: turnCredential,
          }]
        : [];

      pcRef.current = new RTCPeerConnection({
        iceTransportPolicy: hasTurnConfig ? 'relay' : 'all',
        iceServers,
      });

      pcRef.current.ontrack = (e) => {
        console.log('영상 트랙 수신됨');
        setStream(e.streams[0]);
      };

      pcRef.current.onicecandidate = (e) => {
        if (!e.candidate) {
          console.log('ICE candidate 수집 완료, Offer 전송!');
          wsRef.current?.send(JSON.stringify({
            type: 'offer',
            sdp: pcRef.current?.localDescription?.sdp,
            sessionId: sessionIdRef.current
          }));
        }
      };
      // 서보모터 제어용 데이터 채널 오픈
      dcRef.current = pcRef.current.createDataChannel('control');

      const offer = await pcRef.current.createOffer({ offerToReceiveVideo: true });
      await pcRef.current.setLocalDescription(offer);
    };

    wsRef.current.onmessage = async (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === 'answer' && msg.sessionId === sessionIdRef.current) {
        console.log('Answer 수신 및 설정');
        await pcRef.current?.setRemoteDescription(
          new RTCSessionDescription({ type: 'answer', sdp: msg.sdp })
        );
      }
    };
  };

  // WebRTC 연결 종료
  const stopWebRTC = () => {
    if (wsRef.current) wsRef.current.close();
    if (pcRef.current) pcRef.current.close();
    setStream(null);
  };

  const sendControl = useCallback((cmd: object) => {
    if (!dcRef.current) {
      console.error('WebRTC DataChannel이 생성되지 않았습니다.');
      return;
    }
    if (dcRef.current.readyState !== 'open') {
      console.warn(`제어 대기: '${dcRef.current.readyState}'`);
      return;
    }
    console.log('패킷 전송 성공:', cmd);
    dcRef.current.send(JSON.stringify(cmd));
  }, []);

  const handleResetCam = () => {
    sendControl({ cmd: 'move', pan: 0, tilt: 0 });
    setDirection('center');
  };

  const handleToggleMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const manual = e.target.checked;
    setIsManual(manual);
    sendControl({ cmd: 'mode', val: manual ? 'manual' : 'auto' });
    sendControl({ cmd: 'stop' }); // 안전을 위한 즉시 정지 패킷 송신
  };
  
  const clickScreen = () =>{
    setControlBar(!controlBar);
    if (control=='control')
      setControl('controller');
  }

  useEffect(() => {
    return () => stopWebRTC();
  }, []);

  return (
    <>
      <Header 
        title='CAMERA'
        useBack={false}
      />

      <main className={ isCameraLoading || cameraData?.deviceCode ? "main-content hide" : "main-content" }>
        <section className="full-section">
          <div>
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 8L16 16M16 8L8 16" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <p className="medium-text">연결된 카메라가 없어요!</p>

          <button
            className='medium-button'
            onClick={()=>navigate('/camera/connect')}
          >+ 연결하기</button>
        </section>
      </main>

      <main className={ isCameraLoading || cameraData?.deviceCode ? "main-content full" : "main-content hide" } onClick={clickScreen}>
        <section className="full-section full">
          <div onClick={(e) => e.stopPropagation()}>
            <LiveBox 
              isLive={true}
              camera={cameraData}
              stream={stream} 
              onStartLive={startWebRTC}
            />
          </div>
          <p className='hide'>{direction}</p>
        </section>
      </main>

      {/* 하단 컨트롤 */}
      <section className='control-bar'>
        <div className='control-menu'>
          <div
            className='control-menu-button'
            onClick={() => {
              if (isCameraLoading) return;
              setControlBar(true); 
              setControl('controller');
            }}
          >
            <img className='icon' src={Move} alt="icon" />
          </div>
          <div
            className='control-menu-button'
            onClick={()=>{
              if (isCameraLoading) return;
              setControlBar(true);
              setControl('button');
            }}
          >
            <img className='icon' src={Camera} alt="icon" />
          </div>
        </div>
        {/* 컨트롤러 영역 */}
        <div className={controlBar && control=='controller' ? 'control-component' : 'control-component hide'}>
          <div className='control-manual'>
            <label htmlFor="manual-toggle"className='input-label'>수동 조작</label>
            <input type="checkbox" id="manual-toggle" className="toggle-input" 
            checked={isManual} onChange={handleToggleMode}/>
            <label htmlFor="manual-toggle" className="toggle-input-button">
              <span className="toggle-input-switch"/>
            </label>
          </div>
          <Controller
            onDirectionClick={setDirection}
            sendControl={sendControl}
            isManual={isManual}
          />
          <button
            className='small-button control-reset'
            onClick={handleResetCam}
          >초기화</button>
        </div>
        {/* 버튼 영역 */}
        <div className={controlBar && control=='button' ? 'control-component' : 'control-component hide'}>
          <div className='control-buttons'>
            {/*
            <button
              className='medium-button'
            >화면 녹화</button>
            <button
              className='medium-button'
            >화면 캡처</button>
            */}
            <button
              className='medium-button'
            >카메라 차단</button>
            <button
              className='medium-button'
            >야간 모드</button>
            <button
              className='medium-button'
              onClick={()=>navigate('/camera/schedule')}
            >스케줄 설정</button>
            <button
              className='medium-button'
              onClick={()=>navigate('/camera')}
            >카메라 설정</button>
          </div>
        </div>
      </section>

      <Loading visible={isCameraLoading}></Loading>

      <Nav currentScreen={currentScreen}/>
    </>
  );
};

export default LiveScreen;