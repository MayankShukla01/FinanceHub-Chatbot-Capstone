import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CursorGlow from './components/effects/CursorGlow';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import ChatSection from './components/chat/ChatSection';
import MarketDataSection from './components/market/MarketDataSection';
import Footer from './components/layout/Footer';

export default function App() {
  const [pendingQuestion, setPendingQuestion] = useState('');

  return (
    <ThemeProvider>
      <div className="min-h-screen dark:bg-dark-base bg-light-base dark:text-text-white text-gray-900 font-body transition-colors duration-300">
        <CursorGlow />
        <Navbar />
        <HeroSection />
        <ChatSection
          pendingQuestion={pendingQuestion}
          onQuestionHandled={() => setPendingQuestion('')}
        />
        <MarketDataSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
