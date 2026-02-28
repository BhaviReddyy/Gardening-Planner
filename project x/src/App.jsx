import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GardenProvider } from './context/GardenContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import PlantLibrary from './pages/PlantLibrary';
import MyGarden from './pages/MyGarden';
import GardenLayout from './pages/GardenLayout';
import SeasonalPlanner from './pages/SeasonalPlanner';
import PestTracker from './pages/PestTracker';
import Journal from './pages/Journal';
import PlantHealth from './pages/PlantHealth';
import HarvestPlanner from './pages/HarvestPlanner';
import Weather from './pages/Weather';
import Tips from './pages/Tips';
import Community from './pages/Community';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

function AuthRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

function AppContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/signin" element={<AuthRoute><SignIn /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><SignUp /></AuthRoute>} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    );
  }

  return (
    <GardenProvider>
      <div className="app-layout">
        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
        )}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(prev => !prev)}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />
        <div className={`main-area ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <Header onMenuToggle={() => setMobileMenuOpen(prev => !prev)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/plant-library" element={<PlantLibrary />} />
              <Route path="/my-garden" element={<MyGarden />} />
              <Route path="/garden-layout" element={<GardenLayout />} />
              <Route path="/seasonal-planner" element={<SeasonalPlanner />} />
              <Route path="/pest-tracker" element={<PestTracker />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/plant-health" element={<PlantHealth />} />
              <Route path="/harvest" element={<HarvestPlanner />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/community" element={<Community />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </GardenProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
