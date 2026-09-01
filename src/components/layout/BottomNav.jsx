import React from 'react';
import { Home, Compass, Search, Bookmark, User } from 'lucide-react';

export default function BottomNav({ activeTab = 'home', onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'mylist', label: 'My List', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-40 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full px-2 py-2 flex items-center justify-around shadow-beautiful-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 transition-all cursor-pointer active:scale-95 ${
              isActive ? 'text-[#f04a23] font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            {isActive && (
              <span className="absolute -top-1.5 w-6 h-1 rounded-full bg-[#f04a23] shadow-[0_0_12px_rgba(240,74,35,0.7)]" />
            )}
            <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
