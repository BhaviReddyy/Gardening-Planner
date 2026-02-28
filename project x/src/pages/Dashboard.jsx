import { useGarden } from '../context/GardenContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
    Droplets, Scissors, Bug, BookOpen, TrendingUp,
    Plus, Cloud, Sun, CloudRain, Thermometer, Wind, ChevronRight,
    CheckCircle2, Circle, Heart, Sprout, Apple
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import './Dashboard.css';

const weatherData = {
    current: { temp: 22, condition: "Partly Cloudy", humidity: 65, wind: 12, icon: "⛅" },
    forecast: [
        { day: "Today", temp: 22, icon: "⛅", condition: "Partly Cloudy" },
        { day: "Thu", temp: 24, icon: "☀️", condition: "Sunny" },
        { day: "Fri", temp: 19, icon: "🌧️", condition: "Rain" },
        { day: "Sat", temp: 18, icon: "🌧️", condition: "Showers" },
        { day: "Sun", temp: 21, icon: "⛅", condition: "Partly Cloudy" },
        { day: "Mon", temp: 25, icon: "☀️", condition: "Sunny" },
        { day: "Tue", temp: 23, icon: "🌤️", condition: "Mostly Sunny" },
    ]
};

const healthTrend = [
    { month: 'Sep', health: 72 }, { month: 'Oct', health: 75 }, { month: 'Nov', health: 78 },
    { month: 'Dec', health: 74 }, { month: 'Jan', health: 80 }, { month: 'Feb', health: 83 },
];

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
}

