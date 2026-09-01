import React from 'react';
import { ChevronRight, Flame, Sparkles, Clock } from 'lucide-react';
import DramaCard from '../common/DramaCard';

export default function ContentRailTemplate({ 
  title, 
  subtitle, 
  icon: Icon, 
  items = [], 
  variant = 'carousel', // 'carousel', 'grid', 'continue', 'originals'
  onSelectDrama, 
  onPlayEpisode, 
  badgeText, 
  accentColor = 'violet' 
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-3 mb-7">
      {/* Section Header with Studio Typography */}
      <div className="flex items-center justify-between px-4">
        <div>
          <h2 className="font-display text-sm font-extrabold text-white tracking-tight uppercase flex items-center gap-2">
            {Icon ? <Icon className={`w-4 h-4 ${accentColor === 'coral' ? 'text-[#FF4757]' : 'text-[#9D4EDD]'}`} /> : <span className="w-1.5 h-4 rounded-full bg-[#9D4EDD]" />}
            {title}
          </h2>
          {subtitle && <p className="text-[11px] text-gray-400 mt-0.5 font-normal">{subtitle}</p>}
        </div>
        
        {badgeText ? (
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-purple-300 font-semibold tracking-wider font-mono shadow-beautiful-sm">
            {badgeText}
          </span>
        ) : (
          <div className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Layout Display Variants */}
      {variant === 'grid' ? (
        <div className="grid grid-cols-2 gap-3 px-4">
          {items.map((drama, idx) => (
            <div key={drama.id} className="relative group">
              <DramaCard 
                drama={drama} 
                variant="standard" 
                onSelect={onSelectDrama} 
              />
              <div className="absolute top-2 left-2 w-5 h-5 rounded-md bg-black/85 backdrop-blur-md flex items-center justify-center font-mono font-extrabold text-xs text-[#CCFF00] border border-[#CCFF00]/30 shadow-beautiful-sm">
                #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'continue' ? (
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pt-1">
          {items.map((drama) => (
            <DramaCard 
              key={drama.id} 
              drama={drama} 
              variant="continue" 
              onSelect={onSelectDrama}
              onPlay={onPlayEpisode}
              accentColor={accentColor}
            />
          ))}
        </div>
      ) : variant === 'originals' ? (
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pt-1">
          {items.map((drama) => (
            <DramaCard 
              key={drama.id} 
              drama={drama} 
              variant="original" 
              onSelect={onSelectDrama}
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pt-1">
          {items.map((drama) => (
            <DramaCard 
              key={drama.id} 
              drama={drama} 
              variant="standard" 
              onSelect={onSelectDrama}
            />
          ))}
        </div>
      )}
    </section>
  );
}
