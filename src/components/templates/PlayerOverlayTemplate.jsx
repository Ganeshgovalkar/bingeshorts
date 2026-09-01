import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Play, Pause, Heart, Bookmark, MessageCircle, Share2, 
  Lock, Subtitles, ChevronRight, RotateCcw, Volume2, VolumeX, Sparkles, MoreVertical 
} from 'lucide-react';
import CommentsDrawer from '../modals/CommentsDrawer';
import SubtitleSelectorModal from '../modals/SubtitleSelectorModal';

export default function PlayerOverlayTemplate({ 
  drama, 
  initialEpisodeId = 1, 
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenCheckout,
  isVipUser = false,
  isGuest = false,
  onRequireAuth,
  onShowToast,
  userPreferences,
  onUpdateProgress
}) {
  const [currentEpId, setCurrentEpId] = useState(initialEpisodeId);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24800);
  const [likeAnimated, setLikeAnimated] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState('en');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  
  // Episode Progression States
  const [completionState, setCompletionState] = useState(null); // 'cinematic_pause' | 'completed' | 'locked'
  const [countdown, setCountdown] = useState(5);
  const [wasPlayingBeforeComments, setWasPlayingBeforeComments] = useState(true);

  const autoHideTimerRef = useRef(null);
  const playbackIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  if (!drama) return null;

  const currentEpIndex = drama.episodes.findIndex(e => e.id === currentEpId);
  const currentEp = drama.episodes[currentEpIndex] || drama.episodes[0];
  const nextEp = drama.episodes[currentEpIndex + 1];

  // Helper to parse duration string like "8 min" -> seconds
  const parseDurationSeconds = (durStr) => {
    if (!durStr) return 480;
    const match = durStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) * 60 : 480;
  };

  const durationSeconds = parseDurationSeconds(currentEp.duration);

  // Subtitles content mapping
  const subtitlesByLang = {
    en: `${currentEp.title}: "Every night after 9 PM, we meet at Platform 6..."`,
    es: `${currentEp.title}: "Todas las noches después de las 9 PM, nos encontramos en la Plataforma 6..."`,
    ja: `${currentEp.title}: 「毎晩9時過ぎ、プラットフォーム6で会いましょう…」`,
    ko: `${currentEp.title}: "매일 밤 9시 이후, 6번 승강장에서 만나요..."`,
    off: null
  };

  // 1. Controls Auto-Hide Engine
  const resetAutoHideTimer = () => {
    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    setShowControls(true);

    if (isPlaying && !completionState && !showComments && !showMoreOptions && !showSubtitles) {
      autoHideTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleScreenClick = (e) => {
    // Prevent triggering if clicked on controls elements directly
    if (e.target.closest('.interactive-control')) return;
    if (completionState) return;

    if (showControls) {
      setShowControls(false);
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    } else {
      resetAutoHideTimer();
    }
  };

  // 2. Playback Timer Simulation
  useEffect(() => {
    if (isPlaying && !completionState && !showComments) {
      playbackIntervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= durationSeconds - 1) {
            handleEpisodeEnded();
            return durationSeconds;
          }
          const nextTime = prev + 1;
          if (onUpdateProgress) {
            onUpdateProgress(drama.id, currentEpId, nextTime / durationSeconds, nextTime);
          }
          return nextTime;
        });
      }, 1000);
    } else {
      if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
    }

    return () => {
      if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
    };
  }, [isPlaying, completionState, showComments, durationSeconds, currentEpId]);

  // Handle Initial Mount or Episode Change
  useEffect(() => {
    setCurrentTime(0);
    setCompletionState(null);
    setIsPlaying(true);
    resetAutoHideTimer();
  }, [currentEpId]);

  // 3. Episode Completion Handler
  const handleEpisodeEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
    setCompletionState('cinematic_pause');

    // 1.5s cliffhanger pause before showing overlay
    setTimeout(() => {
      if (nextEp) {
        const isNextLocked = !isVipUser && nextEp.locked;
        if (isNextLocked) {
          setCompletionState('locked');
        } else {
          setCompletionState('completed');
          // Only start auto-next countdown if autoplay preference is enabled!
          if (userPreferences?.playback?.autoplayNextEpisode !== false) {
            startAutoNextCountdown();
          }
        }
      } else {
        setCompletionState('completed');
      }
    }, 1500);
  };

  // Auto-Next Countdown
  const startAutoNextCountdown = () => {
    setCountdown(5);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          handleNextEpisode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelCountdown = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setCompletionState('paused_end');
  };

  const handleNextEpisode = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (!nextEp) return;

    if (!isVipUser && nextEp.locked) {
      setCompletionState('locked');
    } else {
      setCurrentEpId(nextEp.id);
    }
  };

  // Format time MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Interactions
  const handleTogglePlay = () => {
    if (completionState) {
      setCompletionState(null);
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
    resetAutoHideTimer();
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeAnimated(true);
    setTimeout(() => setLikeAnimated(false), 500);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    resetAutoHideTimer();
  };

  const handleOpenComments = () => {
    setWasPlayingBeforeComments(isPlaying);
    setIsPlaying(false);
    setShowComments(true);
  };

  const handleCloseComments = () => {
    setShowComments(false);
    if (wasPlayingBeforeComments && !completionState) {
      setIsPlaying(true);
    }
  };

  const handleShare = async () => {
    resetAutoHideTimer();
    const shareData = {
      title: `${drama.title} - ${currentEp.title}`,
      text: `Watching "${drama.title}" on BingeShorts. I need to talk about that ending!`,
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert('✨ Share text copied to clipboard!');
      }
    } catch (err) {
      console.log('Share error', err);
    }
  };

  const progressPercent = (currentTime / durationSeconds) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none">
      {/* 9:16 Vertical Video Viewport Frame */}
      <div 
        onClick={handleScreenClick}
        className="relative w-full h-full md:w-[480px] md:h-[90vh] md:rounded-[2.5rem] md:border md:border-white/10 bg-[#090909] overflow-hidden flex flex-col justify-between shadow-2xl"
      >
        
        {/* REAL VIDEO MEDIA & ARTWORK LAYER */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          {(currentEp?.videoUrl || drama?.videoUrl) ? (
            <video 
              key={currentEp?.videoUrl || currentEpId}
              src={currentEp?.videoUrl || drama?.videoUrl} 
              poster={currentEp?.thumbnail || drama?.backdrop || drama?.poster}
              autoPlay={isPlaying}
              loop
              muted
              playsInline
              className={`w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? 'scale-105 brightness-95' : 'scale-100 brightness-50'
              }`}
              onError={(e) => {
                // Fallback to backdrop image if video fails to load
                e.target.style.display = 'none';
              }}
            />
          ) : null}
          <img 
            src={currentEp?.thumbnail || drama?.backdrop || drama?.poster} 
            alt={drama?.title}
            className={`w-full h-full object-cover transition-all duration-700 absolute inset-0 -z-10 ${
              isPlaying ? 'scale-105 brightness-95' : 'scale-100 brightness-50'
            }`} 
            onError={(e) => {
              // Visual fallback container styling
              e.target.src = 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop';
            }}
          />
          {/* Subtle Vertical Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
        </div>

        {/* TOP PLAYER CONTROLS (Fade with auto-hide) */}
        <div className={`relative z-20 px-5 pt-6 md:pt-5 flex items-center justify-between transition-opacity duration-300 pointer-events-auto ${
          showControls || !isPlaying || completionState ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Back Button */}
          <button 
            onClick={onClose}
            aria-label="Back to Drama Details"
            className="interactive-control p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 active:scale-90 transition-transform cursor-pointer shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Episode Info */}
          <div className="text-center px-3 flex-1 min-w-0">
            <h3 className="font-display text-xs font-bold text-white tracking-tight truncate">{drama.title}</h3>
            <p className="text-[11px] text-[#f04a23] font-medium truncate">
              Episode {currentEp.id}: {currentEp.title}
            </p>
          </div>

          {/* Right Top Actions */}
          <div className="flex items-center gap-2">
            {/* Caption Switcher */}
            <button 
              onClick={() => setShowSubtitles(true)}
              aria-label="Closed Captions"
              className={`interactive-control p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 active:scale-90 transition-transform cursor-pointer shadow-md ${
                activeSubtitle !== 'off' ? 'text-[#f04a23]' : 'text-white/60'
              }`}
            >
              <Subtitles className="w-4 h-4" />
            </button>

            {/* Bookmark */}
            <button 
              onClick={() => { onToggleBookmark(drama.id); resetAutoHideTimer(); }}
              aria-label="Save to My List"
              className="interactive-control p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 active:scale-90 transition-transform cursor-pointer shadow-md"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-[#f04a23] fill-[#f04a23]' : 'text-white/80'}`} />
            </button>
          </div>
        </div>

        {/* CENTER VIEWPORT (TAP REACTION & PLAY/PAUSE INDICATOR) */}
        <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
          {!isPlaying && !completionState && (
            <button 
              onClick={handleTogglePlay}
              aria-label="Play Episode"
              className="interactive-control pointer-events-auto w-16 h-16 rounded-full bg-[#f04a23]/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl active:scale-95 transition-transform"
            >
              <Play className="w-8 h-8 ml-1 fill-white" />
            </button>
          )}

          {completionState === 'cinematic_pause' && (
            <div className="text-center px-4 animate-pulse">
              <span className="text-xs font-mono tracking-widest text-[#f04a23] uppercase">Cliffhanger...</span>
            </div>
          )}
        </div>

        {/* LIVE CAPTION OVERLAY */}
        {subtitlesByLang[activeSubtitle] && !completionState && (
          <div className="relative z-20 mx-6 mb-3 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-center shadow-lg pointer-events-none">
            <p className="text-xs text-yellow-300 font-medium leading-snug">
              {subtitlesByLang[activeSubtitle]}
            </p>
          </div>
        )}

        {/* RIGHT SOCIAL LAYER (Fades with controls) */}
        <div className={`absolute right-4 bottom-28 z-20 flex flex-col items-center gap-4 text-white transition-opacity duration-300 pointer-events-auto ${
          showControls || !isPlaying || completionState ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Like Button */}
          <button 
            onClick={handleLike}
            aria-label="Like episode"
            className="interactive-control flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform"
          >
            <div className={`p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-md ${
              liked ? 'text-[#f04a23] bg-[#f04a23]/20 border-[#f04a23]/40' : 'text-white/80'
            }`}>
              <Heart className={`w-5 h-5 ${liked ? 'fill-[#f04a23]' : ''} ${likeAnimated ? 'animate-ping' : ''}`} />
            </div>
            <span className="text-[10px] font-bold text-white/90 font-mono">{(likeCount / 1000).toFixed(1)}k</span>
          </button>

          {/* Comment Button */}
          <button 
            onClick={handleOpenComments}
            aria-label="Open Comments"
            className="interactive-control flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-md hover:border-[#f04a23] text-white/80">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-white/90 font-mono">428</span>
          </button>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            aria-label="Share Episode"
            className="interactive-control flex flex-col items-center gap-1 cursor-pointer active:scale-90 transition-transform"
          >
            <div className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-md text-white/80">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-white/90">Share</span>
          </button>
        </div>

        {/* BOTTOM CONTROLS BAR (Progress, Time, Play/Pause, Scrubber) */}
        <div className={`relative z-20 p-5 space-y-3 bg-gradient-to-t from-black via-black/90 to-transparent transition-opacity duration-300 pointer-events-auto ${
          showControls || !isPlaying || completionState ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          
          {/* SCRUBBABLE PROGRESS BAR */}
          <div className="space-y-1.5 interactive-control">
            <div 
              className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newRatio = clickX / rect.width;
                setCurrentTime(newRatio * durationSeconds);
                resetAutoHideTimer();
              }}
            >
              <div 
                className="h-full bg-[#f04a23] rounded-full transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-white/60 font-medium">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(durationSeconds)}</span>
            </div>
          </div>

          {/* EPISODE PILL SELECTOR ROW */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 interactive-control">
            {drama.episodes.map((ep) => {
              const isLocked = !isVipUser && ep.locked;
              const isCurrent = currentEpId === ep.id;

              return (
                <button
                  key={ep.id}
                  onClick={() => {
                    if (isLocked) {
                      setCompletionState('locked');
                    } else {
                      setCurrentEpId(ep.id);
                    }
                    resetAutoHideTimer();
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? 'bg-[#f04a23] text-white shadow-lg'
                      : isLocked
                      ? 'bg-white/5 text-white/40 border border-white/10'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {isLocked && <Lock className="w-3 h-3 text-amber-400" />}
                  <span>Ep {ep.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* OVERLAY STATE: EPISODE COMPLETE */}
        {completionState === 'completed' && (
          <div className="absolute inset-0 z-40 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-between text-center animate-fadeIn">
            <div className="pt-12 space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#f04a23] uppercase">
                Episode {currentEp.id} Complete
              </span>
              <h2 className="font-display text-2xl font-bold text-white">{currentEp.title}</h2>
            </div>

            {nextEp ? (
              <div className="bg-[#111116] border border-white/10 p-6 rounded-3xl space-y-4">
                <p className="text-xs text-white/60">Next episode starts in</p>
                <div className="w-16 h-16 rounded-full bg-[#f04a23] text-white font-display font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
                  {countdown}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Ep {nextEp.id}: {nextEp.title}</h4>
                  <p className="text-xs text-white/50 mt-1 line-clamp-1">{nextEp.description}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={cancelCountdown}
                    className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleNextEpisode}
                    className="flex-1 py-3 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-xs font-bold text-white flex items-center justify-center gap-1 transition-colors"
                  >
                    Watch Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#111116] border border-white/10 p-6 rounded-3xl space-y-4">
                <p className="text-sm font-bold text-white">You've completed all episodes of {drama.title}!</p>
                <button 
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-[#f04a23] text-xs font-bold text-white"
                >
                  Back to Series
                </button>
              </div>
            )}

            <div className="pb-6">
              <button 
                onClick={onClose}
                className="text-xs text-white/50 hover:text-white transition-colors font-medium"
              >
                Back to Series
              </button>
            </div>
          </div>
        )}

        {/* OVERLAY STATE: LOCKED NEXT EPISODE (MONETIZATION PAYWALL CONTEXT) */}
        {completionState === 'locked' && (
          <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur-2xl p-6 flex flex-col justify-between text-center animate-fadeIn">
            <div className="pt-10">
              <div className="w-14 h-14 rounded-2xl bg-[#f04a23]/20 border border-[#f04a23]/40 flex items-center justify-center text-[#f04a23] mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#f04a23] uppercase">
                YOU'RE HOOKED.
              </span>
              <h2 className="font-display text-2xl font-extrabold text-white mt-1">
                Episode {nextEp ? nextEp.id : currentEpId + 1} is waiting.
              </h2>
            </div>

            <div className="bg-[#111116] border border-white/10 p-6 rounded-3xl text-left space-y-4 shadow-2xl">
              <p className="text-xs text-white/70 leading-relaxed">
                Unlock the rest of <strong className="text-white">{drama.title}</strong> and enjoy unlimited access to every original microdrama on BingeShorts.
              </p>
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#f04a23] uppercase font-mono">BingeShorts VIP</span>
                  <span className="text-xs font-extrabold text-white font-mono">$4.99 / mo</span>
                </div>
                <p className="text-[10px] text-white/50">Cancel anytime • Watch ad-free in HD</p>
              </div>

              <button 
                onClick={() => {
                  if (onOpenCheckout) onOpenCheckout();
                }}
                className="w-full py-4 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-current" /> Unlock All Episodes
              </button>
            </div>

            <div className="pb-6">
              <button 
                onClick={() => setCompletionState(null)}
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                Not now, return to playback
              </button>
            </div>
          </div>
        )}

      </div>

      {/* COMMENTS DRAWER MODAL */}
      {showComments && (
        <CommentsDrawer 
          drama={drama}
          episodeTitle={`Episode ${currentEp.id}: ${currentEp.title}`}
          onClose={handleCloseComments}
          isGuest={isGuest}
          onRequireAuth={onRequireAuth}
          onShowToast={onShowToast}
        />
      )}

      {/* SUBTITLE SELECTOR MODAL */}
      {showSubtitles && (
        <SubtitleSelectorModal
          currentSubtitle={activeSubtitle}
          onSelectSubtitle={(lang) => {
            setActiveSubtitle(lang);
            setShowSubtitles(false);
          }}
          onClose={() => setShowSubtitles(false)}
        />
      )}
    </div>
  );
}
