import { useGarden } from '../context/GardenContext';
import { Droplets, Scissors, Heart, Trash2, Plus, X, Sprout } from 'lucide-react';
import { useState } from 'react';
import plants from '../data/plants';
import './MyGarden.css';

export default function MyGarden() {
    const { myPlants, waterPlant, removePlant, addPlant } = useGarden();
    const [showAdd, setShowAdd] = useState(false);
    const [newPlant, setNewPlant] = useState({ plantId: '', nickname: '', notes: '' });

    const getPlantData = (plantId) => plants.find(p => p.id === plantId) || {};
    const getHealthClass = (h) => h >= 80 ? 'great' : h >= 60 ? 'good' : h >= 40 ? 'fair' : 'poor';
    const getHealthLabel = (h) => h >= 80 ? 'Thriving' : h >= 60 ? 'Good' : h >= 40 ? 'Needs Attention' : 'Critical';

    const daysSinceWatered = (date) => {
        const diff = Math.floor((new Date() - new Date(date)) / 86400000);
        return diff === 0 ? 'Today' : diff === 1 ? '1 day ago' : `${diff} days ago`;
    };

    const handleAdd = () => {
        if (!newPlant.plantId) return;
        const p = plants.find(pl => pl.id === Number(newPlant.plantId));
        if (p) {
            addPlant({ plantId: p.id, name: p.name, nickname: newPlant.nickname, notes: newPlant.notes });
            setNewPlant({ plantId: '', nickname: '', notes: '' });
            setShowAdd(false);
        }
    };

    return (
        <div className="my-garden">
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1>🌱 My Garden</h1>
                    <p>You have {myPlants.length} plants growing in your garden</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
                    <Plus size={16} /> Add Plant
                </button>
            </div>

            <div className="garden-stats">
                <div className="card-glass garden-stat">
                    <Sprout size={20} />
                    <div>
                        <h3>{myPlants.length}</h3>
                        <p>Total Plants</p>
                    </div>
                </div>
                <div className="card-glass garden-stat">
                    <Heart size={20} />
                    <div>
                        <h3>{myPlants.filter(p => p.health >= 80).length}</h3>
                        <p>Thriving</p>
                    </div>
                </div>
                <div className="card-glass garden-stat">
                    <Droplets size={20} />
                    <div>
                        <h3>{myPlants.filter(p => daysSinceWatered(p.lastWatered) !== 'Today').length}</h3>
                        <p>Need Water</p>
                    </div>
                </div>
            </div>

            <div className="grid-3 stagger-children">
                {myPlants.map(plant => {
                    const data = getPlantData(plant.plantId);
                    return (
                        <div key={plant.id} className="card garden-plant-card">
                            <div className="garden-card-top">
                                <span className="garden-plant-emoji">{data.emoji || '🌱'}</span>
                                <div className={`health-badge ${getHealthClass(plant.health)}`}>
                                    <span className={`health-dot ${getHealthClass(plant.health)}`}></span>
                                    {getHealthLabel(plant.health)}
                                </div>
                            </div>
                            <h3>{plant.nickname || plant.name}</h3>
                            <p className="garden-plant-species">{data.scientific || plant.name}</p>
                            <p className="garden-plant-notes">{plant.notes}</p>

                            <div className="garden-plant-meta">
                                <div className="meta-item">
                                    <Droplets size={14} />
                                    <span>Watered: {daysSinceWatered(plant.lastWatered)}</span>
                                </div>
                                <div className="meta-item">
                                    <Sprout size={14} />
                                    <span>Added: {plant.addedDate}</span>
                                </div>
                            </div>

                            <div className="health-bar-container">
                                <div className="flex justify-between" style={{ marginBottom: 4 }}>
                                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>Health</span>
                                    <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>{plant.health}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className={`progress-bar-fill ${plant.health < 60 ? 'red' : plant.health < 80 ? 'yellow' : ''}`}
                                        style={{ width: `${plant.health}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="garden-card-actions">
                                <button className="btn btn-secondary btn-sm" onClick={() => waterPlant(plant.id)}>
                                    <Droplets size={14} /> Water
                                </button>
                                <button className="btn btn-ghost btn-sm" onClick={() => removePlant(plant.id)}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {myPlants.length === 0 && (
                <div className="empty-state">
                    <span className="emoji">🌿</span>
                    <h3>Your garden is empty</h3>
                    <p>Add your first plant to get started!</p>
                    <button className="btn btn-primary" onClick={() => setShowAdd(true)} style={{ marginTop: 'var(--space-md)' }}>
                        <Plus size={16} /> Add Plant
                    </button>
                </div>
            )}

            {showAdd && (
                <div className="modal-overlay" onClick={() => setShowAdd(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>🌱 Add New Plant</h2>
                            <button className="btn-icon btn-ghost" onClick={() => setShowAdd(false)}><X size={20} /></button>
                        </div>
                        <div className="form-group">
                            <label>Select Plant</label>
                            <select value={newPlant.plantId} onChange={e => setNewPlant({ ...newPlant, plantId: e.target.value })}>
                                <option value="">Choose a plant...</option>
                                {plants.map(p => (
                                    <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Nickname (optional)</label>
                            <input type="text" placeholder="e.g., Big Boy" value={newPlant.nickname} onChange={e => setNewPlant({ ...newPlant, nickname: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Notes</label>
                            <textarea placeholder="Any notes about this plant..." value={newPlant.notes} onChange={e => setNewPlant({ ...newPlant, notes: e.target.value })} />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleAdd}>Add to Garden</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
