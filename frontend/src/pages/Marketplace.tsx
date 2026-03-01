import React, { useState } from 'react';
import { ShoppingCart, Star, Package, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCart } from '../contexts/CartContext';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const PRODUCT_CATEGORIES = [
  'All Products', 'Switchboards', 'Wires & Cables', 'Pliers & Tools',
  'Conduit & Casing', 'MCBs & Circuit Breakers', 'Lighting Fixtures',
];

const DEMO_PRODUCTS = [
  { id: 'P001', name: 'Modular Switchboard 8-Module', category: 'Switchboards', price: 850, stock: 45, brand: 'Legrand', rating: 4.7, reviews: 128 },
  { id: 'P002', name: 'FR PVC Wire 1.5 sq mm (90m)', category: 'Wires & Cables', price: 1200, stock: 200, brand: 'Finolex', rating: 4.8, reviews: 256 },
  { id: 'P003', name: 'Combination Plier Set (5 pcs)', category: 'Pliers & Tools', price: 650, stock: 80, brand: 'Stanley', rating: 4.6, reviews: 89 },
  { id: 'P004', name: 'PVC Conduit Pipe 25mm (3m)', category: 'Conduit & Casing', price: 120, stock: 500, brand: 'Precision', rating: 4.5, reviews: 67 },
  { id: 'P005', name: 'MCB 32A Single Pole', category: 'MCBs & Circuit Breakers', price: 380, stock: 150, brand: 'Schneider', rating: 4.9, reviews: 312 },
  { id: 'P006', name: 'LED Panel Light 18W', category: 'Lighting Fixtures', price: 450, stock: 120, brand: 'Philips', rating: 4.7, reviews: 198 },
  { id: 'P007', name: 'Modular Switchboard 12-Module', category: 'Switchboards', price: 1250, stock: 30, brand: 'Havells', rating: 4.8, reviews: 145 },
  { id: 'P008', name: 'Armoured Cable 4-Core 10mm', category: 'Wires & Cables', price: 3200, stock: 50, brand: 'Polycab', rating: 4.6, reviews: 78 },
  { id: 'P009', name: 'Insulation Tape Roll (10 pcs)', category: 'Pliers & Tools', price: 180, stock: 300, brand: '3M', rating: 4.5, reviews: 234 },
  { id: 'P010', name: 'RCCB 40A 30mA', category: 'MCBs & Circuit Breakers', price: 1100, stock: 75, brand: 'ABB', rating: 4.9, reviews: 167 },
  { id: 'P011', name: 'Surface Conduit Box 3x3', category: 'Conduit & Casing', price: 85, stock: 400, brand: 'Anchor', rating: 4.4, reviews: 56 },
  { id: 'P012', name: 'LED Batten 36W 4ft', category: 'Lighting Fixtures', price: 680, stock: 90, brand: 'Crompton', rating: 4.6, reviews: 143 },
];

interface MarketplaceProps {
  onNavigate: (path: string) => void;
}

export default function Marketplace({ onNavigate }: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [search, setSearch] = useState('');
  const { addItem, totalItems } = useCart();

  const filtered = DEMO_PRODUCTS
    .filter(p => selectedCategory === 'All Products' || p.category === selectedCategory)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));

  const handleAddToCart = (product: typeof DEMO_PRODUCTS[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: '',
      brand: product.brand,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`, {
      style: { backgroundColor: '#1E1E32', border: '1px solid rgba(245,197,24,0.2)', color: 'white' },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Toaster />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Electrical Marketplace</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Quality electrical products at best prices
          </p>
        </div>
        <button
          onClick={() => onNavigate('/cart')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all hover:scale-105"
          style={{ backgroundColor: 'rgba(245,197,24,0.1)', color: '#F5C518', border: '1px solid rgba(245,197,24,0.2)' }}
        >
          <ShoppingCart className="w-4 h-4" />
          Cart ({totalItems})
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="lg:w-48 flex-shrink-0">
          <div className="rounded-xl p-4" style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-sm font-semibold text-white mb-3">Categories</h3>
            <div className="space-y-1">
              {PRODUCT_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                  style={{
                    backgroundColor: selectedCategory === cat ? 'rgba(245,197,24,0.12)' : 'transparent',
                    color: selectedCategory === cat ? '#F5C518' : 'rgba(255,255,255,0.6)',
                    borderLeft: selectedCategory === cat ? '2px solid #F5C518' : '2px solid transparent',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
              style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
          </div>

          <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {filtered.length} products found
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(product => (
              <div
                key={product.id}
                className="rounded-xl overflow-hidden transition-all hover:scale-[1.01]"
                style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Product image placeholder */}
                <div
                  className="h-36 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                >
                  <Package className="w-12 h-12 opacity-20" style={{ color: '#F5C518' }} />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-white text-sm leading-tight">{product.name}</p>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: product.stock > 0 ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)', color: product.stock > 0 ? '#34D399' : '#F87171' }}
                    >
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{product.brand}</p>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3" style={{ color: '#F5C518', fill: '#F5C518' }} />
                    <span className="text-xs font-bold text-white">{product.rating}</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black" style={{ color: '#F5C518' }}>₹{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all hover:opacity-90 disabled:opacity-40"
                      style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
