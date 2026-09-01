import React from 'react';
import { Flame, Bell, Zap, Settings, Shield, Sparkles, Coins, ChevronRight } from 'lucide-react';
import { WATCH_TRACK_STATS } from '../../data/microdramas';

export default function UserHubTemplate({ onOpenDailyReward, coinBalance = 150 }) {
  return (
    <div className="p-4 space-y-5 pb-6">
      {/* Profile Card Header with Studio Vignette */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1E1428] via-[#111116] to-[#070709] border border-purple-500/30 flex items-center justify-between shadow-beautiful-md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#9D4EDD] via-[#FF4757] to-[#CCFF00] p-0.5 shadow-beautiful-sm">
            <div className="w-full h-full rounded-full bg-[#111116] flex items-center justify-center font-display font-extrabold text-white text-lg">
              AX
            </div>
          </div>

          <div>
            <h2 className="font-display text-base font-extrabold text-white">Alex Rivera</h2>
            <p className="text-xs text-purple-300 font-semibold">{WATCH_TRACK_STATS.level}</p>
            <div className="flex items-center gap-2 mt-1">
              <button 
                onClick={onOpenDailyReward}
                className="px-2.5 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-[10px] font-bold font-mono border border-amber-500/40 flex items-center gap-1 transition-spring active:scale-95 cursor-pointer shadow-beautiful-sm"
              >
                🔥 {WATCH_TRACK_STATS.streakDays} Day Streak (Claim)
              </button>
            </div>
          </div>
        </div>

        {/* Coin Balance Badge */}
        <div 
          onClick={onOpenDailyReward}
          className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 text-right cursor-pointer transition-spring active:scale-95 shadow-beautiful-sm"
        >
          <span className="text-[9px] font-mono text-gray-400 uppercase block">Wallet</span>
          <span className="text-xs font-mono font-extrabold text-amber-400 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5" /> {coinBalance}
          </span>
        </div>
      </div>

      {/* Watch Track Statistics Grid */}
      <div className="p-4 rounded-3xl bg-[#111116] border border-white/10 space-y-3 shadow-beautiful-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 shadow-beautiful-sm">
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-white tracking-tight">Your Watch Track</h3>
              <p className="text-[10px] text-gray-400">Habit & Progress Tracker</p>
            </div>
          </div>

          <button
            onClick={onOpenDailyReward}
            className="text-[10px] font-semibold font-mono px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 shadow-beautiful-sm hover:bg-amber-500/25 transition-spring cursor-pointer flex items-center gap-1"
          >
            🎁 Claim Reward <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 shadow-beautiful-sm">
            <span className="font-mono text-base font-extrabold text-white block">{WATCH_TRACK_STATS.episodesToday}</span>
            <span className="text-[9px] text-gray-400 uppercase font-semibold">Ep Today</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 shadow-beautiful-sm">
            <span className="font-mono text-base font-extrabold text-[#FF4757] block">{WATCH_TRACK_STATS.minutesThisWeek}m</span>
            <span className="text-[9px] text-gray-400 uppercase font-semibold">This Week</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 shadow-beautiful-sm">
            <span className="font-mono text-base font-extrabold text-amber-400 block">{WATCH_TRACK_STATS.streakDays} Days</span>
            <span className="text-[9px] text-gray-400 uppercase font-semibold">Streak</span>
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="p-4 rounded-2xl bg-[#111116] border border-white/10 flex items-center justify-between shadow-beautiful-md">
        <div>
          <span className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-wider block font-mono">Membership</span>
          <h3 className="font-display text-xs font-bold text-white tracking-tight">BingeShorts VIP Member</h3>
          <p className="text-[10px] text-gray-400">Unlimited 9:16 vertical episodes unlocked</p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-[#CCFF00] text-black font-extrabold text-xs shadow-[0_0_12px_rgba(204,255,0,0.4)] font-mono">
          ACTIVE
        </span>
      </div>

      {/* Settings Options */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Account Settings</h3>

        {[
          { label: 'Push Notifications', icon: Bell, value: 'On' },
          { label: 'Playback Quality', icon: Zap, value: 'Full HD 9:16' },
          { label: 'Subtitles & Audio', icon: Settings, value: 'English (SDH)' },
          { label: 'Privacy & Security', icon: Shield, value: '' }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-spring shadow-beautiful-sm">
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-medium text-white">{item.label}</span>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
