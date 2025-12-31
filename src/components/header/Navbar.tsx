//src/components/header/Navbar.tsx

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, X, Home } from 'lucide-react';
import Link from 'next/link';
import styles from './Navbar.module.css';

interface NavLink {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  key: string;
  path?: string;
  links?: NavLink[];
}

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Shop By Category",
    key: "category",
    links: [
      { label: "Skin Care", path: "/category/skincare" },
      { label: "Diabetes Care", path: "/category/diabetes" },
      { label: "Beauty & Cosmetics", path: "/category/beauty" },
      { label: "Vitamins & Supplements", path: "/category/vitamins" },
      { label: "Prescription Medicine", path: "/category/medicine" },
      { label: "Personal Hygiene", path: "/category/hygiene" },
      { label: "Home Healthcare", path: "/category/home-healthcare" },
    ],
  },
  {
    label: "Shop By Condition",
    key: "condition",
    links: [
      { label: "Hypertension", path: "/conditions/hypertension" },
      { label: "Diabetes Management", path: "/conditions/diabetes" },
      { label: "Cough, Cold & Flu", path: "/conditions/flu" },
      { label: "Urinary Tract Infection", path: "/conditions/uti" },
      { label: "Dermatological Care", path: "/conditions/skin" },
    ],
  },
  {
    label: "Shop By Body System",
    key: "system",
    links: [
      { label: "Cardiovascular System", path: "/system/cardiovascular" },
      { label: "Reproductive Health", path: "/system/reproductive" },
      { label: "Respiratory System", path: "/system/respiratory" },
      { label: "Digestive System", path: "/system/digestive" },
      { label: "Renal System", path: "/system/renal" },
      { label: "Nervous System", path: "/system/nervous" },
      { label: "Oral Health", path: "/system/oral" },
      { label: "Musculoskeletal", path: "/system/musculoskeletal" },
    ],
  },
  { label: "Special Offers", key: "offers", path: "/offers" },
  { label: "My Dashboard", key: "dashboard", path: "/dashboard" },
];

const SCROLL_THRESHOLD = 10;
const HOVER_DELAY = 150;

export default function Navbar({ isOpen, onClose }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (Math.abs(currentScrollY - lastScrollY.current) < SCROLL_THRESHOLD) {
      ticking.current = false;
      return;
    }

    setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  const requestScrollUpdate = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(handleScroll);
      ticking.current = true;
    }
  }, [handleScroll]);

  // Scroll visibility effect
  useEffect(() => {
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    return () => window.removeEventListener('scroll', requestScrollUpdate);
  }, [requestScrollUpdate]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!activeDropdown) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) setActiveDropdown(null);
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
    setActiveDropdown(null);
  }, [onClose]);

  const toggleDropdown = useCallback((key: string) => {
    setActiveDropdown(prev => prev === key ? null : key);
  }, []);

  const handleMouseEnter = useCallback((key: string) => {
    if (window.innerWidth >= 1024) {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      setActiveDropdown(key);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth >= 1024) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, HOVER_DELAY);
    }
  }, []);

  return (
    <>
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      <nav 
        className={`${styles.navbar} ${isOpen ? styles.open : ''} ${!isVisible ? styles.hidden : ''}`}
        ref={navRef} 
        aria-label="Main navigation"
      >
        <div className={styles.mobileHeader}>
          <h2 className={styles.mobileTitle}>Navigation Menu</h2>
          <button 
            onClick={handleClose} 
            className={styles.closeBtn} 
            aria-label="Close navigation menu"
            type="button"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.container}>
          <ul className={styles.navList} role="menubar">
            <li role="none">
              <Link 
                href="/" 
                className={styles.homeLink}
                role="menuitem"
                onClick={handleClose}
                aria-label="Navigate to homepage"
              >
                <Home size={18} aria-hidden="true" />
                <span>Home</span>
              </Link>
            </li>

            {NAV_ITEMS.map((item) =>
              item.links ? (
                <li 
                  key={item.key} 
                  className={styles.dropdownWrapper}
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                  role="none"
                >
                  <button
                    className={`${styles.navBtn} ${activeDropdown === item.key ? styles.active : ''}`}
                    onClick={() => toggleDropdown(item.key)}
                    aria-expanded={activeDropdown === item.key}
                    aria-haspopup="true"
                    role="menuitem"
                    type="button"
                  >
                    {item.label}
                    <ChevronDown 
                      size={14} 
                      className={`${styles.chevron} ${activeDropdown === item.key ? styles.chevronActive : ''}`}
                      aria-hidden="true" 
                    />
                  </button>
                  {activeDropdown === item.key && (
                    <div className={styles.dropdown} role="menu">
                      <ul>
                        {item.links.map((link) => (
                          <li key={link.path} role="none">
                            <Link 
                              href={link.path} 
                              role="menuitem"
                              onClick={handleClose}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.key} role="none">
                  <Link 
                    href={item.path || '#'} 
                    className={styles.navLink}
                    role="menuitem"
                    onClick={handleClose}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}

            <li className={styles.actions} role="none">
              <Link 
                href="/consultation" 
                className={styles.btnConsult}
                onClick={handleClose}
              >
                Consult a Doctor
              </Link>
              <Link 
                href="/prescriptions" 
                className={styles.btnPrescription}
                onClick={handleClose}
              >
                Upload Prescription
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}