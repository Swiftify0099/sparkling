import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  electricianName: string;
  onSubmit: (rating: number, review: string) => void;
}

export default function RatingModal({ open, onClose, electricianName, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    await onSubmit(rating, review);
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
          <DialogTitle className="text-white">Rate Your Experience</DialogTitle>
          <DialogDescription style={{ color: 'rgba(255,255,255,0.5)' }}>
            How was your experience with {electricianName}?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          {/* Stars */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className="w-10 h-10"
                  style={{
                    color: star <= (hovered || rating) ? '#F5C518' : 'rgba(255,255,255,0.2)',
                    fill: star <= (hovered || rating) ? '#F5C518' : 'transparent',
                  }}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-sm font-medium" style={{ color: '#F5C518' }}>
              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
            </p>
          )}

          <Textarea
            placeholder="Share your experience (optional)..."
            value={review}
            onChange={e => setReview(e.target.value)}
            className="w-full resize-none"
            rows={3}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            }}
          />

          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', backgroundColor: 'transparent' }}
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || submitting}
              className="flex-1 font-semibold"
              style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
            >
              {submitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
