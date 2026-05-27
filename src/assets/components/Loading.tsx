import React from 'react';
import '../css/templete.css';

interface LoadingProps {
  visible?: boolean;
}

const Loading: React.FC<LoadingProps> = (
  {visible=true}
) => {
  return (
    <div className={visible ? "loading-box" : "loading-box hide"}>
      <svg className="loading-content" width='100px' height='100px'>
        <circle cx="50" cy="50" r="45" stroke="#0099ff" strokeWidth="4" fill="none" />
      </svg>
      <p className='loading-content'>데이터 로딩중...</p>
    </div>
  );
};

export default Loading;