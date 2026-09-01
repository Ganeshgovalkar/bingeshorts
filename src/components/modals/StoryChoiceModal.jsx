import React from 'react';
import { X, GitFork, Sparkles, Flame, ShieldAlert, ArrowRight } from 'lucide-react';

export default function StoryChoiceModal({ drama, episodeId, onClose, onSelectBranch }) {
  if (!drama) return null;

  const choices = [
    {
      id: 'branch-a',
      title: 'Path A: Answer the Intercom',
      hook: 'Elena presses the glowing red button. A distorted voice whispers the coordinates to Floor 13.5.',
      tag: 'Psychological Thriller',
      color: 'from-purple-600 to-indigo-600',
      votes: '68% chose this'
    },
    {
      id: 'branch-b',
      title: 'Path B: Pry Open the Doors',
      hook: 'Elena uses her heel to jam the safety latch, revealing a high-voltage shaft and rooftop ladder.',
      tag: 'Action / Survival',
      color: 'from-rose-600 to-amber-600',
      votes: '32% chose this'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-[440px] bg-[#111116] rounded-3xl border border-purple-500/40 p-5 space-y-4 shadow-beautiful-lg transition-spring text-left">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/6 hover:bg-white/12 text-gray-300 hover:text-white transition-spring cursor-pointer shadow-beautiful-sm"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#9D4EDD] text-white font-extrabold text-[10px] uppercase font-mono tracking-wider shadow-[0_0_12px_rgba(157,78,221,0.5)]">
            <GitFork className="w-3 h-3" /> INTERACTIVE CLIFFHANGER
          </div>
          <h2 className="font-display text-xl font-extrabold text-white tracking-tight">
            Choose Elena's Next Move
          </h2>
          <p className="text-xs text-gray-300">
            Your decision dictates the narrative timeline and outcome of Episode {episodeId + 1}.
          </p>
        </div>

        {/* Branch Option Cards */}
        <div className="space-y-3 pt-1">
          {choices.map((choice) => (
            <div
              key={choice.id}
              onClick={() => onSelectBranch && onSelectBranch(choice)}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-spring cursor-pointer space-y-2 shadow-beautiful-sm group active:scale-95"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-purple-300">
                  {choice.tag}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{choice.votes}</span>
              </div>

              <h3 className="font-display text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                <span>{choice.title}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed font-light">
                {choice.hook}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-gray-500 text-center font-mono">
          You can re-watch and explore alternate branches anytime in the episode list.
        </p>

      </div>
    </div>
  );
}
