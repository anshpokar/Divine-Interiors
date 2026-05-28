import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";

interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryForm({ isOpen, onClose }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    projectType: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ fullName: "", phone: "", email: "", projectType: "" });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={onClose}
            className="fixed inset-0 bg-luxury-charcoal/60 z-50"
          />

          {/* Form Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-luxury-dark-surface/90 backdrop-blur-xl border border-luxury-gold/30 rounded-sm p-8 lg:p-12 max-w-2xl w-full shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-luxury-charcoal/80 backdrop-blur-sm rounded-full flex items-center justify-center text-luxury-cream hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl lg:text-4xl text-luxury-cream mb-3">
                      Book a <span className="text-luxury-gold italic">Consultation</span>
                    </h2>
                    <p className="text-luxury-cream/70">
                      Let's discuss your vision and create something extraordinary together
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-luxury-gold text-sm tracking-wider uppercase mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full bg-input-background border border-luxury-gold/20 rounded px-4 py-3 text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-luxury-gold text-sm tracking-wider uppercase mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-input-background border border-luxury-gold/20 rounded px-4 py-3 text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-luxury-gold text-sm tracking-wider uppercase mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-input-background border border-luxury-gold/20 rounded px-4 py-3 text-luxury-cream placeholder-luxury-cream/30 focus:border-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-luxury-gold text-sm tracking-wider uppercase mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full bg-input-background border border-luxury-gold/20 rounded px-4 py-3 text-luxury-cream focus:border-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
                      >
                        <option value="">Select a project type</option>
                        <option value="full-home">Full Home Interior</option>
                        <option value="modular-kitchen">Modular Kitchen</option>
                        <option value="commercial">Commercial Space</option>
                        <option value="furniture-only">Furniture Only</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group relative px-8 py-4 bg-transparent border border-luxury-gold text-luxury-gold overflow-hidden transition-all duration-300 hover:text-luxury-charcoal mt-8"
                    >
                      <span className="absolute inset-0 bg-luxury-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10 tracking-wider uppercase text-sm font-medium">
                        Submit Enquiry
                      </span>
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-luxury-charcoal"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl text-luxury-cream mb-3">Thank You!</h3>
                  <p className="text-luxury-cream/70">
                    We'll be in touch within 24 hours to schedule your consultation
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
