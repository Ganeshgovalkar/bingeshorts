import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function PhoneFrame({ children, isFrameView = true }) {
  if (!isFrameView) {
    return (
      <div className="w-full max-w-[430px] mx-auto min-h-screen bg-[#0A0A0E] text-white shadow-2xl relative">
        {children}
      </div>
    );
  }

  return (
    <div className="py-6 px-2 flex justify-center items-center min-h-[calc(100vh-65px)] bg-[#050507]">
      <div className="relative w-[393px] h-[852px] bg-[#0A0A0E] rounded-[52px] border-[10px] border-[#1C1C24] shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(157,78,221,0.15)] overflow-hidden flex flex-col">
        {/* iPhone Dynamic Island Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-full z-50 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#0a1a0a] border border-emerald-900/50 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="w-full h-11 px-7 pt-3 flex items-center justify-between z-40 text-white text-[11px] font-semibold tracking-tight select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 opacity-80">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Scrollable Viewport Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#0A0A0E] pb-20">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}
