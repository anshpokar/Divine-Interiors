import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SITE_CONTENT } from "../constants";

export function Preloader({ isFirstVisit }: { isFirstVisit: boolean }) {
  const [isLoading, setIsLoading] = useState(isFirstVisit);

  useEffect(() => {
    if (isFirstVisit) {
      // Keep doors closed and show welcome text for 2 seconds
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit]);

  if (!isFirstVisit) return null;

  return (
    <AnimatePresence onExitComplete={() => sessionStorage.setItem('hasVisited', 'true')}>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex pointer-events-auto"
        >
          {/* Left Door */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full bg-luxury-charcoal border-r border-luxury-gold/10"
          />
          {/* Right Door */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full bg-luxury-charcoal border-l border-luxury-gold/10"
          />
          
          {/* Welcome Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          >
             <h2 className="text-3xl md:text-5xl text-luxury-gold font-serif italic mb-4">Welcome to</h2>
             <h1 className="text-2xl md:text-4xl text-luxury-cream tracking-[0.3em] uppercase font-light">
               {SITE_CONTENT.siteName}
             </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
