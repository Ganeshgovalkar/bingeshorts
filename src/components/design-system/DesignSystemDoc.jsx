import React from 'react';
import { Layers, Sparkles, Palette, Grid, Type, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Chip from '../common/Chip';
import ProgressBar from '../common/ProgressBar';

export default function DesignSystemDoc() {
  const colorTokens = [
    { name: 'Canvas Dark Base', hex: '#0A0A0E', usage: 'Deep dark viewport background' },
    { name: 'Card Surface', hex: '#14141B', usage: 'Component containers & cards' },
    { name: 'Card Hover Surface', hex: '#1E1E28', usage: 'Interactive card states' },
    { name: 'Electric Violet', hex: '#9D4EDD', usage: 'Direction 01 Primary Accent' },
    { name: 'Acid Lime', hex: '#CCFF00', usage: 'Direction 02 Discovery Accent' },
    { name: 'Hot Coral', hex: '#FF4757', usage: 'Direction 03 Personal Accent' },
    { name: 'Electric Blue', hex: '#00D2FF', usage: 'Secondary Gen Z highlight' },
    { name: 'Bright Pink', hex: '#FF007F', usage: 'Reactions & badge accent' }
  ];

  const spacingTokens = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96];

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-8 text-gray-200">
      {/* Header */}
      <div className="space-y-2 border-b border-white/10 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" /> Component & Token Architecture
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">BingeShorts Mobile Design System</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Dark Cinematic Foundation + Playful Gen Z Interaction Layer (WCAG AA Compliant).
        </p>
      </div>

      {/* 1. COLOR TOKENS */}
      <section className="space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#9D4EDD]" /> 1. Color Palette Tokens
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {colorTokens.map((c, i) => (
            <div key={i} className="p-3 rounded-2xl bg-[#14141B] border border-white/10 space-y-2">
              <div className="w-full h-12 rounded-xl border border-white/10" style={{ backgroundColor: c.hex }} />
              <div>
                <span className="text-xs font-bold text-white block">{c.name}</span>
                <span className="text-[11px] font-mono text-purple-300">{c.hex}</span>
                <p className="text-[10px] text-gray-400 mt-1">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. GRID & SPACING SPEC */}
      <section className="space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Grid className="w-4 h-4 text-[#CCFF00]" /> 2. Mobile 4-Column Layout Grid
        </h2>
        <div className="p-4 rounded-2xl bg-[#14141B] border border-white/10 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-400 font-medium block">Viewport Target</span>
              <span className="font-bold text-white">393px × 852px (iPhone 16 Pro)</span>
            </div>
            <div>
              <span className="text-gray-400 font-medium block">Layout Columns</span>
              <span className="font-bold text-white">4 Columns</span>
            </div>
            <div>
              <span className="text-gray-400 font-medium block">Outer Margins</span>
              <span className="font-bold text-white">16px</span>
            </div>
            <div>
              <span className="text-gray-400 font-medium block">Column Gutters</span>
              <span className="font-bold text-white">16px</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-xs font-bold text-gray-300 block mb-2">Spacing Scale Tokens (px)</span>
            <div className="flex flex-wrap gap-2">
              {spacingTokens.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#CCFF00]">
                  {s}px
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPONENT VARIANTS SHOWCASE */}
      <section className="space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF4757]" /> 3. Reusable UI Components
        </h2>

        {/* Buttons */}
        <div className="p-4 rounded-2xl bg-[#14141B] border border-white/10 space-y-3">
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Button Variants</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" accentColor="violet">Primary Violet</Button>
            <Button variant="primary" accentColor="coral">Primary Coral</Button>
            <Button variant="primary" accentColor="lime">Primary Lime</Button>
            <Button variant="secondary">Secondary Glass</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </div>

        {/* Badges & Chips */}
        <div className="p-4 rounded-2xl bg-[#14141B] border border-white/10 space-y-3">
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Badges & Mood Chips</h3>
          <div className="flex flex-wrap items-center gap-2">
            <Badge type="original" text="ORIGINAL" />
            <Badge type="trending" text="TRENDING #1" />
            <Badge type="lime" text="NEW EPISODES" />
            <Badge type="free" text="FREE EPISODE" />
            <Badge type="locked" text="LOCKED" />
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Chip label="✨ Active Lime Chip" active={true} activeAccent="lime" />
            <Chip label="❤️ Active Violet Chip" active={true} activeAccent="violet" />
            <Chip label="🔥 Inactive Chip" active={false} />
          </div>
        </div>

        {/* Progress Bars */}
        <div className="p-4 rounded-2xl bg-[#14141B] border border-white/10 space-y-3">
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Episode Completion Bars</h3>
          <div className="space-y-2">
            <div>
              <span className="text-[11px] text-gray-400">Electric Violet Progress (75%)</span>
              <ProgressBar percent={75} color="violet" height="h-2" />
            </div>
            <div>
              <span className="text-[11px] text-gray-400">Acid Lime Progress (50%)</span>
              <ProgressBar percent={50} color="lime" height="h-2" />
            </div>
            <div>
              <span className="text-[11px] text-gray-400">Gen Z Multi-Gradient Progress (90%)</span>
              <ProgressBar percent={90} color="gradient" height="h-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
