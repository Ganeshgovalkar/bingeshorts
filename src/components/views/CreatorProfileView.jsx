import React from 'react';
import { ArrowLeft, Check, Plus, Share2, Play, Sparkles, Quote } from 'lucide-react';
import { MICRODRAMAS } from '../../data/microdramas';

export default function CreatorProfileView({ 
  creator, 
  onBack, 
  onSelectDrama, 
  isFollowing = false, 
  onToggleFollow, 
  isGuest = false, 
  onRequireAuth 
}) {
  if (!creator) return null;

  const handleFollowClick = () => {
    if (isGuest && !isFollowing) {
      onRequireAuth && onRequireAuth('Stay close to the story. Create an account to follow creators!');
      return;
    }
    onToggleFollow && onToggleFollow(creator.id);
  };

  const handleShare = async () => {
    const text = `Check out stories by ${creator.name} on BingeShorts.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: creator.name, text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(text);
        alert('✨ Share text copied to clipboard!');
      }
    } catch (err) {
      console.log('Share error:', err);
    }
  };

  const createdDramas = (creator.dramaIds || []).map(id => MICRODRAMAS.find(d => d.id === id)).filter(Boolean);
  const featuredOriginal = MICRODRAMAS.find(d => d.id === creator.featuredOriginalId) || createdDramas[0];

  return (
    <div className="w-full bg-[#090909] text-white pt-16 pb-24 min-h-screen select-none">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* CREATOR HERO */}
        <div className="relative aspect-[4/5] sm:aspect-[16/9] w-full overflow-hidden sm:rounded-3xl">
          <img src={creator.portrait} alt={creator.name} className="w-full h-full object-cover" />
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
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#f04a23] uppercase mb-1 block">
                BingeShorts Original Creator
              </span>
              <h1 className="font-display text-4xl font-bold text-white tracking-tight">{creator.name}</h1>
              <p className="text-xs text-white/70 mt-1 font-medium">
                {(creator.roles || []).join(' • ')}
              </p>
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
          
          {/* CREATIVE STATEMENT */}
          <section className="bg-[#111116] p-5 rounded-2xl border border-white/5 space-y-2">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-wider font-mono">About the creator</h2>
            <p className="text-sm text-white/80 leading-relaxed font-medium">
              {creator.bio}
            </p>
          </section>

          {/* FEATURED ORIGINAL */}
          {featuredOriginal && (
            <section>
              <span className="text-[10px] font-mono font-bold text-[#f04a23] uppercase tracking-wider block mb-2">
                Featured Original
              </span>
              <div 
                onClick={() => onSelectDrama(featuredOriginal)}
                className="relative aspect-[4/5] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img src={featuredOriginal.backdrop || featuredOriginal.poster} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={featuredOriginal.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-3xl font-display font-bold mb-1">{featuredOriginal.title}</h3>
                  <p className="text-xs text-white/80 max-w-md mb-4 line-clamp-2">{featuredOriginal.description}</p>
                  <button className="bg-[#f04a23] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2">
                    <Play className="w-4 h-4 fill-current" /> Watch now
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* CREATED STORIES */}
          <section>
            <h2 className="text-lg font-bold mb-4">Stories by {creator.name.split(' ')[0]}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {createdDramas.map(drama => (
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

          {/* CREATOR NOTES */}
          {creator.creativeNote && (
            <section className="bg-gradient-to-br from-[#f04a23]/10 to-transparent p-6 rounded-2xl border border-[#f04a23]/20 space-y-3">
              <div className="flex items-center gap-2 text-[#f04a23]">
                <Quote className="w-5 h-5" />
                <h2 className="text-xs font-bold uppercase tracking-wider font-mono">From the creator</h2>
              </div>
              <p className="text-base font-bold text-white leading-relaxed italic">
                "{creator.creativeNote}"
              </p>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
