import React, { useState, useEffect, useRef} from 'react';
import type { components } from '../service/api';
import { useNavigate } from 'react-router-dom';
import '../css/live.css';

type CameraData = components['schemas']['CameraDTO'];

interface LiveBoxProps {
  camera?: CameraData | null;
  stream?: MediaStream | null;
  visible?:  boolean;
  isLive?: boolean;
  isFull?: boolean;
  onStartLive?: () => void;
}

const LiveBox: React.FC<LiveBoxProps> = (
  {camera, stream, visible=true, isLive=true, isFull=false, onStartLive}
) => {
  const navigate = useNavigate()
  const [liveOn, setLiveOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => console.error('재생 실패:', err));
    }
  }, [stream]);

  const clickPlayButton = () => {
    if (isLive) {
      setLiveOn(true);
      onStartLive?.();
    } else {
      navigate('/camera/live');
    }
  }

  return (
    <div className={visible? (!isFull? "live-box" : "live-box full") : "live-box hide"}>
      <video
        className='live-viewer'
        ref={videoRef}
        autoPlay
        playsInline
        muted
      >해당 브라우저에서 재생 불가능</video>

      <div className='live-control'>
        {/* 중앙 플레이 버튼 */}
        <div
        className={camera && !liveOn ? 'live-button' :"live-button hide"}
        onClick={clickPlayButton}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        {/* 미연결 표시 */}
        <div
        className={!camera ? 'live-button' :"live-button hide"}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" >
            <path d="M6 6L18 18M18 6L6 18"/>
          </svg>
        </div>
        {/* 우측 상단 태양(밝기) 아이콘 */}
        <div className={camera ? "brightness-icon" : "brightness-icon hide"}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            {camera?.nightVision=="OFF" || camera?.nightVision=="AUTO" ? (
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 11.9156 20.9988 11.8316 20.9965 11.7477C19.8634 12.5371 18.4857 13 17 13C13.134 13 10 9.86601 10 6.00002C10 4.96731 10.2236 3.98683 10.6251 3.10437C6.30715 3.76627 3 7.49693 3 12C3 16.9706 7.02944 21 12 21Z" />
            ):(<>
              <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </>)}
          </svg>
        </div>
        {/* 전체화면 아이콘 */}
        <div
          className= {camera && isLive ? 'full-icon' : 'full-icon hide'}
          onClick={isFull ? ()=>navigate('/camera/live') : ()=>navigate('/camera/full')}
        >
        {
          isFull
          ?<svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="#fff" stroke-width="2" strokeLinecap="round" stroke-linejoin="round">
          <path d="M13.9502 6.19995V10.85C13.9502 12.562 12.5623 13.95 10.8502 13.95H6.2002"/><path d="M23.25 31L23.25 26.35C23.25 24.6379 24.6379 23.25 26.35 23.25L31 23.25"/><path d="M31 13.95L26.35 13.95C24.6379 13.95 23.25 12.562 23.25 10.85L23.25 6.19995"/><path d="M6.2002 23.25L10.8502 23.25C12.5623 23.25 13.9502 24.6379 13.9502 26.35L13.9502 31"/>
          </svg>
          :<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
          <path d="M4 9L4 6C4 4.89543 4.89543 4 6 4L9 4"/><path d="M20 15V18C20 19.1046 19.1046 20 18 20H15"/><path d="M15 4L18 4C19.1046 4 20 4.89543 20 6L20 9"/><path d="M9 20L6 20C4.89543 20 4 19.1046 4 18L4 15"/>
          </svg>
        }
        </div>
      </div>
    </div>
  );
};

export default LiveBox;