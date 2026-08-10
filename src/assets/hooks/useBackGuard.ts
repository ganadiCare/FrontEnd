import { useEffect, useState } from 'react';

// 뒤로가기를 누르면 즉시 이동하는 대신, 안내 팝업을 띄우기 위한 훅
export const useBackGuard = () => {
  const [backPopup, setBackPopup] = useState(false);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      setBackPopup(true);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return { backPopup, setBackPopup };
};
