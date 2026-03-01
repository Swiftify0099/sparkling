import React, { useState } from 'react';
import {
  Users, Shield, DollarSign, BarChart2, CheckCircle, XCircle, Eye, Star, TrendingUp
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useListApprovals, useSetApproval, useGetCallerUserProfile } from '../hooks/useQueries';
import { ApprovalStatus } from '../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const SIDEBAR_ITEMS = [
  { icon: <BarChart2 className="w-4 h-4" />, label: 'Overview', path: '/electrician-admin' },
  { icon: <Users className="w-4 h-4" />, label: 'My Electricians', path: '/electrician-admin/electricians' },
  { icon: <Shield className="w-4 h-4" />, label: 'Verification', path: '/electrician-admin/verification' },
  { icon: <DollarSign className="w-4 h-4" />, label: 'Payments', path: '/electrician-admin/payments' },
  { icon: <TrendingUp className="w-4 h-4" />, label: 'Performance', path: '/electrician-admin/performance' },
];

const DEMO_ELECTRICIANS = [
  { id: '1', name: 'Rajesh Kumar', status: 'verified', location: 'Central City', rating: 4.9, jobs: 234, earnings: 142000, commission: 14200 },
  { id: '2', name: 'Suresh Patel', status: 'verified', location: 'North District', rating: 4.8, jobs: 189, earnings: 98000, commission: 9800 },
  { id: '3', name: 'Amit Singh', status: 'pending', location: 'South District', rating: 0, jobs: 0, earnings: 0, commission: 0 },
  { id: '4', name: 'Vikram Sharma', status: 'verified', location: 'East Zone', rating: 4.6, jobs: 98, earnings: 76000, commission: 7600 },
  { id: '5', name: 'Deepak Verma', status: 'rejected', location: 'West Zone', rating: 0, jobs: 0, earnings: 0, commission: 0 },
];

interface ElectricianAdminDashboardProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export default function ElectricianAdminDashboard({ onNavigate, currentPath }: ElectricianAdminDashboardProps) {
  const { data: profile } = useGetCallerUserProfile();
  const { data: approvals = [] } = useListApprovals();
  const setApproval = useSetApproval();
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');

  const pendingApprovals = approvals.filter(a => a.status === ApprovalStatus.pending);

  const filteredElectricians = DEMO_ELECTRICIANS.filter(e =>
    statusFilter === 'all' || e.status === statusFilter
  );

  const handleApprove = async (principal: string) => {
    const { Principal } = await import('@dfinity/principal');
    await setApproval.mutateAsync({ user: Principal.fromText(principal), status: ApprovalStatus.approved });
  };

