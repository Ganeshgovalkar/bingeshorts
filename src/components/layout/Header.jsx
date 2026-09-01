import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header({ 
  onOpenSearch, 
  onOpenNotifications, 
  onToggleFeed, 
  isFeedActive = false 
}) {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 pointer-events-none">
      <div className="flex items-center justify-between w-full h-14 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full px-5 shadow-beautiful-lg pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#f04a23] flex items-center justify-center shadow-md">
            <span className="font-display font-black text-white text-xs">BS</span>
          </div>
          <span className="font-display font-bold text-sm text-white tracking-tight hidden sm:inline">BingeShorts</span>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={onOpenSearch} 
            aria-label="Search stories, actors, or creators"
            className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
          
          <button 
            onClick={onOpenNotifications} 
            aria-label="View notifications"
            className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#f04a23] ring-2 ring-black" />
          </button>
        </div>
      </div>
    </header>
  );
}
