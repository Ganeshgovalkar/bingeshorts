import React, { useState } from 'react';
import { Search as SearchIcon, User, Sparkles, X } from 'lucide-react';
import { ACTORS, CREATORS } from '../../data/people';
import EmptyState from '../states/EmptyState';

export default function SearchView({ 
  microdramas, 
  onSelectDrama, 
  onSelectActor, 
  onSelectCreator 
}) {
  const [query, setQuery] = useState('');
  
  const recentSearches = ["After 9 PM", "Lena Park", "Jordan Lee", "Room 404"];
  const trendingSearches = ["Lena Park", "Almost Married", "72 Hours", "Jordan Lee", "Psychological thriller"];
  
  const dramaResults = query 
    ? microdramas.filter(d => 
        d.title.toLowerCase().includes(query.toLowerCase()) || 
        d.genre.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const actorResults = query
    ? ACTORS.filter(a => 
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.bio.toLowerCase().includes(query.toLowerCase()) ||
        (a.roles && a.roles.some(r => r.characterName.toLowerCase().includes(query.toLowerCase())))
      )
    : [];

  const creatorResults = query
    ? CREATORS.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.bio.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults = dramaResults.length > 0 || actorResults.length > 0 || creatorResults.length > 0;

  return (
    <div className="w-full bg-[#090909] text-white pt-24 pb-24 min-h-screen">
      <div className="px-5 sm:px-8 max-w-4xl mx-auto space-y-8">
        
        <header>
          <h1 className="text-3xl font-display font-bold mb-4">Search</h1>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text" 
              placeholder="Search stories, actors, creators..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#181820] border border-white/10 rounded-xl py-4 pl-12 pr-10 text-sm focus:outline-none focus:border-[#f04a23] transition-colors"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {query ? (
          <div className="space-y-8">
            {!hasResults ? (
              <EmptyState 
                icon={SearchIcon}
                title={`Nothing found for "${query}"`}
                description="Try another title, actor, creator, or genre."
                actionLabel="Clear Search"
                onAction={() => setQuery('')}
              />
            ) : (
              <>
                {/* ACTOR RESULTS */}
                {actorResults.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold text-[#f04a23] mb-3 uppercase tracking-wider font-mono">Actors</h2>
                    <div className="grid gap-3">
                      {actorResults.map(actor => (
                        <div 
                          key={actor.id}
                          onClick={() => onSelectActor && onSelectActor(actor)}
                          className="flex items-center gap-4 p-3 rounded-xl bg-[#111116] border border-white/5 hover:border-[#f04a23]/40 cursor-pointer transition-colors"
                        >
                          <img src={actor.portrait} alt={actor.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                          <div>
                            <h3 className="font-bold text-sm text-white">{actor.name}</h3>
                            <p className="text-xs text-white/50">{actor.currentRole || "BingeShorts Actor"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* CREATOR RESULTS */}
                {creatorResults.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold text-[#f04a23] mb-3 uppercase tracking-wider font-mono">Creators</h2>
                    <div className="grid gap-3">
                      {creatorResults.map(creator => (
                        <div 
                          key={creator.id}
                          onClick={() => onSelectCreator && onSelectCreator(creator)}
                          className="flex items-center gap-4 p-3 rounded-xl bg-[#111116] border border-white/5 hover:border-[#f04a23]/40 cursor-pointer transition-colors"
                        >
                          <img src={creator.portrait} alt={creator.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                          <div>
                            <h3 className="font-bold text-sm text-white">{creator.name}</h3>
                            <p className="text-xs text-white/50">{(creator.roles || []).join(' • ')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* DRAMA RESULTS */}
                {dramaResults.length > 0 && (
                  <section>
                    <h2 className="text-xs font-bold text-white/50 mb-3 uppercase tracking-wider font-mono">Stories</h2>
                    <div className="space-y-3">
                      {dramaResults.map(drama => (
                        <div 
                          key={drama.id} 
                          onClick={() => onSelectDrama(drama)}
                          className="flex gap-4 p-3 rounded-xl bg-[#111116] hover:bg-white/5 cursor-pointer transition-colors border border-white/5"
                        >
                          <img src={drama.poster} alt={drama.title} className="w-16 h-22 object-cover rounded-md flex-none" />
                          <div className="flex-1 py-1 min-w-0">
                            <h3 className="font-bold text-base text-white">{drama.title}</h3>
                            <p className="text-xs text-white/60 mt-0.5">{drama.genre} • {drama.episodesCount} Episodes</p>
                            <p className="text-xs text-white/40 mt-1 line-clamp-1 italic">"{drama.hook}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-[#111116] p-5 rounded-2xl border border-white/5 space-y-2">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f04a23]" /> What are you in the mood for?
              </h3>
              <p className="text-xs text-white/50">Search stories, actors, or creators to start your binge.</p>
            </div>

            <section>
              <h2 className="text-xs font-bold text-white/50 mb-4 uppercase tracking-wider font-mono">Recent Searches</h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map(s => (
                  <button key={s} onClick={() => setQuery(s)} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10 transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-xs font-bold text-white/50 mb-4 uppercase tracking-wider font-mono">Trending Searches</h2>
              <div className="flex flex-col gap-3">
                {trendingSearches.map((s, i) => (
                  <button key={s} onClick={() => setQuery(s)} className="flex items-center gap-4 text-left group">
                    <span className="text-[#f04a23] font-mono text-xs opacity-50 group-hover:opacity-100">0{i+1}</span>
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">{s}</span>
                  </button>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-xs font-bold text-white/50 mb-4 uppercase tracking-wider font-mono">Browse Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {["Romance", "Thriller", "Drama", "Comedy", "Mystery", "Originals"].map(cat => (
                  <div key={cat} onClick={() => setQuery(cat)} className="bg-gradient-to-br from-[#181820] to-[#111116] p-4 rounded-xl border border-white/5 cursor-pointer hover:border-[#f04a23]/50 transition-colors">
                    <span className="font-medium text-sm">{cat}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
