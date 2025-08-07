import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Folder, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Award,
  Wrench
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { getCurrentUser, AuthResponse } from '../../src/api';
// Admin stil dosyasını doğrudan import ediyoruz
import '../../styles/globals.css';

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { user } = await getCurrentUser();
        if (user.role !== 'ADMIN') {
          // Eğer admin değilse, login sayfasına yönlendir
          navigate('/admin/login');
          return;
        }
        setUser(user);
      } catch (error) {
        // Token geçersizse veya API hatası varsa login sayfasına yönlendir
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  // Admin menü öğeleri
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Folder, label: 'Projeler', path: '/admin/projects' },
    { icon: Award, label: 'Referanslar', path: '/admin/testimonials' },
    { icon: Wrench, label: 'Hizmetler', path: '/admin/services' },
    { icon: Users, label: 'Ekip', path: '/admin/team' },
    { icon: MessageSquare, label: 'Mesajlar', path: '/admin/messages' },
    { icon: Settings, label: 'Ayarlar', path: '/admin/settings' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`bg-primary shadow-md transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-primary-foreground/10">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-primary font-medium">M</span>
              </div>
              <span className="text-lg font-bold text-white">Admin Panel</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-white flex items-center justify-center mx-auto">
              <span className="text-primary font-medium">M</span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className={`${collapsed ? "ml-auto" : ""} text-white hover:bg-primary-foreground/10`}
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>
        
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start mb-1 text-white hover:bg-primary-foreground/10 hover:text-white ${collapsed ? 'px-2' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <IconComponent size={20} className={collapsed ? 'mx-auto' : 'mr-2'} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              );
            })}
            
            <Button
              variant="ghost"
              className={`w-full justify-start text-red-200 hover:text-red-100 hover:bg-red-900/20 ${collapsed ? 'px-2' : ''}`}
              onClick={handleLogout}
            >
              <LogOut size={20} className={collapsed ? 'mx-auto' : 'mr-2'} />
              {!collapsed && <span>Çıkış Yap</span>}
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          <div className="font-semibold">Hoş geldiniz, {user?.name || 'Admin'}</div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
