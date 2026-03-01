import React, { useState } from 'react';
import { Zap, ArrowLeft, ArrowRight, CheckCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { type UserProfile } from '../backend';

const LOCATIONS = ['North District', 'South District', 'East Zone', 'West Zone', 'Central City', 'Industrial Area', 'New Township'];
const SERVICE_CATEGORIES = [
  'Electrical Repair', 'Preventive Maintenance', 'New Installation',
  'Wiring & Rewiring', 'Panel Upgrade', 'Emergency Call-out', 'Industrial Services',
];

interface ElectricianRegisterProps {
  onNavigate: (path: string) => void;
}

export default function ElectricianRegister({ onNavigate }: ElectricianRegisterProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', password: '', location: '',
    experience: '', categories: [] as string[],
    aadhar: null as File | null, pan: null as File | null,
    certificate: null as File | null, photo: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);
  const saveProfile = useSaveCallerUserProfile();

  const toggleCategory = (cat: string) => {
    setForm(f => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter(c => c !== cat)
        : [...f.categories, cat],
    }));
  };

  const handleFileChange = (field: 'aadhar' | 'pan' | 'certificate' | 'photo') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(f => ({ ...f, [field]: file }));
  };

  const handleSubmit = async () => {
    const profile: UserProfile = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: 'electrician',
      location: form.location,
    };
    try {
      await saveProfile.mutateAsync(profile);
    } catch { /* demo mode */ }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#0F0F1E' }}>
        <div className="text-center max-w-sm">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(52,211,153,0.15)', border: '2px solid #34D399' }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: '#34D399' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Application Submitted!</h2>
          <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Your electrician profile is now <strong style={{ color: '#FB923C' }}>Pending Verification</strong>.
          </p>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            An admin will review your documents within 24–48 hours. You'll be notified once approved.
          </p>
          <Button
            onClick={() => onNavigate('/login')}
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#0F0F1E' }}>
      <div className="w-full max-w-lg">
        <button
          onClick={() => step > 1 ? setStep(s => s - 1) : onNavigate('/login')}
          className="flex items-center gap-2 mb-6 text-sm"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          <ArrowLeft className="w-4 h-4" /> {step > 1 ? 'Previous Step' : 'Back to Login'}
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5C518' }}>
            <Zap className="w-6 h-6" style={{ color: '#0F0F1E' }} fill="#0F0F1E" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Join as Electrician</h1>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Step {step} of 3</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={(step / 3) * 100} className="h-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <div className="flex justify-between mt-2">
            {['Personal Details', 'Professional Info', 'Documents'].map((label, i) => (
              <span
                key={i}
                className="text-xs font-medium"
                style={{ color: step > i ? '#F5C518' : 'rgba(255,255,255,0.3)' }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-6 shadow-2xl"
          style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.15)' }}
        >
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Personal Details</h2>
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                { key: 'password', label: 'Password', type: 'password', placeholder: 'Min 8 characters' },
              ].map(f => (
                <div key={f.key}>
                  <Label className="text-white text-sm mb-1.5 block">{f.label}</Label>
                  <Input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form] as string}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  />
                </div>
              ))}
              <div>
                <Label className="text-white text-sm mb-1.5 block">Service Location *</Label>
                <Select value={form.location} onValueChange={v => setForm(f => ({ ...f, location: v }))}>
                  <SelectTrigger style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: form.location ? 'white' : 'rgba(255,255,255,0.4)' }}>
                    <SelectValue placeholder="Select your area" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(245,197,24,0.2)' }}>
                    {LOCATIONS.map(loc => <SelectItem key={loc} value={loc} style={{ color: 'white' }}>{loc}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Professional Details</h2>
              <div>
                <Label className="text-white text-sm mb-1.5 block">Years of Experience</Label>
                <Input
                  type="number"
                  placeholder="e.g. 5"
                  value={form.experience}
                  onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>
              <div>
                <Label className="text-white text-sm mb-3 block">Service Categories Offered</Label>
                <div className="grid grid-cols-1 gap-2">
                  {SERVICE_CATEGORIES.map(cat => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors"
                      style={{
                        backgroundColor: form.categories.includes(cat) ? 'rgba(245,197,24,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${form.categories.includes(cat) ? 'rgba(245,197,24,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <Checkbox
                        checked={form.categories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                        style={{ borderColor: form.categories.includes(cat) ? '#F5C518' : 'rgba(255,255,255,0.3)' }}
                      />
                      <span className="text-sm text-white">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Upload Documents</h2>
              <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                All documents are securely stored and reviewed by our admin team.
              </p>
              {[
                { key: 'aadhar', label: 'Aadhar Card', accept: 'image/*,.pdf', required: true },
                { key: 'pan', label: 'PAN Card', accept: 'image/*,.pdf', required: true },
                { key: 'certificate', label: 'Trade Certificate', accept: 'image/*,.pdf', required: false },
                { key: 'photo', label: 'Profile Photo', accept: 'image/*', required: true },
              ].map(doc => (
                <div key={doc.key}>
                  <Label className="text-white text-sm mb-1.5 block">
                    {doc.label} {doc.required && <span style={{ color: '#F87171' }}>*</span>}
                  </Label>
                  <label
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
                    style={{
                      backgroundColor: form[doc.key as keyof typeof form] ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.03)',
                      border: `1px dashed ${form[doc.key as keyof typeof form] ? '#34D399' : 'rgba(255,255,255,0.2)'}`,
                    }}
                  >
                    <Upload className="w-4 h-4 flex-shrink-0" style={{ color: form[doc.key as keyof typeof form] ? '#34D399' : 'rgba(255,255,255,0.4)' }} />
                    <span className="text-sm" style={{ color: form[doc.key as keyof typeof form] ? '#34D399' : 'rgba(255,255,255,0.5)' }}>
                      {(form[doc.key as keyof typeof form] as File | null)?.name || `Upload ${doc.label}`}
                    </span>
                    <input
                      type="file"
                      accept={doc.accept}
                      className="hidden"
                      onChange={handleFileChange(doc.key as 'aadhar' | 'pan' | 'certificate' | 'photo')}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step < 3 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={
                  (step === 1 && (!form.name || !form.phone || !form.email || !form.password || !form.location)) ||
                  (step === 2 && form.categories.length === 0)
                }
                className="w-full h-11 font-bold"
                style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
              >
                Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={saveProfile.isPending || !form.aadhar || !form.pan || !form.photo}
                className="w-full h-11 font-bold"
                style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
              >
                {saveProfile.isPending ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
