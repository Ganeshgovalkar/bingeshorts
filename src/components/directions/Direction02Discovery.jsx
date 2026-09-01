import React, { useState } from 'react';
import { Zap, Play, Flame, Sparkles, Clock, Compass, Filter } from 'lucide-react';
import DramaCard from '../common/DramaCard';
import Chip from '../common/Chip';
import Badge from '../common/Badge';
import { MOOD_CATEGORIES } from '../../data/microdramas';

export default function Direction02Discovery({ 
  microdramas, 
  onSelectDrama, 
  onPlayEpisode, 
  bookmarks, 
  onToggleBookmark 
}) {
  const [activeMood, setActiveMood] = useState('all');

  const dailyPick = microdramas.find(d => d.id === 'after-9-pm') || microdramas[1];
  const continueDramas = microdramas.filter(d => d.continueWatching);

  // Filter dramas dynamically by mood pill
  const filteredDramas = activeMood === 'all'
    ? microdramas
    : microdramas.filter(d => d.mood && d.mood.includes(activeMood));

  const quickBinge = filteredDramas.filter(d => parseInt(d.avgDuration) <= 6);
  const trending = filteredDramas.filter(d => d.badgeType === 'trending' || d.views.includes('M'));

  return (
    <div className="space-y-6 pb-6">
      {/* 1. INTERACTIVE MOOD CHIPS BAR */}
      <section className="pt-2">
        <div className="px-4 mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#CCFF00] tracking-wider uppercase flex items-center gap-1">
            <Filter className="w-3 h-3" /> What are you in the mood for?
          </span>
          <span className="text-[10px] text-gray-400">{filteredDramas.length} dramas</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-1">
          {MOOD_CATEGORIES.map((m) => (
            <Chip
              key={m.id}
              label={m.label}
              active={activeMood === m.id}
              activeAccent="lime"
              onClick={() => setActiveMood(m.id)}
            />
          ))}
        </div>
      </section>

      {/* 2. DAILY PICK DYNAMIC CARD */}
      <section className="px-4">
        <div 
          onClick={() => onSelectDrama(dailyPick)}
          className="relative bg-gradient-to-br from-[#1A1A24] via-[#14141D] to-[#0D0D14] rounded-3xl p-4 border border-[#CCFF00]/30 shadow-[0_0_25px_rgba(204,255,0,0.15)] cursor-pointer group hover:border-[#CCFF00]/60 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
              <span className="text-xs font-extrabold text-[#CCFF00] tracking-wider uppercase">Your Daily Pick</span>
            </div>
            <Badge type="lime" text="HOT TODAY" />
          </div>

          <p className="text-xs text-gray-300 font-medium mb-3 italic">
            "A story we think you'll binge tonight..."
          </p>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-3">
            <img src={dailyPick.banner || dailyPick.poster} alt={dailyPick.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white group-hover:text-[#CCFF00] transition-colors">{dailyPick.title}</h3>
                <p className="text-[11px] text-gray-300">{dailyPick.genre} • {dailyPick.episodesCount} Ep</p>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#CCFF00] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 ml-0.5 fill-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTINUE WATCHING */}
      {continueDramas.length > 0 && (
        <section className="space-y-3 pl-4">
          <div className="flex items-center justify-between pr-4">
            <h3 className="text-xs font-extrabold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#CCFF00]" /> Resume Viewing
            </h3>
            <span className="text-[11px] text-[#CCFF00] font-semibold">Instant Play</span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pr-4 pt-1">
            {continueDramas.map((drama) => (
              <DramaCard 
                key={drama.id} 
                drama={drama} 
                variant="continue" 
                onSelect={onSelectDrama}
                onPlay={onPlayEpisode}
                accentColor="lime"
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. TRENDING RIGHT NOW (HYPE METRICS) */}
      <section className="space-y-3 pl-4">
        <div className="flex items-center justify-between pr-4">
          <div>
            <h3 className="text-xs font-extrabold text-white tracking-wider uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#FF4757]" /> Trending Right Now
            </h3>
            <p className="text-[10px] text-gray-400">High engagement microdramas</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30">
            🔥 Live Views
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pr-4 pt-1">
          {trending.map((drama) => (
            <div key={drama.id} className="relative flex-none">
              <DramaCard 
                drama={drama} 
                variant="standard" 
                onSelect={onSelectDrama}
              />
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[9px] text-[#CCFF00] font-extrabold border border-[#CCFF00]/30">
                🔥 {drama.views}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. QUICK BINGE (< 6 MIN EPISODES) */}
      <section className="space-y-3 pl-4">
        <div className="flex items-center justify-between pr-4">
          <h3 className="text-xs font-extrabold text-white tracking-wider uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#CCFF00]" /> Quick Binge (&lt; 6 Min Episodes)
          </h3>
          <span className="text-[11px] text-gray-400">Fast storytelling</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pr-4 pt-1">
          {quickBinge.map((drama) => (
            <DramaCard 
              key={drama.id} 
              drama={drama} 
              variant="standard" 
              onSelect={onSelectDrama}
            />
          ))}
        </div>
      </section>

      {/* 6. POPULAR WITH GEN Z */}
      <section className="space-y-3 px-4">
        <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-zinc-900 border border-purple-500/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Popular with Your Generation</h3>
              <p className="text-[10px] text-purple-300">Top voted by Gen Z audience</p>
            </div>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {microdramas.slice(2, 5).map((drama) => (
              <div 
                key={drama.id}
                onClick={() => onSelectDrama(drama)}
                className="group relative aspect-[9/13] rounded-xl overflow-hidden cursor-pointer border border-white/10"
              >
                <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5">
                  <p className="text-[10px] font-bold text-white truncate">{drama.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
