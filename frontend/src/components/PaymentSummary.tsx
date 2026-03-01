import React from 'react';
import { CreditCard, Info } from 'lucide-react';

interface PaymentSummaryProps {
  serviceAmount: number;
  commissionRate?: number;
  serviceName: string;
}

export default function PaymentSummary({ serviceAmount, commissionRate = 0.1, serviceName }: PaymentSummaryProps) {
  const commission = serviceAmount * commissionRate;
  const total = serviceAmount + commission;

  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.15)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-4 h-4" style={{ color: '#F5C518' }} />
        <h3 className="text-sm font-semibold text-white">Payment Summary</h3>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>{serviceName}</span>
          <span className="text-white font-medium">₹{serviceAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Platform fee ({(commissionRate * 100).toFixed(0)}%)
            <Info className="w-3 h-3" />
          </span>
          <span className="text-white font-medium">₹{commission.toLocaleString()}</span>
        </div>
        <div
          className="border-t pt-2 flex justify-between"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <span className="font-semibold text-white">Total</span>
          <span className="font-bold text-lg" style={{ color: '#F5C518' }}>
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
