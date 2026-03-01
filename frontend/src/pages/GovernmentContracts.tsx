import React, { useState } from 'react';
import { FileText, MapPin, Calendar, DollarSign, Building, ArrowRight, CheckCircle, Clock, XCircle } from 'lucide-react';
import ContractApplicationModal from '../components/ContractApplicationModal';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DEMO_CONTRACTS = [
  {
    id: 'GC001', title: 'Municipal Street Lighting Upgrade', authority: 'Delhi Municipal Corporation',
    location: 'Central City', scope: 'Replace 2,400 street lights with LED fixtures across 12 zones',
    budgetMin: 2500000, budgetMax: 3500000, deadline: '2026-04-30', status: 'open', applicants: 8,
  },
  {
    id: 'GC002', title: 'Government Hospital Electrical Rewiring', authority: 'State Health Department',
    location: 'North District', scope: 'Complete electrical rewiring of 3-floor hospital building (120,000 sq ft)',
    budgetMin: 1800000, budgetMax: 2200000, deadline: '2026-05-15', status: 'open', applicants: 5,
  },
  {
    id: 'GC003', title: 'Solar Panel Installation — Public Schools', authority: 'Education Ministry',
    location: 'East Zone', scope: 'Install 500kW solar panels across 25 government schools',
    budgetMin: 4000000, budgetMax: 5500000, deadline: '2026-06-01', status: 'open', applicants: 12,
  },
  {
    id: 'GC004', title: 'Industrial Zone Power Distribution', authority: 'Industrial Development Authority',
    location: 'Industrial Area', scope: 'Install HT/LT distribution network for new industrial zone (Phase 2)',
    budgetMin: 8000000, budgetMax: 12000000, deadline: '2026-07-31', status: 'open', applicants: 3,
  },
];

const MY_APPLICATIONS = [
  { contractId: 'GC001', title: 'Municipal Street Lighting Upgrade', bidAmount: 2800000, teamSize: 15, status: 'under_review', submittedDate: '2026-02-20' },
  { contractId: 'GC003', title: 'Solar Panel Installation — Public Schools', bidAmount: 4500000, teamSize: 25, status: 'submitted', submittedDate: '2026-02-25' },
];

interface GovernmentContractsProps {
  onNavigate: (path: string) => void;
}

export default function GovernmentContracts({ onNavigate }: GovernmentContractsProps) {
  const { data: profile } = useGetCallerUserProfile();
  const [applyModal, setApplyModal] = useState<{ open: boolean; contract: typeof DEMO_CONTRACTS[0] | null }>({ open: false, contract: null });
  const [activeTab, setActiveTab] = useState('contracts');

  const isContractor = profile?.role === 'contractor';

  const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    submitted: { color: '#60A5FA', icon: <Clock className="w-3 h-3" />, label: 'Submitted' },
    under_review: { color: '#FB923C', icon: <Clock className="w-3 h-3" />, label: 'Under Review' },
    awarded: { color: '#34D399', icon: <CheckCircle className="w-3 h-3" />, label: 'Awarded' },
    rejected: { color: '#F87171', icon: <XCircle className="w-3 h-3" />, label: 'Rejected' },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white mb-1">Government Contracts</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Bid on municipal and state electrical projects
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList
          className="mb-6 h-auto p-1 rounded-xl"
          style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <TabsTrigger value="contracts" className="text-sm px-4 py-2 rounded-lg data-[state=active]:text-black" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Available Contracts ({DEMO_CONTRACTS.length})
          </TabsTrigger>
          {isContractor && (
            <TabsTrigger value="applications" className="text-sm px-4 py-2 rounded-lg data-[state=active]:text-black" style={{ color: 'rgba(255,255,255,0.5)' }}>
              My Applications ({MY_APPLICATIONS.length})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="contracts">
          <div className="space-y-4">
            {DEMO_CONTRACTS.map(contract => (
              <div
                key={contract.id}
                className="rounded-xl p-5"
                style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>#{contract.id}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: 'rgba(52,211,153,0.12)', color: '#34D399' }}
                      >
                        Open
                      </span>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {contract.applicants} applicants
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{contract.title}</h3>

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <Building className="w-3 h-3" style={{ color: '#60A5FA' }} />
                        {contract.authority}
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <MapPin className="w-3 h-3" style={{ color: '#F5C518' }} />
                        {contract.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <Calendar className="w-3 h-3" style={{ color: '#FB923C' }} />
                        Deadline: {contract.deadline}
                      </div>
                    </div>

                    <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>{contract.scope}</p>

                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" style={{ color: '#F5C518' }} />
                      <span className="font-bold" style={{ color: '#F5C518' }}>
                        ₹{(contract.budgetMin / 100000).toFixed(1)}L – ₹{(contract.budgetMax / 100000).toFixed(1)}L
                      </span>
                      <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.4)' }}>budget range</span>
                    </div>
                  </div>

                  {isContractor && (
                    <button
                      onClick={() => setApplyModal({ open: true, contract })}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 flex-shrink-0"
                      style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
                    >
                      Apply <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {isContractor && (
          <TabsContent value="applications">
            <div className="space-y-4">
              {MY_APPLICATIONS.map(app => {
                const config = statusConfig[app.status];
                return (
                  <div
                    key={app.contractId}
                    className="rounded-xl p-5"
                    style={{ backgroundColor: '#1E1E32', border: `1px solid ${config.color}30` }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-white mb-1">{app.title}</h3>
                        <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          Submitted: {app.submittedDate}
                        </p>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Your Bid</p>
                            <p className="font-bold" style={{ color: '#F5C518' }}>
                              ₹{(app.bidAmount / 100000).toFixed(1)}L
                            </p>
                          </div>
                          <div>
                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Team Size</p>
                            <p className="font-bold text-white">{app.teamSize} electricians</p>
                          </div>
                        </div>
                      </div>
                      <span
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{ backgroundColor: `${config.color}15`, color: config.color }}
                      >
                        {config.icon}
                        {config.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        )}
      </Tabs>

      {applyModal.contract && (
        <ContractApplicationModal
          open={applyModal.open}
          onClose={() => setApplyModal({ open: false, contract: null })}
          contractTitle={applyModal.contract.title}
          onSubmit={async (bidAmount, teamSize, notes) => {
            console.log('Application submitted:', { contractId: applyModal.contract?.id, bidAmount, teamSize, notes });
            setApplyModal({ open: false, contract: null });
          }}
        />
      )}
    </div>
  );
}
