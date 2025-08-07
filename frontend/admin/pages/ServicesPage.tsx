import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Loader2, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Wrench,
  Paintbrush,
  HardHat,
  Home,
  PencilRuler,
  Building
} from 'lucide-react';
import { getServices, Service } from '../../src/api';

// İkon bileşeni
function ServiceIcon({ iconName }: { iconName?: string }) {
  const iconSize = 24;
  
  // İkon adına göre ilgili bileşeni döndür
  switch(iconName) {
    case 'Wrench': return <Wrench size={iconSize} className="text-primary" />;
    case 'Paintbrush': return <Paintbrush size={iconSize} className="text-primary" />;
    case 'HardHat': return <HardHat size={iconSize} className="text-primary" />;
    case 'Home': return <Home size={iconSize} className="text-primary" />;
    case 'PencilRuler': return <PencilRuler size={iconSize} className="text-primary" />;
    case 'Building': return <Building size={iconSize} className="text-primary" />;
    default: return <Wrench size={iconSize} className="text-primary" />;
  }
}

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActive, setShowActive] = useState<boolean | null>(null);
  
  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        setError(null);
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError('Hizmetler yüklenirken bir hata oluştu.');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);
  
  const handleDeleteService = (serviceId: number) => {
    // Silme işlemi için backend API çağrısı yapılacak
    if (window.confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      console.log('Hizmet silindi:', serviceId);
      // API çağrısı ve state güncelleme işlemleri burada yapılacak
    }
  };

  // Filtrele
  const filteredServices = services
    .filter(service => 
      showActive === null || service.isActive === showActive
    )
    .filter(service =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Hizmetler</h1>
        <Button className="flex items-center gap-2">
          <Plus size={18} />
          Yeni Hizmet Ekle
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                placeholder="Hizmetlerde ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="md:w-64">
              <select
                value={showActive === null ? "all" : showActive ? "active" : "inactive"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "all") setShowActive(null);
                  else if (val === "active") setShowActive(true);
                  else setShowActive(false);
                }}
                className="w-full h-10 px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="all">Tümünü Göster</option>
                <option value="active">Sadece Aktif</option>
                <option value="inactive">Sadece İnaktif</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      ) : (
        <>
          {filteredServices.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Kriterlere uygun hizmet bulunamadı.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className={`overflow-hidden ${!service.isActive ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <ServiceIcon iconName={service.icon} />
                          </div>
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="icon">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700 hover:border-red-300"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {new Date(service.updatedAt).toLocaleDateString('tr-TR')} tarihinde güncellendi
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${service.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'}`}
                        >
                          {service.isActive ? 'Aktif' : 'İnaktif'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
