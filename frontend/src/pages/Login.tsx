import React, { useState } from 'react';
import { Zap, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { type UserProfile } from '../backend';

const ROLES = [
  {
    id: 'super_admin',
    label: 'Super Admin',
    email: 'admin@sparkling.com',
    password: 'Admin@123',
    description: 'Full platform control',
    color: '#F87171',
  },
  {
    id: 'electrician_admin',
    label: 'Electrician Admin',
    email: 'eladmin@sparkling.com',
    password: 'ElecAdmin@123',
    description: 'Manage electricians & verifications',
    color: '#60A5FA',
  },
  {
    id: 'electrician',
    label: 'Electrician',
    email: 'electrician@sparkling.com',
    password: 'Elec@123',
    description: 'Service provider dashboard',
    color: '#34D399',
  },
  {
    id: 'customer',
    label: 'Customer',
    email: 'customer@sparkling.com',
    password: 'Customer@123',
    description: 'Book electrical services',
    color: '#F5C518',
  },
  {
    id: 'contractor',
    label: 'Contractor',
    email: 'contractor@sparkling.com',
    password: 'Contract@123',
    description: 'Bulk hiring & government contracts',
    color: '#A78BFA',
  },
];

const ROLE_DASHBOARD: Record<string, string> = {
  super_admin: '/super-admin',
  electrician_admin: '/electrician-admin',
  electrician: '/electrician-dashboard',
  customer: '/home',
  contractor: '/home',
};

const DEMO_NAMES: Record<string, string> = {
  super_admin: 'Admin User',
  electrician_admin: 'Electrician Admin',
  electrician: 'Rajesh Kumar',
  customer: 'Priya Sharma',
  contractor: 'BuildTech Corp',
};

interface LoginProps {
  onNavigate: (path: string) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState(ROLES[3]);
  const [email, setEmail] = useState(ROLES[3].email);
  const [password, setPassword] = useState(ROLES[3].password);
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { login, identity, isLoggingIn } = useInternetIdentity();
  const saveProfile = useSaveCallerUserProfile();

  const handleRoleSelect = (role: typeof ROLES[0]) => {
    setSelectedRole(role);
    setEmail(role.email);
    setPassword(role.password);
    setError('');
    setDropdownOpen(false);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    // Validate credentials match the selected role
    const matchedRole = ROLES.find(r => r.email === email && r.password === password);
    if (!matchedRole) {
      setError('Invalid credentials. Please use the default credentials shown.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // If not authenticated, trigger Internet Identity login
      if (!identity) {
        login();
        // After login, the identity will be set and we'll save the profile
        // For demo purposes, we save the profile directly
      }

      // Save profile with role
      const profile: UserProfile = {
        name: DEMO_NAMES[matchedRole.id] || matchedRole.label,
        email: matchedRole.email,
        phone: '+91 98765 43210',
        role: matchedRole.id,
        location: 'Central City',
      };

      await saveProfile.mutateAsync(profile);
      onNavigate(ROLE_DASHBOARD[matchedRole.id] || '/home');
    } catch (err) {
      // If actor not available (not authenticated), navigate anyway for demo
      onNavigate(ROLE_DASHBOARD[matchedRole.id] || '/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#0F0F1E' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #F5C518, transparent)', transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #F5C518, transparent)', transform: 'translate(-30%, 30%)' }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 spark-glow"
            style={{ backgroundColor: '#F5C518' }}
          >
            <Zap className="w-9 h-9" style={{ color: '#0F0F1E' }} fill="#0F0F1E" />
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: '#F5C518' }}>SPARKLING</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Power Your World</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 shadow-2xl"
          style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.15)' }}
        >
          <h2 className="text-xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Select your role to auto-fill demo credentials
          </p>

          {/* Role selector */}
          <div className="mb-4">
            <Label className="text-white text-sm mb-2 block">Login As</Label>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${selectedRole.color}40`,
                  color: 'white',
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: selectedRole.color }}
                  />
                  <span className="font-medium">{selectedRole.label}</span>
                  <span className="text-xs opacity-50">— {selectedRole.description}</span>
                </div>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-50 shadow-2xl"
                  style={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(245,197,24,0.2)' }}
                >
                  {ROLES.map(role => (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: role.color }}
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{role.label}</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{role.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Credentials hint */}
          <div
            className="rounded-lg px-3 py-2 mb-4 text-xs"
            style={{ backgroundColor: `${selectedRole.color}10`, border: `1px solid ${selectedRole.color}30` }}
          >
            <span style={{ color: selectedRole.color }}>Demo credentials auto-filled</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}> — you can review them below</span>
          </div>

          {/* Email */}
          <div className="mb-3">
            <Label className="text-white text-sm mb-1.5 block">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <Label className="text-white text-sm mb-1.5 block">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pr-10"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-4 px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#F87171' }}
            >
              {error}
            </div>
          )}

          {/* Login button */}
          <Button
            onClick={handleLogin}
            disabled={loading || isLoggingIn}
            className="w-full h-11 font-bold text-base"
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            {loading || isLoggingIn ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              `Login as ${selectedRole.label}`
            )}
          </Button>

          {/* Register links */}
          <div className="mt-4 flex flex-col gap-2 text-center">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              New customer or contractor?{' '}
              <button
                onClick={() => onNavigate('/register')}
                className="font-medium underline"
                style={{ color: '#F5C518' }}
              >
                Register here
              </button>
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Are you an electrician?{' '}
              <button
                onClick={() => onNavigate('/electrician-register')}
                className="font-medium underline"
                style={{ color: '#F5C518' }}
              >
                Join as Electrician
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'sparkling-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: 'rgba(245,197,24,0.5)' }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
