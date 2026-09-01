import React from 'react';
import { Play, Plus, Check, Star, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';

export default function HeroBannerTemplate({ 
  drama, 
  onPlayEpisode, 
  onSelectDrama, 
  isBookmarked = false, 
  onToggleBookmark 
}) {
  if (!drama) return null;

  return (
    <section className="relative px-4 pt-2 mb-6">
      <div 
        onClick={() => onSelectDrama && onSelectDrama(drama)}
        className="relative rounded-3xl overflow-hidden border border-white/10 shadow-beautiful-lg cursor-pointer group bg-[#111116] transition-spring"
      >
        <div className="relative aspect-[9/13] w-full overflow-hidden">
          <img 
            src={drama.poster} 
            alt={drama.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          
          {/* Multi-Stop Cinematic Vignette from Reference Analysis */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/75 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/70 via-transparent to-transparent" />
          
          {/* Top Micro-Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <Badge type="original" text="BINGESHORTS ORIGINAL" />
            <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-white font-semibold border border-white/10 flex items-center gap-1 shadow-beautiful-sm">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-mono">{drama.rating}</span>
            </div>
          </div>

          {/* Editorial Narrative Hook & Metadata */}
          <div className="absolute bottom-5 left-4 right-4 space-y-3 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold text-purple-300 tracking-wider uppercase shadow-beautiful-sm">
              <Sparkles className="w-3 h-3 text-[#9D4EDD]" /> Season 1 Premiere
            </div>

            <h1 className="font-display text-3xl font-extrabold text-white tracking-tighter leading-none text-glow-violet group-hover:text-purple-300 transition-colors">
              {drama.title}
            </h1>

            <p className="text-xs text-gray-300 leading-relaxed font-normal line-clamp-2">
              "{drama.hook}"
            </p>

            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
              <span className="text-purple-300 font-semibold">{drama.genre}</span>
              <span>•</span>
              <span className="font-mono text-gray-300">{drama.episodesCount} Ep</span>
              <span>•</span>
              <span className="font-mono text-gray-300">{drama.avgDuration}/ep</span>
            </div>

            {/* Tactile Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1.5">
              <button
                onClick={(e) => { e.stopPropagation(); onPlayEpisode(drama, 1); }}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(157,78,221,0.45)] border border-purple-400/30 active:scale-95 transition-spring cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" /> Watch Episode 1 Free
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); onToggleBookmark(drama.id); }}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white active:scale-95 transition-spring cursor-pointer shadow-beautiful-sm"
                title="Save to My List"
              >
                {isBookmarked ? <Check className="w-4.5 h-4.5 text-emerald-400" /> : <Plus className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
