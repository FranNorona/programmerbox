import { useEffect } from 'react';

const AutoLogout = ({ onLogout, timeout = 600000 }) => {
  useEffect(() => {
    let timer;
    
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onLogout();
      }, timeout);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, [onLogout, timeout]);

  return null;
};

export default AutoLogout;
