import React, { useState } from 'react';
import { X, Send, Heart, EyeOff, Eye, Flag, CornerDownRight, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function CommentsDrawer({ 
  drama, 
  episodeTitle, 
  onClose,
  isGuest = false,
  onRequireAuth,
  onShowToast
}) {
  const [comments, setComments] = useState([
    { 
      id: 'c1', 
      user: '@midnightmila', 
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', 
      text: 'I KNEW he was going to miss that train 😭 Episode 4 changed EVERYTHING.', 
      time: '2h ago', 
      likes: 2400,
      isSpoiler: false,
      replies: [
        { id: 'r1', user: '@nighttrainfan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', text: 'SAME! I actually yelled at my phone screen 😱', time: '1h ago', likes: 142 }
      ]
    },
    { 
      id: 'c2', 
      user: '@jaywrites', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', 
      text: 'The way they haven\'t actually said what they feel is driving me insane.', 
      time: '3h ago', 
      likes: 891,
      isSpoiler: false,
      replies: []
    },
    { 
      id: 'c3', 
      user: '@sophieoffline', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', 
      text: 'They reveal the real reason Nina entered Room 404 in the final 30 seconds!', 
      time: '5h ago', 
      likes: 1800,
      isSpoiler: true,
      replies: []
    },
    { 
      id: 'c4', 
      user: '@alexafterdark', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', 
      text: 'Not me immediately starting Episode 5 on my lunch break 😂', 
      time: '6h ago', 
      likes: 624,
      isSpoiler: false,
      replies: []
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isSpoilerInput, setIsSpoilerInput] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // comment object
  const [likedComments, setLikedComments] = useState(['c1']);
  const [revealedSpoilers, setRevealedSpoilers] = useState([]);
  const [reportingCommentId, setReportingCommentId] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    if (isGuest) {
      if (onRequireAuth) onRequireAuth('Join the conversation. Create an account to comment!');
      return;
    }

    if (replyingTo) {
      // Add reply to target comment
      const newReply = {
        id: `r_${Date.now()}`,
        user: '@you',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        text: inputVal.trim(),
        time: 'Just now',
        likes: 1
      };

      setComments(prev => prev.map(c => {
        if (c.id === replyingTo.id) {
          return { ...c, replies: [...(c.replies || []), newReply] };
        }
        return c;
      }));
      setReplyingTo(null);
    } else {
      // Add top-level comment
      const newComment = {
        id: `c_${Date.now()}`,
        user: '@you',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        text: inputVal.trim(),
        time: 'Just now',
        likes: 1,
        isSpoiler: isSpoilerInput,
        replies: []
      };

      setComments([newComment, ...comments]);
    }

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

  const handleReportComment = (commentId) => {
    setReportingCommentId(null);
    if (onShowToast) {
      onShowToast('Thanks. We\'ll review this comment.');
    } else {
      alert('Thanks. We\'ll review this comment.');
    }
  };

  const maxChars = 280;
  const charsLeft = maxChars - inputVal.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end justify-center">
      <div className="relative w-full max-w-[480px] h-[75vh] bg-[#111116] rounded-t-3xl border-t border-x border-white/10 shadow-beautiful-lg flex flex-col transition-spring">
        
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-white/8 flex items-center justify-between">
          <div>
            <h3 className="font-display text-sm font-bold text-white flex items-center gap-2">
              <span>{episodeTitle || "Episode Discussion"}</span>
              <span className="font-mono text-xs text-[#f04a23]">({comments.length})</span>
            </h3>
            <p className="text-[10px] text-white/50 font-mono truncate">{drama?.title}</p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/6 hover:bg-white/12 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Reaction Emoji Suggestions Bar */}
        <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-white/40 whitespace-nowrap">Express:</span>
          {['🔥', '😱', '🍿', '❤️', '👏', '🤯', '😭', '😂'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => setInputVal(prev => prev + ' ' + emoji)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-xs transition-transform active:scale-90 cursor-pointer border border-white/5"
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Comments Scrollable List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="font-bold text-white text-base">No one's talking about this yet.</p>
              <p className="text-xs text-white/50">Be the first to lose your mind.</p>
            </div>
          ) : (
            comments.map((c) => {
              const isLiked = likedComments.includes(c.id);
              const isSpoilerHidden = c.isSpoiler && !revealedSpoilers.includes(c.id);

              return (
                <div key={c.id} className="space-y-2">
                  {/* Top-Level Comment */}
                  <div className="flex items-start gap-3">
                    <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full object-cover flex-none border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-white">{c.user}</span>
                        <span className="text-[10px] font-mono text-white/40">{c.time}</span>
                      </div>

                      {/* Spoiler Covered State */}
                      {isSpoilerHidden ? (
                        <button 
                          onClick={() => toggleRevealSpoiler(c.id)}
                          className="w-full py-2 px-3 rounded-xl bg-white/5 border border-amber-500/30 text-amber-400 text-xs flex items-center justify-between cursor-pointer hover:bg-white/10"
                        >
                          <span className="flex items-center gap-1.5 font-medium">
                            <AlertTriangle className="w-3.5 h-3.5" /> Spoiler Content — Tap to reveal
                          </span>
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <p className="text-xs text-white/80 leading-relaxed font-normal">
                          {c.text}
                          {c.isSpoiler && (
                            <span className="ml-2 text-[9px] font-mono text-amber-400 uppercase tracking-wider">[Spoiler Revealed]</span>
                          )}
                        </p>
                      )}

                      {/* Comment Actions Row */}
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-white/40">
                        <button 
                          onClick={() => toggleLikeComment(c.id)}
                          className={`flex items-center gap-1 cursor-pointer hover:text-white ${isLiked ? 'text-[#f04a23] font-bold' : ''}`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#f04a23]' : ''}`} />
                          <span>{c.likes + (isLiked ? 1 : 0)}</span>
                        </button>

                        <button 
                          onClick={() => setReplyingTo(c)}
                          className="hover:text-white cursor-pointer font-medium"
                        >
                          Reply
                        </button>

                        <button 
                          onClick={() => handleReportComment(c.id)}
                          className="hover:text-white/80 cursor-pointer"
                          title="Report comment"
                        >
                          <Flag className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Threaded Replies (1-Level Deep) */}
                  {c.replies && c.replies.length > 0 && (
                    <div className="pl-10 space-y-2 border-l border-white/10 ml-4 pt-1">
                      {c.replies.map(reply => (
                        <div key={reply.id} className="flex items-start gap-2.5">
                          <img src={reply.avatar} alt={reply.user} className="w-6 h-6 rounded-full object-cover flex-none border border-white/10" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-white/90">{reply.user}</span>
                              <span className="text-[9px] font-mono text-white/40">{reply.time}</span>
                            </div>
                            <p className="text-[11px] text-white/70 mt-0.5 leading-snug">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Replying Banner Indicator */}
        {replyingTo && (
          <div className="px-4 py-2 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
            <span className="flex items-center gap-1.5 truncate">
              <CornerDownRight className="w-3.5 h-3.5 text-[#f04a23]" /> Replying to <strong className="text-white">{replyingTo.user}</strong>
            </span>
            <button onClick={() => setReplyingTo(null)} className="text-white/40 hover:text-white text-xs">
              Cancel
            </button>
          </div>
        )}

        {/* Input Bar & Controls */}
        <form onSubmit={handleSend} className="p-3 bg-[#090909] border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-white/50 px-1">
            {/* Spoiler Toggle Switch */}
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

            {/* Chars Left Counter */}
            {inputVal.length > 220 && (
              <span className={charsLeft < 10 ? 'text-red-400 font-bold font-mono' : 'font-mono'}>
                {charsLeft} chars left
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              maxLength={280}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={replyingTo ? `Reply to ${replyingTo.user}...` : "Say something..."}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#181820] border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#f04a23]"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
