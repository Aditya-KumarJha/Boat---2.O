import React, { useEffect, useRef, useState } from 'react';
import { Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from './components/Loader';
import MouseTracker from './components/MouseFollower';

import AppRoutes from './routes/AppRoutes';
import ClerkRoutes from './routes/ClerkRoutes';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const loaderShown = sessionStorage.getItem('loaderShown');
    if (loaderShown) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoaded = () => {
    sessionStorage.setItem('loaderShown', 'true');
    setIsLoaded(true);
  };

  return (
    <div className='select-none'>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <MouseTracker onMove={(pos) => (mouseRef.current = pos)} />

      {!isLoaded ? (
        <Loader onLoaded={handleLoaded} mouse={mouseRef} />
      ) : (
        <>
          <AppRoutes />
          <ClerkRoutes />
        </>
      )}
    </div>
  );
};

export default App;
