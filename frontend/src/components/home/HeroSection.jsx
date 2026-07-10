import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

const words = ['Indian Stock Market', 'Mutual Funds', 'SIP Investments', 'Financial Freedom'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % words.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 dark:bg-hero-dark bg-hero-light animate-gradient" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-green/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent-green/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-surface-dark bg-white/60 dark:border-border-dark border-border-light border mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-accent-green" />
          <span className="text-sm dark:text-text-muted text-text-dark-muted">Powered by AI & RAG Technology</span>
        </div>

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up">
          <span className="dark:text-white text-text-dark">Your AI-Powered Guide to the</span>
          <br />
          <span className={`text-gradient-green inline-block transition-all duration-400 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {words[wordIndex]}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl dark:text-text-muted text-text-dark-muted max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Learn finance the smart way. Ask questions, explore topics, and build your financial knowledge with AI — designed for Indian investors.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => scrollTo('#chat')}
            className="px-8 py-3.5 bg-gradient-to-r from-accent-green to-accent-green-dark text-navy font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-green/25 transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            Start Chatting <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo('#topics')}
            className="px-8 py-3.5 border-2 border-accent-green dark:text-accent-green text-accent-green-dark rounded-xl hover:bg-accent-green hover:text-navy transition-all duration-300 hover:scale-105 flex items-center gap-2 font-semibold cursor-pointer"
          >
            <BookOpen className="w-4 h-4" /> Explore Topics
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          {['45+ Topics', 'Powered by AI', '100% Free'].map((stat, i) => (
            <div key={stat} className="flex items-center gap-2">
              {i > 0 && <div className="w-1 h-1 rounded-full bg-accent-green" />}
              <span className="text-sm dark:text-text-muted text-text-dark-muted font-medium">{stat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
