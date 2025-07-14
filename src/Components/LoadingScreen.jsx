import React from "react";

const LoadingScreen = ({ percent }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
      <div className="text-2xl mb-4">Loading assets...</div>
      <div className="text-4xl font-bold">{percent}%</div>
      <div className="w-64 h-2 bg-gray-700 rounded mt-6">
        <div
          className="h-2 bg-blue-500 rounded"
          style={{ width: `${percent}%`, transition: 'width 0.3s' }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
