import React from 'react';
import { Play, Plus, Check, Star, Sparkles, Flame, Clock } from 'lucide-react';
import HeroBannerTemplate from '../templates/HeroBannerTemplate';
import ContentRailTemplate from '../templates/ContentRailTemplate';

export default function Direction01Cinematic({ 
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
  const becauseYouWatched = microdramas.slice(4, 8);

  const moodCards = [
    { title: 'Dark Romance', subtitle: 'Dangerous attraction after midnight', color: 'from-purple-900/60 to-pink-900/40', border: 'border-purple-500/30' },
    { title: 'High Stakes Thriller', subtitle: 'Zero room for error', color: 'from-blue-900/60 to-indigo-900/40', border: 'border-blue-500/30' },
    { title: 'Revenge & Empire', subtitle: 'Payback dressed in haute couture', color: 'from-red-900/60 to-orange-900/40', border: 'border-red-500/30' },
    { title: 'Mind Games', subtitle: "Twists you won't see coming", color: 'from-emerald-900/60 to-teal-900/40', border: 'border-emerald-500/30' }
  ];

  const isHeroBookmarked = bookmarks.includes(heroDrama.id);

  return (
    <div className="pb-6">
      {/* 1. TEMPLATE A: CINEMATIC HERO BANNER */}
      <HeroBannerTemplate 
        drama={heroDrama}
        onPlayEpisode={onPlayEpisode}
        onSelectDrama={onSelectDrama}
        isBookmarked={isHeroBookmarked}
        onToggleBookmark={onToggleBookmark}
      />

      {/* 2. TEMPLATE B: CONTINUE WATCHING RAIL */}
      {continueDramas.length > 0 && (
        <ContentRailTemplate 
          title="Continue Watching"
          icon={Clock}
          items={continueDramas}
          variant="continue"
          onSelectDrama={onSelectDrama}
          onPlayEpisode={onPlayEpisode}
          accentColor="violet"
        />
      )}

      {/* 3. TEMPLATE B: BINGESHORTS ORIGINALS RAIL */}
      <ContentRailTemplate 
        title="BingeShorts Originals"
        subtitle="Exclusive 9:16 vertical microdramas"
        icon={Sparkles}
        items={originals}
        variant="originals"
        onSelectDrama={onSelectDrama}
        badgeText="EXCLUSIVE"
      />

      {/* 4. TEMPLATE B: TRENDING RIGHT NOW GRID */}
      <ContentRailTemplate 
        title="Trending Right Now"
        subtitle="Updated hourly"
        icon={Flame}
        items={trending.slice(0, 4)}
        variant="grid"
        onSelectDrama={onSelectDrama}
        accentColor="coral"
      />

      {/* 5. BROWSE BY MOOD */}
      <section className="space-y-3 px-4 mb-6">
        <h2 className="text-sm font-extrabold text-white tracking-wide uppercase">
          Browse by Mood
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {moodCards.map((m, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl bg-gradient-to-br ${m.color} border ${m.border} backdrop-blur-md cursor-pointer hover:scale-102 transition-all active:scale-95`}
            >
              <h3 className="text-xs font-extrabold text-white">{m.title}</h3>
              <p className="text-[10px] text-gray-300 mt-1 font-light">{m.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
