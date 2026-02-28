import { useState } from 'react';
import { useGarden } from '../context/GardenContext';
import pests from '../data/pests';
import { AlertTriangle, Shield, CheckCircle, Plus, X, Bug, Search } from 'lucide-react';
import './PestTracker.css';

export default function PestTracker() {
    const { pestLogs, addPestLog, resolvePestLog } = useGarden();
    const [activeTab, setActiveTab] = useState('catalog');
    const [search, setSearch] = useState('');
    const [selectedPest, setSelectedPest] = useState(null);
    const [showReport, setShowReport] = useState(false);
    const [newLog, setNewLog] = useState({ pestId: '', plant: '', severity: 'low', notes: '' });

    const filteredPests = pests.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    const activeAlerts = pestLogs.filter(l => !l.resolved);
    const resolvedLogs = pestLogs.filter(l => l.resolved);

    const handleReport = () => {
        if (!newLog.pestId || !newLog.plant) return;
        addPestLog(newLog);
        setNewLog({ pestId: '', plant: '', severity: 'low', notes: '' });
        setShowReport(false);
    };

    const getPestName = (id) => pests.find(p => p.id === id)?.name || 'Unknown';

    return (
        <div className="pest-tracker">
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1>🐛 Pest & Disease Tracker</h1>
                    <p>Monitor, identify, and manage garden pests and diseases</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowReport(true)}>
                    <Plus size={16} /> Report Issue
                </button>
            </div>

            {/* Alert banner */}
            {activeAlerts.length > 0 && (
                <div className="alert-banner">
                    <AlertTriangle size={18} />
                    <span>You have {activeAlerts.length} active pest/disease issue{activeAlerts.length > 1 ? 's' : ''} to address</span>
                </div>
            )}

            <div className="tabs">
                <button className={`tab ${activeTab === 'catalog' ? 'active' : ''}`} onClick={() => setActiveTab('catalog')}>📚 Pest Catalog</button>
                <button className={`tab ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>
                    🚨 Active Issues ({activeAlerts.length})
                </button>
                <button className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>📋 History</button>
            </div>

            {activeTab === 'catalog' && (
                <>
                    <div className="search-input" style={{ marginBottom: 'var(--space-lg)', maxWidth: 400 }}>
                        <Search size={18} />
                        <input type="text" placeholder="Search pests..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="grid-2 stagger-children">
                        {filteredPests.map(pest => (
                            <div key={pest.id} className="card pest-card" onClick={() => setSelectedPest(pest)}>
                                <div className="pest-card-header">
                                    <span className="pest-emoji">{pest.emoji}</span>
                                    <div>
                                        <h3>{pest.name}</h3>
                                        <span className={`badge badge-${pest.severity === 'high' ? 'red' : pest.severity === 'moderate' ? 'yellow' : 'green'}`}>
                                            {pest.severity} severity
                                        </span>
                                    </div>
                                </div>
                                <p className="pest-desc">{pest.description}</p>
                                <div className="pest-affected">
                                    <span className="pest-label">Affects:</span>
                                    {pest.affectedPlants.slice(0, 3).map((p, i) => <span key={i} className="badge badge-neutral">{p}</span>)}
                                    {pest.affectedPlants.length > 3 && <span className="badge badge-neutral">+{pest.affectedPlants.length - 3}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {activeTab === 'active' && (
                <div className="issues-list">
                    {activeAlerts.length === 0 ? (
                        <div className="empty-state">
                            <span className="emoji">🎉</span>
                            <h3>No active issues</h3>
                            <p>Your garden is pest-free! Keep up the great work.</p>
                        </div>
                    ) : (
                        activeAlerts.map(log => (
                            <div key={log.id} className="card issue-card">
                                <div className="issue-header">
                                    <div className="flex items-center gap-sm">
                                        <Bug size={18} className={`severity-${log.severity}`} />
                                        <div>
                                            <h4>{getPestName(log.pestId)}</h4>
                                            <span className="issue-plant">on {log.plant}</span>
                                        </div>
                                    </div>
                                    <span className={`badge badge-${log.severity === 'high' ? 'red' : log.severity === 'moderate' ? 'yellow' : 'green'}`}>
                                        {log.severity}
                                    </span>
                                </div>
                                <p className="issue-notes">{log.notes}</p>
                                <div className="issue-footer">
                                    <span className="issue-date">Reported: {log.date}</span>
                                    <button className="btn btn-primary btn-sm" onClick={() => resolvePestLog(log.id)}>
                                        <CheckCircle size={14} /> Mark Resolved
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'history' && (
                <div className="issues-list">
                    {resolvedLogs.length === 0 ? (
                        <div className="empty-state">
                            <span className="emoji">📋</span>
                            <h3>No resolved issues yet</h3>
                        </div>
                    ) : (
                        resolvedLogs.map(log => (
                            <div key={log.id} className="card issue-card resolved">
                                <div className="issue-header">
                                    <div className="flex items-center gap-sm">
                                        <Shield size={18} style={{ color: 'var(--primary-500)' }} />
                                        <div>
                                            <h4>{getPestName(log.pestId)} <CheckCircle size={14} style={{ color: 'var(--primary-500)' }} /></h4>
                                            <span className="issue-plant">on {log.plant}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="issue-notes">{log.notes}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Pest detail modal */}
            {selectedPest && (
                <div className="modal-overlay" onClick={() => setSelectedPest(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="flex items-center gap-sm">
                                <span style={{ fontSize: '2rem' }}>{selectedPest.emoji}</span>
                                <h2>{selectedPest.name}</h2>
                            </div>
                            <button className="btn-icon btn-ghost" onClick={() => setSelectedPest(null)}><X size={20} /></button>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>{selectedPest.description}</p>
                        <div className="detail-section">
                            <h4>🔍 Symptoms</h4>
                            <ul>{selectedPest.symptoms.map((s, i) => <li key={i}>{s}</li>)}</ul>
                        </div>
                        <div className="detail-section">
                            <h4>🛡️ Prevention</h4>
                            <ul>{selectedPest.prevention.map((s, i) => <li key={i}>{s}</li>)}</ul>
                        </div>
                        <div className="detail-section">
                            <h4>💊 Treatment</h4>
                            <ul>{selectedPest.treatment.map((s, i) => <li key={i}>{s}</li>)}</ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Report modal */}
            {showReport && (
                <div className="modal-overlay" onClick={() => setShowReport(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>🐛 Report Issue</h2>
                            <button className="btn-icon btn-ghost" onClick={() => setShowReport(false)}><X size={20} /></button>
                        </div>
                        <div className="form-group">
                            <label>Pest / Disease</label>
                            <select value={newLog.pestId} onChange={e => setNewLog({ ...newLog, pestId: Number(e.target.value) })}>
                                <option value="">Select...</option>
                                {pests.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Affected Plant</label>
                            <input type="text" placeholder="e.g., Rose" value={newLog.plant} onChange={e => setNewLog({ ...newLog, plant: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Severity</label>
                            <select value={newLog.severity} onChange={e => setNewLog({ ...newLog, severity: e.target.value })}>
                                <option value="low">Low</option>
                                <option value="moderate">Moderate</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Notes</label>
                            <textarea placeholder="Describe what you've observed..." value={newLog.notes} onChange={e => setNewLog({ ...newLog, notes: e.target.value })} />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-secondary" onClick={() => setShowReport(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleReport}>Submit Report</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
