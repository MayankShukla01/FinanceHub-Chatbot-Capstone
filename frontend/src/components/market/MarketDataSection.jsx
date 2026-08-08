import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import TiltCard from '../effects/TiltCard';

/* ── Demo Data ─────────────────────────────────────────────────────── */

function generateHistory(base, seed, days = 30) {
  const points = [];
  let price = base * (0.94 + (seed % 7) * 0.01);
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    if (d.getDay() === 0 || d.getDay() === 6) continue; // skip weekends

    const change = (Math.sin(seed + i * 0.4) * 0.008) + (Math.cos(seed * 2 + i * 0.15) * 0.005) + 0.001;
    price *= (1 + change);
    points.push({
      date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      close: Math.round(price * 100) / 100,
    });
  }
  // make last point = base
  if (points.length) points[points.length - 1].close = base;
  return points;
}

const INDICES = [
  { name: 'NIFTY 50', tag: 'nifty', current: 24856.15, change: 187.45, changePct: 0.76 },
  { name: 'SENSEX', tag: 'sensex', current: 81355.84, change: 612.21, changePct: 0.76 },
];

const STOCKS = [
  { name: 'Reliance', tag: 'reliance', current: 2918.35, change: 32.10, changePct: 1.11 },
  { name: 'TCS', tag: 'tcs', current: 3685.20, change: -18.45, changePct: -0.50 },
  { name: 'HDFC Bank', tag: 'hdfc', current: 1642.75, change: 12.30, changePct: 0.75 },
  { name: 'Infosys', tag: 'infy', current: 1528.60, change: -8.90, changePct: -0.58 },
  { name: 'Bharti Airtel', tag: 'airtel', current: 1485.40, change: 21.55, changePct: 1.47 },
  { name: 'ITC', tag: 'itc', current: 443.80, change: 3.15, changePct: 0.71 },
];

/* ── Sub-components ──────────────────────────────────────────────── */

function PriceCard({ item }) {
  const isUp = item.change >= 0;
  return (
    <div className="group p-4 rounded-xl dark:bg-dark-card bg-light-card border dark:border-border-dark border-border-light hover:dark:border-border-dark-hover hover:border-border-light-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs dark:text-text-dim text-text-dark-dim font-medium">{item.name}</span>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isUp ? '+' : ''}{item.changePct}%
        </div>
      </div>
      <p className="text-lg font-bold font-heading dark:text-text-white text-text-dark">
        ₹{item.current.toLocaleString('en-IN')}
      </p>
      <p className={`text-[10px] mt-0.5 ${isUp ? 'text-emerald-400/70' : 'text-rose-400/70'}`}>
        {isUp ? '+' : ''}₹{item.change.toLocaleString('en-IN')}
      </p>
    </div>
  );
}

