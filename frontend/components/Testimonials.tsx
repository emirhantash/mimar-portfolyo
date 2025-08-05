import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    title: 'Villa Sahibi',
    content: 'Hayal ettiğimizden bile güzel bir ev ortaya çıktı. Her detayda özen ve profesyonellik vardı.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'Elif Demir',
    title: 'Şirket Sahibi',
    content: 'Ofisimiz artık çalışanlarımızın en sevdiği yer. Fonksiyonellik ve estetik mükemmel birleşmiş.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    title: 'Otel İşletmecisi',
    content: 'Misafirlerimizden sürekli övgü alıyoruz. Tasarım gerçekten fark yaratıyor.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  }
];

export function Testimonials() {
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
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-primary">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}