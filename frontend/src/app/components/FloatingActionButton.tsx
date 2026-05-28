import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { EnquiryForm } from "./EnquiryForm";

export function FloatingActionButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        id="fab"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 right-8 z-40 group"
      >
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 rounded-full bg-luxury-gold animate-ping opacity-20" />

        {/* Button */}
        <div className="relative bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-charcoal rounded-full p-4 shadow-2xl transition-all duration-300 flex items-center gap-3 pr-6">
          <MessageCircle className="w-6 h-6" />
          <span className="font-medium text-sm tracking-wide hidden sm:block">
            Book Consultation
          </span>
        </div>

        {/* Tooltip for mobile */}
        <div className="sm:hidden absolute bottom-full right-0 mb-2 bg-luxury-dark-surface/90 backdrop-blur-sm text-luxury-cream px-3 py-2 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Book Consultation
        </div>
      </motion.button>

      {/* Enquiry Form Modal */}
      <EnquiryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
