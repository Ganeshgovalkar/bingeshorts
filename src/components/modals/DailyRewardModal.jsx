import React, { useState } from 'react';
import { X, Flame, Sparkles, Coins, Check, Gift } from 'lucide-react';

export default function DailyRewardModal({ onClose, onClaimReward, coinBalance = 150 }) {
  const [claimed, setClaimed] = useState(false);

  const days = [
    { day: 1, reward: '+10', claimed: true },
    { day: 2, reward: '+20', claimed: true },
    { day: 3, reward: '+25', claimed: true },
    { day: 4, reward: '+30', claimed: true },
    { day: 5, reward: '+50', active: true },
    { day: 6, reward: '+75', locked: true },
    { day: 7, reward: 'VIP Pass', special: true, locked: true }
  ];

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => {
      onClaimReward && onClaimReward(50);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-[420px] bg-[#111116] rounded-3xl border border-amber-500/40 p-6 space-y-5 shadow-beautiful-lg transition-spring text-left">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/6 hover:bg-white/12 text-gray-300 hover:text-white transition-spring cursor-pointer shadow-beautiful-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="space-y-1 pt-1 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 mx-auto flex items-center justify-center text-white shadow-[0_0_24px_rgba(245,158,11,0.5)]">
            <Flame className="w-8 h-8 fill-white" />
          </div>

          <h2 className="font-display text-2xl font-extrabold text-white tracking-tight pt-2">
            5-Day Binge Streak!
          </h2>
          <p className="text-xs text-gray-300">
            Check in daily to earn Binge Coins and unlock exclusive microdrama episodes.
          </p>
        </div>

        {/* 7-Day Grid */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {days.slice(0, 4).map((d) => (
            <div key={d.day} className="p-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1 shadow-beautiful-sm">
              <span className="text-[9px] font-mono text-emerald-400 font-bold block">Day {d.day}</span>
              <Check className="w-4 h-4 text-emerald-400 mx-auto" />
              <span className="text-[10px] font-mono font-bold text-gray-300 block">{d.reward}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {days.slice(4).map((d) => (
            <div 
              key={d.day} 
              className={`p-2.5 rounded-2xl text-center space-y-1 shadow-beautiful-sm ${
                d.active 
                  ? 'bg-amber-500/20 border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse'
                  : 'bg-white/5 border border-white/10 opacity-60'
              }`}
            >
              <span className="text-[9px] font-mono text-amber-300 font-bold block">Day {d.day}</span>
              {d.special ? <Gift className="w-4 h-4 text-[#CCFF00] mx-auto" /> : <Coins className="w-4 h-4 text-amber-400 mx-auto" />}
              <span className="text-[10px] font-mono font-bold text-white block">{d.reward}</span>
            </div>
          ))}
        </div>

        {/* Claim Action */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleClaim}
            disabled={claimed}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(245,158,11,0.45)] border border-amber-400/30 active:scale-95 transition-spring cursor-pointer disabled:opacity-50"
          >
            {claimed ? (
              <span className="flex items-center gap-1.5 font-mono">
                <Check className="w-4 h-4 text-white" /> +50 Coins Added!
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-mono">
                <Sparkles className="w-4 h-4" /> Claim Today's +50 Binge Coins
              </span>
            )}
          </button>

          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 px-1">
            <span>Current Balance:</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Coins className="w-3 h-3" /> {coinBalance} Coins
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
