import React, { useEffect, useRef } from 'react';
import { Play, ArrowRight, Check, Star, Plus } from 'lucide-react';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function LandingPageView({ 
  microdramas, 
  onSelectDrama, 
  onPlayEpisode 
}) {
  useReveal();
  const heroRef = useRef(null);
  const heroDrama = microdramas.find(d => d.id === 'wrong-floor') || microdramas[0];
  const originals = microdramas.filter(d => d.badgeType === 'original').slice(0, 3);

  return (
    <div className="w-full bg-[#090909] text-white">
      {/* 1. HERO MASTHEAD */}
      <section id="home" className="relative flex min-h-screen items-end overflow-hidden border-b border-white/10 pt-20">
        <div ref={heroRef} className="absolute inset-0 scale-[1.03] will-change-transform overflow-hidden">
          <img 
            src={heroDrama.poster} 
            alt="Hero Background" 
            className="h-full w-full object-cover opacity-60 hero-enter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/25 to-[#090909]/60" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.45),transparent_50%,rgba(0,0,0,.2))]" />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 pb-20 sm:pb-28">
          <div className="max-w-3xl hero-enter">
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-[#f04a23] backdrop-blur-md mb-6">
              BingeShorts Original Premiere
            </span>
            <h1 className="display text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.94] mb-6">
              {heroDrama.title}
            </h1>
            <p className="text-base sm:text-lg leading-7 text-white/85 mb-8 max-w-xl">
              {heroDrama.hook}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onPlayEpisode(heroDrama, 1)}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#f04a23] px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-[#ff5b32] focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                Watch Episode 1
                <Play className="h-4 w-4 fill-current transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onSelectDrama(heroDrama)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/25 bg-black/20 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12">
        <div className="grid grid-cols-2 border-y border-white/10 md:grid-cols-4 reveal">
          <div className="border-b border-r border-white/10 px-4 py-8 md:border-b-0">
            <strong className="display block text-3xl font-medium sm:text-4xl">15M+</strong>
            <span className="mt-2 block text-xs text-white/45 uppercase tracking-wider">Active Viewers</span>
          </div>
          <div className="border-b border-white/10 md:border-r px-4 py-8 md:border-b-0">
            <strong className="display block text-3xl font-medium sm:text-4xl">500+</strong>
            <span className="mt-2 block text-xs text-white/45 uppercase tracking-wider">Original Series</span>
          </div>
          <div className="border-r border-white/10 px-4 py-8">
            <strong className="display block text-3xl font-medium sm:text-4xl">4K</strong>
            <span className="mt-2 block text-xs text-white/45 uppercase tracking-wider">Cinematic Quality</span>
          </div>
          <div className="px-4 py-8">
            <strong className="display block text-3xl font-medium sm:text-4xl">0.0s</strong>
            <span className="mt-2 block text-xs text-white/45 uppercase tracking-wider">Buffering Time</span>
          </div>
        </div>
      </section>

      {/* 3. ORIGINALS SHOWCASE (Bento/Staggered Grid) */}
      <section id="originals" className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-20 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-12 mb-16 reveal">
          <div className="lg:col-span-4">
            <p className="text-xs text-[#f04a23] uppercase tracking-wider font-semibold">Featured Originals</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="display text-4xl font-normal leading-tight tracking-tight sm:text-6xl">
              Cinematic storytelling.<br />
              <span className="text-white/35">Bite-sized episodes for the modern era.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {originals.map((drama, idx) => (
            <div 
              key={drama.id} 
              onClick={() => onSelectDrama(drama)}
              className={`group relative overflow-hidden rounded-xl cursor-pointer reveal ${
                idx === 0 ? 'lg:col-span-12 aspect-[16/10] sm:aspect-[21/9]' : 
                idx === 1 ? 'lg:col-span-7 aspect-[4/5]' : 'lg:col-span-5 aspect-[4/5] lg:pt-32'
              }`}
            >
              <img 
                src={drama.poster} 
                alt={drama.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                <span className="inline-block px-2 py-1 bg-white text-black text-[10px] font-bold tracking-widest rounded-sm mb-3">
                  {idx === 0 ? 'LATEST PREMIERE' : 'TRENDING'}
                </span>
                <h3 className="display text-3xl sm:text-5xl font-medium tracking-tight mb-2">
                  {drama.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <span>{drama.episodesCount} Episodes</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-400"><Star className="w-3.5 h-3.5 fill-current"/> {drama.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURES (List Items with Hover Arrow) */}
      <section id="features" className="bg-[#0d0d0c] py-20 sm:py-28 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-16 reveal">
            <h2 className="display text-4xl font-normal leading-tight tracking-tight sm:text-5xl">
              Experience the difference.
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {[
              { title: 'Offline Viewing', desc: 'Download entire seasons to your device in a single tap. Perfect for flights and commutes.' },
              { title: 'Interactive Branching', desc: 'Make choices that permanently alter the storyline. You control how the drama unfolds.' },
              { title: 'Live Global Subtitles', desc: 'Real-time multi-language closed captions powered by AI. Switch languages instantly.' },
              { title: 'Ad-Free VIP Pass', desc: 'Unlock every episode of every series without interruptions or waiting periods.' }
            ].map((feat, idx) => (
              <article key={idx} className="reveal group grid gap-6 py-9 transition-colors hover:bg-white/[0.025] sm:grid-cols-12 sm:items-center px-4 -mx-4 rounded-xl cursor-default">
                <span className="display text-3xl text-white/30 sm:col-span-1">0{idx + 1}</span>
                <div className="sm:col-span-4">
                  <h3 className="display text-2xl font-medium tracking-tight">{feat.title}</h3>
                </div>
                <p className="text-base leading-7 text-white/55 sm:col-span-5">
                  {feat.desc}
                </p>
                <div className="hidden justify-end sm:col-span-2 sm:flex">
                  <ArrowRight className="h-6 w-6 text-white/30 transition-colors group-hover:text-[#f04a23]" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS (Warm Editorial Break) */}
      <section className="bg-[#e9e3d8] py-20 sm:py-28 text-[#11100e]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 reveal">
            <div className="lg:col-span-4">
              <h2 className="display text-3xl font-medium tracking-tight border-b border-black/15 pb-4">
                What critics say
              </h2>
            </div>
            <div className="lg:col-span-8 grid gap-8 sm:grid-cols-2">
              <div className="reveal space-y-4 border-l border-black/15 pl-6">
                <p className="text-lg leading-relaxed text-black/70 italic">
                  "BingeShorts is redefining the microdrama format. The production value is strictly cinematic, and the vertical framing feels entirely native."
                </p>
                <div>
                  <strong className="block text-sm font-semibold">Cinema Daily</strong>
                  <span className="text-xs text-black/50">Tech & Entertainment</span>
                </div>
              </div>
              <div className="reveal space-y-4 border-l border-black/15 pl-6">
                <p className="text-lg leading-relaxed text-black/70 italic">
                  "Finally, a short-form platform that takes storytelling seriously. The interactive branching narrative feature is a game-changer."
                </p>
                <div>
                  <strong className="block text-sm font-semibold">The Verge</strong>
                  <span className="text-xs text-black/50">Editor's Choice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING / PLANS */}
      <section id="plans" className="bg-[#0c0c0c] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12 mb-16 reveal">
            <div className="lg:col-span-4">
              <p className="text-xs text-[#f04a23] uppercase tracking-wider font-semibold">Membership</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-4xl font-normal leading-tight tracking-tight sm:text-6xl">
                Unlock the entire vault.<br />
                <span className="text-white/35">No waiting. No ads.</span>
              </h2>
            </div>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            <article className="reveal grid gap-5 py-8 sm:grid-cols-12 sm:items-center">
              <span className="display text-3xl text-white/25 sm:col-span-1">01</span>
              <div className="sm:col-span-5">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-medium">Free Tier</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/45">Watch episode 1 of any series for free. Earn coins to unlock more daily.</p>
              </div>
              <p className="text-sm text-white/50 sm:col-span-3">Ad-supported • Daily limits</p>
              <div className="sm:col-span-3 sm:text-right">
                <span className="display text-2xl font-medium">$0.00 / free</span>
              </div>
            </article>

            <article className="reveal grid gap-5 py-8 sm:grid-cols-12 sm:items-center relative bg-white/[0.02] -mx-4 px-4 rounded-xl">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#f04a23] rounded-l-xl"></div>
              <span className="display text-3xl text-[#f04a23] sm:col-span-1">02</span>
              <div className="sm:col-span-5">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-medium text-white">VIP Pass</h3>
                  <span className="rounded-full bg-[#f04a23] px-3 py-1 text-xs text-white font-medium">Recommended</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/70">Unlimited access to all episodes, offline downloads, and ad-free viewing.</p>
              </div>
              <p className="text-sm text-white/50 sm:col-span-3">Billed monthly • Cancel anytime</p>
              <div className="sm:col-span-3 sm:text-right">
                <span className="display text-2xl font-medium text-white">$4.99 / month</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 7. FAQ (Interactive Accordion) */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4 reveal">
              <h2 className="display text-3xl font-medium tracking-tight">
                Frequently<br />Asked Questions
              </h2>
            </div>
            <div className="lg:col-span-8 divide-y divide-white/10 border-t border-white/10">
              {[
                { q: "How long are the episodes?", a: "Episodes typically range from 3 to 7 minutes, designed specifically for quick, immersive viewing sessions on mobile devices." },
                { q: "Can I watch on my desktop or TV?", a: "Yes, BingeShorts offers a premium web experience that scales beautifully to large screens, retaining the cinematic quality." },
                { q: "How do branching storylines work?", a: "At key moments in interactive series, you'll be prompted to make a choice. Your decision seamlessly alters the outcome of the story." }
              ].map((faq, i) => (
                <details key={i} className="reveal group py-6 cursor-pointer">
                  <summary className="flex items-center justify-between text-lg font-medium text-white/85 outline-none list-none">
                    {faq.q}
                    <Plus className="h-5 w-5 text-[#f04a23] transition-transform group-open:rotate-45" />
                  </summary>
                  <div className="grid transition-all duration-300 grid-rows-[0fr] group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-4 text-white/55 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA FOOTER (Terracotta Block) */}
      <section className="bg-[#d94826] text-white py-24 sm:py-32 text-center">
        <div className="mx-auto max-w-4xl px-5 reveal">
          <h2 className="display text-5xl sm:text-7xl font-medium leading-[0.98] tracking-tight mb-8">
            Ready to binge?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Join millions of viewers experiencing the next generation of cinematic storytelling.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-8 py-4 text-sm font-bold text-[#d94826] transition-transform hover:scale-105 focus:outline-none"
          >
            Start Watching Free
          </button>
        </div>
      </section>

      {/* Actual Footer */}
      <footer className="border-t border-white/10 py-10 bg-[#090909]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8 lg:px-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f04a23] flex items-center justify-center">
              <span className="font-display font-black text-white text-[10px]">BS</span>
            </div>
            <span className="font-display text-sm font-bold tracking-tight text-white uppercase">
              BingeShorts
            </span>
          </div>
          <p className="text-xs text-white/45">© {new Date().getFullYear()} BingeShorts OTT Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
