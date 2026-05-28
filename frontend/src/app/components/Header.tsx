import { motion } from "motion/react";
import { SITE_CONTENT } from "../constants";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md border-b border-white/20" />
      <div className="relative max-w-[1800px] mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="flex flex-col items-center justify-center relative w-8 h-8 mr-1">
             {/* Simple SVG Leaf icon for logo */}
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-luxury-gold">
              <path d="M12 2C12 2 10 5.5 10 8.5C10 11.5 12 14 12 14C12 14 14 11.5 14 8.5C14 5.5 12 2 12 2Z" fill="currentColor"/>
              <path d="M11 6C11 6 7 7 5 9.5C3 12 4 15 4 15C4 15 7 13 9 10.5C11 8 11 6 11 6Z" fill="currentColor"/>
              <path d="M13 6C13 6 17 7 19 9.5C21 12 20 15 20 15C20 15 17 13 15 10.5C13 8 13 6 13 6Z" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-2xl tracking-wide text-luxury-cream font-light">
            {SITE_CONTENT.logo.lightText}
          </span>
          <span className="text-2xl tracking-tight text-luxury-gold font-bold">
            {SITE_CONTENT.logo.darkText}
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["About Us", "Collections", "Portfolio", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-luxury-cream/80 hover:text-luxury-gold text-sm tracking-widest uppercase transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
