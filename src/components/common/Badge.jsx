import React from 'react';
import { Sparkles, Flame, Lock, ShieldCheck, Zap } from 'lucide-react';

export default function Badge({ type = 'default', text, className = '' }) {
  const getBadgeStyle = () => {
    switch (type) {
      case 'original':
        return 'bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] text-white shadow-[0_0_12px_rgba(157,78,221,0.5)] border border-purple-400/30';
      case 'trending':
        return 'bg-gradient-to-r from-[#FF4757] to-[#FF6B81] text-white shadow-[0_0_12px_rgba(255,71,87,0.5)] border border-red-400/30';
      case 'lime':
      case 'new':
        return 'bg-[#CCFF00] text-black font-extrabold shadow-[0_0_10px_rgba(204,255,0,0.5)] border border-yellow-300';
      case 'free':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md';
      case 'locked':
        return 'bg-zinc-900/80 text-zinc-400 border border-zinc-700/60 backdrop-blur-md';
      default:
        return 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'original':
        return <Sparkles className="w-3 h-3 mr-1" />;
      case 'trending':
        return <Flame className="w-3 h-3 mr-1" />;
      case 'lime':
      case 'new':
        return <Zap className="w-3 h-3 mr-1 fill-black" />;
      case 'free':
        return <ShieldCheck className="w-3 h-3 mr-1" />;
      case 'locked':
        return <Lock className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold ${getBadgeStyle()} ${className}`}>
      {getIcon()}
      {text}
    </span>
  );
}
