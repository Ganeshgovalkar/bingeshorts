import React, { useState } from 'react';
import { Settings, Bell, Download, PlayCircle, HelpCircle, ChevronRight, Zap, LogOut, User } from 'lucide-react';

export default function ProfileView({ 
  user, 
  followedActors = [],
  followedCreators = [],
  onSelectActor,
  onSelectCreator,
  onOpenWatchTrack,
  onOpenSettings,
  onOpenCheckout, 
  onOpenAuth, 
  onLogout 
}) {
  const [followingTab, setFollowingTab] = useState('actors'); // 'actors' | 'creators'
  const isGuest = user?.isGuest ?? true;
  const isVip = user?.subscriptionStatus === 'active';
  const planName = user?.subscriptionPlan === 'annual' ? 'Annual Pass' : 'Monthly Pass';

  const totalFollowed = followedActors.length + followedCreators.length;

  return (
    <div className="w-full bg-[#090909] text-white pt-24 pb-24 min-h-screen">
      <div className="px-5 sm:px-8 max-w-3xl mx-auto space-y-10">
        
        {/* Header / Identity Banner */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#f04a23] to-amber-500 flex items-center justify-center text-2xl font-black shadow-beautiful-md">
              {isGuest ? 'G' : (user?.name?.slice(0, 2)?.toUpperCase() || 'AM')}
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">
                {isGuest ? 'Guest Viewer' : (user?.name || 'Alex Morgan')}
              </h1>
              <p className="text-[#f04a23] text-sm font-medium mt-0.5">
                {isGuest ? 'Guest Mode' : `@${user?.email?.split('@')[0] || 'alex'}`}
              </p>
              <p className="text-white/50 text-xs mt-1">
                {isGuest ? 'Create an account to save your stories across devices.' : 'Currently obsessed with psychological thrillers.'}
              </p>
            </div>
          </div>

          {isGuest && (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Log In
            </button>
          )}
        </header>

        {/* SUBSCRIPTION MANAGEMENT SECTION */}
        <section>
          {isVip ? (
            <div className="bg-gradient-to-r from-[#f04a23]/20 via-[#111116] to-[#111116] rounded-2xl p-6 border border-[#f04a23]/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#f04a23] uppercase tracking-wider block">
                    Your BingeShorts Plan
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{planName} (Active)</h3>
                  <p className="text-xs text-white/50 mt-1">Renews on March 12, 2027 • Unlimited Access</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#f04a23] text-white font-mono text-[10px] font-bold">
                  VIP ACTIVE
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10 text-xs">
                <button onClick={onOpenCheckout} className="text-white/80 hover:text-white font-medium">
                  Manage Subscription
                </button>
                <span className="text-white/20">•</span>
                <button className="text-white/50 hover:text-white/80">
                  Restore Purchase
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#181820] to-[#111116] rounded-2xl p-6 border border-white/10 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Ready for another story?</h3>
                <p className="text-xs text-white/60 mt-1">
                  Unlock every episode and keep watching without interruption.
                </p>
              </div>
              <button
                onClick={onOpenCheckout}
                className="py-3 px-6 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-xs font-bold text-white transition-colors cursor-pointer"
              >
                View Plans & Unlock All
              </button>
            </div>
          )}
        </section>

        {/* FOLLOWING SECTION */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Following</h2>
              <p className="text-xs text-white/50">Actors and Creators you love.</p>
            </div>
            <div className="flex bg-[#111116] p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setFollowingTab('actors')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  followingTab === 'actors' ? 'bg-[#f04a23] text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                Actors ({followedActors.length})
              </button>
              <button
                onClick={() => setFollowingTab('creators')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  followingTab === 'creators' ? 'bg-[#f04a23] text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                Creators ({followedCreators.length})
              </button>
            </div>
          </div>

          {followingTab === 'actors' ? (
            followedActors.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {followedActors.map(actor => (
                  <div
                    key={actor.id}
                    onClick={() => onSelectActor && onSelectActor(actor)}
                    className="p-3 rounded-xl bg-[#111116] border border-white/5 flex items-center gap-3 cursor-pointer hover:border-[#f04a23]/40 transition-all"
                  >
                    <img src={actor.portrait} alt={actor.name} className="w-10 h-10 rounded-full object-cover border border-white/10 flex-none" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-white truncate">{actor.name}</h4>
                      <p className="text-[10px] text-white/50 truncate">{actor.currentRole || "Actor"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#111116] border border-white/5 text-center space-y-2">
                <p className="text-sm font-bold text-white">Your favorites belong here.</p>
                <p className="text-xs text-white/50">Follow actors and creators you want to keep up with.</p>
              </div>
            )
          ) : (
            followedCreators.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {followedCreators.map(creator => (
                  <div
                    key={creator.id}
                    onClick={() => onSelectCreator && onSelectCreator(creator)}
                    className="p-3 rounded-xl bg-[#111116] border border-white/5 flex items-center gap-3 cursor-pointer hover:border-[#f04a23]/40 transition-all"
                  >
                    <img src={creator.portrait} alt={creator.name} className="w-10 h-10 rounded-full object-cover border border-white/10 flex-none" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-white truncate">{creator.name}</h4>
                      <p className="text-[10px] text-white/50 truncate">{(creator.roles || []).join(' • ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#111116] border border-white/5 text-center space-y-2">
                <p className="text-sm font-bold text-white">Your favorites belong here.</p>
                <p className="text-xs text-white/50">Follow actors and creators you want to keep up with.</p>
              </div>
            )
          )}
        </section>

        {/* WATCH TRACK SECTION */}
        <section className="cursor-pointer group" onClick={onOpenWatchTrack}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold group-hover:text-[#f04a23] transition-colors flex items-center gap-2">
                <span>Your Watch Track</span>
                <span className="text-xs text-[#f04a23] font-mono">View full →</span>
              </h2>
              <p className="text-xs text-white/50">Your week in stories.</p>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="bg-[#181820] p-4 rounded-xl flex items-center justify-between border border-white/5">
              <span className="text-sm font-medium">Episodes watched today</span>
              <span className="text-[#f04a23] font-bold">3</span>
            </div>
            <div className="bg-[#181820] p-4 rounded-xl flex items-center justify-between border border-white/5">
              <span className="text-sm font-medium">Minutes watched this week</span>
              <span className="text-[#f04a23] font-bold">42</span>
            </div>
            <div className="bg-[#181820] p-4 rounded-xl flex items-center justify-between border border-white/5">
              <span className="text-sm font-medium">Stories completed this month</span>
              <span className="text-[#f04a23] font-bold">4</span>
            </div>
          </div>
        </section>

        {/* RECENTLY COMPLETED */}
        <section>
          <h2 className="text-lg font-bold mb-4">Recently Completed</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {["Coffee With My Ex", "Almost Married", "Room 404"].map(title => (
              <div key={title} className="flex-none bg-[#111116] border border-white/10 rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap">
                {title}
              </div>
            ))}
          </div>
        </section>

        {/* ACCOUNT SETTINGS MENU */}
        <section>
          <h2 className="text-lg font-bold mb-4">Account</h2>
          <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5">
            {[
              { icon: Zap, label: "Subscription", action: onOpenCheckout, color: "text-amber-400" },
              { icon: Settings, label: "Settings", action: onOpenSettings },
              { icon: Bell, label: "Notifications", action: onOpenSettings },
              { icon: PlayCircle, label: "Playback", action: onOpenSettings },
              { icon: Download, label: "Downloads", action: onOpenSettings },
              { icon: HelpCircle, label: "Help & Support", action: onOpenSettings }
            ].map((item, i) => (
              <div 
                key={item.label} 
                onClick={item.action}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors ${i !== 0 ? 'border-t border-white/5' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${item.color || 'text-white/60'}`} />
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30" />
              </div>
            ))}

            {!isGuest && (
              <div 
                onClick={onLogout}
                className="flex items-center justify-between p-4 border-t border-white/5 cursor-pointer hover:bg-red-500/10 text-red-400 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Log Out</span>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
