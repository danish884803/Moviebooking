import React from 'react';

const BlurCircle = ({ top = 'auto', right = 'auto', left = 'auto', bottom = 'auto' }) => {
  return (
    <div
      className="absolute -z-50 w-72 h-72 aspect-square rounded-full bg-primary/30 blur-3xl"
      style={{ top, right, left, bottom }}
    ></div>
  );
};

export default BlurCircle;
