/**
 * demoMarketData.js
 *
 * Self-contained, offline demo dataset for MarketDataSection.jsx.
 * Generates realistic-looking 30-day daily price history for Nifty 50,
 * Sensex, and four large-cap Indian stocks — no backend / yfinance call
 * required. Shape matches what /api/market-data returns so you can swap
 * it in with zero changes to the chart-rendering code.
 *
 * Usage:
 *   import { getDemoMarketData } from "../../data/demoMarketData";
 *   const data = getDemoMarketData(); // same shape as the live API response
 */

// Seeded PRNG so the "random" walk is reproducible across reloads
// (mulberry32 — tiny, fast, good enough for cosmetic data)
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a realistic daily price series using a mean-reverting
 * random walk with a slight drift, so lines look organic (not a
 * straight ramp or pure noise) and never go negative.
 */
function generateSeries({ startPrice, days, volatility, drift, seed }) {
  const rand = mulberry32(seed);
  const today = new Date();
  const history = [];
  let price = startPrice;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Skip weekends to mimic real trading days
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const shock = (rand() - 0.5) * 2 * volatility; // -volatility..+volatility
    const reversion = (startPrice - price) * 0.02; // gentle pull to mean
    price = Math.max(price * (1 + drift + shock + reversion / price), 0.01);

    history.push({
      date: date.toISOString().slice(0, 10),
      price: Math.round(price * 100) / 100,
    });
  }

  return history;
}

function buildInstrument({ symbol, name, type, startPrice, volatility, drift, seed, currency }) {
  const history = generateSeries({ startPrice, days: 30, volatility, drift, seed });
  const first = history[0].price;
  const last = history[history.length - 1].price;
  const change = Math.round((last - first) * 100) / 100;
  const changePercent = Math.round((change / first) * 10000) / 100;

  return {
    symbol,
    name,
    type, // "index" | "stock"
    currency: currency || "₹",
    currentPrice: last,
    change,
    changePercent,
    history,
  };
}

// Fixed seeds per instrument keep each chart's "personality" stable
// across reloads (e.g. Reliance always trends up, HDFC Bank chops sideways).
const INSTRUMENTS_CONFIG = [
  {
    symbol: "NIFTY50",
    name: "Nifty 50",
    type: "index",
    startPrice: 24800,
    volatility: 0.008,
    drift: 0.0009,
    seed: 101,
  },
  {
    symbol: "SENSEX",
    name: "BSE Sensex",
    type: "index",
    startPrice: 81200,
    volatility: 0.008,
    drift: 0.0008,
    seed: 202,
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    type: "stock",
    startPrice: 2950,
    volatility: 0.014,
    drift: 0.0015,
    seed: 303,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    type: "stock",
    startPrice: 4150,
    volatility: 0.011,
    drift: -0.0006,
    seed: 404,
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    type: "stock",
    startPrice: 1720,
    volatility: 0.010,
    drift: 0.0002,
    seed: 505,
  },
  {
    symbol: "INFY",
    name: "Infosys",
    type: "stock",
    startPrice: 1580,
    volatility: 0.013,
    drift: 0.0011,
    seed: 606,
  },
];

/**
 * Returns the full demo market data payload.
 * Shape:
 * {
 *   isDemo: true,
 *   generatedAt: ISOString,
 *   instruments: [
 *     { symbol, name, type, currency, currentPrice, change, changePercent, history: [{date, price}] },
 *     ...
 *   ]
 * }
 */
export function getDemoMarketData() {
  return {
    isDemo: true,
    generatedAt: new Date().toISOString(),
    instruments: INSTRUMENTS_CONFIG.map(buildInstrument),
  };
}

export default getDemoMarketData;
