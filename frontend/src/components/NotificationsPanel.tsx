import React from 'react';
import { X, CheckCheck, CreditCard, FileText, AlertTriangle, Zap, BookOpen, Bell } from 'lucide-react';
import { useNotifications, type NotificationType } from '../contexts/NotificationContext';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationsPanelProps {
  onClose: () => void;
}

const typeConfig: Record<NotificationType, { icon: React.ReactNode; color: string }> = {
  booking: { icon: <BookOpen className="w-4 h-4" />, color: '#60A5FA' },
  verification: { icon: <CheckCheck className="w-4 h-4" />, color: '#34D399' },
  payment: { icon: <CreditCard className="w-4 h-4" />, color: '#F5C518' },
  contract: { icon: <FileText className="w-4 h-4" />, color: '#A78BFA' },
  dispute: { icon: <AlertTriangle className="w-4 h-4" />, color: '#F87171' },
  system: { icon: <Zap className="w-4 h-4" />, color: '#FB923C' },
};

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const { notifications, unreadCount, markAllRead } = useNotifications();

  return (
    <div
      className="w-80 rounded-xl shadow-2xl overflow-hidden"
      style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.2)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span
              className="px-1.5 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-medium transition-colors"
              style={{ color: '#F5C518' }}
            >
              Mark all read
            </button>
          )}
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.4)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <ScrollArea className="h-80">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <Bell className="w-8 h-8 opacity-20" style={{ color: 'white' }} />
            <p className="text-sm opacity-40 text-white">No notifications</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            {notifications.map(n => {
              const config = typeConfig[n.type];
              return (
                <div
                  key={n.id}
                  className="px-4 py-3 flex gap-3 transition-colors"
                  style={{ backgroundColor: n.read ? 'transparent' : 'rgba(245,197,24,0.04)' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                  >
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-white leading-tight">{n.title}</p>
                      {!n.read && (
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                          style={{ backgroundColor: '#F5C518' }}
                        />
                      )}
                    </div>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {n.message}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {timeAgo(n.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
