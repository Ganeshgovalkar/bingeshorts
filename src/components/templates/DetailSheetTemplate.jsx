import React, { useState } from 'react';
import { X, Play, Plus, Check, Share, MessageSquare, ChevronRight, Lock, Star } from 'lucide-react';
import Badge from '../common/Badge';
import { MICRODRAMAS } from '../../data/microdramas';

export default function DetailSheetTemplate({ 
  drama, 
  onClose, 
  onPlayEpisode, 
  isBookmarked, 
  onToggleBookmark,
  onOpenCastProfile,
  onSelectDrama,
  onOpenCommunity,
  isVipUser = false
}) {
  const [activeReaction, setActiveReaction] = useState(null);
  const [reactionFeedback, setReactionFeedback] = useState(null);

  if (!drama) return null;

  const reactionMeta = {
    '❤️': { label: 'Loved', count: '24.8K' },
    '🔥': { label: 'Obsessed', count: '12.4K' },
    '😭': { label: 'Emotional', count: '8.1K' },
    '😱': { label: 'Shocked', count: '15.2K' },
    '😂': { label: 'Dead', count: '6.4K' }
  };

  const handleSelectReaction = (emoji) => {
    setActiveReaction(emoji);
    const meta = reactionMeta[emoji];
    setReactionFeedback(`${emoji} You and ${meta.count} others are ${meta.label.toLowerCase()}.`);
    setTimeout(() => {
      setReactionFeedback(null);
    }, 3000);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `BingeShorts: ${drama.title}`,
          text: `I'm watching ${drama.title} on BingeShorts. This story is dangerously addictive.`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`I'm watching ${drama.title} on BingeShorts.`);
        alert("✨ Link copied to clipboard!");
      }
    } catch (err) {
      console.log('Share error:', err);
    }
  };

  const getPrimaryWatchState = () => {
    const firstUnwatched = drama.episodes.find(e => !e.progress && !e.locked);
    const inProgress = drama.episodes.find(e => e.progress > 0 && e.progress < 100);
    
    if (inProgress) {
      return { 
        cta: `Resume Episode ${inProgress.id}`, 
        sub: `${inProgress.progress}% watched.`,
        epId: inProgress.id
      };
    } else if (firstUnwatched && firstUnwatched.id === 1) {
      return { 
        cta: `Watch Episode 1`, 
        sub: `First episode free.`,
        epId: 1
      };
    } else if (firstUnwatched) {
      return { 
        cta: `Watch Episode ${firstUnwatched.id}`, 
        sub: `${firstUnwatched.duration}`,
        epId: firstUnwatched.id
      };
    }
    
    const firstLocked = drama.episodes.find(e => e.locked);
    if (firstLocked && !isVipUser) {
      return {
        cta: `Continue Watching`,
        sub: `Episode ${firstLocked.id} is locked.`,
        epId: firstLocked.id
      }
    }
    
    return {
      cta: `Watch Again`,
      sub: `All ${drama.episodesCount} episodes completed.`,
      epId: 1
    };
  };

  const watchState = getPrimaryWatchState();
  const recommendations = (drama.recommendations || []).map(id => MICRODRAMAS.find(d => d.id === id)).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 bg-[#090909] md:bg-black/90 md:backdrop-blur-xl flex items-end md:items-center justify-center overflow-hidden">
      <div className="relative w-full h-full md:max-w-[480px] md:max-h-[90vh] bg-[#090909] md:rounded-3xl md:border md:border-white/10 overflow-y-auto no-scrollbar md:shadow-beautiful-lg flex flex-col transition-spring">
        
        {/* SECTION 1 - CINEMATIC HERO */}
        <div className="relative aspect-[4/5] md:aspect-[3/4] w-full flex-none overflow-hidden">
          <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/60 to-black/30" />

          {/* Back Button */}
          <button 
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-6 left-5 md:top-4 md:left-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 cursor-pointer active:scale-90 transition-transform z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-5 right-5 z-10">
            {drama.badge && (
              <span className="text-[10px] font-bold tracking-widest text-[#f04a23] uppercase mb-3 block">
                {drama.badge}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-2">
              {drama.title}
            </h1>
            <p className="text-lg font-medium text-white/90">"{drama.hook}"</p>
            {drama.secondaryHook && <p className="text-sm text-white/70 mt-1">{drama.secondaryHook}</p>}
          </div>
        </div>

        <div className="px-5 pb-12 space-y-8 -mt-2 relative z-20">
          
          {/* SECTION 2 - DRAMA METADATA */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/70 font-medium">
            <span>{drama.genre}</span>
            <span>•</span>
            <span>{drama.episodesCount} Episodes</span>
            {drama.releaseYear && (
              <>
                <span>•</span>
                <span>{drama.releaseYear}</span>
              </>
            )}
            {drama.rating && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400"><Star className="w-3.5 h-3.5 fill-current"/> {drama.rating}</span>
              </>
            )}
          </div>

          {/* SECTION 3 - PRIMARY WATCH ACTION */}
          <div>
            <button
              onClick={() => onPlayEpisode(drama, watchState.epId)}
              className="w-full py-4 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" /> {watchState.cta}
            </button>
            <p className="text-center text-[11px] text-white/50 mt-2 font-medium uppercase tracking-wider">{watchState.sub}</p>
          </div>

          {/* SECTION 4 - QUICK ACTIONS & REACTION PICKER */}
          <div className="space-y-2 border-y border-white/10 py-4">
            <div className="flex items-center justify-around">
              <button onClick={() => onToggleBookmark(drama.id)} className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group">
                {isBookmarked ? <Check className="w-6 h-6 text-[#f04a23]" /> : <Plus className="w-6 h-6 group-active:scale-90 transition-transform" />}
                <span className="text-[10px] font-medium">{isBookmarked ? 'In My List' : 'My List'}</span>
              </button>

              <button onClick={handleShare} className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group">
                <Share className="w-6 h-6 group-active:scale-90 transition-transform" />
                <span className="text-[10px] font-medium">Share</span>
              </button>

              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1.5 bg-white/5 rounded-full px-3 py-1 border border-white/5">
                  {Object.keys(reactionMeta).map(emoji => (
                    <button 
                      key={emoji} 
                      onClick={() => handleSelectReaction(emoji)}
                      className={`text-lg transition-transform hover:scale-125 active:scale-90 ${
                        activeReaction === emoji ? 'scale-125 drop-shadow-[0_0_10px_rgba(240,74,35,0.8)]' : 'opacity-60 grayscale hover:grayscale-0'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] font-medium text-white/70">React</span>
              </div>
            </div>

            {/* Reaction Feedback Pill */}
            {reactionFeedback && (
              <div className="p-2 rounded-xl bg-[#f04a23]/20 border border-[#f04a23]/40 text-center text-xs text-white font-medium animate-fadeIn">
                {reactionFeedback}
              </div>
            )}
          </div>

          {/* SECTION 5 - ABOUT THE STORY */}
          <div>
            <h2 className="text-lg font-bold mb-2">About</h2>
            <p className="text-sm text-white/70 leading-relaxed">
              {drama.description}
            </p>
          </div>

          {/* SECTION 6 - STORY DETAILS */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-white/40 block mb-1">Genres</span>
              <div className="text-white/80">{drama.genre.split(' • ').map(g => <div key={g}>{g}</div>)}</div>
            </div>
            <div>
              <span className="text-white/40 block mb-1">Story Tags</span>
              <div className="flex flex-wrap gap-1">
                {drama.tags.map(t => <span key={t} className="bg-white/10 px-2 py-0.5 rounded-sm">{t}</span>)}
              </div>
            </div>
          </div>

          {/* SECTION 7 - EPISODES */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Episodes</h2>
              <span className="text-xs text-white/50">Season 1 • {drama.episodesCount} Episodes</span>
            </div>
            
            <div className="space-y-3">
              {drama.episodes.map((ep) => {
                const isLocked = !isVipUser && ep.locked;
                return (
                  <div 
                    key={ep.id} 
                    onClick={() => !isLocked && onPlayEpisode(drama, ep.id)}
                    className={`flex gap-4 p-3 rounded-xl border border-white/5 transition-colors ${isLocked ? 'bg-white/[0.02] opacity-70' : 'bg-[#181820] hover:bg-white/10 cursor-pointer active:scale-[0.98]'}`}
                  >
                    <div className="flex-none w-24 h-16 bg-[#090909] rounded-lg relative overflow-hidden flex items-center justify-center">
                      <span className="font-display font-black text-white/20 text-3xl absolute -left-1 -bottom-2">{ep.id}</span>
                      {ep.progress === 100 ? (
                        <Check className="w-5 h-5 text-emerald-500 relative z-10" />
                      ) : !isLocked ? (
                        <Play className="w-5 h-5 fill-white/80 relative z-10" />
                      ) : (
                        <Lock className="w-4 h-4 text-white/50 relative z-10" />
                      )}
                      {ep.progress > 0 && ep.progress < 100 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                          <div className="h-full bg-[#f04a23]" style={{ width: `${ep.progress}%` }}></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 py-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-sm text-white">{ep.title}</h3>
                        <span className="text-[10px] text-white/50">{ep.duration}</span>
                      </div>
                      <p className="text-xs text-white/60 line-clamp-2 leading-snug">{ep.description}</p>
                      <div className="mt-2">
                        {isLocked ? (
                          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> Unlock with Premium
                          </span>
                        ) : ep.progress === 100 ? (
                          <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">Watched</span>
                        ) : (
                          <span className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Free</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 8 - CAST */}
          {drama.cast && drama.cast.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Cast</h2>
              <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 pb-2">
                {drama.cast.map((actor, idx) => (
                  <div key={idx} className="flex-none w-[120px] cursor-pointer group" onClick={() => onOpenCastProfile && onOpenCastProfile(actor.name)}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f04a23] to-[#ff5b32] mb-2 flex items-center justify-center text-xl font-black shadow-beautiful-sm mx-auto overflow-hidden group-hover:scale-105 transition-transform">
                       {actor.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-xs">{actor.name}</h4>
                      <p className="text-[10px] text-white/50">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 9 - CREATOR */}
          {drama.creator && (
            <div className="bg-white/5 rounded-xl p-5 border border-white/5">
              <h2 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3">Created by</h2>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base">{drama.creator.name}</h3>
                  <p className="text-xs text-[#f04a23] mt-0.5">{drama.creator.role}</p>
                  <p className="text-xs text-white/70 mt-2 font-medium italic">"{drama.creator.bio}"</p>
                </div>
                <button className="flex-none bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                  <ChevronRight className="w-5 h-5 text-white/80" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION 10 - COMMUNITY PREVIEW */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">What people are saying</h2>
              <button 
                onClick={() => onOpenCommunity && onOpenCommunity(drama)} 
                className="text-xs text-[#f04a23] font-bold cursor-pointer hover:underline"
              >
                View all discussions →
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-sm">@midnightmila</span>
                </div>
                <p className="text-sm text-white/80 mb-3">Episode 4??? I literally paused and stared at my wall.</p>
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <span>❤️</span> 2.4K
                </div>
              </div>
              <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-sm">@jaywrites</span>
                </div>
                <p className="text-sm text-white/80 mb-3">The cinematic shots are unreal.</p>
                <div className="flex items-center gap-1 text-xs text-white/50">
                  <span>🔥</span> 891
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 11 - MORE LIKE THIS */}
          {recommendations.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">More stories like this</h2>
              <div className="grid grid-cols-2 gap-3">
                {recommendations.map(rec => (
                  <div key={rec.id} onClick={() => onSelectDrama && onSelectDrama(rec)} className="cursor-pointer group relative aspect-[4/5] rounded-xl overflow-hidden">
                    <img src={rec.poster} alt={rec.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs font-bold text-white line-clamp-2">{rec.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
