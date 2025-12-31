// src/components/header/Topbar.tsx

// src/components/header/Topbar.tsx
'use client';

import { useState, useEffect, useCallback, memo, useRef } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import styles from './Topbar.module.css';

interface PromoMessage {
  id: number;
  text: string;
}

interface TopbarProps {
  onHeightChange: (height: number) => void;
  isMenuOpen: boolean;
}

const ROTATION_INTERVAL = 4000;
const TOPBAR_HEIGHT = 38;
const SCROLL_THRESHOLD = 10;

const PROMO_MESSAGES: PromoMessage[] = [
  { id: 1, text: '🎉 Flash Sale! Get 50% OFF on all products today only!' },
  { id: 2, text: '🚚 Free shipping on orders over Ksh.5000 - Limited time!' },
  { id: 3, text: '⭐ New arrivals just dropped! Shop the latest collection now!' },
  { id: 4, text: '💰 Special offer: Buy 2 Get 1 Free on selected items!' },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, id: 'facebook', label: 'Facebook', url: 'https://facebook.com' },
  { icon: FaTwitter, id: 'twitter', label: 'Twitter', url: 'https://twitter.com' },
  { icon: FaInstagram, id: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
  { icon: FaLinkedinIn, id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },
] as const;

function Topbar({ onHeightChange, isMenuOpen }: TopbarProps) {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Auto-rotate promo messages
  useEffect(() => {
    if (PROMO_MESSAGES.length <= 1 || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Handle scroll behavior on desktop
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Only apply scroll hide on desktop (width > 768px)
        if (window.innerWidth > 768) {
          if (currentScrollY > lastScrollY.current && currentScrollY > SCROLL_THRESHOLD) {
            // Scrolling down
            setIsScrollHidden(true);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up
            setIsScrollHidden(false);
          }
        } else {
          // On mobile, always show if visible
          setIsScrollHidden(false);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle close with smooth transition
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onHeightChange(0);
    }, 300);
  }, [onHeightChange]);

  // Auto-close when menu opens
  useEffect(() => {
    if (isMenuOpen && isVisible) {
      handleClose();
    }
  }, [isMenuOpen, isVisible, handleClose]);

  // Update height on mount and visibility change
  useEffect(() => {
    onHeightChange(isVisible && !isScrollHidden ? TOPBAR_HEIGHT : 0);
  }, [isVisible, isScrollHidden, onHeightChange]);

  const handleSocialClick = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.topbarWrapper} ${isScrollHidden ? styles.scrollHidden : ''}`}>
      <div className={styles.topbar}>
        <div className={styles.container}>
          {/* Promo Messages */}
          <div className={styles.promoSection}>
            <div className={styles.promoWrapper}>
              {PROMO_MESSAGES.map((msg, index) => (
                <p
                  key={msg.id}
                  className={`${styles.promoText} ${
                    index === currentPromoIndex ? styles.active : ''
                  }`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {msg.text}
                </p>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <nav className={styles.socialSection} aria-label="Social media links">
            {SOCIAL_LINKS.map(({ icon: Icon, id, label, url }) => (
              <button
                key={id}
                onClick={() => handleSocialClick(url)}
                className={styles.socialIcon}
                aria-label={`Visit our ${label} page`}
                type="button"
              >
                <Icon aria-hidden="true" />
              </button>
            ))}
          </nav>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Close announcement banner"
            type="button"
          >
            <IoMdClose aria-hidden="true" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              animationDuration: `${ROTATION_INTERVAL}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Topbar);