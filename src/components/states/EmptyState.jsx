import React from 'react';
import { Sparkles, Film, Search, Bookmark, Compass } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = Film, 
  title = "Nothing here yet.", 
  description = "Check back soon for new releases and updates.", 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="p-8 sm:p-12 text-center space-y-4 rounded-3xl bg-[#111116] border border-white/5 max-w-md mx-auto my-6 animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f04a23]/20 to-amber-500/20 text-[#f04a23] border border-[#f04a23]/30 flex items-center justify-center mx-auto shadow-lg">
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h3 className="font-display font-bold text-lg text-white">{title}</h3>
        <p className="text-xs text-white/50 mt-1 leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="py-3 px-6 rounded-xl bg-[#f04a23] hover:bg-[#ff5b32] text-white font-bold text-xs shadow-lg transition-transform active:scale-95 cursor-pointer inline-flex items-center gap-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
