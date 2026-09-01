import React from 'react';
import { Play, Star, Bookmark, Plus, Check } from 'lucide-react';
import Badge from './Badge';
import ProgressBar from './ProgressBar';

export default function DramaCard({ 
  drama, 
  variant = 'standard', 
  onSelect, 
  onPlay, 
  isBookmarked = false,
  onToggleBookmark,
  accentColor = 'violet' 
}) {
  if (!drama) return null;

  // 1. CONTINUE WATCHING CARD VARIANT
  if (variant === 'continue') {
    const cw = drama.continueWatching || { episode: 1, episodeTitle: drama.episodes[0]?.title || 'Ep 1', progressPercent: 50, timeLeft: '2:30 left' };
    return (
      <div 
        onClick={() => onPlay && onPlay(drama, cw.episode)}
        className="group relative flex-none w-[220px] bg-[#111116] rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 transition-spring cursor-pointer shadow-beautiful-sm active:scale-95"
      >
        <div className="relative h-[124px] w-full overflow-hidden">
          <img 
            src={drama.poster} 
            alt={drama.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-black/30 to-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#9D4EDD] transition-spring shadow-beautiful-sm">
              <Play className="w-4.5 h-4.5 ml-0.5 fill-white" />
            </div>
          </div>

          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-gray-200 border border-white/10 font-mono shadow-beautiful-sm">
            {cw.timeLeft}
          </div>
        </div>

        <div className="p-3">
          <h4 className="font-display text-sm font-bold text-white tracking-tight truncate group-hover:text-[#9D4EDD] transition-colors">{drama.title}</h4>
          <p className="text-[11px] text-gray-400 truncate mt-0.5">Ep {cw.episode}: {cw.episodeTitle}</p>
          <div className="mt-2.5">
            <ProgressBar percent={cw.progressPercent} color={accentColor} height="h-1" />
          </div>
        </div>
      </div>
    );
  }

  // 2. ORIGINAL HIGHLIGHT CARD VARIANT
  if (variant === 'original') {
    return (
      <div 
        onClick={() => onSelect && onSelect(drama)}
        className="group relative flex-none w-[155px] sm:w-[170px] bg-[#111116] rounded-2xl overflow-hidden border border-purple-500/30 hover:border-purple-500/60 shadow-[0_0_18px_rgba(157,78,221,0.2)] transition-spring cursor-pointer active:scale-95"
      >
        <div className="relative aspect-[9/13.5] w-full overflow-hidden">
          <img 
            src={drama.poster} 
            alt={drama.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-black/40" />

          <div className="absolute top-2 left-2">
            <Badge type="original" text="ORIGINAL" />
          </div>

          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-gray-200 font-mono border border-white/10">
            {drama.episodesCount} Ep
          </div>
        </div>

        <div className="p-3">
          <h4 className="font-display text-xs font-bold text-white tracking-tight truncate group-hover:text-purple-300 transition-colors">{drama.title}</h4>
          <div className="flex items-center justify-between mt-1 text-[10px] text-gray-400">
            <span>{drama.genre.split('/')[0]}</span>
            <span className="flex items-center gap-0.5 text-amber-400 font-semibold font-mono">
              <Star className="w-2.5 h-2.5 fill-amber-400" /> {drama.rating}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. STANDARD 9:16 DRAMA POSTER CARD VARIANT
  return (
    <div 
      onClick={() => onSelect && onSelect(drama)}
      className="group relative flex-none w-[135px] sm:w-[150px] bg-[#111116] rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-spring cursor-pointer shadow-beautiful-sm active:scale-95"
    >
      <div className="relative aspect-[9/13] w-full overflow-hidden">
        <img 
          src={drama.poster} 
          alt={drama.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-black/30" />

        {drama.badge && (
          <div className="absolute top-2 left-2">
            <Badge type={drama.badgeType || 'default'} text={drama.badge} />
          </div>
        )}

        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] text-gray-200 font-mono border border-white/10">
          {drama.episodesCount} Ep
        </div>
      </div>

      <div className="p-2.5">
        <h4 className="font-display text-xs font-bold text-white tracking-tight truncate group-hover:text-[#9D4EDD] transition-colors">{drama.title}</h4>
        <div className="flex items-center justify-between mt-1 text-[10px] text-gray-400">
          <span className="truncate max-w-[70px]">{drama.genre.split('/')[0]}</span>
          <span className="flex items-center gap-0.5 text-amber-400 font-semibold font-mono flex-none">
            <Star className="w-2.5 h-2.5 fill-amber-400" /> {drama.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
