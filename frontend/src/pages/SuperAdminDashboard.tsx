import React, { useState } from 'react';
import {
  Users, Zap, CheckCircle, DollarSign, AlertTriangle, Image, Bell,
  TrendingUp, Shield, XCircle, Eye, BarChart2, Package, FileText
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useListApprovals, useSetApproval, useGetCallerUserProfile } from '../hooks/useQueries';
import { ApprovalStatus } from '../backend';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

const SIDEBAR_ITEMS = [
  { icon: <BarChart2 className="w-4 h-4" />, label: 'Overview', path: '/super-admin' },
  { icon: <Users className="w-4 h-4" />, label: 'User Management', path: '/super-admin/users' },
  { icon: <Shield className="w-4 h-4" />, label: 'Verification Queue', path: '/super-admin/verification' },
  { icon: <DollarSign className="w-4 h-4" />, label: 'Revenue', path: '/super-admin/revenue' },
  { icon: <AlertTriangle className="w-4 h-4" />, label: 'Disputes', path: '/super-admin/disputes' },
  { icon: <Image className="w-4 h-4" />, label: 'Banners', path: '/super-admin/banners' },
  { icon: <Package className="w-4 h-4" />, label: 'Products', path: '/super-admin/products' },
  { icon: <Bell className="w-4 h-4" />, label: 'Notifications', path: '/super-admin/notifications' },
];

const METRIC_CARDS = [
  { label: 'Total Users', value: '12,847', icon: <Users className="w-5 h-5" />, color: '#60A5FA', change: '+12%' },
  { label: 'Active Electricians', value: '3,241', icon: <Zap className="w-5 h-5" />, color: '#34D399', change: '+8%' },
  { label: 'Pending Verifications', value: '47', icon: <Shield className="w-5 h-5" />, color: '#FB923C', change: '-3' },
  { label: "Revenue Today", value: '₹84,320', icon: <DollarSign className="w-5 h-5" />, color: '#F5C518', change: '+22%' },
];

const DEMO_DISPUTES = [
  { id: 'D001', customer: 'Priya Sharma', electrician: 'Rajesh Kumar', issue: 'Work not completed as agreed', status: 'open', date: '2026-02-28' },
  { id: 'D002', customer: 'Ankit Mehta', electrician: 'Suresh Patel', issue: 'Overcharged for service', status: 'under_review', date: '2026-02-25' },
  { id: 'D003', customer: 'Sunita Rao', electrician: 'Amit Singh', issue: 'No-show without notice', status: 'resolved', date: '2026-02-20' },
];

const DEMO_REVENUE = [
  { date: '2026-02-28', bookings: 142, gross: 84320, commission: 8432, net: 75888 },
  { date: '2026-02-27', bookings: 138, gross: 79450, commission: 7945, net: 71505 },
  { date: '2026-02-26', bookings: 155, gross: 92100, commission: 9210, net: 82890 },
  { date: '2026-02-25', bookings: 121, gross: 68900, commission: 6890, net: 62010 },
  { date: '2026-02-24', bookings: 167, gross: 98750, commission: 9875, net: 88875 },
];

interface SuperAdminDashboardProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export default function SuperAdminDashboard({ onNavigate, currentPath }: SuperAdminDashboardProps) {
  const { data: profile } = useGetCallerUserProfile();
  const { data: approvals = [], isLoading: approvalsLoading } = useListApprovals();
  const setApproval = useSetApproval();
  const [rejectReason, setRejectReason] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('overview');
  const [broadcastMsg, setBroadcastMsg] = useState('');

