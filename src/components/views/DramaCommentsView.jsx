import React, { useState } from 'react';
import { ArrowLeft, Heart, Send, Flag, AlertTriangle, Eye } from 'lucide-react';

export default function DramaCommentsView({ 
  drama, 
  onBack, 
  isGuest = false, 
  onRequireAuth, 
  onShowToast 
}) {
  const [activeTab, setActiveTab] = useState('popular'); // 'popular' | 'recent'
  const [comments, setComments] = useState([
    { 
      id: 'dc1', 
      user: '@midnightmila', 
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', 
      text: 'This series is an absolute masterpiece. The tension in After 9 PM is UNREAL 😭', 
      time: '2h ago', 
      likes: 2400,
      isSpoiler: false,
      replies: [
        { id: 'dr1', user: '@nighttrainfan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', text: 'Literally finished all available episodes in one sitting!', time: '1h ago', likes: 180 }
      ]
    },
    { 
      id: 'dc2', 
      user: '@jaywrites', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', 
      text: 'The elevator scene in Room 404... I actually had to take a break from breathing.', 
      time: '4h ago', 
      likes: 891,
      isSpoiler: true,
      replies: []
    },
    { 
      id: 'dc3', 
      user: '@sophieoffline', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', 
      text: 'Why am I so emotionally invested in two people who barely talk? Best drama of 2026 hands down.', 
      time: '1d ago', 
      likes: 1800,
      isSpoiler: false,
      replies: []
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isSpoilerInput, setIsSpoilerInput] = useState(false);
  const [likedComments, setLikedComments] = useState(['dc1']);
  const [revealedSpoilers, setRevealedSpoilers] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    if (isGuest) {
      if (onRequireAuth) onRequireAuth('Join the conversation. Create an account to post!');
      return;
    }

    const newComment = {
      id: `dc_${Date.now()}`,
      user: '@you',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      text: inputVal.trim(),
      time: 'Just now',
      likes: 1,
      isSpoiler: isSpoilerInput,
      replies: []
    };

    setComments([newComment, ...comments]);
    setInputVal('');
    setIsSpoilerInput(false);
  };

  const toggleLikeComment = (id) => {
    if (isGuest && onRequireAuth) {
      onRequireAuth('Create an account to like comments!');
      return;
    }

    setLikedComments(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleRevealSpoiler = (id) => {
    setRevealedSpoilers(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-[#090909] text-white pt-20 pb-24 min-h-screen">
      <div className="px-5 sm:px-8 max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold">{drama?.title || "Series"} Community</h1>
            <p className="text-xs text-white/50">Full discussion feed</p>
          </div>
        </header>

        {/* Tab Selector */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('popular')}
            className={`py-3 px-6 text-xs font-bold transition-all relative ${
              activeTab === 'popular' ? 'text-[#f04a23]' : 'text-white/50 hover:text-white'
            }`}
          >
            Popular
            {activeTab === 'popular' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f04a23]" />}
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`py-3 px-6 text-xs font-bold transition-all relative ${
              activeTab === 'recent' ? 'text-[#f04a23]' : 'text-white/50 hover:text-white'
            }`}
          >
            Recent
            {activeTab === 'recent' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f04a23]" />}
          </button>
        </div>

        {/* Comments Feed */}
        <div className="space-y-4">
          {comments.map((c) => {
            const isLiked = likedComments.includes(c.id);
            const isSpoilerHidden = c.isSpoiler && !revealedSpoilers.includes(c.id);

            return (
              <div key={c.id} className="bg-[#111116] p-4 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-start gap-3">
                  <img src={c.avatar} alt={c.user} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{c.user}</span>
                      <span className="text-[10px] font-mono text-white/40">{c.time}</span>
                    </div>

                    {isSpoilerHidden ? (
                      <button 
                        onClick={() => toggleRevealSpoiler(c.id)}
                        className="mt-2 w-full py-2 px-3 rounded-xl bg-white/5 border border-amber-500/30 text-amber-400 text-xs flex items-center justify-between cursor-pointer hover:bg-white/10"
                      >
                        <span className="flex items-center gap-1.5 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" /> Spoiler Content — Tap to reveal
                        </span>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <p className="text-xs text-white/80 mt-1 leading-relaxed">{c.text}</p>
                    )}

                    <div className="flex items-center gap-4 mt-3 text-xs text-white/50">
                      <button 
                        onClick={() => toggleLikeComment(c.id)}
                        className={`flex items-center gap-1 cursor-pointer ${isLiked ? 'text-[#f04a23] font-bold' : 'hover:text-white'}`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#f04a23]' : ''}`} />
                        <span>{c.likes + (isLiked ? 1 : 0)}</span>
                      </button>

                      <button 
                        onClick={() => {
                          if (onShowToast) onShowToast('Thanks. We\'ll review this comment.');
                        }}
                        className="hover:text-white cursor-pointer"
                      >
                        <Flag className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Add Comment Input */}
        <form onSubmit={handleSend} className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl bg-[#111116] p-3 rounded-2xl border border-white/10 shadow-2xl space-y-2">
          <div className="flex items-center justify-between text-[11px] text-white/50 px-1">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
              <input 
                type="checkbox" 
                checked={isSpoilerInput} 
                onChange={(e) => setIsSpoilerInput(e.target.checked)}
                className="rounded accent-[#f04a23]" 
              />
              <span className={isSpoilerInput ? 'text-amber-400 font-bold' : ''}>
                ⚠️ Contains spoiler
              </span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Join the community conversation..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#f04a23]"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] disabled:opacity-30 text-white transition-all cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
