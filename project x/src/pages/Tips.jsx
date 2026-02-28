import { useState } from 'react';
import tips, { tipCategories } from '../data/tips';
import { Lightbulb, BookOpen, Star, Search, ChevronRight } from 'lucide-react';
import './Tips.css';

export default function Tips() {
    const [category, setCategory] = useState('all');
    const [search, setSearch] = useState('');
    const [expandedTip, setExpandedTip] = useState(null);

    const filtered = tips.filter(t => {
        const matchCat = category === 'all' || t.category === category;
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.content.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const tipOfDay = tips[Math.floor(Date.now() / 86400000) % tips.length];

    return (
        <div className="tips-page">
            <div className="page-header">
                <h1>💡 Tips & Resources</h1>
                <p>Expert gardening advice, tutorials, and seasonal tips</p>
            </div>

            {/* Tip of the day */}
            <div className="tip-of-day card-glass">
                <div className="tod-badge"><Star size={14} /> Tip of the Day</div>
                <div className="tod-content">
                    <span className="tod-emoji">{tipOfDay.emoji}</span>
                    <div>
                        <h3>{tipOfDay.title}</h3>
                        <p>{tipOfDay.content}</p>
                    </div>
                </div>
            </div>

            <div className="tips-controls">
                <div className="search-input" style={{ maxWidth: 360 }}>
                    <Search size={18} />
                    <input type="text" placeholder="Search tips..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="category-filters">
                    {tipCategories.map(cat => (
                        <button key={cat.id} className={`category-chip ${category === cat.id ? 'active' : ''}`} onClick={() => setCategory(cat.id)}>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid-3 stagger-children">
                {filtered.map(tip => (
                    <div
                        key={tip.id}
                        className={`card tip-card ${expandedTip === tip.id ? 'expanded' : ''}`}
                        onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                    >
                        <div className="tip-header">
                            <span className="tip-emoji">{tip.emoji}</span>
                            <span className={`badge badge-${tip.category === 'beginner' ? 'green' : tip.category === 'intermediate' ? 'yellow' : tip.category === 'advanced' ? 'red' : 'blue'}`}>
                                {tip.category}
                            </span>
                        </div>
                        <h3 className="tip-title">{tip.title}</h3>
                        <p className="tip-content">{tip.content}</p>

                        {expandedTip === tip.id && (
                            <div className="tip-steps">
                                <h4>Steps:</h4>
                                <ol>
                                    {tip.steps.map((s, i) => <li key={i}>{s}</li>)}
                                </ol>
                            </div>
                        )}

                        <div className="tip-footer">
                            <span className="badge badge-neutral">{tip.season}</span>
                            <span className="tip-expand">
                                {expandedTip === tip.id ? 'Less' : 'Read more'} <ChevronRight size={14} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="empty-state">
                    <span className="emoji">🔍</span>
                    <h3>No tips found</h3>
                    <p>Try different search terms or categories</p>
                </div>
            )}
        </div>
    );
}
