import React from 'react';
import { X, Play, Star, Plus, Check, Lock, Sparkles, Share2, Eye } from 'lucide-react';
import Badge from '../common/Badge';

export default function DramaDetailModal({ 
  drama, 
  onClose, 
  onPlayEpisode, 
  isBookmarked, 
  onToggleBookmark 
}) {
  if (!drama) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="relative w-full max-w-[393px] max-h-[90vh] bg-[#14141B] rounded-t-3xl sm:rounded-3xl border border-white/10 overflow-y-auto no-scrollbar shadow-2xl flex flex-col">
        
        {/* Banner Artwork */}
        <div className="relative h-64 w-full flex-none overflow-hidden">
          <img src={drama.banner || drama.poster} alt={drama.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-transparent to-black/60" />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 cursor-pointer active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge type={drama.badgeType || 'original'} text={drama.badge || 'BINGESHORTS'} />
              <span className="text-[11px] font-semibold text-gray-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {drama.rating} ({drama.views} views)
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold text-white tracking-tight">{drama.title}</h2>
          </div>
        </div>

        {/* Drama Info */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-300 border-b border-white/5 pb-3">
            <span>{drama.genre}</span>
            <span>{drama.episodesCount} Episodes</span>
            <span>{drama.avgDuration}/ep</span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Emotional Hook</h4>
            <p className="text-sm font-semibold text-purple-300 italic">"{drama.hook}"</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Synopsis</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-light">{drama.synopsis}</p>
          </div>

          {drama.cast && (
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Starring</h4>
              <p className="text-xs text-gray-200">{drama.cast.join(' • ')}</p>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => onPlayEpisode(drama, 1)}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(157,78,221,0.5)] active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" /> Start Episode 1
            </button>

            <button
              onClick={() => onToggleBookmark(drama.id)}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer active:scale-95 transition-all"
            >
              {isBookmarked ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>

          {/* Episode List */}
          <div className="pt-3 border-t border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Episodes ({drama.episodesCount})</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar pr-1">
              {drama.episodes.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => onPlayEpisode(drama, ep.id)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-xs font-bold text-purple-300">
                      {ep.id}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">{ep.title}</h5>
                      <span className="text-[10px] text-gray-400">{ep.duration}</span>
                    </div>
                  </div>

                  {ep.locked ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      Free
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
