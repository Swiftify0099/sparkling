import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

const DEMO_TRANSACTIONS = [
  { id: 'T001', job: 'Wiring Repair - Sharma Residence', amount: 1800, commission: 180, net: 1620, date: '2026-02-28', status: 'paid' },
  { id: 'T002', job: 'Panel Upgrade - Office Complex', amount: 5500, commission: 550, net: 4950, date: '2026-02-25', status: 'paid' },
  { id: 'T003', job: 'Emergency Repair - Gupta Home', amount: 2200, commission: 220, net: 1980, date: '2026-02-22', status: 'pending' },
  { id: 'T004', job: 'New Installation - Retail Store', amount: 3800, commission: 380, net: 3420, date: '2026-02-18', status: 'paid' },
];

export default function EarningsPanel() {
  const totalEarned = DEMO_TRANSACTIONS.filter(t => t.status === 'paid').reduce((s, t) => s + t.net, 0);
  const pendingBalance = DEMO_TRANSACTIONS.filter(t => t.status === 'pending').reduce((s, t) => s + t.net, 0);

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.2)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="w-4 h-4" style={{ color: '#F5C518' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Total Earned</span>
          </div>
          <p className="text-2xl font-black" style={{ color: '#F5C518' }}>
            ₹{totalEarned.toLocaleString()}
          </p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4" style={{ color: '#FB923C' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Pending</span>
          </div>
          <p className="text-2xl font-black" style={{ color: '#FB923C' }}>
            ₹{pendingBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Transaction history */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Transaction History</h3>
        <div className="space-y-2">
          {DEMO_TRANSACTIONS.map(t => (
            <div
              key={t.id}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{t.job}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.date}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: t.status === 'paid' ? 'rgba(52,211,153,0.15)' : 'rgba(251,146,60,0.15)',
                      color: t.status === 'paid' ? '#34D399' : '#FB923C',
                    }}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
              <div className="text-right ml-3">
                <p className="text-sm font-bold text-white">₹{t.net.toLocaleString()}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  -₹{t.commission} fee
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
