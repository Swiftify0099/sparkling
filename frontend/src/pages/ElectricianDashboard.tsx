import React, { useState } from 'react';
import {
  User, Briefcase, DollarSign, FileText, Star, ToggleLeft, ToggleRight,
  CheckCircle, Clock, AlertCircle, Zap
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import EarningsPanel from '../components/EarningsPanel';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const SIDEBAR_ITEMS = [
  { icon: <User className="w-4 h-4" />, label: 'Profile', path: '/electrician-dashboard' },
  { icon: <Briefcase className="w-4 h-4" />, label: 'My Jobs', path: '/electrician-dashboard/jobs' },
  { icon: <DollarSign className="w-4 h-4" />, label: 'Earnings', path: '/electrician-dashboard/earnings' },
  { icon: <FileText className="w-4 h-4" />, label: 'Documents', path: '/electrician-dashboard/documents' },
  { icon: <Star className="w-4 h-4" />, label: 'Reviews', path: '/electrician-dashboard/reviews' },
];

const DEMO_JOBS = [
  { id: 'J001', customer: 'Priya Sharma', service: 'Panel Upgrade', location: 'Central City', date: '2026-03-02', time: '10:00 AM', status: 'upcoming', amount: 3500 },
  { id: 'J002', customer: 'Ankit Mehta', service: 'Wiring Repair', location: 'North District', date: '2026-03-01', time: '2:00 PM', status: 'in_progress', amount: 1800 },
  { id: 'J003', customer: 'Sunita Rao', service: 'New Installation', location: 'South District', date: '2026-02-28', time: '11:00 AM', status: 'completed', amount: 4200 },
  { id: 'J004', customer: 'Ravi Gupta', service: 'Emergency Repair', location: 'East Zone', date: '2026-02-25', time: '9:00 AM', status: 'completed', amount: 2500 },
];

const DEMO_REVIEWS = [
  { id: 'R001', customer: 'Priya Sharma', rating: 5, comment: 'Excellent work! Very professional and completed the job on time.', date: '2026-02-28' },
  { id: 'R002', customer: 'Ankit Mehta', rating: 4, comment: 'Good service, arrived a bit late but did quality work.', date: '2026-02-25' },
  { id: 'R003', customer: 'Sunita Rao', rating: 5, comment: 'Highly recommended! Clean work and fair pricing.', date: '2026-02-20' },
];

const DEMO_DOCUMENTS = [
  { name: 'Aadhar Card', status: 'verified', uploadDate: '2026-01-15' },
  { name: 'PAN Card', status: 'verified', uploadDate: '2026-01-15' },
  { name: 'Trade Certificate', status: 'verified', uploadDate: '2026-01-16' },
  { name: 'Profile Photo', status: 'verified', uploadDate: '2026-01-15' },
];

interface ElectricianDashboardProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export default function ElectricianDashboard({ onNavigate, currentPath }: ElectricianDashboardProps) {
  const { data: profile } = useGetCallerUserProfile();
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  const avgRating = DEMO_REVIEWS.reduce((s, r) => s + r.rating, 0) / DEMO_REVIEWS.length;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0F0F1E' }}>
      <Sidebar
        items={SIDEBAR_ITEMS}
        currentPath={currentPath}
        onNavigate={onNavigate}
        role="Electrician"
        userName={profile?.name || 'Electrician'}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-white">My Dashboard</h1>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Manage your jobs, earnings & profile
              </p>
            </div>
            {/* Availability toggle */}
            <div
              className="flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-sm font-medium" style={{ color: isOnline ? '#34D399' : 'rgba(255,255,255,0.4)' }}>
                {isOnline ? '● Online' : '○ Offline'}
              </span>
              <Switch
                checked={isOnline}
                onCheckedChange={setIsOnline}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className="mb-6 flex flex-wrap gap-1 h-auto p-1 rounded-xl"
              style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {['profile', 'jobs', 'earnings', 'documents', 'reviews'].map(tab => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="capitalize text-xs px-3 py-1.5 rounded-lg data-[state=active]:text-black"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Profile */}
            <TabsContent value="profile">
              <div className="rounded-xl p-6" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black flex-shrink-0"
                    style={{ backgroundColor: 'rgba(245,197,24,0.12)', color: '#F5C518' }}
                  >
                    {profile?.name?.[0] || 'E'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{profile?.name || 'Electrician'}</h2>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{profile?.location}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1"
                        style={{ backgroundColor: 'rgba(52,211,153,0.12)', color: '#34D399' }}
                      >
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" style={{ color: '#F5C518', fill: '#F5C518' }} />
                        <span className="text-xs font-bold text-white">{avgRating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Email', value: profile?.email || 'electrician@sparkling.com' },
                    { label: 'Phone', value: profile?.phone || '+91 98765 43210' },
                    { label: 'Location', value: profile?.location || 'Central City' },
                    { label: 'Role', value: 'Electrician' },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                      <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.label}</p>
                      <p className="text-sm font-medium text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Jobs */}
            <TabsContent value="jobs">
              <div className="space-y-3">
                {['upcoming', 'in_progress', 'completed'].map(status => {
                  const jobs = DEMO_JOBS.filter(j => j.status === status);
                  if (jobs.length === 0) return null;
                  return (
                    <div key={status}>
                      <h3 className="text-sm font-semibold mb-2 capitalize" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {status.replace('_', ' ')} ({jobs.length})
                      </h3>
                      {jobs.map(job => (
                        <div
                          key={job.id}
                          className="rounded-xl p-4 mb-2"
                          style={{
                            backgroundColor: '#1E1E32',
                            border: `1px solid ${status === 'upcoming' ? 'rgba(96,165,250,0.2)' : status === 'in_progress' ? 'rgba(245,197,24,0.2)' : 'rgba(255,255,255,0.06)'}`,
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-white">{job.service}</p>
                              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                {job.customer} · {job.location}
                              </p>
                              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                {job.date} at {job.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold" style={{ color: '#F5C518' }}>₹{job.amount.toLocaleString()}</p>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                                style={{
                                  backgroundColor: status === 'upcoming' ? 'rgba(96,165,250,0.12)' : status === 'in_progress' ? 'rgba(245,197,24,0.12)' : 'rgba(52,211,153,0.12)',
                                  color: status === 'upcoming' ? '#60A5FA' : status === 'in_progress' ? '#F5C518' : '#34D399',
                                }}
                              >
                                {status.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Earnings */}
            <TabsContent value="earnings">
              <EarningsPanel />
            </TabsContent>

            {/* Documents */}
            <TabsContent value="documents">
              <div className="space-y-3">
                {DEMO_DOCUMENTS.map(doc => (
                  <div
                    key={doc.name}
                    className="rounded-xl p-4 flex items-center justify-between"
                    style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(96,165,250,0.1)', color: '#60A5FA' }}
                      >
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{doc.name}</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Uploaded {doc.uploadDate}</p>
                      </div>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ backgroundColor: 'rgba(52,211,153,0.12)', color: '#34D399' }}
                    >
                      ✓ {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews">
              <div className="mb-4 p-4 rounded-xl flex items-center gap-4" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.15)' }}>
                <div className="text-center">
                  <p className="text-4xl font-black" style={{ color: '#F5C518' }}>{avgRating.toFixed(1)}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-3 h-3" style={{ color: s <= Math.round(avgRating) ? '#F5C518' : 'rgba(255,255,255,0.2)', fill: s <= Math.round(avgRating) ? '#F5C518' : 'transparent' }} />
                    ))}
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{DEMO_REVIEWS.length} reviews</p>
                </div>
              </div>
              <div className="space-y-3">
                {DEMO_REVIEWS.map(r => (
                  <div key={r.id} className="rounded-xl p-4" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-white">{r.customer}</p>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className="w-3 h-3" style={{ color: s <= r.rating ? '#F5C518' : 'rgba(255,255,255,0.2)', fill: s <= r.rating ? '#F5C518' : 'transparent' }} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{r.comment}</p>
                    <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{r.date}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
