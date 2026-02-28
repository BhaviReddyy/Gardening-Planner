import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Sun, Droplets, Shovel, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import plants, { categories } from '../data/plants';
import { useGarden } from '../context/GardenContext';
import './PlantLibrary.css';

export default function PlantLibrary() {
    const { addPlant, myPlants } = useGarden();
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [category, setCategory] = useState('all');
    const [selectedPlant, setSelectedPlant] = useState(null);

    // Update search when URL query parameter changes
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) setSearch(q);
    }, [searchParams]);

    const filtered = plants.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.scientific.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'all' || p.category === category;
        return matchSearch && matchCat;
    });

    const handleAddToGarden = (plant) => {
        addPlant({ plantId: plant.id, name: plant.name, nickname: '', notes: '' });
    };

    const isInGarden = (plantId) => myPlants.some(p => p.plantId === plantId);

    return (
        <div className="plant-library">
            <div className="page-header">
                <h1>🌺 Plant Library</h1>
                <p>Explore {plants.length} plant species with detailed care instructions</p>
            </div>

            <div className="library-controls">
                <div className="search-input">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search plants by name or scientific name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-chip ${category === cat.id ? 'active' : ''}`}
                            onClick={() => setCategory(cat.id)}
                        >
                            <span>{cat.emoji}</span> {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="library-count">
                Showing {filtered.length} of {plants.length} plants
            </div>

            <div className="grid-4 stagger-children">
                {filtered.map(plant => (
                    <div key={plant.id} className="card plant-card" onClick={() => setSelectedPlant(plant)}>
                        <div className="plant-card-image-wrapper">
                            {plant.image ? (
                                <img src={plant.image} alt={plant.name} />
                            ) : (
                                <div className="plant-card-placeholder">
                                    <span className="plant-emoji">{plant.emoji}</span>
                                </div>
                            )}
                            {isInGarden(plant.id) && <span className="badge badge-green garden-badge">In Garden</span>}
                        </div>
                        <div className="plant-card-content">
                            <h3 className="plant-name">{plant.name}</h3>
                            <p className="plant-scientific">{plant.scientific}</p>
                            <div className="plant-quick-info">
                                <span><Sun size={13} /> {plant.sunlight}</span>
                                <span><Droplets size={13} /> {plant.water}</span>
                            </div>
                            <div className="plant-tags">
                                <span className={`badge badge-${plant.difficulty === 'Easy' ? 'green' : plant.difficulty === 'Moderate' ? 'yellow' : 'red'}`}>
                                    {plant.difficulty}
                                </span>
                                <span className="badge badge-neutral">{plant.category}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="empty-state">
                    <span className="emoji">🔍</span>
                    <h3>No plants found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}

            {/* Plant detail modal */}
            {selectedPlant && (
                <div className="modal-overlay" onClick={() => setSelectedPlant(null)}>
                    <div className="modal plant-detail-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <button className="modal-close-btn" onClick={() => setSelectedPlant(null)}><X size={20} /></button>
                            {selectedPlant.image ? (
                                <div className="modal-hero-image">
                                    <img src={selectedPlant.image} alt={selectedPlant.name}/>
                                    <div className="modal-hero-overlay">
                                        <span className="modal-hero-emoji">{selectedPlant.emoji}</span>
                                        <div>
                                            <h2>{selectedPlant.name}</h2>
                                            <p>{selectedPlant.scientific}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-sm">
                                    <span style={{ fontSize: '2.5rem' }}>{selectedPlant.emoji}</span>
                                    <div>
                                        <h2>{selectedPlant.name}</h2>
                                        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)', fontStyle: 'italic' }}>{selectedPlant.scientific}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="plant-description">{selectedPlant.description}</p>

                        <div className="detail-grid">
                            <div className="detail-item">
                                <Sun size={16} />
                                <div>
                                    <label>Sunlight</label>
                                    <span>{selectedPlant.sunlight}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <Droplets size={16} />
                                <div>
                                    <label>Water</label>
                                    <span>{selectedPlant.water}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <Shovel size={16} />
                                <div>
                                    <label>Soil</label>
                                    <span>{selectedPlant.soil}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <Filter size={16} />
                                <div>
                                    <label>Spacing</label>
                                    <span>{selectedPlant.spacing}</span>
                                </div>
                            </div>
                        </div>

                        <div className="detail-section">
                            <h4>🌱 Care Instructions</h4>
                            <ul>
                                {selectedPlant.care.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                        </div>

                        <div className="detail-section">
                            <h4>⚠️ Common Issues</h4>
                            <ul>
                                {selectedPlant.issues.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                        </div>

                        <div className="detail-section">
                            <h4>🤝 Companion Plants</h4>
                            <div className="companion-tags">
                                {selectedPlant.companions.map((c, i) => (
                                    <span key={i} className="badge badge-green">{c}</span>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            {!isInGarden(selectedPlant.id) ? (
                                <button className="btn btn-primary" onClick={() => { handleAddToGarden(selectedPlant); setSelectedPlant(null); }}>
                                    <Plus size={16} /> Add to My Garden
                                </button>
                            ) : (
                                <span className="badge badge-green" style={{ padding: '8px 16px', fontSize: 'var(--font-size-sm)' }}>✓ Already in your garden</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
