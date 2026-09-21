import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Volume2, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { soundSampler } from '../../utils/soundSampler';

export default function HeroSection() {
  const handlePlayMadalResonance = () => {
    soundSampler.playFrequencies([320, 110, 440], 2.2, 'percussive');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#580d1b] via-[#80182a] to-[#580d1b] text-[#fff8f5] py-20 lg:py-28">
      {/* Subtle mandala background accent */}
      <div className="absolute inset-0 opacity-10 bg-mandala-pattern pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/40 text-[#f4e5c4] text-xs font-semibold tracking-wider uppercase backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Himalayan Acoustic Provenance</span>
            </div>

            <h1 className="font-heritage text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fff8f5] leading-[1.15]">
              The Sacred Sounds of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f4e5c4] via-[#d4a359] to-[#fe8357]">
                Ancient Nepal
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#f4e5c4]/80 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Experience hand-carved concert Madals, heirloom Gandharva Sarangis, ceremonial Newari Dhimes, and professional Western instruments tuned to perfection by multi-generational Himalayan luthiers.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/browse"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4a359] to-[#c85a32] text-[#1f1412] font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-black/30 flex items-center gap-2"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handlePlayMadalResonance}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#d4a359]/40 text-[#f4e5c4] font-semibold text-sm transition-all flex items-center gap-2.5 backdrop-blur-xs shadow-md"
              >
                <Volume2 className="w-4 h-4 text-[#d4a359]" />
                <span>Audition Madal Note</span>
              </button>
            </div>

            {/* Badges */}
            <div className="pt-6 border-t border-[#d4a359]/20 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="block font-heritage text-xl font-bold text-[#f4e5c4]">100%</span>
                <span className="text-xs text-[#f4e5c4]/70">Artisan Guild Verified</span>
              </div>
              <div>
                <span className="block font-heritage text-xl font-bold text-[#f4e5c4]">25+ Yrs</span>
                <span className="text-xs text-[#f4e5c4]/70">Seasoned Hardwoods</span>
              </div>
              <div>
                <span className="block font-heritage text-xl font-bold text-[#f4e5c4]">Worldwide</span>
                <span className="text-xs text-[#f4e5c4]/70">Secure Insured Freight</span>
              </div>
            </div>
          </div>

          {/* Right Featured Instrument Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Brass Glowing Backing */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#d4a359] to-[#c85a32] rounded-3xl blur-lg opacity-40 group-hover:opacity-70 transition duration-1000"></div>

              <div className="relative bg-[#3f0913] border border-[#d4a359]/40 rounded-3xl p-6 shadow-2xl">
                <div className="aspect-4/3 rounded-2xl overflow-hidden mb-5 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80"
                    alt="Patan Master Grade Madal"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#580d1b]/90 text-[#f4e5c4] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#d4a359]/30">
                    Masterpiece of the Month
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#d4a359] uppercase tracking-wider">
                      Patan Guild Edition
                    </span>
                    <span className="text-xs text-[#f4e5c4]/70">Lalitpur Atelier</span>
                  </div>

                  <h3 className="font-heritage text-xl font-bold text-[#fff8f5]">
                    Patan Master Grade Madal
                  </h3>

                  <p className="text-xs text-[#f4e5c4]/80 line-clamp-2">
                    Hand-carved from seasoned Saaj timber with iron-rice Khari masa tuning head. Tuned to concert pitch G#.
                  </p>

                  <div className="pt-3 border-t border-[#d4a359]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#f4e5c4]/60 block uppercase">Direct from Luthier</span>
                      <span className="font-heritage text-xl font-bold text-[#d4a359]">$320.00</span>
                    </div>

                    <Link
                      to="/browse"
                      className="px-4 py-2 rounded-xl bg-[#c85a32] hover:bg-[#a2411e] text-white text-xs font-bold transition-colors"
                    >
                      View Instrument
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
