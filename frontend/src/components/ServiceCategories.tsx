import React from 'react';
import { Wrench, Settings, Lightbulb, Cable, LayoutGrid, Zap, Factory } from 'lucide-react';

const CATEGORIES = [
  { id: 'repair', label: 'Electrical Repair', icon: <Wrench className="w-6 h-6" />, color: '#F87171' },
  { id: 'maintenance', label: 'Preventive Maintenance', icon: <Settings className="w-6 h-6" />, color: '#60A5FA' },
  { id: 'installation', label: 'New Installation', icon: <Lightbulb className="w-6 h-6" />, color: '#34D399' },
  { id: 'wiring', label: 'Wiring & Rewiring', icon: <Cable className="w-6 h-6" />, color: '#A78BFA' },
  { id: 'panel', label: 'Panel Upgrade', icon: <LayoutGrid className="w-6 h-6" />, color: '#FB923C' },
  { id: 'emergency', label: 'Emergency Call-out', icon: <Zap className="w-6 h-6" />, color: '#F5C518' },
  { id: 'industrial', label: 'Industrial Services', icon: <Factory className="w-6 h-6" />, color: '#38BDF8' },
];

interface ServiceCategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

export default function ServiceCategories({ onCategorySelect }: ServiceCategoriesProps) {
  return (
    <section>
      <h2 className="text-lg font-bold text-white mb-4">Service Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all hover:scale-105 group"
            style={{
              backgroundColor: '#1E1E32',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
              style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
            >
              {cat.icon}
            </div>
            <span className="text-xs font-medium text-center leading-tight" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
