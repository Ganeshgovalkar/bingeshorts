import React from 'react';

export default function ProgressBar({ percent = 0, color = 'violet', height = 'h-1.5', className = '' }) {
  const getColorStyle = () => {
    switch (color) {
      case 'coral':
        return 'bg-gradient-to-r from-[#FF4757] to-[#FF6B81] shadow-[0_0_8px_rgba(255,71,87,0.6)]';
      case 'lime':
        return 'bg-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.6)]';
      case 'gradient':
        return 'bg-gradient-to-r from-[#9D4EDD] via-[#FF4757] to-[#CCFF00]';
      case 'violet':
      default:
        return 'bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] shadow-[0_0_8px_rgba(157,78,221,0.6)]';
    }
  };

  return (
    <div className={`w-full bg-white/10 rounded-full overflow-hidden ${height} ${className}`}>
      <div
        className={`${height} rounded-full transition-all duration-300 ${getColorStyle()}`}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}
