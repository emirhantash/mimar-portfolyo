import { useState, useEffect } from 'react';
import { BarChart, Users, MessageSquare, FileText } from 'lucide-react';

// Dashboard için basit istatistik kartı bileşeni
function StatCard({ 
  icon, 
  title, 
  value, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string | number; 
  description?: string;
}) {
  return (
    <div className="admin-card">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="admin-stat-label">{title}</p>
            <p className="admin-stat-value">{value}</p>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
          </div>
          <div className="admin-stat-icon">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    team: 0,
    messages: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend API'den gerçek istatistikleri çek
    const fetchStats = async () => {
      try {
        // İstatistikleri çekmek için API isteği
        // const dashboardStats = await getDashboardStats();
        // setStats(dashboardStats);

        // Şimdilik mevcut verileri kullanıyoruz
        // Gerçek uygulamada bunu API çağrısı ile değiştirin
        setTimeout(() => {
          setStats({
            projects: 12,
            team: 5,
            messages: 24,
            testimonials: 18,
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FileText className="text-blue-600" size={24} />}
          title="Toplam Proje"
          value={stats.projects}
        />
        <StatCard
          icon={<Users className="text-green-600" size={24} />}
          title="Ekip Üyeleri"
          value={stats.team}
        />
        <StatCard
          icon={<MessageSquare className="text-purple-600" size={24} />}
          title="Okunmamış Mesaj"
          value={stats.messages}
        />
        <StatCard
          icon={<BarChart className="text-amber-600" size={24} />}
          title="Referanslar"
          value={stats.testimonials}
        />
      </div>

      {/* Son Aktiviteler */}
      <div className="admin-card mb-8">
        <div className="p-6">
          <h2 className="admin-section-title">Son Aktiviteler</h2>
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Yeni bir iletişim mesajı alındı</p>
                <p className="text-sm text-gray-500">mehmet.yilmaz@example.com adresinden</p>
              </div>
              <div className="text-sm text-gray-500">2 saat önce</div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Yeni proje eklendi: "Modern Villa"</p>
                <p className="text-sm text-gray-500">admin@example.com tarafından</p>
              </div>
              <div className="text-sm text-gray-500">Dün</div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Bir referans güncellendi</p>
                <p className="text-sm text-gray-500">admin@example.com tarafından</p>
              </div>
              <div className="text-sm text-gray-500">2 gün önce</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hızlı Erişim */}
      <div className="admin-card">
        <div className="p-6">
          <h2 className="admin-section-title">Hızlı Erişim</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <button className="admin-action-button">
              <FileText className="mx-auto mb-2" size={24} />
              <span className="text-sm">Proje Ekle</span>
            </button>
            <button className="admin-action-button">
              <Users className="mx-auto mb-2" size={24} />
              <span className="text-sm">Ekip Yönet</span>
            </button>
            <button className="admin-action-button">
              <MessageSquare className="mx-auto mb-2" size={24} />
              <span className="text-sm">Mesajlar</span>
            </button>
            <button className="admin-action-button">
              <BarChart className="mx-auto mb-2" size={24} />
              <span className="text-sm">Referanslar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
