import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { MessagesPage } from './pages/MessagesPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamMembersPage } from './pages/TeamMembersPage';
import { SettingsPage } from './pages/SettingsPage';

// Yetkilendirme kontrolü için özel route bileşeni
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    // Yetkilendirme durumu kontrol ediliyor
    return <div className="flex justify-center items-center h-screen">Yükleniyor...</div>;
  }

  if (isAuthenticated === false) {
    // Yetkisiz erişim
    return <Navigate to="/admin/login" replace />;
  }

  // Yetkili erişim
  return <>{children}</>;
}

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Admin panel yetkilendirme gerektiren rotalar */}
      <Route 
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        
        {/* Diğer admin sayfaları */}
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="team" element={<TeamMembersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* Geçersiz rotalar için ana dashboard'a yönlendir */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
