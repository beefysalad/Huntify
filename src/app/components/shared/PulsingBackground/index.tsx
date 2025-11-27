import React from "react";

const PulsingBackground = () => {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      <div className='absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse' />
      <div className='absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-600/30 rounded-full blur-[120px] animate-pulse [animation-delay:1s]' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse [animation-delay:2s]' />
    </div>
  );
};

export default PulsingBackground;