export default function Dashboard() {
    const { myPlants, tasks, journalEntries, harvests, communityPosts } = useGarden();
    const { user } = useAuth();

    const greeting = getGreeting();
    const userName = user?.name?.split(' ')[0] || 'Gardener';

    const upcomingTasks = tasks.filter(t => !t.done).slice(0, 5);
    const completedTasks = tasks.filter(t => t.done).length;
    const totalTasks = tasks.length;
    const avgHealth = myPlants.length > 0
        ? Math.round(myPlants.reduce((sum, p) => sum + p.health, 0) / myPlants.length)
        : 0;

    const healthDistribution = [
        { name: 'Healthy', value: myPlants.filter(p => p.health >= 80).length, color: '#22c55e' },
        { name: 'Fair', value: myPlants.filter(p => p.health >= 60 && p.health < 80).length, color: '#eab308' },
        { name: 'Needs Care', value: myPlants.filter(p => p.health < 60).length, color: '#ef4444' },
    ];

    const getHealthClass = (h) => h >= 80 ? 'great' : h >= 60 ? 'fair' : 'poor';

    return (
        <div className="dashboard">
            <div className="page-header">
                <h1>🌿 {greeting}, {userName}!</h1>
                <p>Your garden at a glance — {myPlants.length} plants thriving, {upcomingTasks.length} tasks pending</p>
            </div>

            {/* Stats row */}
            <div className="grid-4 stagger-children">
                <div className="card stat-card">
                    <div className="stat-icon green"><Sprout size={22} /></div>
                    <div className="stat-info">
                        <h3>{myPlants.length}</h3>
                        <p>Total Plants</p>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon blue"><CheckCircle2 size={22} /></div>
                    <div className="stat-info">
                        <h3>{completedTasks}/{totalTasks}</h3>
                        <p>Tasks Done</p>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon yellow"><Heart size={22} /></div>
                    <div className="stat-info">
                        <h3>{avgHealth}%</h3>
                        <p>Avg Health</p>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon red"><Apple size={22} /></div>
                    <div className="stat-info">
                        <h3>{harvests.length}</h3>
                        <p>Harvests</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Weather widget */}
                <div className="card-glass weather-widget">
                    <div className="weather-header">
                        <Cloud size={18} />
                        <span>Weather Forecast</span>
                        <Link to="/weather" className="view-all">View all <ChevronRight size={14} /></Link>
                    </div>
                    <div className="weather-current">
                        <span className="weather-emoji">{weatherData.current.icon}</span>
                        <div className="weather-temp">{weatherData.current.temp}°C</div>
                        <div className="weather-condition">{weatherData.current.condition}</div>
                    </div>
                    <div className="weather-details">
                        <div><Thermometer size={14} /> {weatherData.current.humidity}% humidity</div>
                        <div><Wind size={14} /> {weatherData.current.wind} km/h</div>
                    </div>
                    <div className="weather-forecast-row">
                        {weatherData.forecast.slice(1, 6).map((d, i) => (
                            <div key={i} className="forecast-day">
                                <span className="forecast-label">{d.day}</span>
                                <span className="forecast-icon">{d.icon}</span>
                                <span className="forecast-temp">{d.temp}°</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming tasks */}
                <div className="card upcoming-tasks">
                    <div className="section-header">
                        <h3>📋 Upcoming Tasks</h3>
                        <Link to="/seasonal-planner" className="view-all">View all <ChevronRight size={14} /></Link>
                    </div>
                    <div className="task-list">
                        {upcomingTasks.map(task => (
                            <div key={task.id} className="task-item">
                                <Circle size={16} className="task-circle" />
                                <div className="task-info">
                                    <span className="task-title">{task.title}</span>
                                    <span className="task-due">{task.due}</span>
                                </div>
                                <span className={`badge badge-${task.category === 'watering' ? 'blue' : task.category === 'pruning' ? 'yellow' : task.category === 'pest-control' ? 'red' : 'green'}`}>
                                    {task.category}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Plant Health Overview */}
                <div className="card health-overview">
                    <div className="section-header">
                        <h3>💚 Plant Health</h3>
                        <Link to="/plant-health" className="view-all">View all <ChevronRight size={14} /></Link>
                    </div>
                    <div className="health-chart-row">
                        <div className="health-pie">
                            <ResponsiveContainer width={120} height={120}>
                                <PieChart>
                                    <Pie data={healthDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3}>
                                        {healthDistribution.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="health-score">{avgHealth}%</div>
                        </div>
                        <div className="health-legend">
                            {healthDistribution.map((d, i) => (
                                <div key={i} className="legend-item">
                                    <span className="legend-dot" style={{ background: d.color }}></span>
                                    <span>{d.name}</span>
                                    <span className="legend-count">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="health-trend">
                        <ResponsiveContainer width="100%" height={80}>
                            <AreaChart data={healthTrend}>
                                <defs>
                                    <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                                <Area type="monotone" dataKey="health" stroke="#22c55e" strokeWidth={2} fill="url(#healthGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* My plants quick view */}
                <div className="card my-plants-preview">
                    <div className="section-header">
                        <h3>🌱 My Plants</h3>
                        <Link to="/my-garden" className="view-all">View all <ChevronRight size={14} /></Link>
                    </div>
                    <div className="plants-scroll">
                        {myPlants.slice(0, 6).map(plant => (
                            <div key={plant.id} className="plant-mini-card">
                                <div className="plant-mini-emoji">
                                    {plant.name === 'Tomato' ? '🍅' : plant.name === 'Rose' ? '🌹' : plant.name === 'Basil' ? '🌿' : plant.name === 'Lavender' ? '💜' : plant.name === 'Strawberry' ? '🍓' : plant.name === 'Orchid' ? '🌸' : plant.name === 'Aloe Vera' ? '🌵' : '🥬'}
                                </div>
                                <span className="plant-mini-name">{plant.nickname || plant.name}</span>
                                <div className="plant-mini-health">
                                    <div className={`health-dot ${getHealthClass(plant.health)}`}></div>
                                    <span>{plant.health}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick actions */}
                <div className="card quick-actions">
                    <h3>⚡ Quick Actions</h3>
                    <div className="action-grid">
                        <Link to="/my-garden" className="action-btn">
                            <div className="action-icon" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}><Plus size={20} /></div>
                            <span>Add Plant</span>
                        </Link>
                        <Link to="/journal" className="action-btn">
                            <div className="action-icon" style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9' }}><BookOpen size={20} /></div>
                            <span>Log Journal</span>
                        </Link>
                        <Link to="/pest-tracker" className="action-btn">
                            <div className="action-icon" style={{ background: 'rgba(244,63,94,0.1)', color: '#f43f5e' }}><Bug size={20} /></div>
                            <span>Report Pest</span>
                        </Link>
                        <Link to="/harvest" className="action-btn">
                            <div className="action-icon" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}><Apple size={20} /></div>
                            <span>Log Harvest</span>
                        </Link>
                    </div>
                </div>

                {/* Community preview */}
                <div className="card community-preview">
                    <div className="section-header">
                        <h3>👥 Community</h3>
                        <Link to="/community" className="view-all">View all <ChevronRight size={14} /></Link>
                    </div>
                    <div className="community-posts">
                        {communityPosts.slice(0, 3).map(post => (
                            <div key={post.id} className="community-post-mini">
                                <span className="post-avatar">{post.avatar}</span>
                                <div className="post-content">
                                    <span className="post-user">{post.user}</span>
                                    <p className="post-text">{post.text.slice(0, 80)}...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent journal */}
                <div className="card recent-journal">
                    <div className="section-header">
                        <h3>📖 Recent Journal</h3>
                        <Link to="/journal" className="view-all">View all <ChevronRight size={14} /></Link>
                    </div>
                    {journalEntries.slice(0, 3).map(entry => (
                        <div key={entry.id} className="journal-mini">
                            <div className="journal-mini-date">{entry.date}</div>
                            <div className="journal-mini-title">{entry.title}</div>
                            <div className="journal-mini-tags">
                                {entry.tags.map(t => <span key={t} className="badge badge-green">{t}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
