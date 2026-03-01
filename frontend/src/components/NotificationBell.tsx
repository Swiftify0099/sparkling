import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import NotificationsPanel from './NotificationsPanel';

export default function NotificationBell() {
  const { unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg transition-colors"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center"
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50">
            <NotificationsPanel onClose={() => setOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}
