import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

const featuredProjects = [
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
  }
];

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-primary mb-4">
            Öne Çıkan Projeler
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Her proje, benzersiz bir hikaye anlatır. En son çalışmalarımızdan örnekleri keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-[#030213] mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{project.year}</span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full group/btn">
                  Detayları Görüntüle
                  <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="px-6 py-2.5">
            <Link to="/projeler">
              Tüm Projeleri Görüntüle
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}