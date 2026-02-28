import { useState } from 'react';
import { useGarden } from '../context/GardenContext';
import { Heart, MessageCircle, Send, TrendingUp, Users, Plus, X } from 'lucide-react';
import './Community.css';

const trendingTopics = [
    { tag: '#SpringPlanting', posts: 234 },
    { tag: '#OrganicGardening', posts: 189 },
    { tag: '#CompostTips', posts: 156 },
    { tag: '#RoseGarden', posts: 134 },
    { tag: '#UrbanGardening', posts: 112 },
];

const gardenGallery = [
    { id: 1, user: 'FloraFanatic', emoji: '🌷', desc: 'My tulip garden in full bloom', likes: 89 },
    { id: 2, user: 'VeggieVictor', emoji: '🥕', desc: 'Record carrot harvest this year!', likes: 67 },
    { id: 3, user: 'CactusCarl', emoji: '🌵', desc: 'Desert garden design', likes: 54 },
    { id: 4, user: 'BerryBeth', emoji: '🫐', desc: 'Blueberry patch paradise', likes: 43 },
    { id: 5, user: 'ZenGardener', emoji: '🪷', desc: 'Japanese water garden', likes: 98 },
    { id: 6, user: 'HerbHero', emoji: '🌿', desc: 'Kitchen herb spiral', likes: 76 },
];

export default function Community() {
    const { communityPosts } = useGarden();
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPost, setNewPost] = useState('');
    const [likedPosts, setLikedPosts] = useState(new Set());

    const toggleLike = (id) => {
        setLikedPosts(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className="community-page">
            <div className="page-header flex justify-between items-center">
                <div>
                    <h1>👥 Gardening Community</h1>
                    <p>Connect with fellow gardeners, share tips, and get inspired</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowNewPost(true)}>
                    <Plus size={16} /> New Post
                </button>
            </div>

            <div className="community-layout">
                <div className="community-feed">
                    {communityPosts.map(post => (
                        <div key={post.id} className="card community-card animate-fadeInUp">
                            <div className="post-header">
                                <div className="post-author">
                                    <span className="post-avatar-lg">{post.avatar}</span>
                                    <div>
                                        <span className="post-username">{post.user}</span>
                                        <span className="post-time">{post.time}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="post-body">{post.text}</p>
                            <div className="post-image-placeholder">
                                <span>{post.image}</span>
                            </div>
                            <div className="post-actions">
                                <button className={`post-action ${likedPosts.has(post.id) ? 'liked' : ''}`} onClick={() => toggleLike(post.id)}>
                                    <Heart size={18} fill={likedPosts.has(post.id) ? '#f43f5e' : 'none'} />
                                    <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                                </button>
                                <button className="post-action">
                                    <MessageCircle size={18} />
                                    <span>{post.comments}</span>
                                </button>
                                <button className="post-action">
                                    <Send size={18} />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="community-sidebar">
                    {/* Trending */}
                    <div className="card sidebar-section">
                        <h3><TrendingUp size={16} /> Trending Topics</h3>
                        <div className="trending-list">
                            {trendingTopics.map((topic, i) => (
                                <div key={i} className="trending-item">
                                    <span className="trending-tag">{topic.tag}</span>
                                    <span className="trending-count">{topic.posts} posts</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="card sidebar-section">
                        <h3>🌿 Garden Inspiration</h3>
                        <div className="gallery-grid">
                            {gardenGallery.map(g => (
                                <div key={g.id} className="gallery-item">
                                    <span className="gallery-emoji">{g.emoji}</span>
                                    <div className="gallery-info">
                                        <span className="gallery-desc">{g.desc}</span>
                                        <span className="gallery-meta">by {g.user} · ❤️ {g.likes}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Community stats */}
                    <div className="card sidebar-section community-stats-card">
                        <h3><Users size={16} /> Community</h3>
                        <div className="comm-stats">
                            <div className="comm-stat">
                                <span className="comm-stat-num">12.4k</span>
                                <span className="comm-stat-label">Gardeners</span>
                            </div>
                            <div className="comm-stat">
                                <span className="comm-stat-num">3.2k</span>
                                <span className="comm-stat-label">Posts</span>
                            </div>
                            <div className="comm-stat">
                                <span className="comm-stat-num">890</span>
                                <span className="comm-stat-label">This Week</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showNewPost && (
                <div className="modal-overlay" onClick={() => setShowNewPost(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>✏️ Create Post</h2>
                            <button className="btn-icon btn-ghost" onClick={() => setShowNewPost(false)}><X size={20} /></button>
                        </div>
                        <div className="form-group">
                            <label>What's growing in your garden?</label>
                            <textarea rows={4} placeholder="Share your gardening experience, tips, or ask a question..." value={newPost} onChange={e => setNewPost(e.target.value)} />
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-secondary" onClick={() => setShowNewPost(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => setShowNewPost(false)}>
                                <Send size={16} /> Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
