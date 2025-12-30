//src/components/hero/Hero.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaWind, FaFlask, FaThermometerHalf, FaUtensils, 
  FaHeartbeat, FaPills, FaStethoscope, FaTooth, 
  FaAppleAlt, FaShieldAlt 
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import styles from './Hero.module.css';

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle?: string;
  description?: string;
  discount?: string;
  buttonText: string;
  image: string;
  alt: string;
  href: string;
}

interface NavItem {
  icon: IconType | string;
  label: string;
  href: string;
  badge?: string;
}

const SLIDES: readonly Slide[] = [
  {
    id: 1,
    badge: 'WEEKEND SPECIAL',
    title: 'Professional Healthcare Solutions',
    subtitle: 'Trusted Medical Expertise',
    discount: '20%',
    buttonText: 'Consult Us',
    image: '/images/hero/hero1.jpg',
    alt: 'Professional healthcare solutions',
    href: '/team',
  },
  {
    id: 2,
    badge: 'QUALITY ASSURED',
    title: 'Premium Products',
    subtitle: 'Expert Medical Guidance',
    discount: '30%',
    buttonText: 'Browse Catalog',
    image: '/images/hero/hero2.jpg',
    alt: 'Premium healthcare products',
    href: '/shop',
  },
  {
    id: 3,
    badge: 'WELLNESS PARTNER',
    title: 'Your Health, Our Commitment',
    subtitle: 'Comprehensive Care Services',
    discount: '40%',
    buttonText: 'Learn More',
    image: '/images/hero/hero3.jpg',
    alt: 'Comprehensive wellness services',
    href: '/wellness',
  },
  {
    id: 4,
    badge: 'TRUSTED PROVIDER',
    title: 'Excellence in Medical Care',
    description: 'Advanced medical solutions delivered with professional expertise',
    discount: '25%',
    buttonText: 'View Services',
    image: '/images/hero/hero7.jpg',
    alt: 'Excellence in medical care',
    href: '/services',
  },
  {
    id: 5,
    badge: 'EXCLUSIVE OFFERS',
    title: 'Healthcare Tailored to Your Needs',
    description: 'Comprehensive range of pharmaceutical products and wellness solutions',
    discount: '35%',
    buttonText: 'Shop Collection',
    image: '/images/hero/hero5.jpg',
    alt: 'Exclusive healthcare offers',
    href: '/offers',
  },
  {
    id: 6,
    badge: 'NEW ARRIVALS',
    title: 'Advanced Healthcare Products',
    description: 'Latest innovations in medical equipment and pharmaceutical care',
    discount: '15%',
    buttonText: 'Discover More',
    image: '/images/hero/hero6.jpg',
    alt: 'New healthcare products',
    href: '/more/home',
  },
];

const NAV_ITEMS: readonly NavItem[] = [
  { icon: FaFlask, label: 'Cosmetics & Beauty', href: '/category/beauty', badge: 'Popular' },
  { icon: FaWind, label: 'Respiratory Care', href: '/system/respiratory' },
  { icon: FaShieldAlt, label: 'Protective Equipment', href: '/more/home' },
  { icon: FaThermometerHalf, label: 'Cold & Flu Relief', href: '/conditions/flu',  badge: '30% OFF' },
  { icon: FaUtensils, label: 'Digestive Health', href: '/system/git' },
  { icon: FaHeartbeat, label: 'Cardiovascular Care', href: '/system/cvs' },
  { icon: FaPills, label: 'OTC Medications', href: '/more/popular' },
  { icon: FaStethoscope, label: 'Prescription Services', href: '/prescriptions' },
  { icon: FaTooth, label: 'Oral Care', href: '/system/oral', badge: 'New' },
  { icon: FaAppleAlt, label: 'Vitamins & Supplements', href: '/category/vitamins' },

];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(prev => 
      direction === 'next' ? (prev + 1) % SLIDES.length : (prev === 0 ? SLIDES.length - 1 : prev - 1)
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const handleDotClick = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentSlide]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => handleSlideChange('next'), 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, handleSlideChange]);

  return (
    <section className={styles.hero}>
      <aside className={styles.sidebar}>
        <nav>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.navLink}>
                  <span className={styles.icon}>
                    {typeof item.icon === 'string' ? item.icon : <item.icon />}
                  </span>
                  <span>{item.label}</span>
                  {item.badge && <span className={styles.badge}>{item.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div
        className={styles.carousel}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className={styles.slides} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {SLIDES.map((slide, index) => (
            <article key={slide.id} className={styles.slide}>
              <div className={styles.content}>
                <span className={styles.discountBadge}>{slide.badge}</span>
                <h2 className={styles.title}>
                  {slide.title}
                  {slide.subtitle && <span className={styles.subtitle}>{slide.subtitle}</span>}
                </h2>
                {slide.description && <p className={styles.description}>{slide.description}</p>}
                {slide.discount && (
                  <p className={styles.offer}>
                    Save up to <strong className={styles.discount}>{slide.discount}</strong> on premium products
                  </p>
                )}
                <Link href={slide.href} className={styles.shopBtn}>{slide.buttonText}</Link>
              </div>
              <div className={styles.imageWrapper}>
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className={styles.image}
                  priority={index === 0}
                  sizes="(max-width: 768px) 50vw, 55vw"
                  quality={85}
                />
              </div>
            </article>
          ))}
        </div>

        <button onClick={() => handleSlideChange('prev')} className={`${styles.navBtn} ${styles.prev}`} disabled={isAnimating}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button onClick={() => handleSlideChange('next')} className={`${styles.navBtn} ${styles.next}`} disabled={isAnimating}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 16L14 10L8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.dots}>
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}