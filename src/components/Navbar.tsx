import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import company from '@/data/company.json';
import Logo from './Logo';
import ServicesDropdown from './ServicesDropdown';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`container-px mx-auto flex max-w-7xl items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'rounded-full border border-ink/10 bg-paper/85 backdrop-blur-xl shadow-soft py-2.5 px-5 mx-4 lg:mx-auto'
              : 'py-0'
          }`}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink hover:opacity-80 transition-opacity"
          >
            <Logo width={32} height={32} />
            {company.brand.name}
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            <ServicesDropdown />
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-ink-500 transition-colors hover:text-ink"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('#contact')}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:bg-signal-600 hover:shadow-glow"
            >
              Start a project
              <ArrowUpRight size={15} />
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center rounded-full border border-ink/10 p-2.5 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-paper p-7 shadow-lifted"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-ink">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-ink/10 p-2"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                <button
                  onClick={() => handleNavClick('#services')}
                  className="border-b border-ink/8 py-4 text-left font-display text-2xl font-medium text-ink hover:text-signal-600 transition-colors"
                >
                  Services
                </button>

                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className="border-b border-ink/8 py-4 text-left font-display text-2xl font-medium text-ink hover:text-signal-600 transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <button
                onClick={() => handleNavClick('#contact')}
                className="btn-primary mt-10 w-full"
              >
                Start a project
                <ArrowUpRight size={15} />
              </button>

              <div className="mt-10 text-sm text-ink-400">
                <p>{company.contact.email}</p>
                <p className="mt-1">{company.contact.phone}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}