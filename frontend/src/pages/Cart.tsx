import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import PaymentSummary from '../components/PaymentSummary';

interface CartProps {
  onNavigate: (path: string) => void;
}

export default function Cart({ onNavigate }: CartProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.15)' }}
        >
          <ShoppingCart className="w-10 h-10 opacity-40" style={{ color: '#F5C518' }} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Browse our marketplace to find electrical products
        </p>
        <Button
          onClick={() => onNavigate('/marketplace')}
          style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
        >
          Browse Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button
        onClick={() => onNavigate('/marketplace')}
        className="flex items-center gap-2 mb-6 text-sm"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </button>

      <h1 className="text-2xl font-black text-white mb-6">
        Shopping Cart <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', fontWeight: 400 }}>({items.length} items)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart items */}
        <div className="flex-1 space-y-3">
          {items.map(item => (
            <div
              key={item.id}
              className="rounded-xl p-4 flex items-center gap-4"
              style={{ backgroundColor: '#1E1E32', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <Package className="w-8 h-8 opacity-30" style={{ color: '#F5C518' }} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{item.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.brand}</p>
                <p className="text-sm font-bold mt-1" style={{ color: '#F5C518' }}>₹{item.price.toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white' }}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white' }}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <div className="text-right ml-2">
                <p className="font-bold text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-1 p-1 rounded transition-colors"
                  style={{ color: 'rgba(248,113,113,0.6)' }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:w-72 flex-shrink-0 space-y-4">
          <PaymentSummary
            serviceAmount={totalPrice}
            commissionRate={0}
            serviceName={`${items.length} item(s)`}
          />

          <Button
            className="w-full h-11 font-bold"
            style={{ backgroundColor: '#F5C518', color: '#0F0F1E' }}
          >
            Proceed to Checkout
          </Button>

          <button
            onClick={clearCart}
            className="w-full text-sm text-center"
            style={{ color: 'rgba(248,113,113,0.6)' }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
