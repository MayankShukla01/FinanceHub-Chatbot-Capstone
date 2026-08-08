"""Market data API — Indian stock data with reliable demo fallback."""

import time
import random
import traceback
from datetime import datetime, timedelta
from fastapi import APIRouter

router = APIRouter()

# -- Cache --
_cache = {"data": None, "timestamp": 0}
CACHE_TTL = 300  # 5 minutes


# -- Demo data (realistic Indian market values as of mid-2026) --
DEMO_DATA = {
    "indices": [
        {"name": "NIFTY 50", "symbol": "^NSEI", "tag": "nifty", "base": 24850},
        {"name": "SENSEX", "symbol": "^BSESN", "tag": "sensex", "base": 81200},
    ],
    "stocks": [
        {"name": "Reliance", "symbol": "RELIANCE.NS", "tag": "reliance", "base": 2920},
        {"name": "TCS", "symbol": "TCS.NS", "tag": "tcs", "base": 3680},
        {"name": "HDFC Bank", "symbol": "HDFCBANK.NS", "tag": "hdfc", "base": 1640},
        {"name": "Infosys", "symbol": "INFY.NS", "tag": "infy", "base": 1520},
        {"name": "Bharti Airtel", "symbol": "BHARTIARTL.NS", "tag": "airtel", "base": 1480},
        {"name": "ITC", "symbol": "ITC.NS", "tag": "itc", "base": 445},
    ],
}


def _generate_history(base_price: float, days: int = 30) -> list:
    """Generate realistic-looking price history."""
    random.seed(int(base_price * 10) + datetime.now().day)
    history = []
    price = base_price * random.uniform(0.94, 0.98)

    today = datetime.now()
    for i in range(days):
        date = today - timedelta(days=days - i)
        if date.weekday() < 5:  # Weekdays only
            change = random.uniform(-0.012, 0.015)
            price *= (1 + change)
            history.append({
                "date": date.strftime("%b %d"),
                "close": round(price, 2),
            })

    # Ensure last point matches base price
    if history:
        history[-1]["close"] = base_price

    return history


def _build_demo_response() -> dict:
    """Build demo market data with generated history."""
    indices = []
    for item in DEMO_DATA["indices"]:
        base = item["base"]
        change = round(random.uniform(-200, 300), 2)
        change_pct = round((change / base) * 100, 2)
        indices.append({
            "name": item["name"],
            "symbol": item["symbol"],
            "tag": item["tag"],
            "current": base,
            "change": change,
            "changePct": change_pct,
            "history": _generate_history(base),
        })

    stocks = []
    for item in DEMO_DATA["stocks"]:
        base = item["base"]
        change = round(random.uniform(-30, 40), 2)
        change_pct = round((change / base) * 100, 2)
        stocks.append({
            "name": item["name"],
            "symbol": item["symbol"],
            "tag": item["tag"],
            "current": base,
            "change": change,
            "changePct": change_pct,
            "history": _generate_history(base),
        })

    return {
        "indices": indices,
        "stocks": stocks,
        "lastUpdated": datetime.now().strftime("%d %b %Y, %I:%M %p IST"),
        "isDemo": True,
    }


def _try_yfinance() -> dict | None:
    """Attempt to fetch real data from yfinance."""
    try:
        import yfinance as yf

        symbols_map = {
            "^NSEI": {"name": "NIFTY 50", "tag": "nifty"},
            "^BSESN": {"name": "SENSEX", "tag": "sensex"},
            "RELIANCE.NS": {"name": "Reliance", "tag": "reliance"},
            "TCS.NS": {"name": "TCS", "tag": "tcs"},
            "HDFCBANK.NS": {"name": "HDFC Bank", "tag": "hdfc"},
            "INFY.NS": {"name": "Infosys", "tag": "infy"},
            "BHARTIARTL.NS": {"name": "Bharti Airtel", "tag": "airtel"},
            "ITC.NS": {"name": "ITC", "tag": "itc"},
        }

        indices = []
        stocks = []

        for symbol, meta in symbols_map.items():
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period="1mo", timeout=10)

            if hist.empty:
                continue

            current = round(float(hist["Close"].iloc[-1]), 2)
            prev = round(float(hist["Close"].iloc[-2]), 2) if len(hist) > 1 else current
            change = round(current - prev, 2)
            change_pct = round((change / prev) * 100, 2) if prev else 0

            history = []
            for date, row in hist.iterrows():
                history.append({
                    "date": date.strftime("%b %d"),
                    "close": round(float(row["Close"]), 2),
                })

            entry = {
                "name": meta["name"],
                "symbol": symbol,
                "tag": meta["tag"],
                "current": current,
                "change": change,
                "changePct": change_pct,
                "history": history,
            }

            if symbol.startswith("^"):
                indices.append(entry)
            else:
                stocks.append(entry)

        if not indices and not stocks:
            return None

        return {
            "indices": indices,
            "stocks": stocks,
            "lastUpdated": datetime.now().strftime("%d %b %Y, %I:%M %p IST"),
            "isDemo": False,
        }

    except Exception as e:
        print(f"yfinance failed: {e}")
        return None


@router.get("/market-data")
async def get_market_data():
    """Return market data — tries yfinance first, falls back to demo data."""
    now = time.time()

    # Return cache if fresh
    if _cache["data"] and (now - _cache["timestamp"]) < CACHE_TTL:
        return _cache["data"]

    print("Fetching market data...")

    # Try real data
    data = _try_yfinance()

    # Fallback to demo
    if data is None:
        print("Using demo market data (yfinance unavailable)")
        data = _build_demo_response()

    _cache["data"] = data
    _cache["timestamp"] = now
    return data
