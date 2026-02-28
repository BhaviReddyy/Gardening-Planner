import { useState } from 'react';
import { useGarden } from '../context/GardenContext';
import { Plus, X, Check, Calendar, Leaf, Snowflake, Sun as SunIcon, CloudRain } from 'lucide-react';
import './SeasonalPlanner.css';

const seasons = [
    { id: 'spring', label: 'Spring', emoji: '🌸', icon: Leaf, months: ['March', 'April', 'May'] },
    { id: 'summer', label: 'Summer', emoji: '☀️', icon: SunIcon, months: ['June', 'July', 'August'] },
    { id: 'fall', label: 'Fall', emoji: '🍂', icon: CloudRain, months: ['September', 'October', 'November'] },
    { id: 'winter', label: 'Winter', emoji: '❄️', icon: Snowflake, months: ['December', 'January', 'February'] },
];

const taskCategories = [
    { id: 'planting', label: 'Planting', color: 'green' },
    { id: 'watering', label: 'Watering', color: 'blue' },
    { id: 'pruning', label: 'Pruning', color: 'yellow' },
    { id: 'fertilizing', label: 'Fertilizing', color: 'yellow' },
    { id: 'harvesting', label: 'Harvesting', color: 'red' },
    { id: 'pest-control', label: 'Pest Control', color: 'red' },
    { id: 'maintenance', label: 'Maintenance', color: 'neutral' },
    { id: 'repotting', label: 'Repotting', color: 'green' },
];

export default function SeasonalPlanner() {
    const { tasks, addTask, toggleTask, removeTask } = useGarden();
    const [activeSeason, setActiveSeason] = useState('spring');
    const [showAdd, setShowAdd] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', plant: '', category: 'planting', due: '', season: 'spring' });

    const seasonTasks = tasks.filter(t => t.season === activeSeason);
    const doneTasks = seasonTasks.filter(t => t.done).length;
    const progress = seasonTasks.length > 0 ? Math.round((doneTasks / seasonTasks.length) * 100) : 0;
    const currentSeason = seasons.find(s => s.id === activeSeason);

    const handleAdd = () => {
        if (!newTask.title) return;
        addTask({ ...newTask, season: activeSeason });
        setNewTask({ title: '', plant: '', category: 'planting', due: '', season: activeSeason });
        setShowAdd(false);
    };

    return (
        <div className="seasonal-planner">
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1>📅 Seasonal Task Planner</h1>
                    <p>Plan and track your gardening tasks throughout the year</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
                    <Plus size={16} /> Add Task
                </button>
            </div>

            <div className="season-tabs">
                {seasons.map(s => (
                    <button
                        key={s.id}
                        className={`season-tab ${activeSeason === s.id ? 'active' : ''}`}
                        onClick={() => setActiveSeason(s.id)}
                    >
                        <span className="season-emoji">{s.emoji}</span>
                        <span>{s.label}</span>
                    </button>
                ))}
            </div>

            <div className="season-overview card-glass">
                <div className="season-info">
                    <h2>{currentSeason.emoji} {currentSeason.label}</h2>
                    <p>{currentSeason.months.join(' • ')}</p>
                </div>
                <div className="season-progress">
                    <div className="flex justify-between" style={{ marginBottom: 6 }}>
                        <span>Progress</span>
                        <span className="progress-text">{doneTasks}/{seasonTasks.length} tasks</span>
                    </div>
                    <div className="progress-bar" style={{ height: 10 }}>
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="task-categories-row">
                {taskCategories.map(cat => {
                    const count = seasonTasks.filter(t => t.category === cat.id).length;
                    return count > 0 ? (
                        <span key={cat.id} className={`badge badge-${cat.color}`}>
                            {cat.label} ({count})
                        </span>
                    ) : null;
                })}
            </div>

            <div className="tasks-list">
                {seasonTasks.length === 0 ? (
                    <div className="empty-state">
                        <span className="emoji">{currentSeason.emoji}</span>
                        <h3>No tasks for {currentSeason.label}</h3>
                        <p>Add tasks to plan your seasonal gardening activities</p>
                    </div>
                ) : (
                    seasonTasks.map(task => (
                        <div key={task.id} className={`task-row ${task.done ? 'done' : ''}`}>
                            <div className="checkbox-wrapper" onClick={() => toggleTask(task.id)}>
                                <div className={`checkbox ${task.done ? 'checked' : ''}`}>
                                    {task.done && <Check size={14} />}
                                </div>
                            </div>
                            <div className="task-details">
                                <span className="checklist-text">{task.title}</span>
                                <div className="task-meta-row">
                                    {task.plant && <span className="task-plant">{task.plant}</span>}
                                    {task.due && <span className="task-due-date"><Calendar size={12} /> {task.due}</span>}
                                </div>
                            </div>
                            <span className={`badge badge-${taskCategories.find(c => c.id === task.category)?.color || 'neutral'}`}>
                                {task.category}
                            </span>
                            <button className="btn-icon btn-ghost" onClick={() => removeTask(task.id)}>
                                <X size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>📝 New Task</h2>
                            <button className="btn-icon btn-ghost" onClick={() => setShowAdd(false)}><X size={20} /></button>
                        </div>
                        <div className="form-group">
                            <label>Task Title</label>
                            <input type="text" placeholder="e.g., Water tomatoes" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Plant (optional)</label>
                            <input type="text" placeholder="e.g., Tomato" value={newTask.plant} onChange={e => setNewTask({ ...newTask, plant: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select value={newTask.category} onChange={e => setNewTask({ ...newTask, category: e.target.value })}>
                                {taskCategories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Due Date</label>
                            <input type="date" value={newTask.due} onChange={e => setNewTask({ ...newTask, due: e.target.value })} />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Add Task</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
