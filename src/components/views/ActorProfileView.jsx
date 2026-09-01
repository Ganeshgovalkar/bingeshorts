import React from 'react';
import { ArrowLeft, Check, Plus, Share2, Heart, Sparkles, MapPin } from 'lucide-react';
import { MICRODRAMAS } from '../../data/microdramas';

export default function ActorProfileView({ 
  actor, 
  onBack, 
  onSelectDrama, 
  isFollowing = false, 
  onToggleFollow, 
  isGuest = false, 
  onRequireAuth 
}) {
  if (!actor) return null;

  const handleFollowClick = () => {
    if (isGuest && !isFollowing) {
      onRequireAuth && onRequireAuth('Stay close to the story. Create an account to follow actors!');
      return;
    }
    onToggleFollow && onToggleFollow(actor.id);
  };

  const handleShare = async () => {
    const text = `Watching ${actor.name} on BingeShorts.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: actor.name, text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(text);
        alert('✨ Share text copied to clipboard!');
      }
    } catch (err) {
      console.log('Share error:', err);
    }
  };

  const knownDramas = (actor.featuredDramaIds || []).map(id => MICRODRAMAS.find(d => d.id === id)).filter(Boolean);

  return (
    <div className="w-full bg-[#090909] text-white pt-16 pb-24 min-h-screen select-none">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* ACTOR HERO */}
        <div className="relative aspect-[4/5] sm:aspect-[16/9] w-full overflow-hidden sm:rounded-3xl">
          <img src={actor.portrait} alt={actor.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-black/30" />

          {/* Back Button */}
          <button 
            onClick={onBack}
            className="absolute top-6 left-5 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 cursor-pointer active:scale-90 transition-transform z-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="absolute top-6 right-5 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 cursor-pointer active:scale-90 transition-transform z-10"
          >
            <Share2 className="w-5 h-5" />
          </button>

          {/* Hero Bottom Overlay */}
          <div className="absolute bottom-6 left-5 right-5 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#f04a23] uppercase mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Actor • {actor.location || 'London'}
              </span>
              <h1 className="font-display text-4xl font-bold text-white tracking-tight">{actor.name}</h1>
              {actor.currentRole && (
                <p className="text-sm font-medium text-white/80 mt-1">{actor.currentRole}</p>
              )}
            </div>

            {/* Follow Action */}
            <button
              onClick={handleFollowClick}
              className={`py-3 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isFollowing 
                  ? 'bg-white/15 text-white border border-white/20' 
                  : 'bg-[#f04a23] hover:bg-[#ff5b32] text-white shadow-lg'
              }`}
            >
              {isFollowing ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> Following
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Follow
                </>
              )}
            </button>
          </div>
        </div>

        <div className="px-5 space-y-8">
          
          {/* ACTOR BIO */}
          <section className="bg-[#111116] p-5 rounded-2xl border border-white/5 space-y-2">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-wider font-mono">About the actor</h2>
            <p className="text-sm text-white/80 leading-relaxed italic">
              "{actor.bio}"
            </p>
          </section>

          {/* KNOWN FOR */}
          <section>
            <h2 className="text-lg font-bold mb-4">Known for</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {knownDramas.map(drama => (
                <div 
                  key={drama.id} 
                  onClick={() => onSelectDrama(drama)}
                  className="cursor-pointer group relative aspect-[4/5] rounded-xl overflow-hidden"
                >
                  <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-bold text-white line-clamp-1">{drama.title}</p>
                    <p className="text-[10px] text-white/50">{drama.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CHARACTERS & ROLES */}
          <section>
            <h2 className="text-lg font-bold mb-4">Characters</h2>
            <div className="space-y-3">
              {(actor.roles || []).map((role, idx) => {
                const drama = MICRODRAMAS.find(d => d.id === role.dramaId);
                return (
                  <div key={idx} className="bg-[#111116] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-white">{role.characterName}</h3>
                      <p className="text-xs text-[#f04a23] mt-0.5">{drama?.title || "BingeShorts Series"}</p>
                      <p className="text-xs text-white/60 mt-1 font-medium italic">"{role.description}"</p>
                    </div>
                    {drama && (
                      <button 
                        onClick={() => onSelectDrama(drama)}
                        className="flex-none px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                      >
                        View Story
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* FAN REACTIONS */}
          {actor.fanReactions && actor.fanReactions.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4">Fans are saying</h2>
              <div className="space-y-3">
                {actor.fanReactions.map((fan, i) => (
                  <div key={i} className="bg-white/[0.03] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-white/90">{fan.user}</span>
                      <p className="text-xs text-white/80 mt-1">{fan.text}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#f04a23] font-bold">
                      <Heart className="w-3.5 h-3.5 fill-current" /> {fan.likes}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
