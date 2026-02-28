import { Cloud, Thermometer, Wind, Droplets, Eye, Sun, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Weather.css';

const forecast = [
    { day: 'Today', date: 'Feb 26', high: 22, low: 14, condition: 'Partly Cloudy', icon: '⛅', humidity: 65, wind: 12, uv: 5, precip: 10 },
    { day: 'Thu', date: 'Feb 27', high: 24, low: 15, condition: 'Sunny', icon: '☀️', humidity: 45, wind: 8, uv: 7, precip: 0 },
    { day: 'Fri', date: 'Feb 28', high: 19, low: 12, condition: 'Rain', icon: '🌧️', humidity: 82, wind: 20, uv: 2, precip: 75 },
    { day: 'Sat', date: 'Mar 1', high: 18, low: 11, condition: 'Showers', icon: '🌧️', humidity: 78, wind: 18, uv: 3, precip: 60 },
    { day: 'Sun', date: 'Mar 2', high: 21, low: 13, condition: 'Partly Cloudy', icon: '⛅', humidity: 60, wind: 10, uv: 5, precip: 15 },
    { day: 'Mon', date: 'Mar 3', high: 25, low: 16, condition: 'Sunny', icon: '☀️', humidity: 40, wind: 6, uv: 8, precip: 0 },
    { day: 'Tue', date: 'Mar 4', high: 23, low: 15, condition: 'Mostly Sunny', icon: '🌤️', humidity: 50, wind: 9, uv: 6, precip: 5 },
];

const tempTrend = forecast.map(f => ({ day: f.day, high: f.high, low: f.low }));

const gardenAlerts = [
    { type: 'rain', message: 'Rain expected Friday-Saturday. Consider covering delicate seedlings and skip watering.', icon: '🌧️', severity: 'warning' },
    { type: 'uv', message: 'High UV index on Monday. Ensure shade-loving plants have protection.', icon: '☀️', severity: 'info' },
    { type: 'temp', message: 'Nighttime lows this week are ideal for cool-season crops like lettuce and peas.', icon: '🌡️', severity: 'tip' },
];

const plantingWindows = [
    { plant: '🍅 Tomato', window: 'Start indoors now, transplant after last frost (April)', status: 'start-now' },
    { plant: '🥬 Lettuce', window: 'Direct sow now through March', status: 'active' },
    { plant: '🌸 Spring flowers', window: 'Begin planting bulbs in coming weeks', status: 'upcoming' },
    { plant: '🌿 Herbs', window: 'Start basil and cilantro indoors', status: 'start-now' },
    { plant: '🥕 Carrots', window: 'Direct sow in 3-4 weeks as soil warms', status: 'upcoming' },
];

export default function Weather() {
    return (
        <div className="weather-page">
            <div className="page-header">
                <h1>🌤️ Weather & Garden Forecast</h1>
                <p>Plan your gardening around the weather — 7-day forecast with gardening impact analysis</p>
            </div>

            {/* Current */}
            <div className="weather-hero card-glass">
                <div className="hero-current">
                    <span className="hero-icon">{forecast[0].icon}</span>
                    <div className="hero-temp">
                        <h2>{forecast[0].high}°C</h2>
                        <span>/ {forecast[0].low}°C</span>
                    </div>
                    <div className="hero-condition">{forecast[0].condition}</div>
                </div>
                <div className="hero-details">
                    <div className="hero-detail"><Droplets size={16} /> <span>Humidity</span><strong>{forecast[0].humidity}%</strong></div>
                    <div className="hero-detail"><Wind size={16} /> <span>Wind</span><strong>{forecast[0].wind} km/h</strong></div>
                    <div className="hero-detail"><Sun size={16} /> <span>UV Index</span><strong>{forecast[0].uv}</strong></div>
                    <div className="hero-detail"><Cloud size={16} /> <span>Precip</span><strong>{forecast[0].precip}%</strong></div>
                </div>
            </div>

            {/* 7 day */}
            <div className="forecast-cards stagger-children">
                {forecast.map((f, i) => (
                    <div key={i} className={`card forecast-card ${i === 0 ? 'today' : ''}`}>
                        <span className="fc-day">{f.day}</span>
                        <span className="fc-date">{f.date}</span>
                        <span className="fc-icon">{f.icon}</span>
                        <div className="fc-temps">
                            <span className="fc-high">{f.high}°</span>
                            <span className="fc-low">{f.low}°</span>
                        </div>
                        <span className="fc-condition">{f.condition}</span>
                        <div className="fc-detail"><Droplets size={12} /> {f.humidity}%</div>
                    </div>
                ))}
            </div>

            <div className="grid-2" style={{ marginTop: 'var(--space-xl)' }}>
                {/* Temp trend */}
                <div className="card">
                    <h3 style={{ marginBottom: 'var(--space-md)' }}>🌡️ Temperature Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={tempTrend}>
                            <defs>
                                <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#78716c' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#78716c' }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="high" stroke="#f59e0b" strokeWidth={2} fill="url(#highGrad)" />
                            <Area type="monotone" dataKey="low" stroke="#0ea5e9" strokeWidth={2} fill="url(#lowGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Garden alerts */}
                <div className="card">
                    <h3 style={{ marginBottom: 'var(--space-md)' }}>🌱 Garden Impact Alerts</h3>
                    <div className="garden-alerts">
                        {gardenAlerts.map((alert, i) => (
                            <div key={i} className={`garden-alert ${alert.severity}`}>
                                <span className="alert-icon">{alert.icon}</span>
                                <p>{alert.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Planting windows */}
            <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
                <h3 style={{ marginBottom: 'var(--space-md)' }}>🪟 Current Planting Windows</h3>
                <div className="planting-windows">
                    {plantingWindows.map((pw, i) => (
                        <div key={i} className="planting-window-item">
                            <span className="pw-plant">{pw.plant}</span>
                            <span className="pw-window">{pw.window}</span>
                            <span className={`badge badge-${pw.status === 'active' ? 'green' : pw.status === 'start-now' ? 'yellow' : 'neutral'}`}>
                                {pw.status === 'active' ? 'Active' : pw.status === 'start-now' ? 'Start Now' : 'Upcoming'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
