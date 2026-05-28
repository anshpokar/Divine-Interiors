import { motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CatalogueModal } from "./CatalogueModal";
import { SITE_CONTENT } from "../constants";

export interface CatalogueItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  dimensions: string;
  materials: string;
  price: string;
  beforeAfter?: boolean;
}

function BeforeAfterSlider({ image }: { image: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && e.type !== 'click') return;

    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div
      className="relative w-full h-full select-none cursor-col-resize"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onClick={handleMove}
    >
      {/* Before Image (grayscale) */}
      <img
        src={image}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover grayscale"
        draggable={false}
      />

      {/* After Image */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={image}
          alt="After"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-luxury-gold shadow-lg pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center shadow-xl pointer-events-auto">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-luxury-charcoal" />
            <div className="w-0.5 h-4 bg-luxury-charcoal" />
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 bg-luxury-charcoal/80 backdrop-blur-sm px-3 py-1 rounded pointer-events-none">
        <span className="text-luxury-cream text-xs">Before</span>
      </div>
      <div className="absolute top-4 right-4 bg-luxury-charcoal/80 backdrop-blur-sm px-3 py-1 rounded pointer-events-none">
        <span className="text-luxury-cream text-xs">After</span>
      </div>
    </div>
  );
}

const catalogueItems: CatalogueItem[] = [
  {
    id: 1,
    title: "Contemporary Living Suite",
    category: "Living Room",
    description: "A meticulously crafted collection featuring modular seating, custom coffee tables, and bespoke storage solutions. Every piece is designed to create a harmonious flow while maintaining distinct character.",
    image: "https://images.unsplash.com/photo-1634822929331-ee4dc2c97fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBmdXJuaXR1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzc5OTQxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dimensions: "Custom sizing available",
    materials: "Italian leather, Solid walnut, Brushed brass",
    price: "$15,000",
    beforeAfter: true,
  },
  {
    id: 2,
    title: "Modular Kitchen System",
    category: "Kitchen",
    description: "Precision-engineered cabinetry with seamless integration of appliances and storage. Features soft-close mechanisms, LED lighting, and premium stone countertops.",
    image: "https://images.unsplash.com/photo-1663811396777-05505d999151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc5ODQ3Mjg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dimensions: "10ft x 12ft (customizable)",
    materials: "Lacquered wood, Quartz, Stainless steel",
    price: "$28,000",
  },
  {
    id: 3,
    title: "Minimalist Bedroom Collection",
    category: "Bedroom",
    description: "Serene and timeless bedroom furniture that emphasizes clean lines and luxurious comfort. Includes platform bed, integrated nightstands, and floating wardrobe system.",
    image: "https://images.unsplash.com/photo-1633809365429-2fa048a02119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwYmVkcm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3OTk0MTkyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    dimensions: "King/Queen size options",
    materials: "Oak veneer, Linen upholstery, Powder-coated steel",
    price: "$12,500",
    beforeAfter: true,
  },
  {
    id: 4,
    title: "Executive Office Suite",
    category: "Commercial",
    description: "Professional workspace design featuring ergonomic furniture, integrated cable management, and acoustic panels. Perfect for modern corporate environments.",
    image: "https://images.unsplash.com/photo-1667510436110-79d3dabc2008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxsdXh1cnklMjBtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzc5OTQxOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dimensions: "15ft x 20ft workspace",
    materials: "Tempered glass, Aluminum, Acoustic fabric",
    price: "$35,000",
  },
  {
    id: 5,
    title: "Artisan Dining Experience",
    category: "Dining",
    description: "Handcrafted dining ensemble with live-edge table and sculptural chairs. Each piece is unique, celebrating natural wood grain and organic forms.",
    image: "https://images.unsplash.com/photo-1690489965043-ec15758cce71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmdXJuaXR1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzc5OTQxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dimensions: "8-seater: 96\" - 42\"",
    materials: "Solid teak, Velvet upholstery, Hand-finished oil",
    price: "$18,500",
    beforeAfter: true,
  },
  {
    id: 6,
    title: "Luxury Lounge Furniture",
    category: "Living Room",
    description: "Statement pieces that blend comfort with contemporary aesthetics. Modular configurations allow for versatile arrangements in any space.",
    image: "https://images.unsplash.com/photo-1653972233678-5d1c28d2a99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBmdXJuaXR1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzc5OTQxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dimensions: "Modular: 120\" - 180\" width",
    materials: "High-density foam, Bouclé fabric, Solid ash",
    price: "$22,000",
  },
  {
    id: 7,
    title: "Velvet Accent Chair",
    category: "Living Room",
    description: "A bold statement piece upholstered in rich velvet, featuring a curved brass frame that balances softness with geometric precision.",
    image: "https://images.unsplash.com/photo-1616464916356-3a408c903a4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    dimensions: "32\" x 30\" x 34\"",
    materials: "Italian Velvet, Brushed Brass",
    price: "$3,200",
  },
  {
    id: 8,
    title: "Sculptural Floor Lamp",
    category: "Lighting",
    description: "An elegant, towering floor lamp that acts as a piece of modern art, casting a warm, ambient glow to soften luxury spaces.",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    dimensions: "Height: 72\"",
    materials: "Black Marble, Aged Bronze, Opal Glass",
    price: "$1,800",
  },
];

