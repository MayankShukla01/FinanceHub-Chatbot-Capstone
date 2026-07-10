import { MessageCircle, Search, Sparkles } from 'lucide-react';

const steps = [
  { num: '01', icon: MessageCircle, title: 'Ask a Question', desc: 'Type any finance question in plain English — no jargon needed.' },
  { num: '02', icon: Search, title: 'Smart Retrieval', desc: 'Our AI searches through curated Indian finance knowledge using RAG technology.' },
  { num: '03', icon: Sparkles, title: 'Get Your Answer', desc: 'Receive a clear, beginner-friendly explanation powered by Gemini AI.' },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold dark:text-white text-text-dark mb-4">
            How It <span className="text-gradient-green">Works</span>
          </h2>
          <p className="dark:text-text-muted text-text-dark-muted text-lg max-w-xl mx-auto">
            Three simple steps to get your finance questions answered.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-accent-green/20 via-accent-green/40 to-accent-green/20" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center group">
              {/* Step number badge */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-green to-accent-green-dark flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-green/30 transition-all duration-300">
                <step.icon className="w-7 h-7 text-navy" />
              </div>

              <div className="p-6 rounded-2xl dark:glass-card-dark glass-card-light transition-all duration-300 hover:border-accent-green/30">
                <span className="text-accent-green font-heading font-bold text-sm mb-2 block">{step.num}</span>
                <h3 className="font-heading text-lg font-semibold dark:text-white text-text-dark mb-2">{step.title}</h3>
                <p className="dark:text-text-muted text-text-dark-muted text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
