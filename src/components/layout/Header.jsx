import React from 'react';
import { Search, Bell, Zap } from 'lucide-react';

export default function Header({ 
  onOpenSearch, 
  onOpenNotifications, 
  onToggleFeed, 
  isFeedActive = false 
}) {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 pointer-events-none md:hidden">
      <div className="flex items-center justify-between w-full h-14 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full px-6 shadow-beautiful-lg pointer-events-auto">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#f04a23] flex items-center justify-center">
            <span className="font-display font-black text-white text-xs">BS</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={onOpenSearch} className="text-white/60 hover:text-white transition-colors cursor-pointer">
            <Search className="w-4 h-4" />
          </button>
          <button onClick={onOpenNotifications} className="text-white/60 hover:text-white transition-colors relative cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#f04a23]" />
          </button>
        </div>
      </div>
    </header>
  );
}
