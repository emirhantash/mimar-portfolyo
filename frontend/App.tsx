import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminRoutes } from './admin/AdminRoutes';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ana site rotaları */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="hakkinda" element={<AboutPage />} />
          <Route path="projeler" element={<ProjectsPage />} />
          <Route path="hizmetler" element={<ServicesPage />} />
          <Route path="iletisim" element={<ContactPage />} />
          {/* Preview page route - redirect to home */}
          <Route path="preview_page.html" element={<Navigate to="/" replace />} />
        </Route>
        
        {/* Admin panel rotaları */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}