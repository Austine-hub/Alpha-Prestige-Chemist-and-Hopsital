// src/app/ClientProviders.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CompareProvider } from '@/context/CompareContext';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/header/Header';
import Navbar from '@/components/header/Navbar';
import Topbar from '@/components/header/Topbar';
import Footer from '@/components/footer/Footer';
import BottomNav from '@/components/footer/BottomNav';
import Loader from '@/components/common/Loader';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [topbarHeight, setTopbarHeight] = useState(38);

  // Handle route changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    setIsMenuOpen(false);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Update CSS variable for topbar height
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--topbar-height',
      `${topbarHeight}px`
    );
  }, [topbarHeight]);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleTopbarHeightChange = useCallback((height: number) => {
    setTopbarHeight(height);
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />

          {loading && <Loader mode="fullscreen" />}

          <Topbar
            onHeightChange={handleTopbarHeightChange}
            isMenuOpen={isMenuOpen}
          />

          <Header
            onMenuToggle={handleMenuToggle}
            topBarHeight={topbarHeight}
          />

          <Navbar isOpen={isMenuOpen} onClose={handleMenuClose} />

          <main className="app-main">{children}</main>


          <Footer />
          <BottomNav />
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}