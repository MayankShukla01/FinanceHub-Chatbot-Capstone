import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import TiltCard from '../effects/TiltCard';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    const el = sectionRef.current;
    if (el) el.addEventListener('mousemove', handleMouse);
    return () => { if (el) el.removeEventListener('mousemove', handleMouse); };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 dark:bg-dark-base bg-light-base" />
      <div className="absolute inset-0 opacity-30 dark:opacity-100">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] dark:bg-mint/[0.04] bg-mint/[0.08]"
          style={{ left: '20%', top: '20%', transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] dark:bg-blue/[0.05] bg-blue/[0.06]"
          style={{ right: '15%', bottom: '20%', transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px] dark:bg-violet/[0.04] bg-violet/[0.05]"
          style={{ left: '50%', top: '10%', transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
        />
      </div>

      {/* Floating interactive orbs */}
      <div
        className="absolute w-2 h-2 rounded-full bg-mint/40 animate-float"
        style={{ left: '15%', top: '30%', transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`, animationDelay: '0s' }}
      />
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-blue/40 animate-float"
        style={{ right: '20%', top: '25%', transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`, animationDelay: '2s' }}
      />
      <div
        className="absolute w-1 h-1 rounded-full bg-violet/50 animate-float"
        style={{ left: '70%', bottom: '30%', transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`, animationDelay: '4s' }}
      />
      <div
        className="absolute w-2.5 h-2.5 rounded-full bg-mint/20 animate-float"
        style={{ left: '30%', bottom: '25%', transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)`, animationDelay: '1s' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <TiltCard className="inline-block">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-dark-card bg-white border dark:border-border-dark border-border-light mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-mint" />
            <span className="text-xs dark:text-text-dim text-text-dark-dim font-medium">Your go-to for Indian stock market basics</span>
          </div>
        </TiltCard>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 animate-slide-up leading-tight">
          <span className="dark:text-text-white text-text-dark">Learn Finance,</span>
          <br />
          <span className="text-gradient">Without the Jargon</span>
        </h1>

        <p className="text-base sm:text-lg dark:text-text-dim text-text-dark-dim max-w-lg mx-auto mb-10 animate-slide-up leading-relaxed" style={{ animationDelay: '0.15s' }}>
          SIP, mutual funds, IPOs, taxation — whatever you're curious about, just ask. No sign-up, no fluff.
        </p>

        <button
          onClick={() => document.querySelector('#chat')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-slide-up group cursor-pointer"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2 text-sm dark:text-text-dim text-text-dark-dim hover:text-mint dark:hover:text-mint transition-colors">
            <span>Jump in</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </div>
        </button>
      </div>
    </section>
  );
}
