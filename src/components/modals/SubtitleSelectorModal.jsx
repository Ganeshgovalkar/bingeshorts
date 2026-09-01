import React from 'react';
import { X, Check, Globe, Volume2 } from 'lucide-react';

export default function SubtitleSelectorModal({ 
  currentSubtitle = 'en', 
  onSelectSubtitle, 
  onClose 
}) {
  const subtitleOptions = [
    { id: 'en', label: 'English (SDH)', sample: 'Elena: "Why did the elevator stop between floors?"' },
    { id: 'es', label: 'Español (Latinoamérica)', sample: 'Elena: "¿Por qué se detuvo el ascensor entre pisos?"' },
    { id: 'ja', label: '日本語 (Japanese)', sample: 'エレナ: 「なぜエレベーターが途中で止まったの？」' },
    { id: 'ko', label: '한국어 (Korean)', sample: '엘레나: "엘리베이터가 왜 중간에 멈춘 거지?"' },
    { id: 'off', label: 'Subtitles Off', sample: 'No on-screen captions' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center">
      <div className="relative w-full max-w-[480px] bg-[#111116] rounded-t-3xl border-t border-x border-white/10 p-5 space-y-4 shadow-beautiful-lg transition-spring text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white">Audio & Subtitles</h3>
              <p className="text-[10px] text-gray-400 font-mono">High-Fidelity Gen Z Localization</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/6 hover:bg-white/12 text-gray-300 hover:text-white transition-spring cursor-pointer shadow-beautiful-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subtitle Languages */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider block">
            Subtitles & Closed Captions (CC)
          </span>

          <div className="space-y-1.5">
            {subtitleOptions.map((opt) => {
              const isSelected = currentSubtitle === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    onSelectSubtitle && onSelectSubtitle(opt.id);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border transition-spring cursor-pointer flex items-center justify-between shadow-beautiful-sm ${
                    isSelected 
                      ? 'bg-purple-900/30 border-[#9D4EDD]' 
                      : 'bg-white/5 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-white block">{opt.label}</span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5 block italic">{opt.sample}</span>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#9D4EDD] text-white flex items-center justify-center shadow-beautiful-sm">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
