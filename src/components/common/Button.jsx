import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  className = '', 
  accentColor = 'violet',
  ...props 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        if (accentColor === 'coral') {
          return 'bg-gradient-to-r from-[#FF4757] to-[#FF6B81] text-white shadow-[0_0_20px_rgba(255,71,87,0.4)] hover:brightness-110 active:scale-95';
        }
        if (accentColor === 'lime') {
          return 'bg-[#CCFF00] text-black font-extrabold shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:brightness-105 active:scale-95';
        }
        return 'bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] text-white shadow-[0_0_20px_rgba(157,78,221,0.4)] hover:brightness-110 active:scale-95';
      case 'secondary':
        return 'bg-white/10 hover:bg-white/15 text-white backdrop-blur-md border border-white/15 active:scale-95';
      case 'ghost':
        return 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5 active:scale-95';
      case 'icon':
        return 'p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 active:scale-90';
      default:
        return 'bg-white/10 text-white';
    }
  };

  const getSizeStyles = () => {
    if (variant === 'icon') return '';
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs font-semibold rounded-lg';
      case 'lg':
        return 'px-6 py-3.5 text-base font-bold rounded-2xl';
      case 'md':
      default:
        return 'px-4 py-2.5 text-sm font-semibold rounded-xl';
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
}
