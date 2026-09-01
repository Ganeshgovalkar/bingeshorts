import React, { useState } from 'react';
import { X, Check, Sparkles, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SubscriptionCheckoutModal({ 
  onClose, 
  onUnlockSuccess, 
  context = null // e.g. { dramaTitle: "After 9 PM", episodeId: 2, drama: dramaObj }
}) {
  const [selectedPlan, setSelectedPlan] = useState('annual'); // 'monthly' ($6.99) or 'annual' ($49.99) - Annual default!
  const [processing, setProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setIsSuccess(true);
      if (onUnlockSuccess) {
        onUnlockSuccess(selectedPlan);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-[440px] bg-[#111116] rounded-3xl border border-white/10 p-6 space-y-5 shadow-beautiful-lg transition-spring text-left overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/6 hover:bg-white/12 text-gray-300 hover:text-white transition-spring cursor-pointer shadow-beautiful-sm z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* PROCESSING OVERLAY STATE */}
        {processing && (
          <div className="py-12 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#f04a23]/20 border border-[#f04a23]/40 flex items-center justify-center mx-auto">
              <span className="w-8 h-8 border-3 border-[#f04a23] border-t-transparent rounded-full animate-spin" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">Unlocking your stories...</h3>
            <p className="text-xs text-white/50">Activating your {selectedPlan} pass</p>
          </div>
        )}

        {/* SUCCESS OVERLAY STATE */}
        {isSuccess && !processing && (
          <div className="py-6 space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="font-display text-3xl font-extrabold text-white">You're in.</h2>
              <p className="text-sm text-white/70 mt-1">Every episode is now unlocked.</p>
              <p className="text-xs text-emerald-400 font-mono mt-2">Your next obsession starts now.</p>
            </div>

            {context && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                <span className="text-[10px] font-mono font-bold uppercase text-[#f04a23] block">Ready to resume</span>
                <h4 className="font-bold text-white text-sm">{context.dramaTitle || "After 9 PM"}</h4>
                <p className="text-xs text-white/60">Episode {context.episodeId || 2} is ready.</p>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (context && context.onContinueWatching) {
                    context.onContinueWatching();
                  }
                }}
                className="w-full py-4 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
              >
                Continue Watching <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-xs text-white/50 hover:text-white"
              >
                Explore More Stories
              </button>
            </div>
          </div>
        )}

        {/* MAIN SELECTION VIEW */}
        {!processing && !isSuccess && (
          <>
            {/* Story Context Banner */}
            {context && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#f04a23]/20 to-transparent border border-[#f04a23]/30">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f04a23] block">
                  Continue watching
                </span>
                <h4 className="font-bold text-white text-xs">{context.dramaTitle || "After 9 PM"}</h4>
                <p className="text-[11px] text-white/70">Episode {context.episodeId || 2} is ready.</p>
              </div>
            )}

            {/* Top Headline */}
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-bold text-white tracking-tight leading-tight">
                Don't stop now.
              </h2>
              <p className="text-xs text-white/60">
                Unlock every episode and keep the story going.
              </p>
            </div>

            {/* Value Proposition List */}
            <div className="grid grid-cols-2 gap-2 text-xs text-white/80 py-1">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#f04a23]" />
                <span className="text-[11px]">Unlock every episode</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#f04a23]" />
                <span className="text-[11px]">Unlimited microdramas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#f04a23]" />
                <span className="text-[11px]">New stories every week</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#f04a23]" />
                <span className="text-[11px]">Pick up where you left off</span>
              </div>
            </div>

            {/* Plan Selector */}
            <div className="space-y-3">
              {/* ANNUAL PLAN (BEST VALUE) */}
              <div 
                onClick={() => setSelectedPlan('annual')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  selectedPlan === 'annual'
                    ? 'bg-[#f04a23]/15 border-[#f04a23] shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#f04a23] text-white text-[9px] font-bold uppercase tracking-wider font-mono">
                  Best Value
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">Annual</h4>
                    <p className="text-[11px] text-white/50 mt-0.5">Save compared with monthly.</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-base font-extrabold text-white">$49.99</span>
                    <span className="text-[10px] text-white/50 block font-mono">/ year</span>
                  </div>
                </div>
              </div>

              {/* MONTHLY PLAN */}
              <div 
                onClick={() => setSelectedPlan('monthly')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedPlan === 'monthly'
                    ? 'bg-[#f04a23]/15 border-[#f04a23] shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">Monthly</h4>
                    <p className="text-[11px] text-white/50 mt-0.5">Flexible. Cancel anytime.</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-base font-extrabold text-white">$6.99</span>
                    <span className="text-[10px] text-white/50 block font-mono">/ month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action CTA */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleSubscribe}
                className="w-full py-3.5 px-4 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 fill-current" /> Continue with {selectedPlan === 'annual' ? 'Annual' : 'Monthly'}
              </button>

              <div className="flex justify-between items-center text-[10px] text-white/40 pt-1">
                <span>Cancel anytime.</span>
                <button type="button" className="hover:text-white/70">Restore Purchase</button>
              </div>

              <p className="text-[9px] text-white/30 text-center pt-1">
                By subscribing, you agree to the Terms of Service and Privacy Policy.
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
