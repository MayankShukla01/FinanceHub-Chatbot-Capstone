import { useState } from 'react';
import { topicCategories } from '../../data/topics';
import { ArrowRight, TrendingUp, Rocket, PieChart, Repeat, Shield, Landmark, CandlestickChart, Briefcase, Receipt, BookOpen, Layers } from 'lucide-react';

const iconMap = { TrendingUp, Rocket, PieChart, Repeat, Shield, Landmark, CandlestickChart, Briefcase, Receipt, BookOpen };

export default function TopicExplorer({ onTopicClick }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTopics = activeCategory === 'all'
    ? topicCategories.flatMap(c => c.topics.map(t => ({ ...t, categoryName: c.name, color: c.color })))
    : topicCategories.filter(c => c.id === activeCategory).flatMap(c => c.topics.map(t => ({ ...t, categoryName: c.name, color: c.color })));

  return (
    <section id="topics" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold dark:text-white text-text-dark mb-4">
            Explore <span className="text-gradient-green">Topics</span>
          </h2>
          <p className="dark:text-text-muted text-text-dark-muted text-lg max-w-xl mx-auto">
            Browse curated finance topics or click any topic to ask the AI chatbot.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-accent-green text-navy shadow-lg shadow-accent-green/20'
                : 'dark:bg-surface-dark bg-white/60 dark:text-text-muted text-text-dark-muted border dark:border-border-dark border-border-light hover:border-accent-green hover:text-accent-green'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> All
          </button>
          {topicCategories.map(cat => {
            const Icon = iconMap[cat.icon] || BookOpen;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-accent-green text-navy shadow-lg shadow-accent-green/20'
                    : 'dark:bg-surface-dark bg-white/60 dark:text-text-muted text-text-dark-muted border dark:border-border-dark border-border-light hover:border-accent-green hover:text-accent-green'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {cat.name}
              </button>
            );
          })}
        </div>

        {/* Topic cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTopics.map((topic, i) => (
            <button
              key={topic.id}
              onClick={() => onTopicClick(topic.question)}
              className="group text-left p-4 rounded-xl dark:glass-card-dark glass-card-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-green/10 hover:border-accent-green/40 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`text-xs font-medium ${topic.color} mb-1 block`}>{topic.categoryName}</span>
                  <h4 className="dark:text-white text-text-dark font-medium text-sm">{topic.title}</h4>
                </div>
                <ArrowRight className="w-4 h-4 dark:text-text-muted text-text-dark-muted group-hover:text-accent-green group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-0.5" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
