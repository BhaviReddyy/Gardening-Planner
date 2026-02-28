import { useState } from 'react';
import { useGarden } from '../context/GardenContext';
import plants from '../data/plants';
import { Trash2, Plus, Sun, Info, X, RotateCcw } from 'lucide-react';
import './GardenLayout.css';

const GRID_SIZE = 8;
const sunlightOverlay = [
    [3, 3, 3, 2, 2, 1, 1, 1],
    [3, 3, 3, 2, 2, 2, 1, 1],
    [3, 3, 2, 2, 2, 2, 2, 1],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [1, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 2, 2, 2, 2, 3, 3],
    [1, 1, 1, 2, 2, 3, 3, 3],
];

const sunLabels = { 1: 'Shade', 2: 'Partial Sun', 3: 'Full Sun' };
const sunColors = { 1: 'rgba(14,165,233,0.15)', 2: 'rgba(245,158,11,0.15)', 3: 'rgba(245,158,11,0.3)' };

export default function GardenLayout() {
    const { gardenLayout, addToLayout, removeFromLayout, updateGardenLayout } = useGarden();
    const [showSunlight, setShowSunlight] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [dragPlant, setDragPlant] = useState(null);
    const [showPlantPicker, setShowPlantPicker] = useState(false);
    const [targetCell, setTargetCell] = useState(null);

    const getCellPlant = (x, y) => gardenLayout.find(p => p.x === x && p.y === y);

    const handleCellClick = (x, y) => {
        const existing = getCellPlant(x, y);
        if (existing) {
            setSelectedPlant(existing);
        } else {
            setTargetCell({ x, y });
            setShowPlantPicker(true);
        }
    };

    const handleAddPlant = (plant) => {
        if (targetCell) {
            addToLayout({ plantId: plant.id, name: plant.name, emoji: plant.emoji, x: targetCell.x, y: targetCell.y });
            setShowPlantPicker(false);
            setTargetCell(null);
        }
    };

    const handleRemovePlant = (id) => {
        removeFromLayout(id);
        setSelectedPlant(null);
    };

    const handleReset = () => {
        updateGardenLayout([]);
    };

    return (
        <div className="garden-layout-page">
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1>🗺️ Garden Layout Planner</h1>
                    <p>Design your garden by placing plants on the grid. Click any empty cell to add a plant.</p>
                </div>
                <div className="flex gap-sm">
                    <button className={`btn btn-secondary ${showSunlight ? 'active-toggle' : ''}`} onClick={() => setShowSunlight(!showSunlight)}>
                        <Sun size={16} /> Sunlight
                    </button>
                    <button className="btn btn-ghost" onClick={handleReset}>
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
            </div>

            {showSunlight && (
                <div className="sunlight-legend">
                    <span className="legend-label">☀️ Full Sun</span>
                    <span className="legend-label">🌤️ Partial Sun</span>
                    <span className="legend-label">🌥️ Shade</span>
                </div>
            )}

            <div className="layout-container">
                <div className="garden-grid">
                    {Array.from({ length: GRID_SIZE }, (_, y) => (
                        <div key={y} className="grid-row">
                            {Array.from({ length: GRID_SIZE }, (_, x) => {
                                const plant = getCellPlant(x, y);
                                return (
                                    <div
                                        key={x}
                                        className={`grid-cell ${plant ? 'occupied' : 'empty'} ${selectedPlant && selectedPlant.x === x && selectedPlant.y === y ? 'selected' : ''}`}
                                        style={showSunlight ? { background: sunColors[sunlightOverlay[y][x]] } : {}}
                                        onClick={() => handleCellClick(x, y)}
                                        title={showSunlight ? sunLabels[sunlightOverlay[y][x]] : ''}
                                    >
                                        {plant && (
                                            <div className="cell-plant">
                                                <span className="cell-emoji">{plant.emoji}</span>
                                                <span className="cell-name">{plant.name}</span>
                                            </div>
                                        )}
                                        {!plant && <Plus size={14} className="cell-add" />}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="layout-sidebar">
                    <h3>🌿 Placed Plants ({gardenLayout.length})</h3>
                    <div className="placed-plants-list">
                        {gardenLayout.map(item => (
                            <div key={item.id} className="placed-item" onClick={() => setSelectedPlant(item)}>
                                <span>{item.emoji}</span>
                                <span className="placed-name">{item.name}</span>
                                <span className="placed-coord">({item.x},{item.y})</span>
                                <button className="btn-icon btn-ghost" onClick={(e) => { e.stopPropagation(); handleRemovePlant(item.id); }}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    {gardenLayout.length === 0 && (
                        <p className="empty-hint">Click cells to place plants</p>
                    )}
                </div>
            </div>

            {selectedPlant && (
                <div className="plant-info-popup card">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-sm">
                            <span style={{ fontSize: '1.5rem' }}>{selectedPlant.emoji}</span>
                            <h4>{selectedPlant.name}</h4>
                        </div>
                        <button className="btn-icon btn-ghost" onClick={() => setSelectedPlant(null)}><X size={16} /></button>
                    </div>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', margin: '8px 0' }}>Position: ({selectedPlant.x}, {selectedPlant.y})</p>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemovePlant(selectedPlant.id)}>
                        <Trash2 size={14} /> Remove
                    </button>
                </div>
            )}

            {showPlantPicker && (
                <div className="modal-overlay" onClick={() => setShowPlantPicker(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>🌱 Choose a Plant</h2>
                            <button className="btn-icon btn-ghost" onClick={() => setShowPlantPicker(false)}><X size={20} /></button>
                        </div>
                        <div className="plant-picker-grid">
                            {plants.map(p => (
                                <button key={p.id} className="plant-pick-btn" onClick={() => handleAddPlant(p)}>
                                    <span>{p.emoji}</span>
                                    <span>{p.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
