import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Loader2, Search, Plus, Edit, Trash2, Star } from 'lucide-react';
import { getTestimonials, Testimonial } from '../../src/api';

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActive, setShowActive] = useState<boolean | null>(null);
  
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        setError(null);
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError('Referanslar yüklenirken bir hata oluştu.');
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);
  
  const handleDeleteTestimonial = (testimonialId: number) => {
    // Silme işlemi için backend API çağrısı yapılacak
    if (window.confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
      console.log('Referans silindi:', testimonialId);
      // API çağrısı ve state güncelleme işlemleri burada yapılacak
    }
  };

  // Filtrele
  const filteredTestimonials = testimonials
    .filter(testimonial => 
      showActive === null || testimonial.isActive === showActive
    )
    .filter(testimonial =>
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Yıldızları render et
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Referanslar</h1>
        <Button className="flex items-center gap-2">
          <Plus size={18} />
          Yeni Referans Ekle
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                placeholder="Referanslarda ara..."
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
          {filteredTestimonials.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Kriterlere uygun referans bulunamadı.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className={`overflow-hidden ${!testimonial.isActive ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.title}</CardDescription>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="icon">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700 hover:border-red-300"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {new Date(testimonial.updatedAt).toLocaleDateString('tr-TR')} tarihinde güncellendi
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${testimonial.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'}`}
                        >
                          {testimonial.isActive ? 'Aktif' : 'İnaktif'}
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
