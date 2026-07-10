export default function SuggestedQuestions({ onQuestionClick }) {
  const questions = [
    'What is SIP?',
    'How to open a Demat account?',
    'Explain mutual funds',
    'What is Nifty 50?',
    'How is LTCG taxed?',
    'What is an IPO?',
    'How to start investing?',
    'What are blue chip stocks?',
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center py-2">
      {questions.map(q => (
        <button
          key={q}
          onClick={() => onQuestionClick(q)}
          className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm dark:bg-surface-dark bg-white/60 dark:text-text-muted text-text-dark-muted border dark:border-border-dark border-border-light hover:border-accent-green hover:text-accent-green dark:hover:text-accent-green transition-all duration-200 cursor-pointer"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
