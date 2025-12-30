//src/components/footer/BottomNav.tsx

"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, ShoppingCart, MapPin, User } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import styles from "./BottomNav.module.css";

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  ariaLabel: string;
  badge?: string;
  external?: boolean;
  showCartBadge?: boolean;
}

const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems } = useCart();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success("Opening your cart...", { 
      duration: 1500,
      style: {
        background: '#333',
        color: '#fff',
      }
    });
    setTimeout(() => router.push("/cart"), 300);
  };

  const navItems: NavItem[] = [
    {
      to: "/",
      label: "Home",
      icon: Home,
      ariaLabel: "Navigate to home page",
    },
    {
      to: "/auth/login",
      label: "Account",
      icon: User,
      ariaLabel: "Navigate to login page",
    },
    {
      to: "/offers",
      label: "Offers",
      icon: ShoppingBag,
      badge: "New",
      ariaLabel: "View special offers",
    },
    {
      to: "/cart",
      label: "Cart",
      icon: ShoppingCart,
      ariaLabel: `View cart with ${totalItems} item${totalItems !== 1 ? "s" : ""}`,
      showCartBadge: true,
    },
    {
      to: "https://www.google.com/maps/dir/-1.1010048,37.011456/HEALTHFIELD+PHARMACY,+Jkuat,+Muramati+road,+Gate+C+Rd,+Juja",
      label: "Stores",
      icon: MapPin,
      external: true,
      ariaLabel: "Get directions to store",
    },
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.to;
    const Icon = item.icon;

    const iconElement = (
      <div className={styles.iconContainer}>
        <motion.div
          className={styles.iconWrapper}
          whileTap={{ scale: 0.88 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 17 
          }}
        >
          <Icon 
            strokeWidth={isActive ? 2.2 : 1.8} 
            size={24}
            className={styles.icon}
          />
          
          {/* Animated cart badge with orange tinge */}
          <AnimatePresence mode="wait">
            {item.showCartBadge && totalItems > 0 && (
              <motion.span
                className={styles.cartBadge}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 15 
                }}
                key={`cart-${totalItems}`}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Static badge for offers with subtle animation */}
          {item.badge && !item.showCartBadge && (
            <motion.span 
              className={styles.offerBadge}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {item.badge}
            </motion.span>
          )}
        </motion.div>

        {/* Active indicator dot */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className={styles.activeDot}
              layoutId="activeDot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
            />
          )}
        </AnimatePresence>
      </div>
    );

    const content = (
      <>
        {iconElement}
        <motion.span 
          className={`${styles.label} ${isActive ? styles.activeLabel : ""}`}
          animate={{ 
            scale: isActive ? 1 : 0.95,
            fontWeight: isActive ? 600 : 400
          }}
          transition={{ duration: 0.2 }}
        >
          {item.label}
        </motion.span>
      </>
    );

    // External link
    if (item.external) {
      return (
        <a
          key={item.label}
          href={item.to}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.ariaLabel}
          className={styles.navItem}
        >
          {content}
        </a>
      );
    }

    // Cart with special handler
    if (item.showCartBadge) {
      return (
        <Link
          key={item.label}
          href={item.to}
          aria-label={item.ariaLabel}
          onClick={handleCartClick}
          className={`${styles.navItem} ${isActive ? styles.active : ""}`}
        >
          {content}
        </Link>
      );
    }

    // Regular link
    return (
      <Link
        key={item.label}
        href={item.to}
        aria-label={item.ariaLabel}
        className={`${styles.navItem} ${isActive ? styles.active : ""}`}
      >
        {content}
      </Link>
    );
  };

  return (
    <motion.nav
      className={styles.bottomNav}
      role="navigation"
      aria-label="Primary navigation"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className={styles.navContent}>
        {navItems.map(renderNavItem)}
      </div>
    </motion.nav>
  );
};

export default BottomNav;