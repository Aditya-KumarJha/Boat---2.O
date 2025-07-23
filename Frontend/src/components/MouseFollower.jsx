import React, { useEffect, useRef } from 'react';

const MouseFollower = () => {
  const followerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const follow = () => {
      const follower = followerRef.current;
      if (follower) {
        pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
        pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
        follower.style.transform = `translate3d(${pos.current.x - 20}px, ${pos.current.y - 20}px, 0)`;
      }
      requestAnimationFrame(follow);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(follow);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={followerRef}
      className="fixed top-0 left-0 z-[9999] w-10 h-10 pointer-events-none rounded-full 
      border-2 border-gray-400 bg-transparent
      transition-transform duration-75 ease-linear"
    />
  );
};

export default MouseFollower;
