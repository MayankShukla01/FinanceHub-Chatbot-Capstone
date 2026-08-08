import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'dark:bg-dark-base/80 bg-light-base/80 backdrop-blur-xl border-b dark:border-border-dark border-border-light' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mint to-blue flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(0,232,184,0.3)] transition-all duration-300">
            <TrendingUp className="w-4 h-4 text-dark-base" />
          </div>
          <span className="text-lg font-bold font-heading text-gradient">FinanceHub</span>
        </a>

        <ThemeToggle />
      </div>
    </nav>
  );
}
