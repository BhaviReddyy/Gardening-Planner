import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const GardenContext = createContext();

const communityPosts = [
    { id: 1, user: "GreenThumb_Mary", avatar: "🧑‍🌾", time: "2h ago", text: "My dahlias are absolutely stunning this year! The dinner plate varieties grew over 10 inches across. Secret: fish bone meal fertilizer!", likes: 24, comments: 8, image: "🌺" },
    { id: 2, user: "UrbanGardener_Jake", avatar: "👨‍🌾", time: "4h ago", text: "Just harvested my first batch of cherry tomatoes from my balcony garden. Container gardening is totally worth it!", likes: 18, comments: 5, image: "🍅" },
    { id: 3, user: "RoseQueen_Elena", avatar: "👩‍🌾", time: "6h ago", text: "Tip: Plant garlic around your roses to deter aphids naturally. Been doing this for 3 years and it works wonders!", likes: 42, comments: 15, image: "🌹" },
    { id: 4, user: "OrganicOliver", avatar: "🧔", time: "8h ago", text: "My compost bin is producing the richest, darkest soil I've ever seen. The worms are doing an incredible job!", likes: 31, comments: 12, image: "♻️" },
    { id: 5, user: "SeedSaver_Priya", avatar: "👩", time: "1d ago", text: "Successfully saved seeds from my heirloom tomatoes for next year. Here's my step-by-step process for fermenting and drying seeds.", likes: 56, comments: 23, image: "🌱" },
    { id: 6, user: "PermaPete", avatar: "🧑", time: "1d ago", text: "Built a new hugelkultur bed this weekend. Layers of logs, branches, leaves, and compost. Can't wait to see results!", likes: 29, comments: 7, image: "🪵" },
];

function loadState(userId, key, defaultValue) {
    try {
        const saved = localStorage.getItem(`garden_${userId}_${key}`);
        return saved ? JSON.parse(saved) : defaultValue;
    } catch {
        return defaultValue;
    }
}

