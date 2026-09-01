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
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-40 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full px-3 py-3 flex items-center justify-around shadow-beautiful-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-3 transition-spring cursor-pointer active:scale-90 ${
              isActive ? 'text-[#9D4EDD] font-bold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {isActive && (
              <span className="absolute -top-2 w-6 h-1 rounded-full bg-[#9D4EDD] shadow-[0_0_12px_rgba(157,78,221,0.7)]" />
            )}
            <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
            <span className="text-[10px] mt-1 tracking-tight font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
