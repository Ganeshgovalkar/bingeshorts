import React from 'react';
import { Play, Bookmark } from 'lucide-react';
import EmptyState from '../states/EmptyState';

export default function MyListView({ microdramas, bookmarks = [], downloadedEpisodes = [], onSelectDrama, onPlayEpisode, onNavigateDiscover }) {
  const after9pm = microdramas.find(d => d.id === 'after-9-pm');
  const room404 = microdramas.find(d => d.id === 'room-404');
  const twoStops = microdramas.find(d => d.id === 'two-stops-away');
  
  const savedForLater = bookmarks.length > 0 
    ? bookmarks.map(id => microdramas.find(d => d.id === id)).filter(Boolean)
    : ["secret-contract", "the-last-seen", "72-hours", "coffee-with-my-ex"].map(id => microdramas.find(d => d.id === id)).filter(Boolean);

  const renderGrid = (dramas) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {dramas.map((drama) => (
        <div 
          key={drama.id} 
          onClick={() => onSelectDrama(drama)}
          className="cursor-pointer group relative aspect-[4/5] rounded-xl overflow-hidden"
        >
          <img 
            src={drama.poster} 
            alt={drama.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-sm font-bold text-white truncate">{drama.title}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-[#090909] text-white pt-24 pb-24 min-h-screen">
      <div className="px-5 sm:px-8 max-w-5xl mx-auto space-y-12">
        
        <header>
          <h1 className="text-3xl font-display font-bold mb-1">My List</h1>
          <p className="text-white/60 text-sm">Stories saved for later.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold mb-4">Continue Watching</h2>
          <div className="flex flex-col gap-4">
            {[after9pm, room404, twoStops].filter(Boolean).map((drama, idx) => (
              <div 
                key={drama.id} 
                className="flex items-center gap-4 bg-[#111116] rounded-xl overflow-hidden cursor-pointer hover:bg-white/5 transition-colors pr-4"
                onClick={() => onPlayEpisode(drama, 1)}
              >
                <div className="w-32 h-20 sm:w-48 sm:h-28 relative flex-none">
                  <img src={drama.backdrop} className="w-full h-full object-cover" alt={drama.title} />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <Play className="w-6 h-6 fill-white opacity-80" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-[#f04a23]" style={{ width: idx === 0 ? '68%' : idx === 1 ? '42%' : '15%' }}></div>
                  </div>
                </div>
                <div className="flex-1 py-2">
                  <h3 className="font-bold text-sm sm:text-base">{drama.title}</h3>
                  <p className="text-xs text-white/60 mt-1">{drama.genre} • Episode {idx === 0 ? 4 : idx === 1 ? 2 : 6}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Saved For Later</h2>
          {savedForLater.length > 0 ? (
            renderGrid(savedForLater)
          ) : (
            <EmptyState 
              icon={Bookmark}
              title="Your list is waiting."
              description="Save stories you want to come back to."
              actionLabel="Discover Stories"
              onAction={onNavigateDiscover}
            />
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-1">Your Collections</h2>
          <div className="grid gap-4 mt-4">
            <div className="bg-gradient-to-br from-[#181820] to-transparent p-5 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg text-[#f04a23]">Late Night</h3>
              <p className="text-sm text-white/50 mt-1">Stories for when you should probably be sleeping.</p>
            </div>
            <div className="bg-gradient-to-br from-[#181820] to-transparent p-5 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg text-amber-500">Weekend Binge</h3>
              <p className="text-sm text-white/50 mt-1">Longer stories worth disappearing into.</p>
            </div>
            <div className="bg-gradient-to-br from-[#181820] to-transparent p-5 rounded-xl border border-white/10">
              <h3 className="font-bold text-lg text-blue-400">Emotional Damage</h3>
              <p className="text-sm text-white/50 mt-1">You were warned.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
