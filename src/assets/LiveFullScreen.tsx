import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useCamera } from './store/useCamera';
//import type { components } from './service/api';
import './css/templete.css';

import LiveBox from './components/LiveBox';
import Controller from './components/Controller';

//type CameraData = components['schemas']['CameraDTO'];

const LiveScreen: React.FC = () => {
  const { cameraData } = useCamera();

  const [direction, setDirection] = useState('center');

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

  useEffect(() => {
    sendControl({ cmd: 'mode', val: 'manual' });
    sendControl({ cmd: 'stop' });
    return () => stopWebRTC();
  }, [sendControl]);

  return (
    <>
      <main
        className="main-content full"
      >
        <section className="full-section full">
          <div onClick={(e) => e.stopPropagation()}>
            <LiveBox 
              isLive={true}
              isFull={true}
              camera={cameraData}
              stream={stream} 
              onStartLive={startWebRTC}
            />
          </div>
          <p className='hide'>{direction}</p>
        </section>
      </main>

      {/* 좌측 컨트롤 */}
      <section className='full-controller'>
        <Controller
          onDirectionClick={setDirection}
          sendControl={sendControl}
          isManual={true}
          isFull={true}
        />
      </section>
    </>
  );
};

export default LiveScreen;