export function CatalogueGrid() {
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);
  const [chunkSize, setChunkSize] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      setChunkSize(window.innerWidth < 1024 ? 2 : 6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Chunk items into groups for pages
  const chunkedItems = [];
  for (let i = 0; i < catalogueItems.length; i += chunkSize) {
    chunkedItems.push(catalogueItems.slice(i, i + chunkSize));
  }

  return (
    <>
      <section id="catalogue" className="py-24 bg-luxury-charcoal">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-luxury-cream mb-6 tracking-tight">
              {SITE_CONTENT.collections.titlePrefix} <span className="text-luxury-gold italic">{SITE_CONTENT.collections.titleHighlight}</span>
            </h2>
            <p className="text-luxury-cream/70 text-lg font-light max-w-2xl leading-relaxed">
              {SITE_CONTENT.collections.subtitle}
            </p>
          </motion.div>

          {/* Grid or Carousel */}
          {chunkedItems.length > 1 ? (
            <div className="relative">
              <div className="overflow-hidden py-4 -my-4" ref={emblaRef}>
                <div className="flex">
                  {chunkedItems.map((chunk, chunkIndex) => (
                    <div key={chunkIndex} className="flex-[0_0_100%] min-w-0">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 px-2">
                        {chunk.map((item, index) => (
                          <motion.div
                            key={item.id}
                            layoutId={`catalogue-${item.id}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            onClick={() => setSelectedItem(item)}
                            className="group cursor-pointer relative overflow-hidden rounded-sm bg-luxury-dark-surface border border-luxury-gold/20 hover:border-luxury-gold/60 transition-all duration-300"
                          >
                            {/* Image Container */}
                            <div className="relative h-[350px] overflow-hidden">
                              {item.beforeAfter ? (
                                <>
                                  <BeforeAfterSlider image={item.image} />
                                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-transparent to-transparent opacity-40 pointer-events-none" />
                                </>
                              ) : (
                                <>
                                  <motion.img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                                </>
                              )}

                              {/* Category Badge */}
                              <div className="absolute top-4 left-4 bg-luxury-charcoal/80 backdrop-blur-sm px-3 py-1 rounded z-10 pointer-events-none">
                                <span className="text-luxury-gold text-xs tracking-wider uppercase">
                                  {item.category}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-3">
                              <h3 className="text-2xl text-luxury-cream group-hover:text-luxury-gold transition-colors duration-300">
                                {item.title}
                              </h3>
                              <p className="text-luxury-cream/60 text-sm line-clamp-2">
                                {item.description}
                              </p>
                              <div className="pt-2 flex items-center justify-between">
                                <span className="text-luxury-cream text-lg">
                                  From {item.price}
                                </span>
                                <motion.span
                                  className="text-luxury-gold text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                  View Details →
                                </motion.span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-4 mt-12">
                {chunkedItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === selectedIndex ? "bg-white w-12" : "bg-white/30 w-3 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {catalogueItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layoutId={`catalogue-${item.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer relative overflow-hidden rounded-sm bg-luxury-dark-surface border border-luxury-gold/20 hover:border-luxury-gold/60 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative h-[350px] overflow-hidden">
                    {item.beforeAfter ? (
                      <>
                        <BeforeAfterSlider image={item.image} />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-transparent to-transparent opacity-40 pointer-events-none" />
                      </>
                    ) : (
                      <>
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      </>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-luxury-charcoal/80 backdrop-blur-sm px-3 py-1 rounded z-10 pointer-events-none">
                      <span className="text-luxury-gold text-xs tracking-wider uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl text-luxury-cream group-hover:text-luxury-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-luxury-cream/60 text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-luxury-cream text-lg">
                        From {item.price}
                      </span>
                      <motion.span
                        className="text-luxury-gold text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View Details →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <CatalogueModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
