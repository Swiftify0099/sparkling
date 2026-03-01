import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'arc' | 'exit'>('enter');

  useEffect(() => {
    const arcTimer = setTimeout(() => setPhase('arc'), 1000);
    const exitTimer = setTimeout(() => setPhase('exit'), 1800);
    const completeTimer = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(arcTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0F0F1E' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/generated/splash-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Electric arc lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px"
            style={{
              top: `${15 + i * 14}%`,
              left: '0',
              right: '0',
              background: `linear-gradient(90deg, transparent, rgba(245,197,24,${phase === 'arc' ? 0.6 : 0}), transparent)`,
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i + 1) * 0.5}deg)`,
              transition: 'all 0.3s ease',
              opacity: phase === 'arc' ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center gap-6"
        style={{
          opacity: phase === 'exit' ? 0 : 1,
          transform: phase === 'exit' ? 'scale(1.1)' : 'scale(1)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Logo container */}
        <div
          className="animate-fade-in-scale relative flex items-center justify-center"
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,197,24,0.15) 0%, rgba(245,197,24,0.05) 60%, transparent 100%)',
            border: '2px solid rgba(245,197,24,0.4)',
          }}
        >
          {/* Outer pulse ring */}
          <div
            className="absolute inset-0 rounded-full animate-pulse-yellow"
            style={{ border: '1px solid rgba(245,197,24,0.2)' }}
          />

          {/* Logo image or fallback */}
          <div className="relative flex items-center justify-center w-16 h-16">
            <img
              src="/assets/generated/sparkling-logo.dim_256x256.png"
              alt="Sparkling"
              className="w-16 h-16 object-contain animate-bolt-flicker"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.removeAttribute('style');
              }}
            />
            <Zap
              className="w-16 h-16 animate-bolt-flicker"
              style={{ display: 'none', color: '#F5C518', fill: '#F5C518' }}
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="animate-slide-up text-center">
          <h1
            className="text-5xl font-black tracking-tight"
            style={{ color: '#F5C518', letterSpacing: '-0.02em' }}
          >
            SPARKLING
          </h1>
          <div
            className="mt-1 h-0.5 mx-auto"
            style={{
              width: phase === 'arc' ? '100%' : '0%',
              background: 'linear-gradient(90deg, transparent, #F5C518, transparent)',
              transition: 'width 0.6s ease',
            }}
          />
          <p
            className="mt-3 text-sm font-medium tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Power Your World
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: '#F5C518',
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        className="absolute bottom-8 text-center animate-slide-up"
        style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', letterSpacing: '0.15em' }}
      >
        ELECTRICIAN MARKETPLACE PLATFORM
      </div>
    </div>
  );
}
