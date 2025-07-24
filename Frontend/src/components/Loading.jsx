import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex justify-center items-center overflow-hidden">
      <video
        src="/Loader.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      />
    </div>
  );
};

export default Loading;
