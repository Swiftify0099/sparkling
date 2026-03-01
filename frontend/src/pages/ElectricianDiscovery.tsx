import React, { useState } from 'react';
import { Search, MapPin, Star, Zap, Clock, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import RatingModal from '../components/RatingModal';

const LOCATIONS = ['All Areas', 'North District', 'South District', 'East Zone', 'West Zone', 'Central City', 'Industrial Area'];
const CATEGORIES = ['All Services', 'Electrical Repair', 'Preventive Maintenance', 'New Installation', 'Wiring & Rewiring', 'Panel Upgrade', 'Emergency Call-out', 'Industrial Services'];
const RADIUS_OPTIONS = ['5 km', '10 km', '20 km', '50 km'];

const DEMO_ELECTRICIANS = [
  { id: '1', name: 'Rajesh Kumar', rating: 4.9, reviews: 234, location: 'Central City', services: ['Electrical Repair', 'Panel Upgrade', 'Wiring & Rewiring'], experience: 8, status: 'verified', available: true, rate: 500 },
  { id: '2', name: 'Suresh Patel', rating: 4.8, reviews: 189, location: 'North District', services: ['Wiring & Rewiring', 'New Installation'], experience: 6, status: 'verified', available: true, rate: 450 },
  { id: '3', name: 'Amit Singh', rating: 4.7, reviews: 156, location: 'South District', services: ['Emergency Call-out', 'Electrical Repair'], experience: 10, status: 'verified', available: false, rate: 600 },
  { id: '4', name: 'Vikram Sharma', rating: 4.6, reviews: 98, location: 'East Zone', services: ['Industrial Services', 'Panel Upgrade'], experience: 12, status: 'verified', available: true, rate: 700 },
  { id: '5', name: 'Deepak Verma', rating: 4.5, reviews: 67, location: 'West Zone', services: ['Preventive Maintenance', 'New Installation'], experience: 4, status: 'verified', available: true, rate: 400 },
  { id: '6', name: 'Ravi Gupta', rating: 4.4, reviews: 45, location: 'Central City', services: ['Electrical Repair', 'Emergency Call-out'], experience: 3, status: 'verified', available: true, rate: 380 },
];

interface ElectricianDiscoveryProps {
  onNavigate: (path: string) => void;
  initialCategory?: string;
}

export default function ElectricianDiscovery({ onNavigate, initialCategory }: ElectricianDiscoveryProps) {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All Areas');
  const [category, setCategory] = useState(initialCategory || 'All Services');
  const [radius, setRadius] = useState('10 km');
  const [ratingModal, setRatingModal] = useState<{ open: boolean; name: string; id: string }>({ open: false, name: '', id: '' });

  const filtered = DEMO_ELECTRICIANS
    .filter(e => e.status === 'verified')
    .filter(e => !search || e.name.toLowerCase().includes(search.toLowerCase()))
    .filter(e => location === 'All Areas' || e.location === location)
    .filter(e => category === 'All Services' || e.services.includes(category))
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white mb-1">Find Electricians</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {filtered.length} verified electricians available
        </p>
      </div>

      {/* Filters */}
      <div
        className="rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <Input
            placeholder="Search electricians..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
          />
        </div>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#F5C518' }} />
            <SelectValue />
          </SelectTrigger>
          <SelectContent style={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(245,197,24,0.2)' }}>
            {LOCATIONS.map(loc => <SelectItem key={loc} value={loc} style={{ color: 'white' }}>{loc}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
            <Zap className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#F5C518' }} />
            <SelectValue />
          </SelectTrigger>
          <SelectContent style={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(245,197,24,0.2)' }}>
            {CATEGORIES.map(cat => <SelectItem key={cat} value={cat} style={{ color: 'white' }}>{cat}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={radius} onValueChange={setRadius}>
          <SelectTrigger style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
            <SelectValue placeholder="Radius" />
          </SelectTrigger>
          <SelectContent style={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(245,197,24,0.2)' }}>
            {RADIUS_OPTIONS.map(r => <SelectItem key={r} value={r} style={{ color: 'white' }}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-20" style={{ color: 'white' }} />
          <p className="text-white font-medium">No electricians found</p>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(el => (
            <div
              key={el.id}
              className="rounded-xl p-5 transition-all hover:scale-[1.01]"
              style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
                  style={{ backgroundColor: 'rgba(245,197,24,0.12)', color: '#F5C518' }}
                >
                  {el.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-white">{el.name}</p>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1"
                      style={{ backgroundColor: 'rgba(52,211,153,0.12)', color: '#34D399' }}
                    >
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map(s => (
                      <Star
                        key={s}
                        className="w-3 h-3"
                        style={{ color: s <= Math.round(el.rating) ? '#F5C518' : 'rgba(255,255,255,0.2)', fill: s <= Math.round(el.rating) ? '#F5C518' : 'transparent' }}
                      />
                    ))}
                    <span className="text-xs font-bold text-white ml-1">{el.rating}</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>({el.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: '#F5C518' }} />
                  {el.location}
                  <span className="mx-1">·</span>
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  {el.experience} yrs exp
                </div>
                <div className="flex flex-wrap gap-1">
                  {el.services.slice(0, 3).map(s => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-black" style={{ color: '#F5C518' }}>₹{el.rate}</span>
                  <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>/hr</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      backgroundColor: el.available ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.06)',
                      color: el.available ? '#34D399' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {el.available ? '● Online' : '○ Offline'}
                  </span>
                  <button
                    onClick={() => onNavigate(`/booking/${el.id}`)}
                    className="px-4 py-1.5 rounded-lg text-sm font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <RatingModal
        open={ratingModal.open}
        onClose={() => setRatingModal({ open: false, name: '', id: '' })}
        electricianName={ratingModal.name}
        onSubmit={async (rating, review) => {
          console.log('Rating submitted:', { id: ratingModal.id, rating, review });
        }}
      />
    </div>
  );
}
