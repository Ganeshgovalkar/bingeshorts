import React, { useState } from 'react';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';

import HomeView from './components/views/HomeView';
import DiscoverView from './components/views/DiscoverView';
import SearchView from './components/views/SearchView';
import MyListView from './components/views/MyListView';
import ProfileView from './components/views/ProfileView';
import BingeFeedView from './components/views/BingeFeedView';
import DramaCommentsView from './components/views/DramaCommentsView';
import ActorProfileView from './components/views/ActorProfileView';
import CreatorProfileView from './components/views/CreatorProfileView';
import NotificationsView from './components/views/NotificationsView';
import WatchTrackView from './components/views/WatchTrackView';
import SettingsView from './components/views/SettingsView';

import PlayerOverlayTemplate from './components/templates/PlayerOverlayTemplate';
import DetailSheetTemplate from './components/templates/DetailSheetTemplate';
import SubscriptionCheckoutModal from './components/modals/SubscriptionCheckoutModal';
import AuthModal from './components/modals/AuthModal';
import CastProfileModal from './components/modals/CastProfileModal';
import DailyRewardModal from './components/modals/DailyRewardModal';

import { MICRODRAMAS } from './data/microdramas';
import { ACTORS, CREATORS } from './data/people';
import { INITIAL_NOTIFICATIONS } from './data/notifications';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'discover', 'search', 'mylist', 'profile', 'feed'
  const [selectedDrama, setSelectedDrama] = useState(null);
  const [playingDrama, setPlayingDrama] = useState(null);
  const [playingEpId, setPlayingEpId] = useState(1);
  const [activeCommunityDrama, setActiveCommunityDrama] = useState(null);

  // Sub-views for Phase 6, 7 & 8
  const [selectedActor, setSelectedActor] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [showNotificationsView, setShowNotificationsView] = useState(false);
  const [showWatchTrackView, setShowWatchTrackView] = useState(false);
  const [showSettingsView, setShowSettingsView] = useState(false);

  // User Preferences State
  const [userPreferences, setUserPreferences] = useState({
    notifications: {
      continueWatching: true,
      newEpisodes: true,
      newStories: true,
      followedPeople: true,
      trending: true
    },
    playback: {
      autoplayNextEpisode: true,
      autoplayPreviews: false,
      dataSaver: false,
      captions: false
    },
    privacy: {
      personalizedRecommendations: true,
      watchActivityEnabled: true,
      profileVisibility: 'private'
    }
  });

  // Notifications State
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Follow State
  const [followedActors, setFollowedActors] = useState(['lena-park']);
  const [followedCreators, setFollowedCreators] = useState(['jordan-lee']);

  const [bookmarks, setBookmarks] = useState(['wrong-floor', 'after-9-pm', '72-hours']);
  const [downloadedEpisodes, setDownloadedEpisodes] = useState(['wrong-floor-ep-1', 'after-9-pm-ep-1']);
  const [coinBalance, setCoinBalance] = useState(150);
  
  // User Authentication & Subscription Architecture
  const [user, setUser] = useState({
    isGuest: true,
    isAuthenticated: false,
    name: 'Guest Viewer',
    email: '',
    subscriptionStatus: 'none', // 'none' | 'active' | 'cancelled'
    subscriptionPlan: null
  });
  const [isVipUser, setIsVipUser] = useState(false);

  // Conversion & Modal States
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [conversionContext, setConversionContext] = useState(null);

  const [showDailyRewardModal, setShowDailyRewardModal] = useState(false);
  const [activeCastName, setActiveCastName] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRequireAuth = (promptMsg = 'Join the conversation. Create an account!') => {
    showToast(`🔒 ${promptMsg}`);
    setShowAuthModal(true);
  };

  const handleToggleFollowActor = (id) => {
    setFollowedActors(prev => {
      const isFollowing = prev.includes(id);
      const target = ACTORS.find(a => a.id === id);
      showToast(isFollowing ? `Unfollowed ${target?.name || 'Actor'}` : `✨ Following ${target?.name || 'Actor'}`);
      return isFollowing ? prev.filter(item => item !== id) : [...prev, id];
    });
  };

  const handleToggleFollowCreator = (id) => {
    setFollowedCreators(prev => {
      const isFollowing = prev.includes(id);
      const target = CREATORS.find(c => c.id === id);
      showToast(isFollowing ? `Unfollowed ${target?.name || 'Creator'}` : `✨ Following ${target?.name || 'Creator'}`);
      return isFollowing ? prev.filter(item => item !== id) : [...prev, id];
    });
  };

  const handleToggleBookmark = (id) => {
    setBookmarks(prev => {
      const isSaved = prev.includes(id);
      showToast(isSaved ? 'Removed from My List' : 'Saved to My List ✨');
      return isSaved ? prev.filter(item => item !== id) : [...prev, id];
    });
  };

  const handleToggleDownloadEpisode = (dramaId, epId) => {
    const key = `${dramaId}-ep-${epId}`;
    setDownloadedEpisodes(prev => {
      const isDownloaded = prev.includes(key);
      showToast(isDownloaded ? 'Removed from offline downloads' : '📥 Episode downloaded for offline playback!');
      return isDownloaded ? prev.filter(k => k !== key) : [...prev, key];
    });
  };

  const handlePlayEpisode = (drama, epId = 1) => {
    const targetEp = drama.episodes.find(e => e.id === epId);
    if (!isVipUser && targetEp?.locked) {
      const ctx = { dramaTitle: drama.title, episodeId: epId, drama };
      setConversionContext(ctx);

      if (!user.isAuthenticated) {
        setShowAuthModal(true);
      } else {
        setShowCheckoutModal(true);
      }
      return;
    }

    setPlayingDrama(drama);
    setPlayingEpId(epId);
  };

  const handleOpenCastByName = (actorName) => {
    const foundActor = ACTORS.find(a => a.name.toLowerCase() === actorName.toLowerCase()) || {
      id: actorName.toLowerCase().replace(/\s+/g, '-'),
      name: actorName,
      portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      location: 'Seoul / London',
      bio: `${actorName} is known for compelling microdrama performances.`,
      currentRole: `Starring in BingeShorts Originals`,
      featuredDramaIds: ['after-9-pm', 'room-404'],
      roles: [{ dramaId: 'after-9-pm', characterName: 'Lead Character', description: 'Central role' }]
    };
    setSelectedDrama(null);
    setSelectedActor(foundActor);
  };

  const handleNotificationClick = (notif) => {
    setShowNotificationsView(false);
    const { action } = notif;
    if (!action) return;

    if (action.dramaId) {
      const targetDrama = MICRODRAMAS.find(d => d.id === action.dramaId);
      if (targetDrama) {
        if (action.type === 'resume' || action.episodeId) {
          handlePlayEpisode(targetDrama, action.episodeId || 1);
        } else {
          setSelectedDrama(targetDrama);
        }
      }
    } else if (action.actorId) {
      const targetActor = ACTORS.find(a => a.id === action.actorId);
      if (targetActor) setSelectedActor(targetActor);
    } else if (action.creatorId) {
      const targetCreator = CREATORS.find(c => c.id === action.creatorId);
      if (targetCreator) setSelectedCreator(targetCreator);
    }
  };

  const handleAuthSuccess = (userObj, mode) => {
    setUser(prev => ({
      ...prev,
      ...userObj,
      isGuest: false,
      isAuthenticated: true
    }));
    setShowAuthModal(false);
    showToast(`🎉 ${mode === 'signup' ? 'Account created!' : 'Welcome back,'} ${userObj.name}`);

    if (conversionContext) {
      setShowCheckoutModal(true);
    }
  };

  const handleVipUnlockSuccess = (plan = 'annual') => {
    setIsVipUser(true);
    setUser(prev => ({
      ...prev,
      subscriptionStatus: 'active',
      subscriptionPlan: plan
    }));
    setShowCheckoutModal(false);
    showToast(`🎉 VIP ${plan === 'annual' ? 'Annual' : 'Monthly'} Pass Activated!`);

    if (conversionContext && conversionContext.drama) {
      setPlayingDrama(conversionContext.drama);
      setPlayingEpId(conversionContext.episodeId || 2);
    }
  };

  const handleLogout = () => {
    setUser({
      isGuest: true,
      isAuthenticated: false,
      name: 'Guest Viewer',
      email: '',
      subscriptionStatus: 'none',
      subscriptionPlan: null
    });
    setIsVipUser(false);
    setShowSettingsView(false);
    showToast('Logged out of BingeShorts.');
  };

  const handleDeleteAccount = () => {
    setUser({
      isGuest: true,
      isAuthenticated: false,
      name: 'Guest Viewer',
      email: '',
      subscriptionStatus: 'none',
      subscriptionPlan: null
    });
    setIsVipUser(false);
    setShowSettingsView(false);
    showToast('Account deleted. Returned to Guest Mode.');
  };

  const handleClaimReward = (amount) => {
    setCoinBalance(prev => prev + amount);
    showToast(`🎁 Claimed +${amount} Binge Coins! New Balance: ${coinBalance + amount}`);
  };

  const resetSubViews = () => {
    setActiveCommunityDrama(null);
    setSelectedActor(null);
    setSelectedCreator(null);
    setShowNotificationsView(false);
    setShowWatchTrackView(false);
    setShowSettingsView(false);
  };

  const renderActiveTabContent = () => {
    if (showSettingsView) {
      return (
        <SettingsView 
          user={user}
          userPreferences={userPreferences}
          onUpdatePreferences={setUserPreferences}
          onUpdateUser={(updated) => setUser(prev => ({ ...prev, ...updated }))}
          onOpenCheckout={() => {
            setConversionContext(null);
            setShowCheckoutModal(true);
          }}
          onOpenAuth={() => {
            setConversionContext(null);
            setShowAuthModal(true);
          }}
          onLogout={handleLogout}
          onDeleteAccount={handleDeleteAccount}
          onBack={() => setShowSettingsView(false)}
          onShowToast={showToast}
        />
      );
    }

    if (showNotificationsView) {
      return (
        <NotificationsView 
          notifications={notifications}
          onBack={() => setShowNotificationsView(false)}
          onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
          onNotificationClick={handleNotificationClick}
          onNavigateDiscover={() => {
            resetSubViews();
            setActiveTab('discover');
          }}
        />
      );
    }

    if (showWatchTrackView) {
      return (
        <WatchTrackView 
          onBack={() => setShowWatchTrackView(false)}
          onPlayEpisode={handlePlayEpisode}
          onSelectDrama={setSelectedDrama}
        />
      );
    }

    if (selectedActor) {
      return (
        <ActorProfileView 
          actor={selectedActor}
          onBack={() => setSelectedActor(null)}
          onSelectDrama={(d) => {
            setSelectedActor(null);
            setSelectedDrama(d);
          }}
          isFollowing={followedActors.includes(selectedActor.id)}
          onToggleFollow={handleToggleFollowActor}
          isGuest={user.isGuest}
          onRequireAuth={handleRequireAuth}
        />
      );
    }

    if (selectedCreator) {
      return (
        <CreatorProfileView 
          creator={selectedCreator}
          onBack={() => setSelectedCreator(null)}
          onSelectDrama={(d) => {
            setSelectedCreator(null);
            setSelectedDrama(d);
          }}
          isFollowing={followedCreators.includes(selectedCreator.id)}
          onToggleFollow={handleToggleFollowCreator}
          isGuest={user.isGuest}
          onRequireAuth={handleRequireAuth}
        />
      );
    }

    if (activeCommunityDrama) {
      return (
        <DramaCommentsView 
          drama={activeCommunityDrama}
          onBack={() => setActiveCommunityDrama(null)}
          isGuest={user.isGuest}
          onRequireAuth={handleRequireAuth}
          onShowToast={showToast}
        />
      );
    }

    if (activeTab === 'feed') {
      return (
        <BingeFeedView 
          microdramas={MICRODRAMAS}
          onSelectDrama={setSelectedDrama}
          onPlayEpisode={handlePlayEpisode}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
        />
      );
    }

    switch (activeTab) {
      case 'discover':
        return <DiscoverView microdramas={MICRODRAMAS} onSelectDrama={setSelectedDrama} />;
      case 'search':
        return (
          <SearchView 
            microdramas={MICRODRAMAS} 
            onSelectDrama={setSelectedDrama} 
            onSelectActor={(actor) => {
              resetSubViews();
              setSelectedActor(actor);
            }}
            onSelectCreator={(creator) => {
              resetSubViews();
              setSelectedCreator(creator);
            }}
          />
        );
      case 'mylist':
        return (
          <MyListView 
            microdramas={MICRODRAMAS} 
            bookmarks={bookmarks} 
            downloadedEpisodes={downloadedEpisodes}
            onSelectDrama={setSelectedDrama} 
            onToggleBookmark={handleToggleBookmark} 
            onPlayEpisode={handlePlayEpisode}
            onNavigateDiscover={() => {
              resetSubViews();
              setActiveTab('discover');
            }}
          />
        );
      case 'profile':
        return (
          <ProfileView 
            user={user}
            followedActors={followedActors.map(id => ACTORS.find(a => a.id === id)).filter(Boolean)}
            followedCreators={followedCreators.map(id => CREATORS.find(c => c.id === id)).filter(Boolean)}
            onSelectActor={(actor) => {
              resetSubViews();
              setSelectedActor(actor);
            }}
            onSelectCreator={(creator) => {
              resetSubViews();
              setSelectedCreator(creator);
            }}
            onOpenWatchTrack={() => {
              resetSubViews();
              setShowWatchTrackView(true);
            }}
            onOpenSettings={() => {
              resetSubViews();
              setShowSettingsView(true);
            }}
            onOpenCheckout={() => {
              setConversionContext(null);
              setShowCheckoutModal(true);
            }}
            onOpenAuth={() => {
              setConversionContext(null);
              setShowAuthModal(true);
            }}
            onLogout={handleLogout}
            onOpenDailyReward={() => setShowDailyRewardModal(true)} 
            coinBalance={coinBalance} 
          />
        );
      case 'home':
      default:
        return (
          <HomeView 
            microdramas={MICRODRAMAS}
            onSelectDrama={setSelectedDrama}
            onPlayEpisode={handlePlayEpisode}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-[#f04a23] selection:text-white">
      {/* Expansive App Shell */}
      <div className="w-full min-h-screen bg-[#090909] relative flex flex-col">
        
        {/* Adaptive App Header */}
        <Header 
          onOpenSearch={() => { resetSubViews(); setActiveTab('search'); }}
          onOpenNotifications={() => { resetSubViews(); setShowNotificationsView(true); }}
          onToggleFeed={() => { resetSubViews(); setActiveTab(activeTab === 'feed' ? 'home' : 'feed'); }}
          isFeedActive={activeTab === 'feed'}
        />

        {/* Main View Content */}
        <main className="flex-1">
          {renderActiveTabContent()}
        </main>

        {/* Persistent Bottom Mobile Navigation */}
        <BottomNav 
          activeTab={activeTab === 'feed' ? 'home' : activeTab}
          onSelectTab={(tab) => {
            resetSubViews();
            setActiveTab(tab);
          }}
        />

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-[#181820] text-white text-xs font-semibold border border-purple-500/40 shadow-beautiful-lg flex items-center gap-2 animate-bounce whitespace-nowrap">
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Template D: Content Detail Sheet Drawer */}
      {selectedDrama && (
        <DetailSheetTemplate 
          drama={selectedDrama}
          onClose={() => setSelectedDrama(null)}
          onSelectDrama={setSelectedDrama}
          onOpenCommunity={(d) => {
            setSelectedDrama(null);
            setActiveCommunityDrama(d);
          }}
          onPlayEpisode={(drama, epId) => {
            setSelectedDrama(null);
            handlePlayEpisode(drama, epId);
          }}
          isBookmarked={bookmarks.includes(selectedDrama.id)}
          onToggleBookmark={handleToggleBookmark}
          onOpenCastProfile={(name) => handleOpenCastByName(name)}
          isVipUser={isVipUser}
          downloadedEpisodes={downloadedEpisodes}
          onToggleDownloadEpisode={handleToggleDownloadEpisode}
        />
      )}

      {/* Template C: Immersive Player Overlay Engine */}
      {playingDrama && (
        <PlayerOverlayTemplate 
          drama={playingDrama}
          initialEpisodeId={playingEpId}
          onClose={() => setPlayingDrama(null)}
          isBookmarked={bookmarks.includes(playingDrama.id)}
          onToggleBookmark={handleToggleBookmark}
          isGuest={user.isGuest}
          onRequireAuth={handleRequireAuth}
          onShowToast={showToast}
          userPreferences={userPreferences}
          onOpenCheckout={() => {
            setConversionContext({
              dramaTitle: playingDrama.title,
              episodeId: playingEpId,
              drama: playingDrama
            });
            if (!user.isAuthenticated) {
              setShowAuthModal(true);
            } else {
              setShowCheckoutModal(true);
            }
          }}
          isVipUser={isVipUser}
          onUpdateProgress={(dramaId, epId, ratio, seconds) => {
            const targetDrama = MICRODRAMAS.find(d => d.id === dramaId);
            if (targetDrama) {
              const ep = targetDrama.episodes.find(e => e.id === epId);
              if (ep) {
                ep.progress = Math.round(ratio * 100);
              }
            }
          }}
          onSelectStoryBranch={(choice) => {
            showToast(`🔀 Story branch chosen: ${choice.title.split(':')[0]}`);
          }}
        />
      )}

      {/* Auth Gate / Signup / Login Modal */}
      {showAuthModal && (
        <AuthModal 
          context={conversionContext}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* VIP Subscription Checkout Modal */}
      {showCheckoutModal && (
        <SubscriptionCheckoutModal 
          context={conversionContext ? {
            ...conversionContext,
            onContinueWatching: () => {
              if (conversionContext.drama) {
                handlePlayEpisode(conversionContext.drama, conversionContext.episodeId || 2);
              }
            }
          } : null}
          onClose={() => setShowCheckoutModal(false)}
          onUnlockSuccess={handleVipUnlockSuccess}
        />
      )}

      {/* Daily Streak & Reward Modal */}
      {showDailyRewardModal && (
        <DailyRewardModal 
          onClose={() => setShowDailyRewardModal(false)}
          onClaimReward={handleClaimReward}
          coinBalance={coinBalance}
        />
      )}
    </div>
  );
}
