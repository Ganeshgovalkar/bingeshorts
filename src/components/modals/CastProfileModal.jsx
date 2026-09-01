import React from 'react';
import { X, Star, Play, Check, Users, Film, Award, Sparkles } from 'lucide-react';
import DramaCard from '../common/DramaCard';

export default function CastProfileModal({ actorName, microdramas, onClose, onSelectDrama, onPlayEpisode }) {
  if (!actorName) return null;

  // Find all dramas featuring this actor
  const starredDramas = microdramas.filter(d => d.cast && d.cast.includes(actorName));

  const actorPhotos = {
    'Elena Rostova': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'Julian Thorne': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'Sienna Chen': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    'Liam Sterling': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    'Kenji Takahashi': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80'
  };

  const photo = actorPhotos[actorName] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-end justify-center">
      <div className="relative w-full max-w-[480px] max-h-[85vh] bg-[#111116] rounded-t-3xl border-t border-x border-white/10 overflow-y-auto no-scrollbar shadow-beautiful-lg flex flex-col transition-spring">
        
        {/* Top Header Card */}
        <div className="p-5 border-b border-white/8 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-purple-500/40 p-0.5 shadow-beautiful-md">
                <img src={photo} alt={actorName} className="w-full h-full object-cover rounded-[14px]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-display text-lg font-extrabold text-white">{actorName}</h2>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#00D2FF] text-black flex items-center justify-center text-[9px] font-bold">✓</span>
                </div>
                <p className="text-xs text-purple-300 font-semibold font-mono">BingeShorts Lead Artist</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400 font-mono">
                  <span>1.4M Fans</span>
                  <span>•</span>
                  <span>{starredDramas.length} Microdramas</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/6 hover:bg-white/12 text-gray-300 hover:text-white transition-spring cursor-pointer shadow-beautiful-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed font-light">
            Acclaimed for intense, dramatic performances in high-tension vertical thrillers and romance series. Winner of the 2026 Mobile OTT Best Lead Performer Award.
          </p>

          <button className="w-full py-2.5 rounded-xl bg-white/8 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-spring active:scale-95 cursor-pointer shadow-beautiful-sm flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" /> Follow Artist Updates
          </button>
        </div>

        {/* Filmography Section */}
        <div className="p-5 space-y-3">
          <h3 className="font-display text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-[#9D4EDD]" /> Starring Microdramas ({starredDramas.length})
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {starredDramas.map((drama) => (
              <div 
                key={drama.id}
                onClick={() => {
                  onClose();
                  onSelectDrama(drama);
                }}
                className="cursor-pointer"
              >
                <DramaCard drama={drama} variant="standard" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
