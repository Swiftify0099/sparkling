import React from 'react';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';
import BannerCarousel from '../components/BannerCarousel';
import ServiceCategories from '../components/ServiceCategories';
import { useGetCallerUserProfile } from '../hooks/useQueries';

interface CustomerHomeProps {
  onNavigate: (path: string) => void;
}

const FEATURED_ELECTRICIANS = [
  { id: '1', name: 'Rajesh Kumar', rating: 4.9, jobs: 234, location: 'Central City', specialty: 'Panel Upgrade', verified: true },
  { id: '2', name: 'Suresh Patel', rating: 4.8, jobs: 189, location: 'North District', specialty: 'Wiring & Rewiring', verified: true },
  { id: '3', name: 'Amit Singh', rating: 4.7, jobs: 156, location: 'South District', specialty: 'Emergency Call-out', verified: true },
];

export default function CustomerHome({ onNavigate }: CustomerHomeProps) {
  const { data: profile } = useGetCallerUserProfile();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-black text-white">
          Hello, {profile?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Find trusted electricians in your area
        </p>
      </div>

      {/* Banner carousel */}
      <BannerCarousel />

      {/* Service categories */}
      <ServiceCategories onCategorySelect={cat => onNavigate(`/discover?category=${cat}`)} />

      {/* Quick search */}
      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.1)' }}
      >
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: '#F5C518' }} />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Your Location</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {profile?.location || 'Set your location'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/discover')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            Find Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top rated electricians */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Top Rated Electricians</h2>
          <button
            onClick={() => onNavigate('/discover')}
            className="text-sm font-medium flex items-center gap-1"
            style={{ color: '#F5C518' }}
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_ELECTRICIANS.map(el => (
            <div
              key={el.id}
              className="rounded-xl p-4 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ backgroundColor: 'rgba(245,197,24,0.15)', color: '#F5C518' }}
                >
                  {el.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white text-sm truncate">{el.name}</p>
                    {el.verified && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                        style={{ backgroundColor: 'rgba(52,211,153,0.15)', color: '#34D399' }}
                      >
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{el.specialty}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" style={{ color: '#F5C518', fill: '#F5C518' }} />
                      <span className="text-xs font-bold text-white">{el.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.3)' }} />
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{el.jobs} jobs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.3)' }} />
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{el.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate(`/booking/${el.id}`)}
                className="w-full mt-3 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-90"
                style={{ backgroundColor: 'rgba(245,197,24,0.1)', color: '#F5C518', border: '1px solid rgba(245,197,24,0.2)' }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
