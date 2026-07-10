import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import FeaturesSection from './components/home/FeaturesSection';
import TopicExplorer from './components/topics/TopicExplorer';
import HowItWorks from './components/home/HowItWorks';
import ChatSection from './components/chat/ChatSection';
import Footer from './components/layout/Footer';

export default function App() {
  const [pendingQuestion, setPendingQuestion] = useState('');

  const handleTopicClick = (question) => {
    setPendingQuestion(question);
    setTimeout(() => {
      document.querySelector('#chat')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen dark:bg-navy bg-bg-light dark:text-text-primary text-gray-900 font-body transition-colors duration-300">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <TopicExplorer onTopicClick={handleTopicClick} />
        <HowItWorks />
        <ChatSection
          pendingQuestion={pendingQuestion}
          onQuestionHandled={() => setPendingQuestion('')}
        />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