  const handleReject = async (principal: string) => {
    const { Principal } = await import('@dfinity/principal');
    await setApproval.mutateAsync({ user: Principal.fromText(principal), status: ApprovalStatus.rejected });
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0F0F1E' }}>
      <Sidebar
        items={SIDEBAR_ITEMS}
        currentPath={currentPath}
        onNavigate={onNavigate}
        role="Electrician Admin"
        userName={profile?.name || 'El. Admin'}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-white">Electrician Admin Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Manage your electricians, verifications & payments
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className="mb-6 flex flex-wrap gap-1 h-auto p-1 rounded-xl"
              style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {['overview', 'electricians', 'verification', 'payments', 'performance'].map(tab => (
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

            {/* Overview */}
            <TabsContent value="overview">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Electricians', value: DEMO_ELECTRICIANS.length, color: '#60A5FA' },
                  { label: 'Verified', value: DEMO_ELECTRICIANS.filter(e => e.status === 'verified').length, color: '#34D399' },
                  { label: 'Pending Review', value: pendingApprovals.length + DEMO_ELECTRICIANS.filter(e => e.status === 'pending').length, color: '#FB923C' },
                  { label: 'Total Earnings', value: '₹3.16L', color: '#F5C518' },
                ].map(card => (
                  <div key={card.label} className="rounded-xl p-4" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-2xl font-black" style={{ color: card.color }}>{card.value}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{card.label}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Electricians list */}
            <TabsContent value="electricians">
              <div className="mb-4 flex gap-2 flex-wrap">
                {['all', 'verified', 'pending', 'rejected'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                    style={{
                      backgroundColor: statusFilter === s ? 'rgba(245,197,24,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${statusFilter === s ? 'rgba(245,197,24,0.4)' : 'rgba(255,255,255,0.1)'}`,
                      color: statusFilter === s ? '#F5C518' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredElectricians.map(el => (
                  <div
                    key={el.id}
                    className="rounded-xl p-4 flex items-center gap-4"
                    style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0"
                      style={{ backgroundColor: 'rgba(245,197,24,0.12)', color: '#F5C518' }}
                    >
                      {el.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white">{el.name}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{el.location}</p>
                      {el.rating > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3" style={{ color: '#F5C518', fill: '#F5C518' }} />
                          <span className="text-xs text-white">{el.rating}</span>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>· {el.jobs} jobs</span>
                        </div>
                      )}
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium capitalize"
                      style={{
                        backgroundColor: el.status === 'verified' ? 'rgba(52,211,153,0.12)' : el.status === 'rejected' ? 'rgba(248,113,113,0.12)' : 'rgba(251,146,60,0.12)',
                        color: el.status === 'verified' ? '#34D399' : el.status === 'rejected' ? '#F87171' : '#FB923C',
                      }}
                    >
                      {el.status}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Verification */}
            <TabsContent value="verification">
              <div className="space-y-3">
                {pendingApprovals.length === 0 ? (
                  <div className="rounded-xl p-8 text-center" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: '#34D399' }} />
                    <p className="text-white font-medium">No pending verifications</p>
                  </div>
                ) : pendingApprovals.map(a => (
                  <div key={a.principal.toString()} className="rounded-xl p-4" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(251,146,60,0.2)' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Pending Application</p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {a.principal.toString().slice(0, 30)}...
                        </p>
                        <div className="flex gap-2 mt-2">
                          {['Aadhar', 'PAN', 'Certificate'].map(doc => (
                            <span key={doc} className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ backgroundColor: 'rgba(96,165,250,0.1)', color: '#60A5FA' }}>
                              <Eye className="w-3 h-3" /> {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleApprove(a.principal.toString())} disabled={setApproval.isPending}
                          style={{ backgroundColor: 'rgba(52,211,153,0.15)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)' }}>
                          <CheckCircle className="w-3 h-3 mr-1" /> Approve
                        </Button>
                        <Button size="sm" onClick={() => handleReject(a.principal.toString())} disabled={setApproval.isPending}
                          style={{ backgroundColor: 'rgba(248,113,113,0.15)', color: '#F87171', border: '1px solid rgba(248,113,113,0.3)' }}>
                          <XCircle className="w-3 h-3 mr-1" /> Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Payments */}
            <TabsContent value="payments">
              <div className="space-y-3">
                {DEMO_ELECTRICIANS.filter(e => e.status === 'verified').map(el => (
                  <div key={el.id} className="rounded-xl p-4" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{el.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{el.jobs} completed jobs</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: '#F5C518' }}>₹{el.earnings.toLocaleString()}</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>-₹{el.commission.toLocaleString()} commission</p>
                        <p className="text-xs font-medium" style={{ color: '#34D399' }}>
                          Net: ₹{(el.earnings - el.commission).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Performance */}
            <TabsContent value="performance">
              <div className="space-y-3">
                {DEMO_ELECTRICIANS.filter(e => e.status === 'verified').map(el => (
                  <div key={el.id} className="rounded-xl p-4" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold" style={{ backgroundColor: 'rgba(245,197,24,0.12)', color: '#F5C518' }}>
                        {el.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{el.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" style={{ color: '#F5C518', fill: '#F5C518' }} />
                            <span className="text-xs text-white">{el.rating}</span>
                          </div>
                          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{el.jobs} jobs</span>
                          <span className="text-xs" style={{ color: el.rating >= 4.5 ? '#34D399' : el.rating >= 3 ? '#FB923C' : '#F87171' }}>
                            {el.rating >= 4.5 ? 'Excellent' : el.rating >= 3 ? 'Good' : 'Needs Improvement'}
                          </span>
                        </div>
                      </div>
                    </div>
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
