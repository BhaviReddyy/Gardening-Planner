import { useState } from 'react';
import { useGarden } from '../context/GardenContext';
import { Plus, X, BookOpen, Tag, Smile, CloudSun } from 'lucide-react';
import './Journal.css';

const moodEmojis = { excited: '🤩', happy: '😊', productive: '💪', calm: '😌', worried: '😟', sad: '😔' };
const weatherEmojis = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️', snowy: '❄️', windy: '💨', stormy: '⛈️' };

export default function Journal() {
    const { journalEntries, addJournalEntry, myPlants } = useGarden();
    const [showNew, setShowNew] = useState(false);
    const [filterTag, setFilterTag] = useState('all');
    const [newEntry, setNewEntry] = useState({ title: '', text: '', mood: 'happy', weather: 'sunny', tags: '', plantId: null });

    const allTags = [...new Set(journalEntries.flatMap(e => e.tags))];

    const filtered = filterTag === 'all'
        ? journalEntries
        : journalEntries.filter(e => e.tags.includes(filterTag));

    const handleAdd = () => {
        if (!newEntry.title || !newEntry.text) return;
        addJournalEntry({
            ...newEntry,
            tags: newEntry.tags.split(',').map(t => t.trim()).filter(Boolean),
            plantId: newEntry.plantId || null,
        });
        setNewEntry({ title: '', text: '', mood: 'happy', weather: 'sunny', tags: '', plantId: null });
        setShowNew(false);
    };

    return (
        <div className="journal-page">
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1>📖 Gardening Journal</h1>
                    <p>Document your gardening journey — {journalEntries.length} entries</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowNew(true)}>
                    <Plus size={16} /> New Entry
                </button>
            </div>

            <div className="journal-filters">
                <button className={`category-chip ${filterTag === 'all' ? 'active' : ''}`} onClick={() => setFilterTag('all')}>All</button>
                {allTags.map(tag => (
                    <button key={tag} className={`category-chip ${filterTag === tag ? 'active' : ''}`} onClick={() => setFilterTag(tag)}>
                        <Tag size={12} /> {tag}
                    </button>
                ))}
            </div>

            <div className="journal-timeline">
                {filtered.map((entry, idx) => (
                    <div key={entry.id} className="journal-entry card animate-fadeInUp" style={{ animationDelay: `${idx * 80}ms` }}>
                        <div className="entry-header">
                            <div className="entry-date-block">
                                <span className="entry-day">{new Date(entry.date).getDate()}</span>
                                <span className="entry-month">{new Date(entry.date).toLocaleString('en', { month: 'short' })}</span>
                            </div>
                            <div className="entry-meta">
                                <h3>{entry.title}</h3>
                                <div className="entry-indicators">
                                    <span title="Mood">{moodEmojis[entry.mood]}</span>
                                    <span title="Weather">{weatherEmojis[entry.weather]}</span>
                                </div>
                            </div>
                        </div>
                        <p className="entry-text">{entry.text}</p>
                        <div className="entry-tags">
                            {entry.tags.map(t => <span key={t} className="badge badge-green">{t}</span>)}
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="empty-state">
                    <span className="emoji">📝</span>
                    <h3>No journal entries yet</h3>
                    <p>Start documenting your gardening journey!</p>
                </div>
            )}

            {showNew && (
                <div className="modal-overlay" onClick={() => setShowNew(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>📝 New Journal Entry</h2>
                            <button className="btn-icon btn-ghost" onClick={() => setShowNew(false)}><X size={20} /></button>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" placeholder="Today's gardening highlight..." value={newEntry.title} onChange={e => setNewEntry({ ...newEntry, title: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Entry</label>
                            <textarea rows={4} placeholder="Write about your gardening experience..." value={newEntry.text} onChange={e => setNewEntry({ ...newEntry, text: e.target.value })} />
                        </div>
                        <div className="form-row">
                            <div className="form-group" style={{ flex: 1 }}>
                                <label><Smile size={14} /> Mood</label>
                                <select value={newEntry.mood} onChange={e => setNewEntry({ ...newEntry, mood: e.target.value })}>
                                    {Object.entries(moodEmojis).map(([k, v]) => <option key={k} value={k}>{v} {k}</option>)}
                                </select>
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label><CloudSun size={14} /> Weather</label>
                                <select value={newEntry.weather} onChange={e => setNewEntry({ ...newEntry, weather: e.target.value })}>
                                    {Object.entries(weatherEmojis).map(([k, v]) => <option key={k} value={k}>{v} {k}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Tags (comma separated)</label>
                            <input type="text" placeholder="e.g., planting, roses, spring" value={newEntry.tags} onChange={e => setNewEntry({ ...newEntry, tags: e.target.value })} />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-secondary" onClick={() => setShowNew(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Save Entry</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
