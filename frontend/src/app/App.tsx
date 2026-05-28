import { useState } from "react";
import { Hero } from "./components/Hero";
import { PortfolioShowcase } from "./components/PortfolioShowcase";
import { CatalogueGrid } from "./components/CatalogueGrid";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { Header } from "./components/Header";
import { Preloader } from "./components/Preloader";
import { SITE_CONTENT } from "./constants";

export default function App() {
  const [isFirstVisit] = useState(() => !sessionStorage.getItem('hasVisited'));
  return (
    <div className="min-h-screen bg-luxury-charcoal">
      {/* Preloader Animation */}
      <Preloader isFirstVisit={isFirstVisit} />

      {/* Glassmorphism Header */}
      <Header />

      {/* Hero Section */}
      <Hero isFirstVisit={isFirstVisit} />

      {/* Portfolio Showcase with Horizontal Scroll */}
      <PortfolioShowcase />

      {/* Interactive Catalogue Grid */}
      <CatalogueGrid />

      {/* Footer */}
      <footer className="bg-luxury-dark-surface border-t border-luxury-gold/20 py-12">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl text-luxury-gold mb-4 font-serif italic">{SITE_CONTENT.footer.brandName}</h3>
              <p className="text-luxury-cream/60 text-sm leading-relaxed">
                {SITE_CONTENT.footer.description}
              </p>
            </div>

            <div>
              <h4 className="text-luxury-gold text-sm tracking-wider uppercase mb-4">Quick Links</h4>
              <ul className="space-y-2 text-luxury-cream/60 text-sm">
                <li>
                  <a href="#" className="hover:text-luxury-gold transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#catalogue" className="hover:text-luxury-gold transition-colors">Collections</a>
                </li>
                <li>
                  <a href="#" className="hover:text-luxury-gold transition-colors">Portfolio</a>
                </li>
                <li>
                  <a href="#" className="hover:text-luxury-gold transition-colors">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-luxury-gold text-sm tracking-wider uppercase mb-4">Contact</h4>
              <ul className="space-y-2 text-luxury-cream/60 text-sm">
                <li>Phone: {SITE_CONTENT.footer.contact.phone}</li>
                <li>Email: {SITE_CONTENT.footer.contact.email}</li>
                <li>Location: {SITE_CONTENT.footer.contact.location}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-luxury-gold/10 pt-8 text-center">
            <p className="text-luxury-cream/40 text-sm">
              {SITE_CONTENT.footer.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Enquiry */}
      <FloatingActionButton />
    </div>
  );
}