import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t dark:border-border-dark border-border-light">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-mint" />
          <span className="text-sm font-heading font-semibold text-gradient">FinanceHub</span>
        </div>
        <p className="text-xs dark:text-text-dim/50 text-text-dark-dim/50">
          &copy; {new Date().getFullYear()} FinanceHub &middot; Built for learners
        </p>
      </div>
    </footer>
  );
}
