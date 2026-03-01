import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PaymentSummary from '../components/PaymentSummary';
import RatingModal from '../components/RatingModal';

const DEMO_ELECTRICIANS: Record<string, {
  id: string; name: string; rating: number; reviews: number;
  location: string; services: string[]; experience: number; rate: number; available: boolean;
}> = {
  '1': { id: '1', name: 'Rajesh Kumar', rating: 4.9, reviews: 234, location: 'Central City', services: ['Electrical Repair', 'Panel Upgrade', 'Wiring & Rewiring'], experience: 8, rate: 500, available: true },
  '2': { id: '2', name: 'Suresh Patel', rating: 4.8, reviews: 189, location: 'North District', services: ['Wiring & Rewiring', 'New Installation'], experience: 6, rate: 450, available: true },
  '3': { id: '3', name: 'Amit Singh', rating: 4.7, reviews: 156, location: 'South District', services: ['Emergency Call-out', 'Electrical Repair'], experience: 10, rate: 600, available: false },
};

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

interface BookingPageProps {
  electricianId: string;
  onNavigate: (path: string) => void;
}

export default function BookingPage({ electricianId, onNavigate }: BookingPageProps) {
  const electrician = DEMO_ELECTRICIANS[electricianId];
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [ratingOpen, setRatingOpen] = useState(false);

  if (!electrician) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-white mb-4">Electrician not found.</p>
        <Button
          onClick={() => onNavigate('/discover')}
          style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
        >
          Back to Discovery
        </Button>
      </div>
    );
  }

  const serviceAmount = electrician.rate * 2; // 2 hours minimum

  if (step === 'confirmed') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: 'rgba(52,211,153,0.15)', border: '2px solid #34D399' }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: '#34D399' }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
        <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {electrician.name} will arrive on {selectedDate} at {selectedTime}
        </p>
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Booking ID: #BK-{Date.now().toString().slice(-6)}
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setRatingOpen(true)}
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            Rate Electrician
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('/home')}
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', backgroundColor: 'transparent' }}
          >
            Go Home
          </Button>
        </div>
        <RatingModal
          open={ratingOpen}
          onClose={() => { setRatingOpen(false); onNavigate('/home'); }}
          electricianName={electrician.name}
          onSubmit={async (rating, review) => {
            console.log('Rating submitted:', { electricianId, rating, review });
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <button
        onClick={() => step === 'payment' ? setStep('details') : onNavigate('/discover')}
        className="flex items-center gap-2 mb-6 text-sm"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        {step === 'payment' ? 'Back to Details' : 'Back to Discovery'}
      </button>

      <h1 className="text-2xl font-black text-white mb-6">
        {step === 'details' ? 'Book Electrician' : 'Confirm & Pay'}
      </h1>

      {/* Electrician card */}
      <div
        className="rounded-xl p-4 mb-6 flex items-center gap-4"
        style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.15)' }}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
          style={{ backgroundColor: 'rgba(245,197,24,0.12)', color: '#F5C518' }}
        >
          {electrician.name[0]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-bold text-white">{electrician.name}</p>
            <span
              className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(52,211,153,0.12)', color: '#34D399' }}
            >
              ✓ Verified
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" style={{ color: '#F5C518', fill: '#F5C518' }} />
              {electrician.rating} ({electrician.reviews})
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {electrician.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {electrician.experience} yrs
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-black text-lg" style={{ color: '#F5C518' }}>₹{electrician.rate}</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>/hr</p>
        </div>
      </div>

      {step === 'details' && (
        <div className="space-y-4">
          <div>
            <Label className="text-white text-sm mb-1.5 block">Service Required *</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger
                style={{
                  backgroundColor: '#1E1E32',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: selectedService ? 'white' : 'rgba(255,255,255,0.4)',
                }}
              >
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(245,197,24,0.2)' }}>
                {electrician.services.map(s => (
                  <SelectItem key={s} value={s} style={{ color: 'white' }}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-white text-sm mb-1.5 block">Preferred Date *</Label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none focus:ring-1"
              style={{
                backgroundColor: '#1E1E32',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                colorScheme: 'dark',
              }}
            />
          </div>

          <div>
            <Label className="text-white text-sm mb-1.5 block">Preferred Time *</Label>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className="py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    backgroundColor: selectedTime === slot ? 'rgba(245,197,24,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${selectedTime === slot ? '#F5C518' : 'rgba(255,255,255,0.1)'}`,
                    color: selectedTime === slot ? '#F5C518' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-white text-sm mb-1.5 block">Additional Notes</Label>
            <Textarea
              placeholder="Describe the issue or any special requirements..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
              style={{
                backgroundColor: '#1E1E32',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
              }}
            />
          </div>

          <Button
            onClick={() => setStep('payment')}
            disabled={!selectedService || !selectedDate || !selectedTime}
            className="w-full h-11 font-bold"
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            Continue to Payment
          </Button>
        </div>
      )}

      {step === 'payment' && (
        <div className="space-y-4">
          {/* Booking summary */}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <h3 className="text-sm font-semibold text-white mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Service</span>
                <span className="text-white font-medium">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Date & Time</span>
                <span className="text-white font-medium">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Duration</span>
                <span className="text-white font-medium">2 hours (minimum)</span>
              </div>
            </div>
          </div>

          <PaymentSummary
            serviceAmount={serviceAmount}
            commissionRate={0.1}
            serviceName={selectedService}
          />

          <Button
            onClick={() => setStep('confirmed')}
            className="w-full h-11 font-bold"
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            Confirm Booking — ₹{(serviceAmount * 1.1).toLocaleString()}
          </Button>
        </div>
      )}
    </div>
  );
}
