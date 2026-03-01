import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DEMO_BANNERS = [
  {
    id: '1',
    title: 'Trusted Electricians Near You',
    subtitle: 'Book verified professionals in minutes',
    cta: 'Find Now',
    gradient: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
    accent: '#F5C518',
  },
  {
    id: '2',
    title: 'Government Contracts Available',
    subtitle: 'Bid on municipal and state electrical projects',
    cta: 'View Contracts',
    gradient: 'linear-gradient(135deg, #0F1E0F 0%, #1A2E1A 50%, #0F3020 100%)',
    accent: '#34D399',
  },
  {
    id: '3',
    title: 'Electrical Products Marketplace',
    subtitle: 'Quality switchboards, wires & tools at best prices',
    cta: 'Shop Now',
    gradient: 'linear-gradient(135deg, #1E0F2E 0%, #2E1A3E 50%, #3E0F60 100%)',
    accent: '#A78BFA',
  },
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % DEMO_BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(c => (c - 1 + DEMO_BANNERS.length) % DEMO_BANNERS.length);
  const next = () => setCurrent(c => (c + 1) % DEMO_BANNERS.length);

  const banner = DEMO_BANNERS[current];

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ height: 180 }}>
      {/* Background */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: banner.gradient }}
      />

      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/assets/generated/banner-placeholder.dim_1200x400.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Electric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8">
        <div className="flex-1">
          <h3 className="text-xl font-black text-white mb-1">{banner.title}</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>{banner.subtitle}</p>
          <button
            className="px-4 py-1.5 rounded-lg text-sm font-bold transition-all hover:scale-105"
            style={{ backgroundColor: banner.accent, color: '#0F0F1E' }}
          >
            {banner.cta}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: 'white' }}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: 'white' }}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {DEMO_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              backgroundColor: i === current ? '#F5C518' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
