import { Card, CardContent } from './ui/card';
import { Star, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTestimonials, Testimonial } from '../src/api';

// Fallback testimonials in case API fails
const fallbackTestimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    title: 'Villa Sahibi',
    content: 'Hayal ettiğimizden bile güzel bir ev ortaya çıktı. Her detayda özen ve profesyonellik vardı.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Elif Demir',
    title: 'Şirket Sahibi',
    content: 'Ofisimiz artık çalışanlarımızın en sevdiği yer. Fonksiyonellik ve estetik mükemmel birleşmiş.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    title: 'Otel İşletmecisi',
    content: 'Misafirlerimizden sürekli övgü alıyoruz. Tasarım gerçekten fark yaratıyor.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const data = await getTestimonials();
        setTestimonials(data.filter(t => t.isActive));
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Müşteri görüşleri yüklenirken bir hata oluştu');
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-primary mb-4">
            Müşterilerimiz Ne Diyor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Projelerimizle ilgili müşterilerimizin deneyimlerini ve geri bildirimlerini okuyun.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    {!testimonial.image && (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-primary">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}