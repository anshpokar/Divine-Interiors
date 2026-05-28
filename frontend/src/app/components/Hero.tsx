import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTENT } from "../constants";

export function Hero({ isFirstVisit = false }: { isFirstVisit?: boolean }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-luxury-charcoal">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 w-full max-w-[1800px] mx-auto px-8 xl:px-16 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: isFirstVisit ? 2.2 : 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-6xl xl:text-7xl text-luxury-cream leading-tight tracking-tight">
              {SITE_CONTENT.hero.titleLine1}
              <br />
              <span className="text-luxury-gold italic">{SITE_CONTENT.hero.titleLine2}</span>
            </h1>
            <p className="text-lg xl:text-xl text-luxury-cream/70 max-w-lg font-light">
              {SITE_CONTENT.hero.subtitle}
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: isFirstVisit ? 2.4 : 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-4 bg-transparent border border-luxury-gold text-luxury-gold overflow-hidden transition-all duration-300 hover:text-luxury-charcoal"
            onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="absolute inset-0 bg-luxury-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 tracking-wider uppercase text-sm font-medium">
              {SITE_CONTENT.hero.cta}
            </span>
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: isFirstVisit ? 2.3 : 0.3 }}
          className="relative h-[700px] overflow-hidden rounded-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/60 to-transparent z-10" />
          <img
            src={SITE_CONTENT.hero.desktopImage}
            alt={SITE_CONTENT.hero.imageAlt}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative w-full min-h-screen flex items-center">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: isFirstVisit ? 2.1 : 0 }}
        >
          <img
            src={SITE_CONTENT.hero.mobileImage}
            alt={SITE_CONTENT.hero.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-luxury-charcoal/75" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isFirstVisit ? 2.0 : 0 }}
          className="relative z-10 px-6 py-20 text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl text-luxury-cream leading-tight tracking-tight">
              {SITE_CONTENT.hero.titleLine1}
              <br />
              <span className="text-luxury-gold italic">{SITE_CONTENT.hero.titleLine2}</span>
            </h1>
            <p className="text-base text-luxury-cream/70 max-w-sm mx-auto font-light">
              {SITE_CONTENT.hero.subtitle}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-3 bg-transparent border border-luxury-gold text-luxury-gold overflow-hidden transition-all duration-300 hover:text-luxury-charcoal mx-auto"
            onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="absolute inset-0 bg-luxury-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 tracking-wider uppercase text-sm font-medium">
              {SITE_CONTENT.hero.cta}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isFirstVisit ? 3.0 : 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-luxury-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
