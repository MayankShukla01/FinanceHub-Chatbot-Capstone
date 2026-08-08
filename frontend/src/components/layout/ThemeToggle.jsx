import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full flex items-center justify-center dark:bg-dark-card bg-light-input border dark:border-border-dark border-border-light transition-all duration-300 hover:border-mint hover:shadow-[0_0_12px_rgba(0,232,184,0.15)] cursor-pointer"
      aria-label="Toggle theme"
    >
      <Sun className={`w-4 h-4 absolute text-amber-400 transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
      <Moon className={`w-4 h-4 absolute text-mint transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
    </button>
  );
}
