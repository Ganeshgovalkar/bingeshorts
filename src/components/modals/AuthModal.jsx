import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, CheckCircle, Sparkles, UserCheck } from 'lucide-react';

export default function AuthModal({ 
  onClose, 
  onAuthSuccess, 
  context = null // e.g. { dramaTitle: "After 9 PM", episodeId: 2, action: "subscribe" }
}) {
  const [mode, setMode] = useState(context ? 'gate' : 'signup'); // 'gate' | 'signup' | 'login' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!email || (mode !== 'forgot' && !password)) {
      setErrorMsg('Please enter all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'forgot') {
        setResetSent(true);
      } else {
        const userObj = {
          email,
          name: email.split('@')[0] || 'Member',
          isGuest: false,
          isAuthenticated: true
        };
        onAuthSuccess && onAuthSuccess(userObj, mode);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-[420px] bg-[#111116] rounded-3xl border border-white/10 p-6 space-y-5 shadow-beautiful-lg transition-spring text-left">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/6 hover:bg-white/12 text-gray-300 hover:text-white transition-spring cursor-pointer shadow-beautiful-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* MODE: AUTHENTICATION GATE (Contextual Story Prompt) */}
        {mode === 'gate' && (
          <div className="space-y-6 pt-2">
            {context && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#f04a23]/20 to-transparent border border-[#f04a23]/30">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f04a23] block mb-1">
                  Continue watching
                </span>
                <h4 className="font-bold text-white text-sm">{context.dramaTitle || "After 9 PM"}</h4>
                <p className="text-xs text-white/70">Episode {context.episodeId || 2} is waiting.</p>
              </div>
            )}

            <div>
              <h2 className="font-display text-2xl font-bold text-white leading-tight">
                Don't leave the story here.
              </h2>
              <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                Create your account to save your progress and unlock the next chapter.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setMode('signup')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
              >
                Create Account <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMode('login')}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Log In
              </button>

              <button
                onClick={onClose}
                className="w-full py-1 text-center text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
        )}

        {/* MODE: SIGN UP */}
        {mode === 'signup' && (
          <form onSubmit={handleSubmit} className="space-y-5 pt-1">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#f04a23] uppercase block mb-1">
                Free Account
              </span>
              <h2 className="font-display text-2xl font-bold text-white leading-tight">
                Make your binge official.
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Save your progress and unlock your next story.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-white/70 block mb-1">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-[#181820] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#f04a23]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-white/70 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#181820] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#f04a23]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating your account...
                </span>
              ) : (
                <span>Continue to Subscription</span>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/5">
              <span>Already have an account?</span>
              <button type="button" onClick={() => setMode('login')} className="text-[#f04a23] font-bold">
                Log in
              </button>
            </div>
          </form>
        )}

        {/* MODE: LOG IN */}
        {mode === 'login' && (
          <form onSubmit={handleSubmit} className="space-y-5 pt-1">
            <div>
              <h2 className="font-display text-2xl font-bold text-white leading-tight">
                Welcome back.
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Your stories are waiting.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-white/70 block mb-1">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-[#181820] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#f04a23]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-medium text-white/70">Password</label>
                  <button type="button" onClick={() => setMode('forgot')} className="text-[11px] text-white/40 hover:text-white/70">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#181820] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#f04a23]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2 font-mono">
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing you in...
                </span>
              ) : (
                <span>Log In</span>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/5">
              <span>Need an account?</span>
              <button type="button" onClick={() => setMode('signup')} className="text-[#f04a23] font-bold">
                Create account
              </button>
            </div>
          </form>
        )}

        {/* MODE: FORGOT PASSWORD */}
        {mode === 'forgot' && (
          <div className="space-y-5 pt-1">
            <div>
              <h2 className="font-display text-2xl font-bold text-white leading-tight">
                Forgot your password?
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            {resetSent ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-white">Check your inbox</h4>
                <p className="text-xs text-white/70">We sent password reset instructions to {email}.</p>
                <button
                  onClick={() => setMode('login')}
                  className="mt-2 text-xs font-bold text-[#f04a23] block mx-auto"
                >
                  Back to Log In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-medium text-white/70 block mb-1">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full bg-[#181820] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#f04a23]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Sending link...' : 'Send reset link'}
                </button>

                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full text-center text-xs text-white/50 hover:text-white"
                >
                  Back to Log In
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
