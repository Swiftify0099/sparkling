import React, { useState } from 'react';
import { Zap, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { type UserProfile } from '../backend';

const LOCATIONS = [
  'North District',
  'South District',
  'East Zone',
  'West Zone',
  'Central City',
  'Industrial Area',
  'New Township',
];

interface RegisterProps {
  onNavigate: (path: string) => void;
}

export default function Register({ onNavigate }: RegisterProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    role: 'customer' as 'customer' | 'contractor',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const saveProfile = useSaveCallerUserProfile();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!form.location) e.location = 'Location is required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    const profile: UserProfile = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      location: form.location,
    };

    try {
      await saveProfile.mutateAsync(profile);
      setSuccess(true);
      setTimeout(() => onNavigate('/home'), 2000);
    } catch {
      onNavigate('/home');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0F0F1E' }}>
        <div className="text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#34D399' }} />
          <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <Label className="text-white text-sm mb-1.5 block">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={form[key] as string}
        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: '' })); }}
        style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: `1px solid ${errors[key] ? '#F87171' : 'rgba(255,255,255,0.1)'}`, color: 'white' }}
      />
      {errors[key] && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors[key]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#0F0F1E' }}>
      <div className="w-full max-w-md">
        <button
          onClick={() => onNavigate('/login')}
          className="flex items-center gap-2 mb-6 text-sm transition-colors"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5C518' }}>
            <Zap className="w-6 h-6" style={{ color: '#0F0F1E' }} fill="#0F0F1E" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Create Account</h1>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Join the Sparkling platform</p>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 shadow-2xl space-y-4"
          style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.15)' }}
        >
          {/* Role selector */}
          <div>
            <Label className="text-white text-sm mb-1.5 block">Register As</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['customer', 'contractor'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setForm(f => ({ ...f, role: r }))}
                  className="py-2 rounded-lg text-sm font-medium capitalize transition-all"
                  style={{
                    backgroundColor: form.role === r ? 'rgba(245,197,24,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${form.role === r ? '#F5C518' : 'rgba(255,255,255,0.1)'}`,
                    color: form.role === r ? '#F5C518' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {field('name', 'Full Name', 'text', 'Enter your full name')}
          {field('phone', 'Phone Number', 'tel', '+91 XXXXX XXXXX')}
          {field('email', 'Email Address', 'email', 'you@example.com')}
          {field('password', 'Password', 'password', 'Min 8 characters')}
          {field('confirmPassword', 'Confirm Password', 'password', 'Re-enter password')}

          {/* Location */}
          <div>
            <Label className="text-white text-sm mb-1.5 block">
              Service Location <span style={{ color: '#F87171' }}>*</span>
            </Label>
            <Select
              value={form.location}
              onValueChange={v => { setForm(f => ({ ...f, location: v })); setErrors(e => ({ ...e, location: '' })); }}
            >
              <SelectTrigger
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${errors.location ? '#F87171' : 'rgba(255,255,255,0.1)'}`,
                  color: form.location ? 'white' : 'rgba(255,255,255,0.4)',
                }}
              >
                <SelectValue placeholder="Select your area" />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(245,197,24,0.2)' }}>
                {LOCATIONS.map(loc => (
                  <SelectItem key={loc} value={loc} style={{ color: 'white' }}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location && <p className="text-xs mt-1" style={{ color: '#F87171' }}>{errors.location}</p>}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={saveProfile.isPending}
            className="w-full h-11 font-bold"
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            {saveProfile.isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
      </div>
    </div>
  );
}
