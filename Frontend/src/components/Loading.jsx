import React from 'react';

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <video
        src="/Loader.mp4"
        autoPlay
        loop
        muted
        className="w-[100rem] h-[100rem]"
      />
    </div>
  );
};

export default Loading;