export function GardenProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.id;

    const [myPlants, setMyPlants] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [journalEntries, setJournalEntries] = useState([]);
    const [harvests, setHarvests] = useState([]);
    const [pestLogs, setPestLogs] = useState([]);
    const [gardenLayout, setGardenLayout] = useState([]);
    const [theme, setTheme] = useState(() => {
        try {
            const saved = localStorage.getItem('garden_theme');
            return saved ? JSON.parse(saved) : 'light';
        } catch { return 'light'; }
    });
    const [notifications, setNotifications] = useState([]);

    // Re-initialize state when user changes
    useEffect(() => {
        if (!userId) return;
        setMyPlants(loadState(userId, 'myPlants', []));
        setTasks(loadState(userId, 'tasks', []));
        setJournalEntries(loadState(userId, 'journal', []));
        setHarvests(loadState(userId, 'harvests', []));
        setPestLogs(loadState(userId, 'pestLogs', []));
        setGardenLayout(loadState(userId, 'gardenLayout', []));
    }, [userId]);

    // Persist per-user data
    useEffect(() => { if (userId) localStorage.setItem(`garden_${userId}_myPlants`, JSON.stringify(myPlants)); }, [myPlants, userId]);
    useEffect(() => { if (userId) localStorage.setItem(`garden_${userId}_tasks`, JSON.stringify(tasks)); }, [tasks, userId]);
    useEffect(() => { if (userId) localStorage.setItem(`garden_${userId}_journal`, JSON.stringify(journalEntries)); }, [journalEntries, userId]);
    useEffect(() => { if (userId) localStorage.setItem(`garden_${userId}_harvests`, JSON.stringify(harvests)); }, [harvests, userId]);
    useEffect(() => { if (userId) localStorage.setItem(`garden_${userId}_pestLogs`, JSON.stringify(pestLogs)); }, [pestLogs, userId]);
    useEffect(() => { if (userId) localStorage.setItem(`garden_${userId}_gardenLayout`, JSON.stringify(gardenLayout)); }, [gardenLayout, userId]);

    // Theme is global (not per-user)
    useEffect(() => { localStorage.setItem('garden_theme', JSON.stringify(theme)); }, [theme]);
    useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

    // Generate notifications from data
    useEffect(() => {
        const notifs = [];
        const today = new Date().toISOString().split('T')[0];

        // Overdue tasks
        tasks.filter(t => !t.done && t.due <= today).forEach(t => {
            notifs.push({ id: `task-${t.id}`, type: 'task', icon: '📋', title: 'Task overdue', message: t.title, link: '/seasonal-planner' });
        });

        // Plants needing water (not watered in 3+ days)
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        const waterThreshold = threeDaysAgo.toISOString().split('T')[0];
        myPlants.filter(p => p.lastWatered && p.lastWatered <= waterThreshold).forEach(p => {
            notifs.push({ id: `water-${p.id}`, type: 'water', icon: '💧', title: 'Needs watering', message: `${p.nickname || p.name} hasn't been watered recently`, link: '/my-garden' });
        });

        // Unresolved pest issues
        pestLogs.filter(l => !l.resolved).forEach(l => {
            notifs.push({ id: `pest-${l.id}`, type: 'pest', icon: '🐛', title: 'Pest issue', message: `${l.plant}: ${l.notes?.slice(0, 50)}`, link: '/pest-tracker' });
        });

        // Low health plants
        myPlants.filter(p => p.health < 60).forEach(p => {
            notifs.push({ id: `health-${p.id}`, type: 'health', icon: '⚠️', title: 'Low plant health', message: `${p.nickname || p.name} is at ${p.health}% health`, link: '/plant-health' });
        });

        setNotifications(notifs);
    }, [tasks, myPlants, pestLogs]);

    const toggleTheme = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);

    const addPlant = useCallback((plant) => {
        setMyPlants(prev => [...prev, { ...plant, id: Date.now(), addedDate: new Date().toISOString().split('T')[0], health: 100 }]);
    }, []);

    const removePlant = useCallback((id) => {
        setMyPlants(prev => prev.filter(p => p.id !== id));
    }, []);

    const updatePlantHealth = useCallback((id, health) => {
        setMyPlants(prev => prev.map(p => p.id === id ? { ...p, health } : p));
    }, []);

    const waterPlant = useCallback((id) => {
        setMyPlants(prev => prev.map(p => p.id === id ? { ...p, lastWatered: new Date().toISOString().split('T')[0] } : p));
    }, []);

    const addTask = useCallback((task) => {
        setTasks(prev => [...prev, { ...task, id: Date.now(), done: false }]);
    }, []);

    const toggleTask = useCallback((id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    }, []);

    const removeTask = useCallback((id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    }, []);

    const addJournalEntry = useCallback((entry) => {
        setJournalEntries(prev => [{ ...entry, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...prev]);
    }, []);

    const addHarvest = useCallback((harvest) => {
        setHarvests(prev => [...prev, { ...harvest, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
    }, []);

    const addPestLog = useCallback((log) => {
        setPestLogs(prev => [...prev, { ...log, id: Date.now(), date: new Date().toISOString().split('T')[0], resolved: false }]);
    }, []);

    const resolvePestLog = useCallback((id) => {
        setPestLogs(prev => prev.map(l => l.id === id ? { ...l, resolved: true } : l));
    }, []);

    const updateGardenLayout = useCallback((layout) => {
        setGardenLayout(layout);
    }, []);

    const addToLayout = useCallback((item) => {
        setGardenLayout(prev => [...prev, { ...item, id: Date.now() }]);
    }, []);

    const removeFromLayout = useCallback((id) => {
        setGardenLayout(prev => prev.filter(i => i.id !== id));
    }, []);

    const dismissNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return (
        <GardenContext.Provider value={{
            theme, toggleTheme,
            myPlants, addPlant, removePlant, updatePlantHealth, waterPlant,
            tasks, addTask, toggleTask, removeTask,
            journalEntries, addJournalEntry,
            harvests, addHarvest,
            pestLogs, addPestLog, resolvePestLog,
            gardenLayout, updateGardenLayout, addToLayout, removeFromLayout,
            communityPosts,
            notifications, dismissNotification, clearNotifications,
        }}>
            {children}
        </GardenContext.Provider>
    );
}

export function useGarden() {
    const ctx = useContext(GardenContext);
    if (!ctx) throw new Error('useGarden must be used within GardenProvider');
    return ctx;
}

export default GardenContext;
