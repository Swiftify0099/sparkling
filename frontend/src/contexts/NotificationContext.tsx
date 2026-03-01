import React, { createContext, useContext, useState, useCallback } from 'react';

export type NotificationType = 'booking' | 'verification' | 'payment' | 'contract' | 'dispute' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  addNotification: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'booking', title: 'Booking Confirmed', message: 'Your booking with Rajesh Kumar has been confirmed for tomorrow at 10 AM.', timestamp: new Date(Date.now() - 3600000), read: false },
  { id: '2', type: 'verification', title: 'Verification Update', message: 'Your documents have been submitted and are under review.', timestamp: new Date(Date.now() - 7200000), read: false },
  { id: '3', type: 'payment', title: 'Payment Received', message: '₹1,200 has been credited to your account for job #JB-2024-001.', timestamp: new Date(Date.now() - 86400000), read: true },
  { id: '4', type: 'contract', title: 'New Government Contract', message: 'A new contract for Municipal Street Lighting has been posted in your area.', timestamp: new Date(Date.now() - 172800000), read: true },
  { id: '5', type: 'system', title: 'Platform Update', message: 'Sparkling v2.1 is now live with improved booking features.', timestamp: new Date(Date.now() - 259200000), read: true },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const addNotification = useCallback((n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    setNotifications(prev => [{
      ...n,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }, ...prev]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
