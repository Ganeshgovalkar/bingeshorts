import React from 'react';
import { Play, Plus, Check, Star, Sparkles, Flame, Clock } from 'lucide-react';
import ContentRailTemplate from '../templates/ContentRailTemplate';
import Badge from '../common/Badge';

export default function StudioHomeView({ 
  microdramas, 
  onSelectDrama, 
  onPlayEpisode, 
  bookmarks, 
  onToggleBookmark 
}) {
  const heroDrama = microdramas.find(d => d.id === 'wrong-floor') || microdramas[0];
  const continueDramas = microdramas.filter(d => d.continueWatching);
  const originals = microdramas.filter(d => d.badgeType === 'original' && d.id !== heroDrama.id);
  const trending = microdramas.filter(d => d.badgeType === 'trending' || d.badgeType === 'new');
  const isHeroBookmarked = bookmarks.includes(heroDrama.id);

  return (
    <div className="pt-24 pb-12 w-full max-w-7xl mx-auto px-4 md:px-8">
      
      {/* 1. HERO MASTER REEL (Full-bleed immersive) */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 border border-white/10 shadow-beautiful-lg group cursor-pointer" onClick={() => onSelectDrama(heroDrama)}>
        <img 
          src={heroDrama.poster} 
          alt={heroDrama.title} 
          className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
        />
        
        {/* Cinematic Multi-Stop Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/30 to-transparent" />
        
        <div className="absolute top-6 left-8 flex items-center gap-3">
          <div className="px-3 py-1 bg-white text-black text-[10px] font-mono font-bold tracking-widest rounded-full uppercase">
            [ MASTER REEL ]
          </div>
          <div className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            REC • 00:24:18:03
          </div>
        </div>

        <div className="absolute bottom-10 left-8 md:bottom-16 md:left-16 max-w-2xl space-y-5 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-white" /> BINGESHORTS ORIGINAL
          </div>

          <h1 className="font-display text-5xl md:text-8xl font-black text-white tracking-[-0.05em] leading-[0.9]">
            {heroDrama.title.toUpperCase()}
          </h1>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl font-light">
            {heroDrama.hook}
          </p>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span className="text-white bg-white/10 px-2 py-0.5 rounded">{heroDrama.genre}</span>
            <span>[ {heroDrama.episodesCount} EPISODES ]</span>
            <span>[ {heroDrama.avgDuration}/EP ]</span>
            <div className="flex items-center gap-1 text-white">
              <Star className="w-3.5 h-3.5 text-white fill-white" />
              {heroDrama.rating}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={(e) => { e.stopPropagation(); onPlayEpisode(heroDrama, 1); }}
              className="py-4 px-8 rounded-full bg-white text-black hover:bg-gray-200 font-bold text-xs font-mono tracking-widest flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-spring cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black" /> WATCH EP 01
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onToggleBookmark(heroDrama.id); }}
              className="p-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white transition-spring group cursor-pointer"
            >
              {isHeroBookmarked ? <Check className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />}
            </button>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRIC BENTO FILM SLATE */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-[-0.04em] text-white">
            [ TRENDING SLATE ]
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[240px] md:auto-rows-[320px]">
          {trending.slice(0, 3).map((drama, idx) => (
            <div 
              key={drama.id}
              onClick={() => onSelectDrama(drama)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer group border border-white/10 ${
                idx === 0 ? 'md:col-span-8' : 'md:col-span-4'
              }`}
            >
              <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-white text-black text-[10px] font-mono font-bold">0{idx + 1}</span>
                  <span className="text-[10px] font-mono text-white/70 uppercase">{drama.genre}</span>
                </div>
                <h3 className={`font-display font-bold text-white tracking-[-0.03em] ${idx === 0 ? 'text-4xl' : 'text-2xl'}`}>
                  {drama.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HORIZONTAL REEL CAROUSEL - ORIGINALS */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-[-0.04em] text-white">
            [ ORIGINALS ]
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {originals.map((drama) => (
            <div 
              key={drama.id} 
              onClick={() => onSelectDrama(drama)}
              className="flex-none w-[280px] md:w-[320px] aspect-[4/5] relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 snap-center"
            >
              <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-white text-black text-[10px] font-mono font-bold tracking-widest rounded-sm">EXCLUSIVE</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-1">{drama.title}</h3>
                <p className="text-xs text-white/60 font-mono">{drama.episodesCount} EPISODES</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SERIES VAULT CATALOG */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold tracking-[-0.04em] text-white">
            [ THE VAULT ]
          </h2>
          <div className="flex gap-2">
            {['ALL', 'THRILLER', 'ROMANCE', 'DRAMA'].map(filter => (
              <button key={filter} className="px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-mono text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {microdramas.map((drama) => (
            <div key={drama.id} className="cursor-pointer group" onClick={() => onSelectDrama(drama)}>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 mb-3 bg-white/5">
                <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono text-white">
                  <Star className="w-2.5 h-2.5 inline-block mr-1 text-white fill-white"/>
                  {drama.rating}
                </div>
              </div>
              <h4 className="font-display font-bold text-white text-sm tracking-tight truncate">{drama.title}</h4>
              <p className="text-[10px] text-white/50 font-mono mt-1">{drama.genre}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
