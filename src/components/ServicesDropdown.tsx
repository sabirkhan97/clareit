import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import servicesData from '@/data/service.json';

const ServicesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hover with delay for better UX
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredIndex(null);
    }, 200);
  };

  const handleItemHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleItemLeave = () => {
    setHoveredIndex(null);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setHoveredIndex(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setHoveredIndex(null);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-ink-500 transition-colors hover:text-ink group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Services
        <ChevronDown
          size={16}
          className={`transition-all duration-300 ${
            isOpen ? 'rotate-180 text-signal-600' : 'group-hover:rotate-180'
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-1/2 top-full mt-3 w-screen max-w-3xl -translate-x-1/2"
          >
            <div className="rounded-2xl border border-ink/10 bg-paper p-2 shadow-2xl backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-1 p-2">
                {servicesData.map((service, index) => (
                  <motion.button
                    key={service.id}
                    variants={itemVariants}
                    onMouseEnter={() => handleItemHover(index)}
                    onMouseLeave={handleItemLeave}
                    onClick={() => handleNavClick(service.href)}
                    className="group relative flex items-start gap-3 rounded-xl p-3 text-left transition-all duration-200"
                    style={{
                      background:
                        hoveredIndex === index
                          ? 'rgba(0,0,0,0.04)'
                          : 'transparent',
                    }}
                  >
                    {/* Hover background glow */}
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="hoverGlow"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-signal-600/5 to-purple-600/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    <span className="relative mt-0.5 text-2xl transition-transform duration-200 group-hover:scale-110">
                      {service.icon}
                    </span>
                    <div className="relative">
                      <h4 className="font-display text-sm font-semibold text-ink transition-colors group-hover:text-signal-600">
                        {service.title}
                      </h4>
                      <p className="mt-0.5 text-xs text-ink-400">
                        {service.description}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-ink-400 transition-colors group-hover:bg-signal-600/10 group-hover:text-signal-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="border-t border-ink/8 p-3">
                <button
                  onClick={() => handleNavClick('#services')}
                  className="group flex w-full items-center justify-between rounded-lg p-2 text-sm font-medium text-ink-500 transition-all duration-200 hover:bg-ink/5 hover:text-ink"
                >
                  <span>View all services</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-600"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesDropdown;