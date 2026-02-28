import { useGarden } from '../context/GardenContext';
import { HeartPulse, TrendingUp, AlertCircle, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import plants from '../data/plants';
import './PlantHealth.css';

const healthHistory = [
    { week: 'W1', health: 76 }, { week: 'W2', health: 78 }, { week: 'W3', health: 80 },
    { week: 'W4', health: 77 }, { week: 'W5', health: 82 }, { week: 'W6', health: 85 },
    { week: 'W7', health: 83 }, { week: 'W8', health: 84 },
];

export default function PlantHealth() {
    const { myPlants } = useGarden();

    const avgHealth = myPlants.length > 0
        ? Math.round(myPlants.reduce((sum, p) => sum + p.health, 0) / myPlants.length) : 0;
    const thriving = myPlants.filter(p => p.health >= 80).length;
    const needsCare = myPlants.filter(p => p.health < 60).length;

    const getHealthColor = (h) => h >= 80 ? '#22c55e' : h >= 60 ? '#eab308' : '#ef4444';
    const getHealthLabel = (h) => h >= 80 ? 'Thriving' : h >= 60 ? 'Fair' : 'Needs Care';
    const getRecommendation = (plant) => {
        if (plant.health < 60) return '🚨 Urgent: Check soil, light, and watering schedule immediately';
        if (plant.health < 80) return '💡 Monitor closely and ensure consistent care routine';
        return '✨ Keep up the great work! Plant is thriving';
    };

    const barData = myPlants.map(p => ({
        name: p.nickname || p.name,
        health: p.health,
        fill: getHealthColor(p.health),
    }));

    return (
        <div className="plant-health-page">
            <div className="page-header">
                <h1>💚 Plant Health Monitor</h1>
                <p>Track and manage the health of every plant in your garden</p>
            </div>

            <div className="grid-3 stagger-children">
                <div className="card stat-card">
                    <div className="stat-icon green"><HeartPulse size={22} /></div>
                    <div className="stat-info">
                        <h3>{avgHealth}%</h3>
                        <p>Overall Health</p>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon blue"><Shield size={22} /></div>
                    <div className="stat-info">
                        <h3>{thriving}</h3>
                        <p>Plants Thriving</p>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon red"><AlertCircle size={22} /></div>
                    <div className="stat-info">
                        <h3>{needsCare}</h3>
                        <p>Need Attention</p>
                    </div>
                </div>
            </div>

            <div className="grid-2" style={{ marginTop: 'var(--space-xl)' }}>
                <div className="card">
                    <h3 style={{ marginBottom: 'var(--space-md)' }}>📈 Health Trend (8 Weeks)</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={healthHistory}>
                            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#78716c' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: '#78716c' }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="health" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4, fill: '#22c55e' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: 'var(--space-md)' }}>🌱 Per-Plant Health</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={barData} layout="vertical">
                            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                            <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} width={100} />
                            <Tooltip />
                            <Bar dataKey="health" radius={[0, 6, 6, 0]} barSize={16}>
                                {barData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <h3 style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>🌿 Individual Plant Health</h3>
            <div className="health-cards stagger-children">
                {myPlants.sort((a, b) => a.health - b.health).map(plant => {
                    const data = plants.find(p => p.id === plant.plantId) || {};
                    return (
                        <div key={plant.id} className="card health-plant-card">
                            <div className="flex items-center gap-md">
                                <span style={{ fontSize: '2rem' }}>{data.emoji || '🌱'}</span>
                                <div style={{ flex: 1 }}>
                                    <h4>{plant.nickname || plant.name}</h4>
                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{data.scientific}</p>
                                </div>
                                <div className="health-score-circle" style={{ borderColor: getHealthColor(plant.health) }}>
                                    <span style={{ color: getHealthColor(plant.health) }}>{plant.health}%</span>
                                </div>
                            </div>
                            <div className="progress-bar" style={{ margin: 'var(--space-md) 0' }}>
                                <div className="progress-bar-fill" style={{ width: `${plant.health}%`, background: getHealthColor(plant.health) }}></div>
                            </div>
                            <div className="health-recommendation">
                                <span className={`badge badge-${plant.health >= 80 ? 'green' : plant.health >= 60 ? 'yellow' : 'red'}`}>
                                    {getHealthLabel(plant.health)}
                                </span>
                                <p>{getRecommendation(plant)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
