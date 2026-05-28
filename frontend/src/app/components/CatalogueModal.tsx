import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface CatalogueItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  dimensions: string;
  materials: string;
  price: string;
}

interface CatalogueModalProps {
  item: CatalogueItem | null;
  onClose: () => void;
}

export function CatalogueModal({ item, onClose }: CatalogueModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-luxury-charcoal/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8">
            <motion.div
              layoutId={`catalogue-${item.id}`}
              className="relative bg-luxury-dark-surface border border-luxury-gold/30 rounded-sm overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-luxury-charcoal/80 backdrop-blur-sm rounded-full flex items-center justify-center text-luxury-cream hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative h-[400px] lg:h-full"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/60 to-transparent" />
                </motion.div>

                {/* Details */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 lg:p-12 space-y-6"
                >
                  <div>
                    <div className="text-luxury-gold text-sm tracking-wider uppercase mb-2">
                      {item.category}
                    </div>
                    <h2 className="text-4xl text-luxury-cream mb-4">
                      {item.title}
                    </h2>
                    <p className="text-luxury-cream/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="border-t border-luxury-gold/20 pt-6 space-y-4">
                    <div>
                      <div className="text-luxury-gold text-sm tracking-wider uppercase mb-1">
                        Dimensions
                      </div>
                      <div className="text-luxury-cream/80">
                        {item.dimensions}
                      </div>
                    </div>

                    <div>
                      <div className="text-luxury-gold text-sm tracking-wider uppercase mb-1">
                        Materials
                      </div>
                      <div className="text-luxury-cream/80">
                        {item.materials}
                      </div>
                    </div>

                    <div>
                      <div className="text-luxury-gold text-sm tracking-wider uppercase mb-1">
                        Starting At
                      </div>
                      <div className="text-luxury-cream text-2xl">
                        {item.price}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full group relative px-8 py-4 bg-transparent border border-luxury-gold text-luxury-gold overflow-hidden transition-all duration-300 hover:text-luxury-charcoal"
                    onClick={() => {
                      onClose();
                      document.getElementById('fab')?.click();
                    }}
                  >
                    <span className="absolute inset-0 bg-luxury-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 tracking-wider uppercase text-sm font-medium">
                      Inquire About This Piece
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
