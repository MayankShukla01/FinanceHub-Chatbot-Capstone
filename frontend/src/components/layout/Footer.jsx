import { TrendingUp, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-light border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-accent-green" />
              <span className="text-lg font-bold font-heading text-white">FinanceHub</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Your AI-powered guide to the Indian stock market. Learn finance concepts with ease, powered by advanced RAG technology and Gemini AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Topics', 'Chat', 'About'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-text-muted hover:text-accent-green transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-white font-semibold mb-4">Disclaimer</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              FinanceHub provides educational content only. This is not financial advice. Always consult a SEBI-registered financial advisor before making investment decisions.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm flex items-center gap-1">
            © 2024 FinanceHub. Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> Powered by Gemini AI
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-green transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
