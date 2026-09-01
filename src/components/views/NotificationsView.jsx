import React, { useState } from 'react';
import { ArrowLeft, CheckCheck, Bell, Sparkles, Film, User, Compass } from 'lucide-react';
import { MICRODRAMAS } from '../../data/microdramas';
import { ACTORS, CREATORS } from '../../data/people';

export default function NotificationsView({ 
  notifications = [], 
  onBack, 
  onMarkAllAsRead, 
  onNotificationClick, 
  onNavigateDiscover 
}) {
  const [items, setItems] = useState(notifications);

  const handleItemClick = (notif) => {
    setItems(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
    onNotificationClick && onNotificationClick(notif);
  };

  const handleMarkAll = () => {
    setItems(prev => prev.map(n => ({ ...n, isRead: true })));
    onMarkAllAsRead && onMarkAllAsRead();
  };

  const unreadCount = items.filter(n => !n.isRead).length;

  const todayItems = items.filter(n => n.group === 'Today');
  const earlierItems = items.filter(n => n.group === 'Earlier');
  const olderItems = items.filter(n => n.group === 'Older');

  const renderGroup = (title, list) => {
    if (list.length === 0) return null;
    return (
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-white/40 uppercase tracking-wider font-mono px-1">{title}</h2>
        <div className="space-y-2">
          {list.map(notif => (
            <div
              key={notif.id}
              onClick={() => handleItemClick(notif)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                !notif.isRead 
                  ? 'bg-[#181820] border-[#f04a23]/30 shadow-md' 
                  : 'bg-[#111116] border-white/5 opacity-80 hover:opacity-100'
              }`}
            >
              {notif.image ? (
                <img src={notif.image} alt="" className="w-12 h-16 rounded-lg object-cover flex-none border border-white/10" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#f04a23]/20 text-[#f04a23] flex items-center justify-center flex-none">
                  <Bell className="w-5 h-5" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-sm text-white truncate">{notif.title}</h3>
                  <span className="text-[10px] font-mono text-white/40 flex-none">{notif.createdAt}</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{notif.message}</p>
              </div>

              {!notif.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#f04a23] flex-none self-center shadow-[0_0_8px_rgba(240,74,35,0.8)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#090909] text-white pt-20 pb-24 min-h-screen select-none">
      <div className="px-5 sm:px-8 max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-display font-bold">Notifications</h1>
              <p className="text-xs text-white/50">{unreadCount > 0 ? `${unreadCount} unread updates` : 'All caught up'}</p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAll}
              className="text-xs font-bold text-[#f04a23] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" /> Mark all read
            </button>
          )}
        </header>

        {items.length === 0 ? (
          <div className="p-12 text-center space-y-4 rounded-3xl bg-[#111116] border border-white/5">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 mx-auto">
              <Bell className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Quiet for now.</h3>
              <p className="text-xs text-white/50 mt-1">We'll let you know when the next obsession arrives.</p>
            </div>
            <button
              onClick={onNavigateDiscover}
              className="py-3 px-6 rounded-xl bg-[#f04a23] text-white font-bold text-xs flex items-center gap-2 mx-auto"
            >
              <Compass className="w-4 h-4" /> Discover stories
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {renderGroup('Today', todayItems)}
            {renderGroup('Earlier', earlierItems)}
            {renderGroup('Older', olderItems)}
          </div>
        )}

      </div>
    </div>
  );
}
