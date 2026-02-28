import { useGarden } from '../../context/GardenContext';
import { useAuth } from '../../context/AuthContext';
import { Search, Bell, Sun, Moon, User, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import plants from '../../data/plants';
import './Header.css';

export default function Header({ onMenuToggle }) {
    const { theme, toggleTheme, notifications, dismissNotification, clearNotifications } = useGarden();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchRef = useRef(null);
    const notifRef = useRef(null);
    const userRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClick(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearchResults(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
            if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Search results
    const searchResults = searchValue.trim().length >= 2
        ? plants.filter(p =>
            p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            p.scientific.toLowerCase().includes(searchValue.toLowerCase())
        ).slice(0, 6)
        : [];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/plant-library?q=${encodeURIComponent(searchValue.trim())}`);
            setSearchValue('');
            setShowSearchResults(false);
        }
    };

    const handleSearchSelect = (plant) => {
        navigate(`/plant-library?q=${encodeURIComponent(plant.name)}`);
        setSearchValue('');
        setShowSearchResults(false);
    };

    return (
        <header className="header">
            <button className="mobile-menu-btn btn-icon" onClick={onMenuToggle}>
                <Menu size={22} />
            </button>

            <form className="header-search" ref={searchRef} onSubmit={handleSearchSubmit}>
                <Search size={18} />
                <input
                    type="text"
                    placeholder="Search plants, tasks, tips..."
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value); setShowSearchResults(true); }}
                    onFocus={() => setShowSearchResults(true)}
                />
                {showSearchResults && searchResults.length > 0 && (
                    <div className="search-dropdown">
                        {searchResults.map(p => (
                            <button key={p.id} className="search-result-item" type="button" onClick={() => handleSearchSelect(p)}>
                                <span className="search-result-emoji">{p.emoji}</span>
                                <div className="search-result-info">
                                    <span className="search-result-name">{p.name}</span>
                                    <span className="search-result-sci">{p.scientific}</span>
                                </div>
                                <ChevronRight size={14} />
                            </button>
                        ))}
                        <button className="search-view-all" type="submit">
                            View all results for "{searchValue}" →
                        </button>
                    </div>
                )}
            </form>

            <div className="header-actions">
                <button className="header-btn tooltip-wrapper" onClick={toggleTheme}>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    <span className="tooltip-text">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>

                <div className="notif-wrapper" ref={notifRef}>
                    <button
                        className="header-btn tooltip-wrapper"
                        style={{ position: 'relative' }}
                        onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                    >
                        <Bell size={20} />
                        {notifications.length > 0 && <span className="notification-dot"></span>}
                        {!showNotifications && <span className="tooltip-text">Notifications</span>}
                    </button>

                    {showNotifications && (
                        <div className="notif-dropdown" onClick={e => e.stopPropagation()}>
                            <div className="notif-header">
                                <span className="notif-title">Notifications</span>
                                {notifications.length > 0 && (
                                    <button className="notif-clear" onClick={clearNotifications}>Clear all</button>
                                )}
                            </div>
                            <div className="notif-list">
                                {notifications.length === 0 ? (
                                    <div className="notif-empty">
                                        <span>🌿</span>
                                        <p>All caught up! No notifications.</p>
                                    </div>
                                ) : (
                                    notifications.slice(0, 8).map(n => (
                                        <button
                                            key={n.id}
                                            className="notif-item"
                                            onClick={() => { navigate(n.link); setShowNotifications(false); }}
                                        >
                                            <span className="notif-icon">{n.icon}</span>
                                            <div className="notif-content">
                                                <span className="notif-item-title">{n.title}</span>
                                                <span className="notif-item-msg">{n.message}</span>
                                            </div>
                                            <button
                                                className="notif-dismiss"
                                                onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                                            >
                                                <X size={14} />
                                            </button>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="header-user" ref={userRef} onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}>
                    <div className="header-avatar">
                        {user?.avatar || <User size={18} />}
                    </div>
                    <div className="header-user-info">
                        <span className="header-user-name">{user?.name || 'Gardener'}</span>
                        <span className="header-user-role">Since {user?.joinDate?.slice(0, 4) || '2024'}</span>
                    </div>

                    {showUserMenu && (
                        <div className="user-dropdown" onClick={e => e.stopPropagation()}>
                            <div className="dropdown-header">
                                <div className="dropdown-avatar">{user?.avatar}</div>
                                <div>
                                    <span className="dropdown-name">{user?.name}</span>
                                    <span className="dropdown-email">{user?.email}</span>
                                </div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item signout" onClick={signOut}>
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
