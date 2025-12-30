"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


import styles from "./Loader.module.css";

export interface LoaderProps {
  mode?: "fullscreen" | "inline";
  isLoading?: boolean;
  noBackdrop?: boolean;
}

export default function Loader({
  mode = "fullscreen",
  isLoading: externalLoading,
  noBackdrop = false,
}: LoaderProps) {
  const [internalLoading, setInternalLoading] = useState(true);

  // internal "app loading" only for fullscreen
  useEffect(() => {
    if (mode !== "fullscreen") return;

    const handleLoad = () => setTimeout(() => setInternalLoading(false), 500);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [mode]);

  const loading = externalLoading ?? internalLoading;
  const fullscreen = mode === "fullscreen";

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className={[
            styles.loaderContainer,
            fullscreen ? styles.fullscreen : styles.inline,
            noBackdrop ? styles.noBackdrop : "",
          ].join(" ")}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.loaderContent}>
            {/* rotating ring */}
            <motion.div
              className={`${styles.ring} ${fullscreen ? styles.big : styles.small}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <div className={styles.ringInner} />
            </motion.div>

            {/* logo */}
            <motion.div
              className={`${styles.logoWrapper} ${fullscreen ? styles.big : styles.small}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Image
                src="/logo.png"
                alt="Loading"
                className={styles.logo}
                width={120} height={120}
                priority
              />

            </motion.div>
          </div>

          {fullscreen && (
            <motion.p
              className={styles.loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading…
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
