import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Flower2, TreePine, Map, CalendarDays,
    Bug, BookOpen, HeartPulse, Apple, Cloud, Lightbulb,
    Users, ChevronLeft, ChevronRight, Leaf, X
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/plant-library', icon: Flower2, label: 'Plant Library' },
    { path: '/my-garden', icon: TreePine, label: 'My Garden' },
    { path: '/garden-layout', icon: Map, label: 'Garden Layout' },
    { path: '/seasonal-planner', icon: CalendarDays, label: 'Seasonal Planner' },
    { path: '/pest-tracker', icon: Bug, label: 'Pest Tracker' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/plant-health', icon: HeartPulse, label: 'Plant Health' },
    { path: '/harvest', icon: Apple, label: 'Harvest Planner' },
    { path: '/weather', icon: Cloud, label: 'Weather' },
    { path: '/tips', icon: Lightbulb, label: 'Tips & Resources' },
    { path: '/community', icon: Users, label: 'Community' },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-icon">
                        <Leaf size={22} />
                    </div>
                    {!collapsed && <span className="logo-text">GardenPlan</span>}
                </div>
                <button className="sidebar-toggle btn-icon desktop-only" onClick={onToggle}>
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
                <button className="sidebar-toggle btn-icon mobile-only" onClick={onMobileClose}>
                    <X size={18} />
                </button>
            </div>

            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        end={item.path === '/'}
                        onClick={onMobileClose}
                    >
                        <item.icon size={20} />
                        {!collapsed && <span>{item.label}</span>}
                        {collapsed && (
                            <div className="sidebar-tooltip">{item.label}</div>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                {!collapsed && (
                    <div className="sidebar-footer-content">
                        <div className="sidebar-footer-emoji">🌱</div>
                        <p>Happy Gardening!</p>
                    </div>
                )}
            </div>
        </aside>
    );
}
