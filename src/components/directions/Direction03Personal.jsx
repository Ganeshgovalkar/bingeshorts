import React from 'react';
import { Play, Flame, Award, Clock, Heart, Sparkles, ChevronRight, Zap } from 'lucide-react';
import DramaCard from '../common/DramaCard';
import ProgressBar from '../common/ProgressBar';
import Badge from '../common/Badge';
import { WATCH_TRACK_STATS } from '../../data/microdramas';

export default function Direction03Personal({ 
  microdramas, 
  onSelectDrama, 
  onPlayEpisode, 
  bookmarks, 
  onToggleBookmark 
}) {
  const activeStory = microdramas.find(d => d.id === '72-hours') || microdramas[2];
  const dailyPick = microdramas.find(d => d.id === 'room-404') || microdramas[6];
  const madeForYou = microdramas.filter(d => d.id !== activeStory.id && d.id !== dailyPick.id).slice(0, 5);
  const becauseYouLoved = microdramas.slice(1, 6);

  const activeEpisode = activeStory.episodes.find(e => e.id === 3) || activeStory.episodes[0];

  return (
    <div className="space-y-6 pb-6">
      {/* 1. CONTINUE YOUR STORY HERO CARD */}
      <section className="px-4 pt-1">
        <div className="relative bg-gradient-to-br from-[#1E1424] via-[#14141E] to-[#0A0A0E] rounded-3xl p-4 border border-[#FF4757]/30 shadow-[0_0_30px_rgba(255,71,87,0.2)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-[#FF4757] tracking-wider uppercase flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-[#FF4757]" /> Continue Your Story
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF4757]/20 text-[#FF4757] font-bold border border-[#FF4757]/30">
              Ep 3 of {activeStory.episodesCount}
            </span>
          </div>

          <div className="flex gap-3 mb-3">
            <div className="relative w-20 h-28 rounded-xl overflow-hidden flex-none border border-white/10">
              <img src={activeStory.poster} alt={activeStory.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#FF4757] text-white flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 ml-0.5 fill-white" />
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white truncate">{activeStory.title}</h3>
                <p className="text-xs text-gray-300 font-medium truncate mt-0.5">{activeEpisode.title}</p>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">"{activeStory.hook}"</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-gray-300">
                  <span>Progress</span>
                  <span className="font-bold text-[#FF4757]">65% Watched</span>
                </div>
                <ProgressBar percent={65} color="coral" height="h-1.5" />
              </div>
            </div>
          </div>

          <button
            onClick={() => onPlayEpisode(activeStory, 3)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF4757] to-[#FF6B81] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,71,87,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" /> Resume Ep 3 (4:30 left)
          </button>
        </div>
      </section>

      {/* 2. YOUR WATCH TRACK (ENTERTAINMENT PROGRESS) */}
      <section className="px-4">
        <div className="p-4 rounded-3xl bg-[#14141B] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Your Watch Track</h4>
                <p className="text-[10px] text-gray-400">{WATCH_TRACK_STATS.level}</p>
              </div>
            </div>

            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300">
              🎁 {WATCH_TRACK_STATS.nextReward}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-base font-extrabold text-white block">{WATCH_TRACK_STATS.episodesToday}</span>
              <span className="text-[9px] text-gray-400 uppercase font-semibold">Ep Today</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-base font-extrabold text-[#FF4757] block">{WATCH_TRACK_STATS.minutesThisWeek}m</span>
              <span className="text-[9px] text-gray-400 uppercase font-semibold">This Week</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-base font-extrabold text-amber-400 block">{WATCH_TRACK_STATS.streakDays} Days</span>
              <span className="text-[9px] text-gray-400 uppercase font-semibold">Streak</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. YOUR DAILY PICK */}
      <section className="px-4">
        <div 
          onClick={() => onSelectDrama(dailyPick)}
          className="relative bg-gradient-to-r from-purple-900/40 via-zinc-900 to-zinc-900 rounded-3xl p-4 border border-purple-500/30 cursor-pointer group hover:border-purple-500/60 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Tailored For You Tonight
            </span>
            <Badge type="original" text="PICK OF THE DAY" />
          </div>

          <div className="flex gap-3 items-center">
            <img src={dailyPick.poster} alt={dailyPick.title} className="w-14 h-20 rounded-xl object-cover border border-white/10 flex-none" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white group-hover:text-purple-300">{dailyPick.title}</h4>
              <p className="text-[11px] text-gray-300 line-clamp-2 mt-0.5">"{dailyPick.hook}"</p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-purple-300">
                <span>98% Match for your taste</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MADE FOR YOU */}
      <section className="space-y-3 pl-4">
        <div className="flex items-center justify-between pr-4">
          <div>
            <h3 className="text-xs font-extrabold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#FF4757]" /> Made For Alex
            </h3>
            <p className="text-[10px] text-gray-400">Based on your late-night thriller & drama viewing</p>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pr-4 pt-1">
          {madeForYou.map((drama) => (
            <DramaCard 
              key={drama.id} 
              drama={drama} 
              variant="standard" 
              onSelect={onSelectDrama}
            />
          ))}
        </div>
      </section>

      {/* 5. BECAUSE YOU LOVED ROOM 404 */}
      <section className="space-y-3 pl-4">
        <div className="flex items-center justify-between pr-4">
          <h3 className="text-xs font-extrabold text-white tracking-wider uppercase">
            Because You Loved Room 404
          </h3>
          <span className="text-[11px] text-purple-400 font-semibold">Explore</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pr-4 pt-1">
          {becauseYouLoved.map((drama) => (
            <DramaCard 
              key={drama.id} 
              drama={drama} 
              variant="standard" 
              onSelect={onSelectDrama}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
