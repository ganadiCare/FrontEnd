import React from 'react';
import '../css/loading.css';

interface LoadingProps {
  visible?: boolean;
}

const Loading: React.FC<LoadingProps> = (
  {visible=true}
) => {
  return (
    <div className={visible ? "loading-box" : "loading-box hide"}>
      <svg className={visible ? "loading-svg" : "hide"} width='50px' height='50px' viewBox="0 0 50 50">
        <circle className={visible ? "loading-circle" : "hide"}
          cx="25"
          cy="25"
          r="20"
          stroke="#0099ff"
          strokeWidth="4"
          fill="none"
          strokeDasharray="90"
          strokeDashoffset="30"
          strokeLinecap="round"
        />
      </svg>
      <p className='loading-text'>데이터 로딩중...</p>
    </div>
  );
};

export default Loading;