import React from 'react';
import { ArrowLeft, Flame, Play, CheckCircle2, Award, Calendar, Clock, Film } from 'lucide-react';
import { MICRODRAMAS } from '../../data/microdramas';

export default function WatchTrackView({ 
  onBack, 
  onPlayEpisode, 
  onSelectDrama 
}) {
  const after9pm = MICRODRAMAS.find(d => d.id === 'after-9-pm');
  const room404 = MICRODRAMAS.find(d => d.id === 'room-404');
  const twoStops = MICRODRAMAS.find(d => d.id === 'two-stops-away');

  const todayStats = {
    episodes: 3,
    minutes: 24,
    statusText: "You're on a roll."
  };

  const streakDays = [
    { day: 'M', active: true },
    { day: 'T', active: true },
    { day: 'W', active: true },
    { day: 'T', active: true },
    { day: 'F', active: false },
    { day: 'S', active: false },
    { day: 'S', active: false }
  ];

  const weeklyActivity = [
    { day: 'MON', height: 'h-6' },
    { day: 'TUE', height: 'h-12' },
    { day: 'WED', height: 'h-8' },
    { day: 'THU', height: 'h-14' },
    { day: 'FRI', height: 'h-4' },
    { day: 'SAT', height: 'h-[#f04a23]' },
    { day: 'SUN', height: 'h-2' }
  ];

  return (
    <div className="w-full bg-[#090909] text-white pt-20 pb-24 min-h-screen select-none">
      <div className="px-5 sm:px-8 max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-display font-bold">Watch Track</h1>
            <p className="text-xs text-white/50">Your viewing progress & habits</p>
          </div>
        </header>

        {/* SECTION 1 - TODAY'S WATCH */}
        <section className="bg-gradient-to-r from-[#181820] to-[#111116] p-6 rounded-3xl border border-white/10 space-y-4">
          <span className="text-[10px] font-mono font-bold text-[#f04a23] uppercase tracking-wider block">
            Today's Watch
          </span>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-display font-extrabold text-white">{todayStats.episodes}</span>
                <span className="text-sm font-bold text-white/70">Episodes</span>
                <span className="text-2xl text-white/20">•</span>
                <span className="text-4xl font-display font-extrabold text-[#f04a23]">{todayStats.minutes}</span>
                <span className="text-sm font-bold text-white/70">Minutes</span>
              </div>
              <p className="text-xs text-white/60 mt-2 font-medium italic">"{todayStats.statusText}"</p>
            </div>
          </div>
        </section>

        {/* SECTION 2 - DAILY STREAK */}
        <section className="bg-[#111116] p-6 rounded-3xl border border-white/5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Your Streak
              </span>
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2 mt-0.5">
                <Flame className="w-6 h-6 text-amber-400 fill-amber-400" /> 4 Days
              </h2>
            </div>
            <span className="text-xs text-white/50 font-medium">Goal: 7 Days</span>
          </div>

          <p className="text-xs text-white/70">You've found time for a story four days in a row.</p>

          {/* Weekly Dots */}
          <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
            {streakDays.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-white/40">{item.day}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                  item.active 
                    ? 'bg-gradient-to-tr from-[#f04a23] to-amber-500 text-white shadow-md' 
                    : 'bg-white/5 text-white/20 border border-white/5'
                }`}>
                  {item.active ? '✓' : ''}
                </div>
              </div>
            ))}
          </div>

          {/* Milestone Badge */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-300">
            <Award className="w-5 h-5 flex-none" />
            <span>Three days completed! You're building a daily habit. 🔥</span>
          </div>
        </section>

        {/* SECTION 3 - THIS WEEK */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">This week</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#111116] p-4 rounded-2xl border border-white/5 text-center">
              <span className="block text-2xl font-bold text-white">12</span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider">Episodes</span>
            </div>
            <div className="bg-[#111116] p-4 rounded-2xl border border-white/5 text-center">
              <span className="block text-2xl font-bold text-[#f04a23]">86m</span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider">Watch Time</span>
            </div>
            <div className="bg-[#111116] p-4 rounded-2xl border border-white/5 text-center">
              <span className="block text-2xl font-bold text-white">4</span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider">Stories</span>
            </div>
          </div>
        </section>

        {/* SECTION 4 - CONTINUE WATCHING */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Pick up where you left off</h2>
          <div className="space-y-3">
            {[after9pm, room404].filter(Boolean).map((drama, idx) => (
              <div 
                key={drama.id}
                onClick={() => onPlayEpisode(drama, idx === 0 ? 4 : 2)}
                className="flex items-center gap-4 bg-[#111116] p-3 rounded-2xl border border-white/5 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <div className="w-24 h-16 rounded-xl relative overflow-hidden flex-none">
                  <img src={drama.backdrop || drama.poster} alt={drama.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                </div>
                <div className="flex-1 py-1">
                  <h3 className="font-bold text-sm text-white">{drama.title}</h3>
                  <p className="text-xs text-white/60">Episode {idx === 0 ? 4 : 2} • {idx === 0 ? '68%' : '42%'} completed</p>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#f04a23]" style={{ width: idx === 0 ? '68%' : '42%' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 - RECENTLY COMPLETED */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Recently finished</h2>
          <div className="bg-[#111116] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-none" />
              <div>
                <h3 className="font-bold text-sm text-white">Coffee With My Ex</h3>
                <p className="text-xs text-white/50">All 6 Episodes Completed</p>
              </div>
            </div>
            <button 
              onClick={() => twoStops && onPlayEpisode(twoStops, 1)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              Watch Again
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
