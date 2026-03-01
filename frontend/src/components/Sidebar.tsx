import React from 'react';
import { Zap } from 'lucide-react';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface SidebarProps {
  items: SidebarItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
  role: string;
  userName: string;
}

export default function Sidebar({ items, currentPath, onNavigate, role, userName }: SidebarProps) {
  return (
    <aside
      className="hidden lg:flex flex-col w-60 min-h-screen border-r flex-shrink-0"
      style={{ backgroundColor: '#0F0F1E', borderColor: 'rgba(245,197,24,0.1)' }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-2 px-5 py-5 border-b"
        style={{ borderColor: 'rgba(245,197,24,0.1)' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#F5C518' }}
        >
          <Zap className="w-5 h-5" style={{ color: '#0F0F1E' }} fill="#0F0F1E" />
        </div>
        <span className="font-black text-base tracking-tight" style={{ color: '#F5C518' }}>
          SPARKLING
        </span>
      </div>

      {/* User info */}
      <div
        className="px-5 py-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2"
          style={{ backgroundColor: 'rgba(245,197,24,0.15)', color: '#F5C518' }}
        >
          {userName?.[0]?.toUpperCase() || 'U'}
        </div>
        <p className="text-sm font-semibold text-white truncate">{userName}</p>
        <p className="text-xs capitalize" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {role.replace(/_/g, ' ')}
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {items.map(item => {
          const active = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left w-full"
              style={{
                backgroundColor: active ? 'rgba(245,197,24,0.12)' : 'transparent',
                color: active ? '#F5C518' : 'rgba(255,255,255,0.6)',
                borderLeft: active ? '2px solid #F5C518' : '2px solid transparent',
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-4 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Sparkling Platform v2.1
        </p>
      </div>
    </aside>
  );
}
