import { motion, useScroll, useMotionValueEvent, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { SITE_CONTENT } from "../constants";

const portfolioItems = [
  {
    id: 1,
    title: "Modern Sanctuary",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzc5OTQxOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Minimalist Retreat",
    category: "Bedroom",
    image: "https://images.unsplash.com/photo-1720420021124-4e18564e070f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmVkcm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3OTk0MTkyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    beforeAfter: true,
  },
  {
    id: 3,
    title: "Culinary Excellence",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1722605090433-41d1183a792d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc5ODQ3Mjg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Contemporary Elegance",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzc5OTQxOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Luxury Dining",
    category: "Dining",
    image: "https://images.unsplash.com/photo-1690489965043-ec15758cce71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmdXJuaXR1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzc5OTQxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

function BeforeAfterSlider({ image }: { image: string }) {
  const [sliderPosition, setSliderPosition] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const position = ((x - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleUp);
      return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleUp);
      };
    }
  }, [isDragging]);

  return (
    <div ref={containerRef} className="relative w-full h-full select-none">
      {/* Before Image (grayscale) */}
      <img
        src={image}
        alt="Before"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover grayscale"
      />

      {/* After Image */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={image}
          alt="After"
          draggable={false}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider Line Area (wider for easy grab) */}
      <div
        className="absolute top-0 bottom-0 w-8 -translate-x-1/2 cursor-col-resize flex justify-center group/slider z-10"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={(e) => {
          e.stopPropagation(); // prevent parent scroll
          setIsDragging(true);
        }}
        onTouchStart={(e) => {
          e.stopPropagation(); // prevent parent scroll
          setIsDragging(true);
        }}
      >
        <div className="w-1 h-full bg-luxury-gold shadow-lg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center shadow-xl">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-luxury-charcoal" />
            <div className="w-0.5 h-4 bg-luxury-charcoal" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
  });

  const scrollbarX = useTransform(scrollXProgress, [0, 1], [0, 88]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (scrollContainerRef.current) {
      const delta = latest - lastProgress.current;
      lastProgress.current = latest;
      
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      // Scroll by a portion of the total width for a subtle effect
      scrollContainerRef.current.scrollLeft += delta * maxScroll * 0.4;
    }
  });

  // Mouse Drag to Scroll Logic
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeftStart.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  return (
    <section ref={containerRef} className="py-24 bg-luxury-dark-surface overflow-hidden">
      <div className="mb-12 px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl text-luxury-cream mb-6 tracking-tight">
                {SITE_CONTENT.featuredProjects.titlePrefix} <span className="text-luxury-gold italic">{SITE_CONTENT.featuredProjects.titleHighlight}</span>
              </h2>
              <p className="text-luxury-cream/70 text-lg font-light leading-relaxed">
                {SITE_CONTENT.featuredProjects.subtitle}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Container with Manual Scroll */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-8 px-6 lg:px-16 pb-4 w-max">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0 w-[350px] lg:w-[500px] h-[600px] relative group rounded-sm overflow-hidden"
            >
              <BeforeAfterSlider image={item.image} />

              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-luxury-gold text-sm tracking-wider uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.category}
                </div>
                <h3 className="text-2xl text-luxury-cream">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Interactive Scrollbar */}
      <div className="flex justify-center mt-12 px-6">
        <div 
          className="w-32 h-1.5 bg-luxury-cream/10 rounded-full relative cursor-pointer"
          onClick={(e) => {
            if (!scrollContainerRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            // The thumb is 40px wide. We center the thumb at the click position.
            const thumbWidth = 40;
            const trackWidth = 128; // 32 * 4px
            
            // Calculate percentage based on center of thumb
            // effective track width is trackWidth - thumbWidth = 88px
            const effectiveClickX = Math.max(0, Math.min(88, clickX - thumbWidth / 2));
            const percentage = effectiveClickX / 88;
            
            const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollTo({
              left: maxScroll * percentage,
              behavior: "smooth"
            });
          }}
        >
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-10 bg-luxury-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            style={{ x: scrollbarX }}
          />
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
