import React, { useState } from 'react';
import { X, Play, Pause, Heart, Bookmark, MessageCircle, Share2, ChevronLeft, ChevronRight, Lock, Sparkles } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

export default function VideoPlayerModal({ 
  drama, 
  initialEpisodeId = 1, 
  onClose,
  isBookmarked,
  onToggleBookmark
}) {
  const [currentEpId, setCurrentEpId] = useState(initialEpisodeId);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(14200);
  const [showPaywall, setShowPaywall] = useState(false);

  if (!drama) return null;

  const currentEp = drama.episodes.find(e => e.id === currentEpId) || drama.episodes[0];
  const isLocked = currentEp.locked && showPaywall;

  const handleSelectEpisode = (epId) => {
    const targetEp = drama.episodes.find(e => e.id === epId);
    if (targetEp?.locked) {
      setShowPaywall(true);
    } else {
      setShowPaywall(false);
      setCurrentEpId(epId);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-0 sm:p-4">
      {/* 9:16 Vertical Player Frame */}
      <div className="relative w-full max-w-[393px] h-full max-h-[852px] bg-black rounded-none sm:rounded-3xl overflow-hidden flex flex-col justify-between select-none">
        
        {/* Background Video Simulator Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={drama.banner || drama.poster} 
            alt={drama.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'brightness-90' : 'brightness-50'}`} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        {/* Top Header Bar */}
        <div className="relative z-20 px-4 pt-4 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h3 className="text-xs font-bold text-white tracking-wide">{drama.title}</h3>
            <p className="text-[10px] text-gray-300">{currentEp.title}</p>
          </div>

          <button 
            onClick={() => onToggleBookmark(drama.id)}
            className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-[#9D4EDD] fill-[#9D4EDD]' : ''}`} />
          </button>
        </div>

        {/* Locked Episode Paywall Overlay */}
        {showPaywall ? (
          <div className="relative z-30 m-4 p-6 rounded-3xl bg-[#14141B]/95 backdrop-blur-xl border border-purple-500/40 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9D4EDD] to-[#FF4757] mx-auto flex items-center justify-center text-white shadow-lg">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-lg font-extrabold text-white">Unlock Episode {currentEpId}</h4>
              <p className="text-xs text-gray-300 mt-1">Get BingeShorts Pass to watch all {drama.episodesCount} episodes without waiting!</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left space-y-1">
              <span className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-wider block">Binge Pass Unlimited</span>
              <span className="text-sm font-extrabold text-white">$4.99 / month</span>
              <span className="text-[10px] text-gray-400 block">7-day free trial • Cancel anytime</span>
            </div>

            <button 
              onClick={() => setShowPaywall(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] text-white font-bold text-xs shadow-[0_0_20px_rgba(157,78,221,0.5)] active:scale-95 transition-all cursor-pointer"
            >
              Start Free Trial & Unlock
            </button>

            <button 
              onClick={() => setShowPaywall(false)}
              className="text-xs text-gray-400 hover:text-white"
            >
              Back to Free Episodes
            </button>
          </div>
        ) : (
          /* Center Video Play/Pause Touch Trigger */
          <div 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="relative z-10 flex-1 flex items-center justify-center cursor-pointer"
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl animate-pulse">
                <Play className="w-8 h-8 ml-1 fill-white" />
              </div>
            )}
          </div>
        )}

        {/* Right Floating Social Controls */}
        <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
          <button 
            onClick={handleLike}
            className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform"
          >
            <div className={`p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 ${liked ? 'text-[#FF4757] bg-red-500/20 border-red-500/40' : ''}`}>
              <Heart className={`w-5 h-5 ${liked ? 'fill-[#FF4757]' : ''}`} />
            </div>
            <span className="text-[10px] font-bold">{(likeCount / 1000).toFixed(1)}k</span>
          </button>

          <button className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform">
            <div className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold">342</span>
          </button>

          <button className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform">
            <div className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold">Share</span>
          </button>
        </div>

        {/* Bottom Controls & Episode Picker */}
        <div className="relative z-20 p-4 space-y-3 bg-gradient-to-t from-black via-black/80 to-transparent">
          {/* Episode Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {drama.episodes.map((ep) => (
              <button
                key={ep.id}
                onClick={() => handleSelectEpisode(ep.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  currentEpId === ep.id
                    ? 'bg-[#9D4EDD] text-white shadow-[0_0_12px_rgba(157,78,221,0.6)]'
                    : ep.locked
                    ? 'bg-white/5 text-gray-400 border border-white/5'
                    : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
              >
                {ep.locked && <Lock className="w-3 h-3 text-amber-400" />}
                <span>Ep {ep.id}</span>
              </button>
            ))}
          </div>

          {/* Progress Bar & Timer */}
          <div className="space-y-1">
            <ProgressBar percent={isPlaying ? 45 : 10} color="gradient" height="h-1" />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>02:15</span>
              <span>{currentEp.duration}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
