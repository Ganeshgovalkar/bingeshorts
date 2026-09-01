import React, { useState } from 'react';
import { Play, Pause, Heart, MessageCircle, Share2, Bookmark, ChevronUp, ChevronDown, Sparkles, Volume2, VolumeX, List, Star } from 'lucide-react';
import CommentsDrawer from '../modals/CommentsDrawer';

export default function BingeFeedView({ 
  microdramas, 
  onSelectDrama, 
  onPlayEpisode, 
  bookmarks, 
  onToggleBookmark 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedDramas, setLikedDramas] = useState(['wrong-floor']);
  const [showComments, setShowComments] = useState(false);

  const currentDrama = microdramas[currentIndex] || microdramas[0];
  const isBookmarked = bookmarks.includes(currentDrama.id);
  const isLiked = likedDramas.includes(currentDrama.id);

  const handleNext = () => {
    if (currentIndex < microdramas.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(microdramas.length - 1);
    }
  };

  const toggleLike = () => {
    setLikedDramas(prev => 
      prev.includes(currentDrama.id) ? prev.filter(id => id !== currentDrama.id) : [...prev, currentDrama.id]
    );
  };

  return (
    <div className="relative w-full h-[calc(100vh-60px)] max-h-[800px] bg-black overflow-hidden flex flex-col justify-between select-none">
      
      {/* Background Vertical Video Simulation */}
      <div className="absolute inset-0 z-0">
        <img 
          src={currentDrama.banner || currentDrama.poster} 
          alt={currentDrama.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${isPlaying ? 'brightness-90 scale-100' : 'brightness-50 scale-105'}`} 
        />
        {/* Layered Chiaroscuro Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      </div>

      {/* Top Floating Feed Controls */}
      <div className="relative z-20 px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-[#CCFF00] shadow-beautiful-sm">
          <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
          <span>BINGE FEED • {currentIndex + 1}/{microdramas.length}</span>
        </div>

        {/* Audio Equalizer & Volume Toggle */}
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 active:scale-90 transition-spring cursor-pointer shadow-beautiful-sm flex items-center gap-1.5"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#CCFF00]" />}
          {!isMuted && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-[#CCFF00] animate-pulse" />
              <span className="w-0.5 h-2 bg-[#CCFF00] animate-pulse delay-75" />
              <span className="w-0.5 h-3.5 bg-[#CCFF00] animate-pulse delay-150" />
            </div>
          )}
        </button>
      </div>

      {/* Center Touch Trigger */}
      <div 
        onClick={() => setIsPlaying(!isPlaying)}
        className="relative z-10 flex-1 flex items-center justify-center cursor-pointer"
      >
        {!isPlaying && (
          <div className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white shadow-beautiful-lg animate-pulse">
            <Play className="w-8 h-8 ml-1 fill-white" />
          </div>
        )}
      </div>

      {/* Right Floating Vertical Action Column */}
      <div className="absolute right-3.5 bottom-28 z-20 flex flex-col items-center gap-3.5 text-white">
        {/* Like */}
        <button 
          onClick={toggleLike}
          className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-spring"
        >
          <div className={`p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-beautiful-sm ${isLiked ? 'text-[#FF4757] bg-red-500/20 border-red-500/40' : ''}`}>
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#FF4757]' : ''}`} />
          </div>
          <span className="text-[10px] font-mono font-bold">28.4k</span>
        </button>

        {/* Comments */}
        <button 
          onClick={() => setShowComments(true)}
          className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-spring"
        >
          <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-beautiful-sm hover:border-[#9D4EDD]">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono font-bold">542</span>
        </button>

        {/* Bookmark */}
        <button 
          onClick={() => onToggleBookmark(currentDrama.id)}
          className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-spring"
        >
          <div className={`p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-beautiful-sm ${isBookmarked ? 'text-[#9D4EDD] bg-purple-500/20 border-purple-500/40' : ''}`}>
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-[#9D4EDD]' : ''}`} />
          </div>
          <span className="text-[10px] font-bold">Save</span>
        </button>

        {/* Share */}
        <button 
          onClick={() => alert(`Share Link copied: ${currentDrama.title}`)}
          className="flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-spring"
        >
          <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-beautiful-sm">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold">Share</span>
        </button>

        {/* Vertical Feed Swipe Steppers */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
          <button 
            onClick={handlePrev}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 active:scale-90 transition-spring cursor-pointer shadow-beautiful-sm"
            title="Previous Drama"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <button 
            onClick={handleNext}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 active:scale-90 transition-spring cursor-pointer shadow-beautiful-sm"
            title="Next Drama"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Editorial Narrative Card & CTAs */}
      <div className="relative z-20 p-4 space-y-2.5 bg-gradient-to-t from-black via-black/85 to-transparent">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-[#9D4EDD] text-white text-[10px] font-mono font-bold">
            EPISODE 1 FREE
          </span>
          <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400" /> {currentDrama.rating}
          </span>
        </div>

        <h2 className="font-display text-2xl font-extrabold text-white tracking-tight leading-none text-glow-violet">
          {currentDrama.title}
        </h2>

        <p className="text-xs text-gray-200 leading-relaxed line-clamp-2 max-w-[85%]">
          "{currentDrama.hook}"
        </p>

        {/* Action Row */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={() => onPlayEpisode(currentDrama, 1)}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(157,78,221,0.5)] border border-purple-400/30 active:scale-95 transition-spring cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" /> Watch Episode 1 (Full Screen)
          </button>

          <button
            onClick={() => onSelectDrama(currentDrama)}
            className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 active:scale-95 transition-spring cursor-pointer shadow-beautiful-sm flex items-center gap-1.5"
            title="View Series Details"
          >
            <List className="w-4 h-4" /> Series
          </button>
        </div>
      </div>

      {/* Slide-Up Comments Drawer */}
      {showComments && (
        <CommentsDrawer 
          drama={currentDrama}
          episodeTitle="Episode 1 (Feed Clip)"
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  );
}
