import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MapPin, Calendar, Filter } from 'lucide-react';

const allProjects = [
  {
    id: 1,
    title: 'Modern Villa Projesi',
    location: 'İstanbul, Beykoz',
    year: '2024',
    category: 'Konut',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist tasarım anlayışı ile doğa ile iç içe modern villa tasarımı.'
  },
  {
    id: 2,
    title: 'Kurumsal Ofis Binası',
    location: 'İstanbul, Levent',
    year: '2023',
    category: 'Ticari',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Sürdürülebilir mimarlık ilkeleri ile tasarlanan çok katlı ofis kompleksi.'
  },
  {
    id: 3,
    title: 'Boutique Otel',
    location: 'Antalya, Kaleiçi',
    year: '2023',
    category: 'Turizm',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Tarihi doku ile modern konforun buluştuğu butik otel tasarımı.'
  },
  {
    id: 4,
    title: 'Apartman Kompleksi',
    location: 'Ankara, Çankaya',
    year: '2023',
    category: 'Konut',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Şehir merkezinde lüks yaşam alanları ile modern apartman kompleksi.'
  },
  {
    id: 5,
    title: 'Alışveriş Merkezi',
    location: 'İzmir, Bornova',
    year: '2022',
    category: 'Ticari',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Modern perakende mimarisi ile tasarlanan alışveriş ve eğlence merkezi.'
  },
  {
    id: 6,
    title: 'Kültür Merkezi',
    location: 'İstanbul, Kadıköy',
    year: '2022',
    category: 'Kamu',
    image: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Sanat ve kültür etkinlikleri için tasarlanan çok fonksiyonlu kültür merkezi.'
  }
];

const categories = ['Tümü', 'Konut', 'Ticari', 'Turizm', 'Kamu'];

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const filteredProjects = selectedCategory === 'Tümü' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory);

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

        {/* Filtre */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
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
      </div>
    </div>
  );
}