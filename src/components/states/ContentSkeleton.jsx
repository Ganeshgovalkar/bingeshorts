import React from 'react';

export function PosterSkeleton() {
  return (
    <div className="w-full aspect-[4/5] rounded-2xl bg-[#181820] animate-pulse border border-white/5 relative overflow-hidden">
      <div className="absolute bottom-3 left-3 right-3 space-y-2">
        <div className="h-3 bg-white/10 rounded w-3/4" />
        <div className="h-2 bg-white/5 rounded w-1/2" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full h-80 rounded-3xl bg-[#181820] animate-pulse border border-white/5 relative overflow-hidden p-6 flex flex-col justify-end space-y-3">
      <div className="h-4 bg-white/10 rounded w-1/4" />
      <div className="h-8 bg-white/20 rounded w-2/3" />
      <div className="h-3 bg-white/10 rounded w-full" />
      <div className="h-10 bg-[#f04a23]/30 rounded-xl w-36 mt-2" />
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className="p-4 rounded-2xl bg-[#111116] border border-white/5 animate-pulse flex gap-3">
      <div className="w-9 h-9 rounded-full bg-white/10 flex-none" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-white/15 rounded w-1/3" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-4/5" />
      </div>
    </div>
  );
}
