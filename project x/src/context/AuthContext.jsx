import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

function loadAuth() {
    try {
        const user = localStorage.getItem('garden_user');
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
}

function loadUsers() {
    try {
        const users = localStorage.getItem('garden_users');
        return users ? JSON.parse(users) : [];
    } catch {
        return [];
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => loadAuth());
    const [users, setUsers] = useState(() => loadUsers());

    useEffect(() => {
        if (user) {
            localStorage.setItem('garden_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('garden_user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('garden_users', JSON.stringify(users));
    }, [users]);

    const signUp = useCallback((userData) => {
        const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (existing) {
            return { success: false, error: 'An account with this email already exists' };
        }
        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            password: userData.password,
            avatar: userData.name.charAt(0).toUpperCase(),
            joinDate: new Date().toISOString().split('T')[0],
            gardenName: userData.gardenName || `${userData.name}'s Garden`,
        };
        setUsers(prev => [...prev, newUser]);
        setUser(newUser);
        return { success: true };
    }, [users]);

    const signIn = useCallback((email, password) => {
        const found = users.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!found) {
            return { success: false, error: 'Invalid email or password' };
        }
        setUser(found);
        return { success: true };
    }, [users]);

    const signOut = useCallback(() => {
        setUser(null);
    }, []);

    const updateProfile = useCallback((updates) => {
        setUser(prev => {
            const updated = { ...prev, ...updates };
            setUsers(prevUsers => prevUsers.map(u => u.id === updated.id ? updated : u));
            return updated;
        });
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            signUp,
            signIn,
            signOut,
            updateProfile,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}

export default AuthContext;
