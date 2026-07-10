export const topicCategories = [
  {
    id: 'market-basics', name: 'Market Basics', icon: 'TrendingUp', color: 'text-emerald-400',
    topics: [
      { id: 'what-is-stock-market', title: 'What is Stock Market?', question: 'What is the stock market and how does it work in India?' },
      { id: 'bse-nse', title: 'Understanding BSE and NSE', question: 'What are BSE and NSE? Explain the difference between them.' },
      { id: 'sebi', title: 'Role of SEBI', question: 'What is SEBI and what role does it play in the Indian stock market?' },
      { id: 'sensex', title: 'What is Sensex?', question: 'What is the Sensex and how is it calculated?' },
      { id: 'nifty', title: 'What is Nifty 50?', question: 'What is Nifty 50 and why is it important?' },
    ],
  },
  {
    id: 'getting-started', name: 'Getting Started', icon: 'Rocket', color: 'text-blue-400',
    topics: [
      { id: 'demat-account', title: 'What is a Demat Account?', question: 'What is a Demat account and why do I need one to invest in stocks?' },
      { id: 'trading-account', title: 'How to Open Trading Account?', question: 'How do I open a trading account in India? What are the steps?' },
      { id: 'kyc', title: 'KYC Process', question: 'What is the KYC process for opening a trading account in India?' },
      { id: 'choose-broker', title: 'Choosing a Broker', question: 'How do I choose a stockbroker in India? Compare Zerodha, Groww, and Angel One.' },
      { id: 'first-trade', title: 'Placing Your First Trade', question: 'How do I place my first stock trade? Walk me through the steps.' },
    ],
  },
  {
    id: 'mutual-funds', name: 'Mutual Funds', icon: 'PieChart', color: 'text-violet-400',
    topics: [
      { id: 'what-are-mf', title: 'What are Mutual Funds?', question: 'What are mutual funds and how do they work?' },
      { id: 'types-mf', title: 'Types of Mutual Funds', question: 'What are the different types of mutual funds available in India?' },
      { id: 'direct-regular', title: 'Direct vs Regular Plans', question: 'What is the difference between direct and regular mutual fund plans?' },
      { id: 'nav', title: 'Understanding NAV', question: 'What is NAV in mutual funds and how is it calculated?' },
      { id: 'expense-ratio', title: 'Expense Ratio Explained', question: 'What is expense ratio in mutual funds and why does it matter?' },
    ],
  },
  {
    id: 'sip', name: 'SIP', icon: 'Repeat', color: 'text-green-400',
    topics: [
      { id: 'what-is-sip', title: 'What is SIP?', question: 'What is SIP (Systematic Investment Plan) and how does it work?' },
      { id: 'how-sip-works', title: 'How SIP Works', question: 'Explain how SIP works with a practical example.' },
      { id: 'rupee-cost-averaging', title: 'Rupee Cost Averaging', question: 'What is rupee cost averaging in SIP and how does it benefit investors?' },
      { id: 'compounding', title: 'Power of Compounding', question: 'Explain the power of compounding in SIP with an example.' },
      { id: 'step-up-sip', title: 'Step-up SIP', question: 'What is a step-up SIP and how is it different from a regular SIP?' },
    ],
  },
  {
    id: 'bonds-savings', name: 'Bonds & Savings', icon: 'Shield', color: 'text-yellow-400',
    topics: [
      { id: 'govt-bonds', title: 'Government Bonds', question: 'What are government bonds and how can I invest in them in India?' },
      { id: 'ppf', title: 'PPF', question: 'What is PPF (Public Provident Fund) and what are its benefits?' },
      { id: 'nps', title: 'NPS', question: 'What is NPS (National Pension System) and how does it work?' },
      { id: 'sgb', title: 'Sovereign Gold Bonds', question: 'What are Sovereign Gold Bonds and how are they better than physical gold?' },
      { id: 'fd', title: 'Fixed Deposits', question: 'How do fixed deposits work and what interest rates do banks offer?' },
    ],
  },
  {
    id: 'ipo', name: 'IPO', icon: 'Landmark', color: 'text-orange-400',
    topics: [
      { id: 'what-is-ipo', title: 'What is an IPO?', question: 'What is an IPO and why do companies go public?' },
      { id: 'apply-ipo', title: 'How to Apply for IPO', question: 'How do I apply for an IPO in India through UPI?' },
      { id: 'book-building', title: 'Book Building Process', question: 'What is the book building process in an IPO?' },
      { id: 'listing-gains', title: 'Listing Gains', question: 'What are listing gains in an IPO and how do they work?' },
      { id: 'sme-ipo', title: 'SME IPOs', question: 'What are SME IPOs and how are they different from mainboard IPOs?' },
    ],
  },
  {
    id: 'trading', name: 'Trading', icon: 'CandlestickChart', color: 'text-red-400',
    topics: [
      { id: 'intraday-delivery', title: 'Intraday vs Delivery', question: 'What is the difference between intraday and delivery trading?' },
      { id: 'stop-loss', title: 'Stop Loss Orders', question: 'What is a stop loss order and how do I use it?' },
      { id: 'fno-basics', title: 'F&O Basics', question: 'What are futures and options (F&O) and how do they work?' },
      { id: 'margin-trading', title: 'Margin Trading', question: 'What is margin trading and what are the risks involved?' },
      { id: 't1-settlement', title: 'T+1 Settlement', question: 'What is T+1 settlement in the Indian stock market?' },
    ],
  },
  {
    id: 'portfolio', name: 'Portfolio', icon: 'Briefcase', color: 'text-cyan-400',
    topics: [
      { id: 'diversification', title: 'Diversification', question: 'What is diversification and why is it important in investing?' },
      { id: 'asset-allocation', title: 'Asset Allocation', question: 'What is asset allocation and how should I allocate my investments?' },
      { id: 'risk-profiling', title: 'Risk Profiling', question: 'What is risk profiling and how do I determine my risk appetite?' },
      { id: 'rebalancing', title: 'Portfolio Rebalancing', question: 'What is portfolio rebalancing and how often should I do it?' },
      { id: 'emergency-fund', title: 'Emergency Fund', question: 'What is an emergency fund and how much should I keep?' },
    ],
  },
  {
    id: 'taxation', name: 'Taxation', icon: 'Receipt', color: 'text-pink-400',
    topics: [
      { id: 'stcg', title: 'STCG Tax', question: 'What is Short-Term Capital Gains (STCG) tax on stocks and mutual funds in India?' },
      { id: 'ltcg', title: 'LTCG Tax', question: 'What is Long-Term Capital Gains (LTCG) tax and what is the exemption limit?' },
      { id: '80c-elss', title: 'Section 80C and ELSS', question: 'How can I save tax using Section 80C and ELSS mutual funds?' },
      { id: 'stt', title: 'STT Explained', question: 'What is Securities Transaction Tax (STT) and how is it charged?' },
      { id: 'dividend-tax', title: 'Tax on Dividends', question: 'How are dividends from stocks and mutual funds taxed in India?' },
    ],
  },
  {
    id: 'glossary', name: 'Glossary', icon: 'BookOpen', color: 'text-indigo-400',
    topics: [
      { id: 'bull-bear', title: 'Bull and Bear Markets', question: 'What are bull and bear markets? Explain with examples.' },
      { id: 'blue-chip', title: 'Blue Chip Stocks', question: 'What are blue chip stocks? Give examples from the Indian market.' },
      { id: 'market-cap', title: 'Market Capitalization', question: 'What is market capitalization and how are stocks classified by market cap?' },
      { id: 'pe-ratio', title: 'P/E Ratio', question: 'What is the P/E ratio and how is it used to value stocks?' },
      { id: 'eps', title: 'EPS', question: 'What is Earnings Per Share (EPS) and why is it important?' },
    ],
  },
];
