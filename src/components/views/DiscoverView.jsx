import React from 'react';
import { Play } from 'lucide-react';

export default function DiscoverView({ microdramas, onSelectDrama }) {
  const secretContract = microdramas.find(d => d.id === 'secret-contract');
  const trending = ["almost-married", "wrong-floor", "coffee-with-my-ex", "72-hours"].map(id => microdramas.find(d => d.id === id)).filter(Boolean);
  const unexpected = ["the-girl-upstairs", "the-last-seen"].map(id => microdramas.find(d => d.id === id)).filter(Boolean);
  const quickBinge = microdramas.filter(d => d.episodesCount <= 8);

  const renderGrid = (dramas) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {dramas.map((drama) => (
        <div 
          key={drama.id} 
          onClick={() => onSelectDrama(drama)}
          className="cursor-pointer group"
        >
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2">
            <img 
              src={drama.poster} 
              alt={drama.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
          </div>
          <p className="text-xs font-bold text-white/90 truncate">{drama.title}</p>
          <p className="text-[10px] text-white/50 truncate">{drama.genre}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-[#090909] text-white pt-24 pb-24 min-h-screen">
      <div className="px-5 sm:px-8 max-w-4xl mx-auto space-y-12">
        
        <header>
          <h1 className="text-3xl font-display font-bold mb-1">Discover</h1>
          <p className="text-white/60 text-sm">Find your next obsession.</p>
        </header>

        <section>
          <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
            {["Romance", "Thriller", "Drama", "Comedy", "Mystery", "Chaotic"].map(mood => (
              <button key={mood} className="flex-none px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
                {mood}
              </button>
            ))}
          </div>
        </section>

        {secretContract && (
          <section>
            <div className="relative aspect-[4/5] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group" onClick={() => onSelectDrama(secretContract)}>
              <img src={secretContract.poster} className="absolute inset-0 w-full h-full object-cover sm:hidden opacity-80 transition-transform duration-700 group-hover:scale-105" alt={secretContract.title} />
              <img src={secretContract.backdrop} className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" alt={secretContract.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <span className="text-[10px] font-bold tracking-widest text-[#f04a23] uppercase mb-2 block">
                  Featured Discovery
                </span>
                <h3 className="text-3xl font-display font-bold mb-2">{secretContract.title}</h3>
                <p className="text-sm text-white/80 max-w-sm mb-6">{secretContract.description}</p>
                <div className="flex items-center gap-3">
                  <button className="bg-[#f04a23] text-white px-6 py-2.5 rounded-md font-bold text-sm flex items-center gap-2">
                    <Play className="w-4 h-4 fill-current" /> Start watching
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold mb-4">Trending This Week</h2>
          {renderGrid(trending)}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-1">You might not see this coming</h2>
          <p className="text-xs text-white/50 mb-4">Twists that actually twist.</p>
          {renderGrid(unexpected)}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-1">Quick binge</h2>
          <p className="text-xs text-white/50 mb-4">Short enough for your break. Good enough to ruin it.</p>
          {renderGrid(quickBinge)}
        </section>

      </div>
    </div>
  );
}
