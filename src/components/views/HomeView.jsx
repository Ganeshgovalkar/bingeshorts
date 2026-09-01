import React from 'react';
import { Play, ArrowRight, Plus } from 'lucide-react';

export default function HomeView({ 
  microdramas, 
  onSelectDrama, 
  onPlayEpisode 
}) {
  const after9pm = microdramas.find(d => d.id === 'after-9-pm');
  const theLastSeen = microdramas.find(d => d.id === 'the-last-seen');
  const room404 = microdramas.find(d => d.id === 'room-404');
  
  const trending = ["almost-married", "72-hours", "wrong-floor", "coffee-with-my-ex", "secret-contract"].map(id => microdramas.find(d => d.id === id)).filter(Boolean);
  const originals = ["room-404", "the-last-seen", "72-hours", "after-9-pm", "the-girl-upstairs"].map(id => microdramas.find(d => d.id === id)).filter(Boolean);

  const renderHorizontalScroll = (dramas, hideNumbers = false) => (
    <div className="flex overflow-x-auto gap-4 pb-6 px-5 sm:px-8 no-scrollbar -mx-5 sm:-mx-8">
      {dramas.map((drama, idx) => (
        <div 
          key={drama.id} 
          onClick={() => onSelectDrama(drama)}
          className="flex-none w-[140px] sm:w-[160px] cursor-pointer group"
        >
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2">
            <img 
              src={drama.poster} 
              alt={drama.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {!hideNumbers && (
              <span className="absolute bottom-[-10px] left-1 text-5xl font-black text-white/80 drop-shadow-md">
                {idx + 1}
              </span>
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          </div>
          {!hideNumbers && <p className="text-xs text-white/60 truncate pl-6">{drama.genre}</p>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-[#090909] text-white pt-24 pb-20">
      <div className="px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto space-y-12">
        
        {/* 1. Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold">Good evening, Alex</h1>
          <p className="text-white/60">Ready for your next story?</p>
        </header>

        {/* 2. Continue Watching */}
        <section>
          <h2 className="text-xl font-bold mb-1">Continue watching</h2>
          <p className="text-xs text-white/50 mb-4">Pick up where you left off.</p>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
            {[after9pm, room404].filter(Boolean).map((drama, idx) => (
              <div 
                key={drama.id} 
                className="flex-none w-[280px] sm:w-[320px] bg-[#111116] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => onPlayEpisode(drama, idx === 0 ? 4 : 2)}
              >
                <div className="relative aspect-[16/9]">
                  <img src={drama.backdrop} className="w-full h-full object-cover opacity-80" alt={drama.title} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Play className="w-5 h-5 fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-[#f04a23]" style={{ width: idx === 0 ? '68%' : '42%' }}></div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{drama.title}</h3>
                  <p className="text-xs text-white/60">{drama.genre} • Episode {idx === 0 ? 4 : 2} of {drama.episodesCount}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Your Daily Pick */}
        <section>
          <h2 className="text-xl font-bold mb-1">Your daily pick</h2>
          <p className="text-xs text-white/50 mb-4">We have a feeling you'll finish this one.</p>
          {theLastSeen && (
            <div className="relative aspect-[4/5] sm:aspect-[16/9] rounded-2xl overflow-hidden">
              <img src={theLastSeen.poster} className="absolute inset-0 w-full h-full object-cover sm:hidden opacity-80" alt={theLastSeen.title} />
              <img src={theLastSeen.backdrop} className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-80" alt={theLastSeen.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <span className="text-[10px] font-bold tracking-widest text-[#f04a23] uppercase mb-2 block">
                  BingeShorts Original
                </span>
                <h3 className="text-4xl font-display font-bold mb-2">{theLastSeen.title}</h3>
                <p className="text-sm text-white/80 max-w-sm mb-6">She disappeared three years ago. Last night, she texted him.</p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onPlayEpisode(theLastSeen, 1)}
                    className="bg-white text-black px-6 py-2.5 rounded-md font-bold text-sm flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" /> Watch episode 1
                  </button>
                  <button className="bg-white/15 backdrop-blur-md p-2.5 rounded-md">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 4. Trending Right Now */}
        <section>
          <h2 className="text-xl font-bold mb-1">Trending right now</h2>
          <p className="text-xs text-white/50 mb-4">What everyone's watching.</p>
          {renderHorizontalScroll(trending)}
        </section>

        {/* 5. BingeShorts Originals */}
        <section>
          <h2 className="text-xl font-bold mb-1">BingeShorts Originals</h2>
          <p className="text-xs text-white/50 mb-4">Stories you won't find anywhere else.</p>
          {renderHorizontalScroll(originals, true)}
        </section>

        {/* 7. Browse by Mood */}
        <section>
          <h2 className="text-xl font-bold mb-4">What are you feeling?</h2>
          <div className="flex flex-wrap gap-2">
            {["In my feelings", "Main character energy", "I need drama", "Keep me guessing", "Make me laugh", "Choose chaos"].map(mood => (
              <span key={mood} className="px-4 py-2 rounded-full bg-[#181820] text-sm font-medium border border-white/10">
                {mood}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
