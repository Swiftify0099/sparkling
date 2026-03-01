import React, { useState } from 'react';
import { Zap, ShoppingCart, Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import NotificationBell from './NotificationBell';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export default function Header({ onNavigate, currentPath }: HeaderProps) {
  const { totalItems } = useCart();
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: profile } = useGetCallerUserProfile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthenticated = !!identity;
  const role = profile?.role || 'guest';

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    onNavigate('/login');
  };

  const navLinks = React.useMemo(() => {
    if (!isAuthenticated) return [];
    switch (role) {
      case 'super_admin': return [{ label: 'Dashboard', path: '/super-admin' }];
      case 'electrician_admin': return [{ label: 'Dashboard', path: '/electrician-admin' }];
      case 'electrician': return [{ label: 'Dashboard', path: '/electrician-dashboard' }];
      case 'contractor': return [
        { label: 'Home', path: '/home' },
        { label: 'Contracts', path: '/contracts' },
        { label: 'Marketplace', path: '/marketplace' },
      ];
      default: return [
        { label: 'Home', path: '/home' },
        { label: 'Find Electricians', path: '/discover' },
        { label: 'Marketplace', path: '/marketplace' },
      ];
    }
  }, [isAuthenticated, role]);

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ backgroundColor: '#0F0F1E', borderColor: 'rgba(245,197,24,0.15)' }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate(isAuthenticated ? '/home' : '/login')}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#F5C518' }}
          >
            <Zap className="w-5 h-5" style={{ color: '#0F0F1E' }} fill="#0F0F1E" />
          </div>
          <span className="font-black text-lg tracking-tight" style={{ color: '#F5C518' }}>
            SPARKLING
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => onNavigate(link.path)}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              style={{
                color: currentPath === link.path ? '#F5C518' : 'rgba(255,255,255,0.7)',
                backgroundColor: currentPath === link.path ? 'rgba(245,197,24,0.1)' : 'transparent',
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <>
              <NotificationBell />

              {(role === 'customer' || role === 'contractor') && (
                <button
                  onClick={() => onNavigate('/cart')}
                  className="relative p-2 rounded-lg transition-colors"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center"
                      style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
                    >
                      {totalItems}
                    </span>
                  )}
                </button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                    style={{ color: 'rgba(255,255,255,0.8)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
                    >
                      {profile?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:block text-sm font-medium max-w-24 truncate">
                      {profile?.name || 'User'}
                    </span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48"
                  style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.2)', color: 'white' }}
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{profile?.name}</p>
                    <p className="text-xs opacity-50 capitalize">{role.replace('_', ' ')}</p>
                  </div>
                  <DropdownMenuSeparator style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ backgroundColor: '#0F0F1E', borderColor: 'rgba(245,197,24,0.1)' }}
        >
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => { onNavigate(link.path); setMobileOpen(false); }}
              className="text-left px-3 py-2 rounded-md text-sm font-medium"
              style={{ color: currentPath === link.path ? '#F5C518' : 'rgba(255,255,255,0.7)' }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
