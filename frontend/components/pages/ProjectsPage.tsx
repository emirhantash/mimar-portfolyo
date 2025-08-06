import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MapPin, Calendar, Filter, Loader2 } from 'lucide-react';
import { getProjects, Project } from '../../src/api';

// Yedek projeler kaldırıldı - API çağrısını test etmek için
// API bağlantısı başarısız olursa boş dizi kullanılacak

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [categories, setCategories] = useState<string[]>(['Tümü']);

  // Veritabanından projeleri çek
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        
        // Kategorileri dinamik olarak ayarla
        const uniqueCategories = Array.from(
          new Set(data.map(project => project.category))
        );
        setCategories(['Tümü', ...uniqueCategories]);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Projeler yüklenirken bir hata oluştu. API bağlantısını kontrol edin.');
        setProjects([]);
        // Yedek kategoriler de kaldırıldı, sadece 'Tümü' kalsın
        setCategories(['Tümü']);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'Tümü' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-primary mb-6">
            Projelerimiz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Her proje benzersiz bir hikaye anlatır. Çeşitli sektörlerde gerçekleştirdiğimiz projelerimizi keşfedin.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center text-red-500 mb-8">{error}</div>
        )}

        {!loading && !error && (
          <>
            {/* Filtre */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-1 rounded-lg">
                <Filter size={16} className="text-gray-500 ml-2" />
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="px-4"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Projeler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl text-primary mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{project.year}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Detayları İncele
                </Button>
              </CardContent>
            </Card>
              ))}
            </div>

            {/* Boş durum */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Bu kategoride henüz proje bulunmamaktadır.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}