function ChartCard({ item, history }) {
  const { isDark } = useTheme();
  const isUp = item.change >= 0;
  const color = isUp ? '#34d399' : '#fb7185';
  const gradientId = `gradient-${item.tag}`;

  return (
    <TiltCard className="rounded-xl dark:bg-dark-card bg-light-card border dark:border-border-dark border-border-light overflow-hidden hover:dark:border-border-dark-hover hover:border-border-light-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div>
          <h3 className="font-heading font-semibold text-sm dark:text-text-white text-text-dark">{item.name}</h3>
          <p className="text-lg font-bold font-heading dark:text-text-white text-text-dark mt-0.5">
            ₹{item.current.toLocaleString('en-IN')}
          </p>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
          isUp
            ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
            : 'bg-rose-400/10 text-rose-400 border border-rose-400/20'
        }`}>
          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isUp ? '+' : ''}{item.changePct}%
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 px-2 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: isDark ? '#7a8ba8' : '#64748b' }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: isDark ? '#7a8ba8' : '#64748b' }}
              axisLine={false}
              tickLine={false}
              width={55}
              domain={['auto', 'auto']}
              tickFormatter={(v) => v.toLocaleString('en-IN')}
            />
            <Tooltip
              contentStyle={{
                background: isDark ? '#151b28' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '10px',
                boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.08)',
                fontSize: '12px',
                color: isDark ? '#e8ecf4' : '#1a202c',
                padding: '8px 12px',
              }}
              formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Close']}
              labelStyle={{ color: isDark ? '#7a8ba8' : '#64748b', fontSize: '11px', marginBottom: '4px' }}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, stroke: color, strokeWidth: 2, fill: isDark ? '#151b28' : '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </TiltCard>
  );
}

/* ── Main Component ──────────────────────────────────────────────── */

function tickItem(item) {
  const volatility = item.current > 10000 ? 0.0008 : 0.003;
  const delta = item.current * (Math.random() * volatility * 2 - volatility);
  const newCurrent = Math.round((item.current + delta) * 100) / 100;
  const newChange = Math.round((item.change + delta) * 100) / 100;
  const base = newCurrent - newChange;
  const newPct = base !== 0 ? Math.round((newChange / base) * 10000) / 100 : 0;
  return { ...item, current: newCurrent, change: newChange, changePct: newPct };
}

function tickHistory(history, newClose) {
  if (!history || history.length === 0) return history;
  const updated = history.slice(0, -1);
  updated.push({ ...history[history.length - 1], close: newClose });
  return updated;
}

export default function MarketDataSection() {
  const [activeTab, setActiveTab] = useState('indices');
  const [indices, setIndices] = useState(INDICES);
  const [stocks, setStocks] = useState(STOCKS);
  const [tick, setTick] = useState(0);

  // Generate initial histories
  const [indexHistories, setIndexHistories] = useState(() =>
    INDICES.reduce((acc, idx, i) => {
      acc[idx.tag] = generateHistory(idx.current, i * 7 + 3);
      return acc;
    }, {})
  );

  const [stockHistories, setStockHistories] = useState(() =>
    STOCKS.reduce((acc, stk, i) => {
      acc[stk.tag] = generateHistory(stk.current, i * 11 + 5);
      return acc;
    }, {})
  );

  // Tick every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => {
        const updated = prev.map(tickItem);
        setIndexHistories(h => {
          const newH = { ...h };
          updated.forEach(idx => { newH[idx.tag] = tickHistory(h[idx.tag], idx.current); });
          return newH;
        });
        return updated;
      });

      setStocks(prev => {
        const updated = prev.map(tickItem);
        setStockHistories(h => {
          const newH = { ...h };
          updated.forEach(stk => { newH[stk.tag] = tickHistory(h[stk.tag], stk.current); });
          return newH;
        });
        return updated;
      });

      setTick(t => t + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold dark:text-text-white text-text-dark flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-mint" />
              Market <span className="text-gradient">Pulse</span>
            </h2>
            <p className="text-[10px] dark:text-text-dim/50 text-text-dark-dim/50 mt-1 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Tracking top NSE stocks
            </p>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-lg overflow-hidden border dark:border-border-dark border-border-light">
            <button
              onClick={() => setActiveTab('indices')}
              className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'indices'
                  ? 'bg-mint/10 text-mint border-r dark:border-border-dark border-border-light'
                  : 'dark:text-text-dim text-text-dark-dim hover:bg-mint/5 border-r dark:border-border-dark border-border-light'
              }`}
            >
              Indices
            </button>
            <button
              onClick={() => setActiveTab('stocks')}
              className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'stocks'
                  ? 'bg-mint/10 text-mint'
                  : 'dark:text-text-dim text-text-dark-dim hover:bg-mint/5'
              }`}
            >
              Stocks
            </button>
          </div>
        </div>

        {/* Stock price cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
          {stocks.map(s => (
            <PriceCard key={s.tag} item={s} />
          ))}
        </div>

        {/* Charts */}
        {activeTab === 'indices' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
            {indices.map(idx => (
              <ChartCard key={idx.tag} item={idx} history={indexHistories[idx.tag]} />
            ))}
          </div>
        )}

        {activeTab === 'stocks' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
            {stocks.map(stk => (
              <ChartCard key={stk.tag} item={stk} history={stockHistories[stk.tag]} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
