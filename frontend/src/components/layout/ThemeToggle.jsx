import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl dark:bg-surface-dark bg-white/50 dark:border-border-dark border-border-light border transition-all duration-300 hover:scale-110 hover:border-accent-green cursor-pointer"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className={`w-5 h-5 absolute inset-0 text-yellow-400 transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
        <Moon className={`w-5 h-5 absolute inset-0 text-accent-green transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
      </div>
    </button>
  );
}
