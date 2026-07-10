import { useState, useEffect } from 'react';
import { TrendingUp, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Topics', href: '#topics' },
  { label: 'Chat', href: '#chat' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'dark:bg-glass-dark bg-glass-light backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNav('#home'); }} className="flex items-center gap-2 group">
            <TrendingUp className="w-7 h-7 text-accent-green transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold font-heading text-gradient-green">FinanceHub</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="dark:text-text-muted text-text-dark-muted hover:text-accent-green dark:hover:text-accent-green transition-colors duration-200 text-sm font-medium cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 dark:text-text-primary text-text-dark cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden dark:bg-glass-dark bg-glass-light backdrop-blur-xl border-t dark:border-border-dark border-border-light animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="block w-full text-left dark:text-text-primary text-text-dark hover:text-accent-green transition-colors py-2 text-sm font-medium cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
