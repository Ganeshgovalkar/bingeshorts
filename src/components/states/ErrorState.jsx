import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorState({ 
  title = "That story hit a glitch.", 
  description = "We couldn't load this content right now. Give it another try.", 
  onRetry, 
  onGoHome 
}) {
  return (
    <div className="p-8 text-center space-y-4 rounded-3xl bg-[#111116] border border-red-500/20 max-w-md mx-auto my-8 animate-fadeIn">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <div>
        <h3 className="font-display font-bold text-lg text-white">{title}</h3>
        <p className="text-xs text-white/60 mt-1 leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center justify-center gap-3 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="py-2.5 px-5 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        )}
        {onGoHome && (
          <button
            onClick={onGoHome}
            className="py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" /> Go Home
          </button>
        )}
      </div>
    </div>
  );
}
