import React, { useState } from 'react';
import { 
  ArrowLeft, User, Zap, Bell, PlayCircle, Shield, HelpCircle, 
  Info, LogOut, Trash2, ChevronRight, Check, X, Camera, Lock, Mail, AlertTriangle, Send, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function SettingsView({ 
  user, 
  userPreferences, 
  onUpdatePreferences, 
  onUpdateUser, 
  onOpenCheckout, 
  onOpenAuth, 
  onLogout, 
  onDeleteAccount, 
  onBack, 
  onShowToast 
}) {
  const [subView, setSubView] = useState('main'); // 'main' | 'profile' | 'account' | 'notifications' | 'playback' | 'privacy' | 'help' | 'about' | 'delete'
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const isGuest = user?.isGuest ?? true;

  // Profile Form State
  const [displayName, setDisplayName] = useState(user?.name || 'Alex Morgan');
  const [username, setUsername] = useState('@alexafterdark');
  const [bio, setBio] = useState('Probably watching one more episode.');
  const [profileSaving, setProfileSaving] = useState(false);

  // Account Form State
  const [emailVal, setEmailVal] = useState(user?.email || 'alex@example.com');
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passSaving, setPassSaving] = useState(false);

  // Delete Account State
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteInputText, setDeleteInputText] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Support Form State
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [supportTopic, setSupportTopic] = useState('Account');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  const handleTogglePref = (category, key) => {
    onUpdatePreferences && onUpdatePreferences({
      ...userPreferences,
      [category]: {
        ...userPreferences[category],
        [key]: !userPreferences[category][key]
      }
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setTimeout(() => {
      setProfileSaving(false);
      onUpdateUser && onUpdateUser({ name: displayName });
      onShowToast && onShowToast('✨ Profile updated');
      setSubView('main');
    }, 800);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setPassSaving(true);
    setTimeout(() => {
      setPassSaving(false);
      setShowChangePassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onShowToast && onShowToast('🔒 Password updated');
    }, 800);
  };

  const handleSendSupport = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setSupportSent(true);
    setTimeout(() => {
      setSupportSent(false);
      setSupportMessage('');
      onShowToast && onShowToast('📩 Message sent! We\'ll get back to you soon.');
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    if (deleteInputText.toUpperCase() !== 'DELETE') return;
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      onDeleteAccount && onDeleteAccount();
    }, 1000);
  };

  const checkGuestAccess = (actionTarget) => {
    if (isGuest) {
      onOpenAuth && onOpenAuth('Make BingeShorts yours. Create an account to save your preferences!');
      return false;
    }
    return true;
  };

  // Render Sub-Views
  const renderContent = () => {
    switch (subView) {
      case 'profile':
        return (
          <form onSubmit={handleSaveProfile} className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setSubView('main')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-white">Edit Profile</h2>
            </div>

            {/* Profile Avatar Simulator */}
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#f04a23] to-amber-500 flex items-center justify-center text-3xl font-black text-white shadow-xl">
                {displayName.slice(0, 2).toUpperCase()}
                <button type="button" className="absolute bottom-0 right-0 p-2 rounded-full bg-black/80 border border-white/20 text-white shadow-md">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-white/50">Tap photo to change avatar</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/70 block mb-1">Display Name</label>
                <input 
                  type="text" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                  className="w-full bg-[#181820] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#f04a23]" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/70 block mb-1">Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="w-full bg-[#181820] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#f04a23]" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/70 block mb-1">Bio</label>
                <textarea 
                  rows={3} 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  className="w-full bg-[#181820] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-[#f04a23] resize-none" 
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={profileSaving}
              className="w-full py-3.5 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs shadow-lg cursor-pointer"
            >
              {profileSaving ? 'Saving changes...' : 'Save Changes'}
            </button>
          </form>
        );

      case 'account':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setSubView('main')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-white">Account Settings</h2>
            </div>

            <div className="bg-[#111116] rounded-2xl p-5 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-white/40 uppercase">Email Address</span>
                  <p className="text-sm font-bold text-white mt-0.5">{emailVal}</p>
                </div>
                <button onClick={() => setShowChangeEmail(!showChangeEmail)} className="text-xs font-bold text-[#f04a23]">
                  Change
                </button>
              </div>

              {showChangeEmail && (
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter new email" 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)} 
                    className="w-full bg-[#181820] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#f04a23]" 
                  />
                  <button 
                    onClick={() => {
                      if (newEmail) {
                        setEmailVal(newEmail);
                        setShowChangeEmail(false);
                        setNewEmail('');
                        onShowToast && onShowToast('Email address updated');
                      }
                    }}
                    className="py-2 px-4 rounded-xl bg-[#f04a23] text-xs font-bold text-white"
                  >
                    Confirm New Email
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#111116] rounded-2xl p-5 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-white/40 uppercase">Password</span>
                  <p className="text-sm font-bold text-white mt-0.5">••••••••••••</p>
                </div>
                <button onClick={() => setShowChangePassword(!showChangePassword)} className="text-xs font-bold text-[#f04a23]">
                  Change Password
                </button>
              </div>

              {showChangePassword && (
                <form onSubmit={handleUpdatePassword} className="pt-3 border-t border-white/10 space-y-3">
                  <div>
                    <label className="text-[10px] text-white/60 block mb-1">Current Password</label>
                    <input 
                      type="password" 
                      value={currentPassword} 
                      onChange={(e) => setCurrentPassword(e.target.value)} 
                      className="w-full bg-[#181820] border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#f04a23]" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/60 block mb-1">New Password</label>
                    <input 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      className="w-full bg-[#181820] border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#f04a23]" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/60 block mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className="w-full bg-[#181820] border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#f04a23]" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={passSaving}
                    className="py-2 px-4 rounded-xl bg-[#f04a23] text-xs font-bold text-white"
                  >
                    {passSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              )}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setSubView('main')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
                <p className="text-xs text-white/50">Choose what brings you back to BingeShorts.</p>
              </div>
            </div>

            <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
              {[
                { key: 'continueWatching', label: 'Continue Watching', desc: 'Get reminded when a story is waiting.' },
                { key: 'newEpisodes', label: 'New Episodes', desc: 'Know when the next chapter drops.' },
                { key: 'newStories', label: 'New Stories', desc: 'Be first to discover new originals.' },
                { key: 'followedPeople', label: 'Actors & Creators', desc: 'Updates from people you follow.' },
                { key: 'trending', label: 'Trending Stories', desc: 'See what everyone\'s obsessed with.' }
              ].map(item => {
                const isChecked = userPreferences.notifications[item.key];
                return (
                  <div key={item.key} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-white">{item.label}</h4>
                      <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTogglePref('notifications', item.key)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-none ${
                        isChecked ? 'bg-[#f04a23]' : 'bg-white/20'
                      }`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        isChecked ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'playback':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setSubView('main')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-white">Playback Preferences</h2>
                <p className="text-xs text-white/50">Control your viewing experience.</p>
              </div>
            </div>

            <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
              {[
                { key: 'autoplayNextEpisode', label: 'Autoplay Next Episode', desc: 'Automatically continue when an episode ends.' },
                { key: 'autoplayPreviews', label: 'Autoplay Previews', desc: 'Play previews while you browse.' },
                { key: 'dataSaver', label: 'Data Saver', desc: 'Reduce video quality when using mobile data.' },
                { key: 'captions', label: 'Captions by Default', desc: 'Show closed captions whenever available.' }
              ].map(item => {
                const isChecked = userPreferences.playback[item.key];
                return (
                  <div key={item.key} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-white">{item.label}</h4>
                      <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTogglePref('playback', item.key)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-none ${
                        isChecked ? 'bg-[#f04a23]' : 'bg-white/20'
                      }`}
                    >
                      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        isChecked ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setSubView('main')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-white">Privacy & Data</h2>
                <p className="text-xs text-white/50">Manage personalization and activity data.</p>
              </div>
            </div>

            <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-white">Personalized Recommendations</h4>
                  <p className="text-xs text-white/50 mt-0.5">Use your watch activity to recommend stories you'll love.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePref('privacy', 'personalizedRecommendations')}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-none ${
                    userPreferences.privacy.personalizedRecommendations ? 'bg-[#f04a23]' : 'bg-white/20'
                  }`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    userPreferences.privacy.personalizedRecommendations ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-white">Watch Activity Tracking</h4>
                  <p className="text-xs text-white/50 mt-0.5">Keep watch history to power your Watch Track streak.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePref('privacy', 'watchActivityEnabled')}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer flex-none ${
                    userPreferences.privacy.watchActivityEnabled ? 'bg-[#f04a23]' : 'bg-white/20'
                  }`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    userPreferences.privacy.watchActivityEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setSubView('main')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-white">Help & Support</h2>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white/40 uppercase font-mono">Frequently Asked Questions</h3>
              <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                {[
                  { q: 'What is BingeShorts?', a: 'BingeShorts is home to short, addictive vertical dramas designed for your phone.' },
                  { q: 'How long are episodes?', a: 'Most episodes are between 5 and 10 minutes.' },
                  { q: 'Can I watch for free?', a: 'Yes. Selected first episodes are available before unlocking the rest of the story.' },
                  { q: 'Can I cancel anytime?', a: 'Yes. You can manage or cancel your subscription from your account anytime.' }
                ].map((faq, i) => (
                  <div key={i} className="p-4 cursor-pointer" onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                    <div className="flex justify-between items-center font-bold text-sm text-white">
                      <span>{faq.q}</span>
                      {expandedFaq === i ? <ChevronUp className="w-4 h-4 text-[#f04a23]" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                    </div>
                    {expandedFaq === i && (
                      <p className="text-xs text-white/70 mt-2 leading-relaxed animate-fadeIn">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support Form */}
            <form onSubmit={handleSendSupport} className="bg-[#111116] p-5 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-sm font-bold text-white">How can we help?</h3>
              <div>
                <label className="text-[10px] text-white/50 block mb-1">Topic</label>
                <select 
                  value={supportTopic} 
                  onChange={(e) => setSupportTopic(e.target.value)} 
                  className="w-full bg-[#181820] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white"
                >
                  <option>Account</option>
                  <option>Subscription</option>
                  <option>Playback</option>
                  <option>Technical Issue</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-white/50 block mb-1">Message</label>
                <textarea 
                  rows={3} 
                  placeholder="Describe your issue or feedback..." 
                  value={supportMessage} 
                  onChange={(e) => setSupportMessage(e.target.value)} 
                  className="w-full bg-[#181820] border border-white/10 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#f04a23] resize-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={supportSent}
                className="w-full py-3 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setSubView('main')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-white">About BingeShorts</h2>
            </div>

            <div className="bg-[#111116] p-6 rounded-2xl border border-white/5 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f04a23] to-amber-500 flex items-center justify-center font-display font-black text-2xl text-white mx-auto shadow-lg">
                BS
              </div>
              <h3 className="font-display text-xl font-bold text-white">BingeShorts</h3>
              <p className="text-xs font-mono text-[#f04a23]">Version 1.0.0 (Build 2026)</p>
              <p className="text-xs text-white/60 italic font-medium">Short stories. Big feelings.</p>
            </div>

            <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5 text-xs text-white/80">
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5">
                <span>Terms of Service</span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </div>
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5">
                <span>Privacy Policy</span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </div>
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5">
                <span>Community Guidelines</span>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </div>
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-2">
              <button type="button" onClick={() => setSubView('main')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-red-400">Delete Account</h2>
            </div>

            {deleteStep === 1 ? (
              <div className="bg-[#111116] p-6 rounded-2xl border border-red-500/30 text-center space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Delete your account?</h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    This will remove your account and personal data from BingeShorts.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <button 
                    onClick={() => setSubView('main')}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white"
                  >
                    Keep My Account
                  </button>
                  <button 
                    onClick={() => setDeleteStep(2)}
                    className="w-full py-3 rounded-xl bg-red-500/20 text-red-400 font-bold text-xs hover:bg-red-500/30"
                  >
                    Continue to Deletion
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#111116] p-6 rounded-2xl border border-red-500/40 text-center space-y-5">
                <div>
                  <h3 className="font-bold text-xl text-red-400">This can't be undone.</h3>
                  <p className="text-xs text-white/60 mt-1">
                    Your profile, saved stories, watch activity, and account preferences will be permanently removed.
                  </p>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-mono uppercase text-red-400 font-bold block">
                    Type DELETE to continue
                  </label>
                  <input 
                    type="text"
                    value={deleteInputText}
                    onChange={(e) => setDeleteInputText(e.target.value)}
                    placeholder="DELETE"
                    className="w-full bg-[#181820] border border-red-500/40 rounded-xl py-3 px-4 text-xs font-mono text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <button 
                    disabled={deleteInputText.toUpperCase() !== 'DELETE' || deleting}
                    onClick={handleDeleteConfirm}
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-xs cursor-pointer shadow-lg"
                  >
                    {deleting ? 'Deleting account...' : 'Delete Account Permanently'}
                  </button>
                  <button 
                    onClick={() => setSubView('main')}
                    className="w-full py-2 text-xs text-white/50 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'main':
      default:
        return (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-display font-bold">Settings</h1>
              </div>
            </div>

            {/* ACCOUNT SECTION */}
            <section className="space-y-2">
              <h2 className="text-xs font-bold text-white/40 uppercase tracking-wider font-mono px-1">Account</h2>
              <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                <div 
                  onClick={() => checkGuestAccess() && setSubView('profile')} 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-white/70" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Profile</h4>
                      <p className="text-xs text-white/50">Name, username, bio</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </div>

                <div 
                  onClick={() => checkGuestAccess() && setSubView('account')} 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-white/70" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Account & Password</h4>
                      <p className="text-xs text-white/50">Email, security</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </div>

                <div 
                  onClick={onOpenCheckout} 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Subscription</h4>
                      <p className="text-xs text-white/50">{user?.subscriptionStatus === 'active' ? 'Active VIP Plan' : 'View Plans'}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </div>
              </div>
            </section>

            {/* PREFERENCES SECTION */}
            <section className="space-y-2">
              <h2 className="text-xs font-bold text-white/40 uppercase tracking-wider font-mono px-1">Preferences</h2>
              <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                <div 
                  onClick={() => setSubView('notifications')} 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-white/70" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Notifications</h4>
                      <p className="text-xs text-white/50">Continue watching, new stories</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </div>

                <div 
                  onClick={() => setSubView('playback')} 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-white/70" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Playback</h4>
                      <p className="text-xs text-white/50">Autoplay, captions, data saver</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </div>
              </div>
            </section>

            {/* PRIVACY SECTION */}
            <section className="space-y-2">
              <h2 className="text-xs font-bold text-white/40 uppercase tracking-wider font-mono px-1">Privacy</h2>
              <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5">
                <div 
                  onClick={() => setSubView('privacy')} 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-white/70" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Privacy & Data</h4>
                      <p className="text-xs text-white/50">Recommendations, watch tracking</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </div>
              </div>
            </section>

            {/* SUPPORT SECTION */}
            <section className="space-y-2">
              <h2 className="text-xs font-bold text-white/40 uppercase tracking-wider font-mono px-1">Support</h2>
              <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                <div 
                  onClick={() => setSubView('help')} 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-white/70" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Help & Support</h4>
                      <p className="text-xs text-white/50">FAQs and support request</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </div>

                <div 
                  onClick={() => setSubView('about')} 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-white/70" />
                    <div>
                      <h4 className="font-bold text-sm text-white">About BingeShorts</h4>
                      <p className="text-xs text-white/50">Version 1.0.0, terms</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </div>
              </div>
            </section>

            {/* ACCOUNT ACTIONS */}
            {!isGuest && (
              <section className="space-y-2 pt-2">
                <div className="bg-[#111116] rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                  <div 
                    onClick={() => setShowLogoutConfirm(true)} 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 text-white/90 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="w-5 h-5 text-white/60" />
                      <span className="text-sm font-bold">Log Out</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSubView('delete')} 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-red-500/10 text-red-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-5 h-5" />
                      <span className="text-sm font-bold">Delete Account</span>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-[#090909] text-white pt-20 pb-24 min-h-screen select-none">
      <div className="px-5 sm:px-8 max-w-3xl mx-auto">
        {renderContent()}
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-white/10 rounded-3xl p-6 w-full max-w-[360px] text-center space-y-4 shadow-2xl">
            <h3 className="font-display text-xl font-bold text-white">Log out?</h3>
            <p className="text-xs text-white/60">You can always come back for the next episode.</p>
            <div className="space-y-2 pt-2">
              <button 
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout && onLogout();
                }}
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg cursor-pointer"
              >
                Log Out
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-2 text-xs text-white/50 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
