import React, { useState, useCallback } from 'react';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ElectricianRegister from './pages/ElectricianRegister';
import CustomerHome from './pages/CustomerHome';
import ElectricianDiscovery from './pages/ElectricianDiscovery';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import ElectricianAdminDashboard from './pages/ElectricianAdminDashboard';
import ElectricianDashboard from './pages/ElectricianDashboard';
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import GovernmentContracts from './pages/GovernmentContracts';
import BookingPage from './pages/BookingPage';

// Pages that don't show the header
const NO_HEADER_PATHS = ['/login', '/register', '/electrician-register', '/splash'];

// Pages that are full-screen dashboards (no outer padding wrapper)
const DASHBOARD_PATHS = ['/super-admin', '/electrician-admin', '/electrician-dashboard'];

function isDashboardPath(path: string) {
  return DASHBOARD_PATHS.some(p => path.startsWith(p));
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPath, setCurrentPath] = useState('/login');

  const navigate = useCallback((path: string) => {
    setCurrentPath(path);
    window.scrollTo(0, 0);
  }, []);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    setCurrentPath('/login');
  }, []);

  // Show splash screen on initial load
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const showHeader = !NO_HEADER_PATHS.includes(currentPath) && !currentPath.startsWith('/booking/');

  // Parse booking electrician ID from path like /booking/123
  const bookingMatch = currentPath.match(/^\/booking\/(.+)$/);
  const bookingElectricianId = bookingMatch ? bookingMatch[1] : null;

  // Parse category from discover path like /discover?category=repair
  const discoverMatch = currentPath.match(/^\/discover/);
  const discoverCategory = discoverMatch
    ? new URLSearchParams(currentPath.includes('?') ? currentPath.split('?')[1] : '').get('category') || undefined
    : undefined;

  const renderPage = () => {
    // Auth pages
    if (currentPath === '/login') {
      return <Login onNavigate={navigate} />;
    }
    if (currentPath === '/register') {
      return <Register onNavigate={navigate} />;
    }
    if (currentPath === '/electrician-register') {
      return <ElectricianRegister onNavigate={navigate} />;
    }

    // Customer / Contractor pages
    if (currentPath === '/home') {
      return <CustomerHome onNavigate={navigate} />;
    }
    if (discoverMatch) {
      return <ElectricianDiscovery onNavigate={navigate} initialCategory={discoverCategory} />;
    }
    if (currentPath === '/marketplace') {
      return <Marketplace onNavigate={navigate} />;
    }
    if (currentPath === '/cart') {
      return <Cart onNavigate={navigate} />;
    }
    if (currentPath === '/contracts') {
      return <GovernmentContracts onNavigate={navigate} />;
    }
    if (bookingElectricianId) {
      return <BookingPage electricianId={bookingElectricianId} onNavigate={navigate} />;
    }

    // Admin dashboards
    if (currentPath.startsWith('/super-admin')) {
      return <SuperAdminDashboard onNavigate={navigate} currentPath={currentPath} />;
    }
    if (currentPath.startsWith('/electrician-admin')) {
      return <ElectricianAdminDashboard onNavigate={navigate} currentPath={currentPath} />;
    }
    if (currentPath.startsWith('/electrician-dashboard')) {
      return <ElectricianDashboard onNavigate={navigate} currentPath={currentPath} />;
    }

    // Fallback — redirect to login
    return <Login onNavigate={navigate} />;
  };

  return (
    <CartProvider>
      <NotificationProvider>
        <div className="min-h-screen" style={{ backgroundColor: '#0F0F1E' }}>
          {showHeader && (
            <Header onNavigate={navigate} currentPath={currentPath} />
          )}
          <main className={isDashboardPath(currentPath) ? '' : 'min-h-[calc(100vh-4rem)]'}>
            {renderPage()}
          </main>
          {showHeader && !isDashboardPath(currentPath) && (
            <footer
              className="border-t py-6 mt-8"
              style={{ borderColor: 'rgba(245,197,24,0.1)', backgroundColor: '#0F0F1E' }}
            >
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  © {new Date().getFullYear()} Sparkling Platform. Built with{' '}
                  <span style={{ color: '#F5C518' }}>⚡</span> using{' '}
                  <a
                    href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'sparkling-app')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors"
                    style={{ color: 'rgba(245,197,24,0.5)' }}
                  >
                    caffeine.ai
                  </a>
                </p>
              </div>
            </footer>
          )}
        </div>
      </NotificationProvider>
    </CartProvider>
  );
}
