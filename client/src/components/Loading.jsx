import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
