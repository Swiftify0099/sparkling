import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface ContractApplicationModalProps {
  open: boolean;
  onClose: () => void;
  contractTitle: string;
  onSubmit: (bidAmount: number, teamSize: number, notes: string) => void;
}

export default function ContractApplicationModal({
  open,
  onClose,
  contractTitle,
  onSubmit,
}: ContractApplicationModalProps) {
  const [bidAmount, setBidAmount] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!bidAmount || !teamSize) return;
    setSubmitting(true);
    await onSubmit(Number(bidAmount), Number(teamSize), notes);
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md"
        style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.2)', color: 'white' }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Apply for Contract</DialogTitle>
          <DialogDescription style={{ color: 'rgba(255,255,255,0.5)' }}>
            {contractTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label className="text-white text-sm mb-1.5 block">Bid Amount (₹) *</Label>
            <Input
              type="number"
              placeholder="Enter your bid amount"
              value={bidAmount}
              onChange={e => setBidAmount(e.target.value)}
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>
          <div>
            <Label className="text-white text-sm mb-1.5 block">Team Size *</Label>
            <Input
              type="number"
              placeholder="Number of electricians"
              value={teamSize}
              onChange={e => setTeamSize(e.target.value)}
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>
          <div>
            <Label className="text-white text-sm mb-1.5 block">Additional Notes</Label>
            <Textarea
              placeholder="Describe your approach, experience, timeline..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', backgroundColor: 'transparent' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!bidAmount || !teamSize || submitting}
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
