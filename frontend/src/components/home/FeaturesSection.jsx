import { MessageSquare, BookOpen, GraduationCap } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    description: 'Ask anything about finance and get instant, easy-to-understand answers powered by Gemini AI and our curated knowledge base.',
    color: 'from-accent-green to-emerald-600',
  },
  {
    icon: BookOpen,
    title: 'Topic Explorer',
    description: 'Browse 45+ curated topics covering everything from SIP to IPO, organized by category for easy navigation.',
    color: 'from-accent-blue to-blue-600',
  },
  {
    icon: GraduationCap,
    title: 'Beginner Friendly',
    description: 'Designed for absolute beginners with simple language, Indian context, and real-world examples using ₹.',
    color: 'from-violet-500 to-purple-600',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold dark:text-white text-text-dark mb-4">
            Why <span className="text-gradient-green">FinanceHub</span>?
          </h2>
          <p className="dark:text-text-muted text-text-dark-muted text-lg max-w-xl mx-auto">
            Everything you need to start your financial journey, powered by cutting-edge AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 lg:p-8 rounded-2xl dark:glass-card-dark glass-card-light transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-green/10 hover:border-accent-green/30"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-xl font-semibold dark:text-white text-text-dark mb-3">{f.title}</h3>
              <p className="dark:text-text-muted text-text-dark-muted text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
