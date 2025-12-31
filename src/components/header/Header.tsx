//src/components/header/Header.tsx

'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './Header.module.css';

interface HeaderProps {
  onMenuToggle: () => void;
  topBarHeight: number;
}

const SEARCH_CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'skincare', label: 'Skin Care' },
  { value: 'vitamins', label: 'Vitamins' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'hygiene', label: 'Hygiene' },
] as const;

const formatBadgeCount = (count: number): string => {
  return count > 99 ? '99+' : count.toString();
};

export default function Header({ onMenuToggle, topBarHeight }: HeaderProps) {
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const { totalItems, subtotal, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const formattedPrice = useMemo(() => 
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(subtotal),
    [subtotal]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery) {
      console.log('Searching:', { category: searchCategory, query: trimmedQuery });
      // TODO: Implement actual search functionality
    }
  }, [searchCategory, searchQuery]);

  const toggleMobileSearch = useCallback(() => {
    setIsMobileSearchOpen(prev => !prev);
  }, []);

  const handleCartClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    openCart();
  }, [openCart]);

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      style={{ top: `${topBarHeight}px` }}
    >
      <div className={styles.container}>
        <button 
          className={styles.menuToggle}
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
          type="button"
        >
          <Menu size={24} strokeWidth={2} />
        </button>

            <Link href="/" className={styles.logo} aria-label="AlphaPrestige Home">
              <div className={styles.logoIcon}>
                <div className={styles.heart}>
                  <Image
                    src="/logo/logo.jpg"
                    alt="AlphaPrestige logo"
                    width={56}
                    height={56}
                    priority
                    className={styles.logoImage}
                  />
                  <span className={styles.ecg} aria-hidden="true" />
                </div>
              </div>

              <div className={styles.logoContent}>
                <span className={styles.logoText}>
                  AlphaPrestige<sup>®</sup>
                </span>
                <span className={styles.brandTagline}>
                  Caring Beyond Prescriptions
                </span>
              </div>
            </Link>


        <form 
          className={styles.searchWrapper}
          onSubmit={handleSearch}
          role="search"
        >
          <div className={styles.searchBar}>
            <div className={styles.categorySelect}>
              <label htmlFor="search-category" className={styles.srOnly}>
                Search category
              </label>
              <select 
                id="search-category"
                value={searchCategory} 
                onChange={(e) => setSearchCategory(e.target.value)}
                className={styles.select}
              >
                {SEARCH_CATEGORIES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <svg 
                className={styles.selectIcon} 
                width="12" 
                height="8" 
                viewBox="0 0 12 8" 
                fill="none"
                aria-hidden="true"
              >
                <path 
                  d="M1 1l5 5 5-5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <label htmlFor="search-input" className={styles.srOnly}>
              Search products
            </label>
            <input 
              id="search-input"
              type="search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines, health products..."
              className={styles.searchInput}
            />
            
            <button 
              type="submit"
              className={styles.searchButton}
              aria-label="Search"
            >
              <Search size={20} strokeWidth={2.5} />
            </button>
          </div>
        </form>

        <button
          className={styles.mobileSearchToggle}
          onClick={toggleMobileSearch}
          aria-label={isMobileSearchOpen ? "Close search" : "Open search"}
          aria-expanded={isMobileSearchOpen}
          type="button"
        >
          {isMobileSearchOpen ? <X size={22} /> : <Search size={22} />}
        </button>

        <nav className={styles.actions} aria-label="Account and shopping">
          <Link
            href="/auth/login"
            className={styles.iconButton}
            aria-label="Sign in to your account"
          >
            <User size={22} strokeWidth={2} aria-hidden="true" />
            <div className={styles.actionInfo}>
              <span className={styles.actionLabel}>Hello, Sign in</span>
              <span className={styles.actionText}>Account</span>
            </div>
          </Link>

          <Link
            href="/wishlist" 
            className={styles.iconButton}
            aria-label={`Wishlist${wishlistCount > 0 ? ` with ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}` : ''}`}
          >
            <span className={styles.iconWrapper}>
              <Heart size={22} strokeWidth={2} aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {formatBadgeCount(wishlistCount)}
                </span>
              )}
            </span>
            <span className={styles.actionInfo}>
              <span className={styles.actionLabel}>Wishlist</span>
            </span>
          </Link>

          <Link
            href="/cart"
            className={styles.iconButton}
            aria-label={
              totalItems > 0
                ? `Shopping cart with ${totalItems} item${totalItems !== 1 ? "s" : ""}, total ${formattedPrice}`
                : "Shopping cart"
            }
          >
            <span className={styles.iconWrapper}>
              <ShoppingCart size={22} strokeWidth={2} aria-hidden="true" />
              {totalItems > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {formatBadgeCount(totalItems)}
                </span>
              )}
            </span>
            <span className={styles.actionInfo}>
              <span className={styles.actionLabel}>Cart</span>
              <span className={styles.actionText}>{formattedPrice}</span>
            </span>
          </Link>
        </nav>
      </div>

      {isMobileSearchOpen && (
        <div className={styles.mobileSearchOverlay}>
          <form 
            className={styles.mobileSearchForm}
            onSubmit={handleSearch}
            role="search"
          >
            <div className={styles.mobileSearchBar}>
              <label htmlFor="mobile-category" className={styles.srOnly}>
                Category
              </label>
              <select 
                id="mobile-category"
                value={searchCategory} 
                onChange={(e) => setSearchCategory(e.target.value)}
                className={styles.mobileSelect}
              >
                {SEARCH_CATEGORIES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {value === 'all' ? 'All' : label}
                  </option>
                ))}
              </select>
              
              <label htmlFor="mobile-search" className={styles.srOnly}>
                Search products
              </label>
              <input 
                id="mobile-search"
                type="search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className={styles.mobileSearchInput}
                autoFocus
              />
              
              <button 
                type="submit"
                className={styles.mobileSearchButton}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}