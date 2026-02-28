import { useState } from 'react';
import { useGarden } from '../context/GardenContext';
import { Apple, Plus, X, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import plants from '../data/plants';
import './HarvestPlanner.css';

const harvestable = plants.filter(p => p.harvestMonth.length > 0);
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currentMonth = new Date().getMonth() + 1;

const COLORS = ['#22c55e', '#84cc16', '#eab308', '#f59e0b', '#f97316', '#ef4444', '#0ea5e9', '#8b5cf6'];

export default function HarvestPlanner() {
    const { harvests, addHarvest, myPlants } = useGarden();
    const [showAdd, setShowAdd] = useState(false);
    const [newHarvest, setNewHarvest] = useState({ plant: '', amount: '', weight: '', notes: '' });

    const upcomingHarvests = harvestable.filter(p => p.harvestMonth.includes(currentMonth) || p.harvestMonth.includes(currentMonth + 1));

    const harvestByPlant = harvests.reduce((acc, h) => {
        acc[h.plant] = (acc[h.plant] || 0) + 1;
        return acc;
    }, {});

    const pieData = Object.entries(harvestByPlant).map(([name, value], i) => ({
        name, value, color: COLORS[i % COLORS.length]
    }));

    const monthlyData = monthNames.map((m, i) => ({
        month: m,
        count: harvests.filter(h => new Date(h.date).getMonth() === i).length
    }));

    const handleAdd = () => {
        if (!newHarvest.plant) return;
        addHarvest(newHarvest);
        setNewHarvest({ plant: '', amount: '', weight: '', notes: '' });
        setShowAdd(false);
    };

    return (
        <div className="harvest-page">
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1>🍎 Harvest Planner</h1>
                    <p>Track your yields and plan upcoming harvests</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
                    <Plus size={16} /> Log Harvest
                </button>
            </div>

            <div className="grid-3 stagger-children">
                <div className="card stat-card">
                    <div className="stat-icon green"><Apple size={22} /></div>
                    <div className="stat-info">
                        <h3>{harvests.length}</h3>
                        <p>Total Harvests</p>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon yellow"><TrendingUp size={22} /></div>
                    <div className="stat-info">
                        <h3>{Object.keys(harvestByPlant).length}</h3>
                        <p>Varieties</p>
                    </div>
                </div>
                <div className="card stat-card">
                    <div className="stat-icon blue"><Calendar size={22} /></div>
                    <div className="stat-info">
                        <h3>{upcomingHarvests.length}</h3>
                        <p>Ready Soon</p>
                    </div>
                </div>
            </div>

            <div className="grid-2" style={{ marginTop: 'var(--space-xl)' }}>
                <div className="card">
                    <h3 style={{ marginBottom: 'var(--space-md)' }}>📊 Harvests by Month</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={monthlyData}>
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#78716c' }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: 'var(--space-md)' }}>🥧 By Variety</h3>
                    {pieData.length > 0 ? (
                        <div className="flex items-center gap-lg">
                            <ResponsiveContainer width={160} height={160}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3}>
                                        {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex flex-col gap-xs">
                                {pieData.map((d, i) => (
                                    <div key={i} className="legend-item">
                                        <span className="legend-dot" style={{ background: d.color }}></span>
                                        <span>{d.name}</span>
                                        <span className="legend-count">{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>No harvest data yet</p>
                    )}
                </div>
            </div>

            <h3 style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>🌿 Upcoming Harvest Window</h3>
            <div className="grid-4 stagger-children">
                {upcomingHarvests.map(plant => (
                    <div key={plant.id} className="card harvest-upcoming-card">
                        <span style={{ fontSize: '2rem' }}>{plant.emoji}</span>
                        <h4>{plant.name}</h4>
                        <div className="harvest-months">
                            {plant.harvestMonth.map(m => (
                                <span key={m} className={`badge ${m === currentMonth ? 'badge-green' : 'badge-neutral'}`}>
                                    {monthNames[m - 1]}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <h3 style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-md)' }}>📋 Harvest Log</h3>
            <div className="harvest-log">
                {harvests.length === 0 ? (
                    <div className="empty-state">
                        <span className="emoji">🧺</span>
                        <h3>No harvests logged yet</h3>
                        <p>Log your first harvest to start tracking yields!</p>
                    </div>
                ) : (
                    harvests.map(h => (
                        <div key={h.id} className="card harvest-log-item">
                            <div className="flex items-center gap-md" style={{ flex: 1 }}>
                                <Apple size={18} style={{ color: 'var(--primary-500)' }} />
                                <div>
                                    <h4>{h.plant}</h4>
                                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{h.date}</span>
                                </div>
                            </div>
                            <span className="badge badge-green">{h.amount}</span>
                            {h.notes && <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{h.notes}</span>}
                        </div>
                    ))
                )}
            </div>

            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>🧺 Log Harvest</h2>
                            <button className="btn-icon btn-ghost" onClick={() => setShowAdd(false)}><X size={20} /></button>
                        </div>
                        <div className="form-group">
                            <label>Plant</label>
                            <input type="text" placeholder="e.g., Tomato" value={newHarvest.plant} onChange={e => setNewHarvest({ ...newHarvest, plant: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="text" placeholder="e.g., 5 lbs, 2 heads" value={newHarvest.amount} onChange={e => setNewHarvest({ ...newHarvest, amount: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Notes</label>
                            <textarea placeholder="Quality, taste, etc..." value={newHarvest.notes} onChange={e => setNewHarvest({ ...newHarvest, notes: e.target.value })} />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Log Harvest</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
