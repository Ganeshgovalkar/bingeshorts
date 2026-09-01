import React from 'react';
import { Film, Zap, UserCheck, Layers, Smartphone, Monitor } from 'lucide-react';

export default function DirectionSwitcher({ 
  currentDirection, 
  onSelectDirection, 
  isFrameView, 
  onToggleFrameView 
}) {
  const directions = [
    { id: '01', name: 'Direction 01', title: 'Cinematic Immersion', icon: Film, accent: '#9D4EDD' },
    { id: '02', name: 'Direction 02', title: 'Addictive Discovery', icon: Zap, accent: '#CCFF00' },
    { id: '03', name: 'Direction 03', title: 'Personal Story Universe', icon: UserCheck, accent: '#FF4757' },
    { id: 'specs', name: 'Design System', title: 'Tokens & Components', icon: Layers, accent: '#00D2FF' }
  ];

  return (
    <div className="w-full bg-[#0E0E14] border-b border-white/10 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#9D4EDD] via-[#FF4757] to-[#CCFF00] p-0.5 shadow-md">
            <div className="w-full h-full rounded-md bg-[#0A0A0E] flex items-center justify-center font-display font-extrabold text-xs text-white">
              BS
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-wide uppercase flex items-center gap-1.5">
              BingeShorts <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] lowercase border border-purple-500/30">prototype</span>
            </h2>
            <p className="text-[11px] text-gray-400">Mobile Microdrama OTT Homepage Exploration</p>
          </div>
        </div>

        {/* Direction Tabs */}
        <div className="flex items-center gap-1.5 bg-[#14141B] p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full no-scrollbar">
          {directions.map((dir) => {
            const Icon = dir.icon;
            const isActive = currentDirection === dir.id;
            return (
              <button
                key={dir.id}
                onClick={() => onSelectDirection(dir.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/20 shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon 
                  className="w-3.5 h-3.5" 
                  style={{ color: isActive ? dir.accent : 'currentColor' }} 
                />
                <span>{dir.name}</span>
                <span className="hidden lg:inline text-[10px] opacity-70">({dir.title})</span>
              </button>
            );
          })}
        </div>

        {/* Device Frame View Toggle */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onToggleFrameView}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isFrameView 
                ? 'bg-[#9D4EDD]/20 text-purple-300 border-purple-500/40' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            {isFrameView ? <Smartphone className="w-3.5 h-3.5 text-purple-400" /> : <Monitor className="w-3.5 h-3.5" />}
            <span>{isFrameView ? 'Mobile Frame' : 'Full Screen'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
