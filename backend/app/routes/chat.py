"""Chat API routes for FinanceHub."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.rag_engine import rag_engine

router = APIRouter()


class ChatMessage(BaseModel):
    """Schema for individual chat messages."""
    role: str
    content: str


class ChatRequest(BaseModel):
    """Schema for chat request body."""
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    """Schema for chat response body."""
    answer: str
    sources: list[str]


class TopicItem(BaseModel):
    """Schema for individual topic."""
    id: str
    title: str
    question: str


class TopicCategory(BaseModel):
    """Schema for topic category."""
    id: str
    name: str
    icon: str
    topics: list[TopicItem]


TOPIC_CATEGORIES = [
    TopicCategory(
        id="market-basics",
        name="Market Basics",
        icon="TrendingUp",
        topics=[
            TopicItem(id="what-is-stock-market", title="What is Stock Market?", question="What is the stock market and how does it work in India?"),
            TopicItem(id="bse-nse", title="Understanding BSE and NSE", question="What are BSE and NSE? Explain the difference between them."),
            TopicItem(id="sebi", title="Role of SEBI", question="What is SEBI and what role does it play in the Indian stock market?"),
            TopicItem(id="sensex", title="What is Sensex?", question="What is the Sensex and how is it calculated?"),
            TopicItem(id="nifty", title="What is Nifty 50?", question="What is Nifty 50 and why is it important?"),
        ],
    ),
    TopicCategory(
        id="getting-started",
        name="Getting Started",
        icon="Rocket",
        topics=[
            TopicItem(id="demat-account", title="What is a Demat Account?", question="What is a Demat account and why do I need one to invest in stocks?"),
            TopicItem(id="trading-account", title="How to Open Trading Account?", question="How do I open a trading account in India? What are the steps?"),
            TopicItem(id="kyc", title="KYC Process", question="What is the KYC process for opening a trading account in India?"),
            TopicItem(id="choose-broker", title="Choosing a Broker", question="How do I choose a stockbroker in India? Compare Zerodha, Groww, and Angel One."),
            TopicItem(id="first-trade", title="Placing Your First Trade", question="How do I place my first stock trade? Walk me through the steps."),
        ],
    ),
    TopicCategory(
        id="mutual-funds",
        name="Mutual Funds",
        icon="PieChart",
        topics=[
            TopicItem(id="what-are-mf", title="What are Mutual Funds?", question="What are mutual funds and how do they work?"),
            TopicItem(id="types-mf", title="Types of Mutual Funds", question="What are the different types of mutual funds available in India?"),
            TopicItem(id="direct-regular", title="Direct vs Regular Plans", question="What is the difference between direct and regular mutual fund plans?"),
            TopicItem(id="nav", title="Understanding NAV", question="What is NAV in mutual funds and how is it calculated?"),
            TopicItem(id="expense-ratio", title="Expense Ratio Explained", question="What is expense ratio in mutual funds and why does it matter?"),
        ],
    ),
    TopicCategory(
        id="sip",
        name="SIP",
        icon="Repeat",
        topics=[
            TopicItem(id="what-is-sip", title="What is SIP?", question="What is SIP (Systematic Investment Plan) and how does it work?"),
            TopicItem(id="how-sip-works", title="How SIP Works", question="Explain how SIP works with a practical example."),
            TopicItem(id="rupee-cost-averaging", title="Rupee Cost Averaging", question="What is rupee cost averaging in SIP and how does it benefit investors?"),
            TopicItem(id="compounding", title="Power of Compounding", question="Explain the power of compounding in SIP with an example."),
            TopicItem(id="step-up-sip", title="Step-up SIP", question="What is a step-up SIP and how is it different from a regular SIP?"),
        ],
    ),
    TopicCategory(
        id="bonds-savings",
        name="Bonds & Savings",
        icon="Shield",
        topics=[
            TopicItem(id="govt-bonds", title="Government Bonds", question="What are government bonds and how can I invest in them in India?"),
            TopicItem(id="ppf", title="PPF", question="What is PPF (Public Provident Fund) and what are its benefits?"),
            TopicItem(id="nps", title="NPS", question="What is NPS (National Pension System) and how does it work?"),
            TopicItem(id="sgb", title="Sovereign Gold Bonds", question="What are Sovereign Gold Bonds and how are they better than physical gold?"),
            TopicItem(id="fd", title="Fixed Deposits", question="How do fixed deposits work and what interest rates do banks offer?"),
        ],
    ),
    TopicCategory(
        id="ipo",
        name="IPO",
        icon="Landmark",
        topics=[
            TopicItem(id="what-is-ipo", title="What is an IPO?", question="What is an IPO and why do companies go public?"),
            TopicItem(id="apply-ipo", title="How to Apply for IPO", question="How do I apply for an IPO in India through UPI?"),
            TopicItem(id="book-building", title="Book Building Process", question="What is the book building process in an IPO?"),
            TopicItem(id="listing-gains", title="Listing Gains", question="What are listing gains in an IPO and how do they work?"),
            TopicItem(id="sme-ipo", title="SME IPOs", question="What are SME IPOs and how are they different from mainboard IPOs?"),
        ],
    ),
    TopicCategory(
        id="trading",
        name="Trading",
        icon="CandlestickChart",
        topics=[
            TopicItem(id="intraday-delivery", title="Intraday vs Delivery", question="What is the difference between intraday and delivery trading?"),
            TopicItem(id="stop-loss", title="Stop Loss Orders", question="What is a stop loss order and how do I use it?"),
            TopicItem(id="fno-basics", title="F&O Basics", question="What are futures and options (F&O) and how do they work?"),
            TopicItem(id="margin-trading", title="Margin Trading", question="What is margin trading and what are the risks involved?"),
            TopicItem(id="t1-settlement", title="T+1 Settlement", question="What is T+1 settlement in the Indian stock market?"),
        ],
    ),
    TopicCategory(
        id="portfolio",
        name="Portfolio",
        icon="Briefcase",
        topics=[
            TopicItem(id="diversification", title="Diversification", question="What is diversification and why is it important in investing?"),
            TopicItem(id="asset-allocation", title="Asset Allocation", question="What is asset allocation and how should I allocate my investments?"),
            TopicItem(id="risk-profiling", title="Risk Profiling", question="What is risk profiling and how do I determine my risk appetite?"),
            TopicItem(id="rebalancing", title="Portfolio Rebalancing", question="What is portfolio rebalancing and how often should I do it?"),
            TopicItem(id="emergency-fund", title="Emergency Fund", question="What is an emergency fund and how much should I keep?"),
        ],
    ),
    TopicCategory(
        id="taxation",
        name="Taxation",
        icon="Receipt",
        topics=[
            TopicItem(id="stcg", title="STCG Tax", question="What is Short-Term Capital Gains (STCG) tax on stocks and mutual funds in India?"),
            TopicItem(id="ltcg", title="LTCG Tax", question="What is Long-Term Capital Gains (LTCG) tax and what is the exemption limit?"),
            TopicItem(id="80c-elss", title="Section 80C and ELSS", question="How can I save tax using Section 80C and ELSS mutual funds?"),
            TopicItem(id="stt", title="STT Explained", question="What is Securities Transaction Tax (STT) and how is it charged?"),
            TopicItem(id="dividend-tax", title="Tax on Dividends", question="How are dividends from stocks and mutual funds taxed in India?"),
        ],
    ),
    TopicCategory(
        id="glossary",
        name="Glossary",
        icon="BookOpen",
        topics=[
            TopicItem(id="bull-bear", title="Bull and Bear Markets", question="What are bull and bear markets? Explain with examples."),
            TopicItem(id="blue-chip", title="Blue Chip Stocks", question="What are blue chip stocks? Give examples from the Indian market."),
            TopicItem(id="market-cap", title="Market Capitalization", question="What is market capitalization and how are stocks classified by market cap?"),
            TopicItem(id="pe-ratio", title="P/E Ratio", question="What is the P/E ratio and how is it used to value stocks?"),
            TopicItem(id="eps", title="EPS", question="What is Earnings Per Share (EPS) and why is it important?"),
        ],
    ),
]


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Process a chat message through the RAG pipeline."""
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # Convert history to dict format
    history = [{"role": msg.role, "content": msg.content} for msg in request.history]

    result = await rag_engine.query(request.message, history)

    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"],
    )


@router.get("/topics")
async def get_topics():
    """Return all topic categories for the frontend explorer."""
    return [cat.model_dump() for cat in TOPIC_CATEGORIES]


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "rag_initialized": rag_engine.initialized,
    }