  const pendingApprovals = approvals.filter(a => a.status === ApprovalStatus.pending);

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
        role="Super Admin"
        userName={profile?.name || 'Admin'}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-white">Super Admin Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Full platform control & analytics
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              className="mb-6 flex flex-wrap gap-1 h-auto p-1 rounded-xl"
              style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {['overview', 'users', 'verification', 'revenue', 'disputes', 'banners', 'notifications'].map(tab => (
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
                {METRIC_CARDS.map(card => (
                  <div
                    key={card.label}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${card.color}18`, color: card.color }}
                      >
                        {card.icon}
                      </div>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: 'rgba(52,211,153,0.1)', color: '#34D399' }}
                      >
                        {card.change}
                      </span>
                    </div>
                    <p className="text-2xl font-black text-white">{card.value}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{card.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" style={{ color: '#F5C518' }} />
                    Platform Health
                  </h3>
                  {[
                    { label: 'Avg. Response Time', value: '18 min', good: true },
                    { label: 'Job Completion Rate', value: '94.2%', good: true },
                    { label: 'Customer Satisfaction', value: '4.7/5', good: true },
                    { label: 'Open Disputes', value: '12', good: false },
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</span>
                      <span className="text-sm font-bold" style={{ color: stat.good ? '#34D399' : '#F87171' }}>{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" style={{ color: '#FB923C' }} />
                    Pending Actions
                  </h3>
                  {[
                    { label: 'Electrician Verifications', value: pendingApprovals.length, action: () => setActiveTab('verification') },
                    { label: 'Open Disputes', value: 12, action: () => setActiveTab('disputes') },
                    { label: 'Inactive Banners', value: 3, action: () => setActiveTab('banners') },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                      <button
                        onClick={item.action}
                        className="text-sm font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: 'rgba(245,197,24,0.1)', color: '#F5C518' }}
                      >
                        {item.value} pending
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Users */}
            <TabsContent value="users">
              <div
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <h3 className="font-semibold text-white">All Users</h3>
                  <Input
                    placeholder="Search users..."
                    className="w-48"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      {['Principal', 'Status', 'Actions'].map(h => (
                        <TableHead key={h} style={{ color: 'rgba(255,255,255,0.4)' }}>{h}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvalsLoading ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          Loading users...
                        </TableCell>
                      </TableRow>
                    ) : approvals.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : approvals.map(a => (
                      <TableRow key={a.principal.toString()} style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                        <TableCell className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {a.principal.toString().slice(0, 20)}...
                        </TableCell>
                        <TableCell>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                            style={{
                              backgroundColor: a.status === ApprovalStatus.approved ? 'rgba(52,211,153,0.12)' : a.status === ApprovalStatus.rejected ? 'rgba(248,113,113,0.12)' : 'rgba(251,146,60,0.12)',
                              color: a.status === ApprovalStatus.approved ? '#34D399' : a.status === ApprovalStatus.rejected ? '#F87171' : '#FB923C',
                            }}
                          >
                            {a.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {a.status !== ApprovalStatus.approved && (
                              <Button
                                size="sm"
                                onClick={() => handleApprove(a.principal.toString())}
                                disabled={setApproval.isPending}
                                className="h-7 text-xs"
                                style={{ backgroundColor: 'rgba(52,211,153,0.15)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)' }}
                              >
                                Approve
                              </Button>
                            )}
                            {a.status !== ApprovalStatus.rejected && (
                              <Button
                                size="sm"
                                onClick={() => handleReject(a.principal.toString())}
                                disabled={setApproval.isPending}
                                className="h-7 text-xs"
                                style={{ backgroundColor: 'rgba(248,113,113,0.15)', color: '#F87171', border: '1px solid rgba(248,113,113,0.3)' }}
                              >
                                Reject
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Verification Queue */}
            <TabsContent value="verification">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Electrician Verification Queue</h3>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-bold"
                    style={{ backgroundColor: 'rgba(251,146,60,0.15)', color: '#FB923C' }}
                  >
                    {pendingApprovals.length} pending
                  </span>
                </div>

                {pendingApprovals.length === 0 ? (
                  <div
                    className="rounded-xl p-8 text-center"
                    style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: '#34D399' }} />
                    <p className="text-white font-medium">All caught up!</p>
                    <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>No pending verifications</p>
                  </div>
                ) : (
                  pendingApprovals.map(a => (
                    <div
                      key={a.principal.toString()}
                      className="rounded-xl p-4"
                      style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(251,146,60,0.2)' }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                            style={{ backgroundColor: 'rgba(245,197,24,0.12)', color: '#F5C518' }}
                          >
                            E
                          </div>
                          <div>
                            <p className="font-semibold text-white">Electrician Application</p>
                            <p className="text-xs font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                              {a.principal.toString().slice(0, 30)}...
                            </p>
                            <div className="flex gap-2 mt-2">
                              {['Aadhar', 'PAN', 'Certificate'].map(doc => (
                                <span
                                  key={doc}
                                  className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                                  style={{ backgroundColor: 'rgba(96,165,250,0.1)', color: '#60A5FA' }}
                                >
                                  <Eye className="w-3 h-3" /> {doc}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(a.principal.toString())}
                            disabled={setApproval.isPending}
                            className="flex items-center gap-1"
                            style={{ backgroundColor: 'rgba(52,211,153,0.15)', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)' }}
                          >
                            <CheckCircle className="w-3 h-3" /> Approve
                          </Button>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Rejection reason..."
                              value={rejectReason[a.principal.toString()] || ''}
                              onChange={e => setRejectReason(prev => ({ ...prev, [a.principal.toString()]: e.target.value }))}
                              className="h-8 text-xs w-40"
                              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                            />
                            <Button
                              size="sm"
                              onClick={() => handleReject(a.principal.toString())}
                              disabled={setApproval.isPending}
                              className="flex items-center gap-1"
                              style={{ backgroundColor: 'rgba(248,113,113,0.15)', color: '#F87171', border: '1px solid rgba(248,113,113,0.3)' }}
                            >
                              <XCircle className="w-3 h-3" /> Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Revenue */}
            <TabsContent value="revenue">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[
                    { label: 'Total Revenue (MTD)', value: '₹24,82,450', color: '#F5C518' },
                    { label: 'Commission Collected', value: '₹2,48,245', color: '#34D399' },
                    { label: 'Pending Payouts', value: '₹1,12,300', color: '#FB923C' },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                      <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <h3 className="font-semibold text-white">Daily Revenue Breakdown</h3>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                        {['Date', 'Bookings', 'Gross Revenue', 'Commission (10%)', 'Net Payout'].map(h => (
                          <TableHead key={h} style={{ color: 'rgba(255,255,255,0.4)' }}>{h}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {DEMO_REVENUE.map(r => (
                        <TableRow key={r.date} style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                          <TableCell style={{ color: 'rgba(255,255,255,0.7)' }}>{r.date}</TableCell>
                          <TableCell style={{ color: 'rgba(255,255,255,0.7)' }}>{r.bookings}</TableCell>
                          <TableCell className="font-medium text-white">₹{r.gross.toLocaleString()}</TableCell>
                          <TableCell style={{ color: '#34D399' }}>₹{r.commission.toLocaleString()}</TableCell>
                          <TableCell style={{ color: '#F5C518' }}>₹{r.net.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Disputes */}
            <TabsContent value="disputes">
              <div className="space-y-3">
                {DEMO_DISPUTES.map(d => (
                  <div
                    key={d.id}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: '#1E1E32', border: `1px solid ${d.status === 'open' ? 'rgba(248,113,113,0.2)' : 'rgba(255,255,255,0.06)'}` }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>#{d.id}</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                            style={{
                              backgroundColor: d.status === 'open' ? 'rgba(248,113,113,0.12)' : d.status === 'resolved' ? 'rgba(52,211,153,0.12)' : 'rgba(251,146,60,0.12)',
                              color: d.status === 'open' ? '#F87171' : d.status === 'resolved' ? '#34D399' : '#FB923C',
                            }}
                          >
                            {d.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white">{d.issue}</p>
                        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {d.customer} vs {d.electrician} · {d.date}
                        </p>
                      </div>
                      {d.status !== 'resolved' && (
                        <Button
                          size="sm"
                          className="text-xs"
                          style={{ backgroundColor: 'rgba(245,197,24,0.1)', color: '#F5C518', border: '1px solid rgba(245,197,24,0.2)' }}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Banners */}
            <TabsContent value="banners">
              <div
                className="rounded-xl p-6 text-center"
                style={{ backgroundColor: '#1E1E32', border: '1px dashed rgba(245,197,24,0.3)' }}
              >
                <Image className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: '#F5C518' }} />
                <p className="text-white font-medium mb-1">Banner Management</p>
                <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Upload promotional banners for brands. Target by location or show globally.
                </p>
                <Button style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}>
                  Upload New Banner
                </Button>
              </div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <h3 className="font-semibold text-white mb-4">Broadcast Notification</h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Notification message..."
                    value={broadcastMsg}
                    onChange={e => setBroadcastMsg(e.target.value)}
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  />
                  <div className="flex gap-2">
                    {['All Users', 'Electricians', 'Customers', 'Contractors'].map(target => (
                      <Button
                        key={target}
                        size="sm"
                        className="text-xs"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        {target}
                      </Button>
                    ))}
                  </div>
                  <Button
                    disabled={!broadcastMsg}
                    style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
                  >
                    Send Broadcast
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
