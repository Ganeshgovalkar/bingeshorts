import React from 'react';

export default function Chip({ label, active = false, onClick, activeAccent = 'lime', className = '' }) {
  const getActiveStyles = () => {
    if (!active) {
      return 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-white/10';
    }
    switch (activeAccent) {
      case 'lime':
        return 'bg-[#CCFF00] text-black font-bold border-[#CCFF00] shadow-[0_0_12px_rgba(204,255,0,0.4)]';
      case 'coral':
        return 'bg-[#FF4757] text-white font-bold border-[#FF4757] shadow-[0_0_12px_rgba(255,71,87,0.4)]';
      case 'violet':
      default:
        return 'bg-[#9D4EDD] text-white font-bold border-[#9D4EDD] shadow-[0_0_12px_rgba(157,78,221,0.4)]';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 border whitespace-nowrap cursor-pointer active:scale-95 ${getActiveStyles()} ${className}`}
    >
      {label}
    </button>
  );
}
