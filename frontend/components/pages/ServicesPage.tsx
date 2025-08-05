import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Building, Home, Palette, Box, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Building,
    title: 'Mimari Tasarım',
    description: 'Konut, ticari ve kamu binalarında profesyonel mimari tasarım hizmetleri.',
    features: ['Konsept tasarım', 'Uygulama projeleri', 'Yapı ruhsatı süreçleri', '3D görselleştirme']
  },
  {
    icon: Home,
    title: 'İç Mimarlık',
    description: 'Yaşam alanlarınızı daha fonksiyonel ve estetik hale getiren iç mimarlık çözümleri.',
    features: ['Mekan planlaması', 'Mobilya tasarımı', 'Aydınlatma tasarımı', 'Malzeme seçimi']
  },
  {
    icon: Palette,
    title: 'Cephe Tasarımı',
    description: 'Binaların kimliğini yansıtan modern ve sürdürülebilir cephe tasarım çözümleri.',
    features: ['Dış cephe tasarımı', 'Malzeme danışmanlığı', 'İklim kontrolü', 'Enerji verimliliği']
  },
  {
    icon: Box,
    title: '3D Modelleme',
    description: 'Projelerinizi gerçekçi 3D modellerle görselleştirin ve detayları keşfedin.',
    features: ['Fotorealistik render', 'Sanal tur', 'Animasyon', 'VR deneyimi']
  },
  {
    icon: Users,
    title: 'Proje Yönetimi',
    description: 'Başlangıçtan bitişe kadar tüm süreçleri profesyonel olarak yönetiyoruz.',
    features: ['İnşaat denetimi', 'Koordinasyon', 'Zaman yönetimi', 'Kalite kontrolü']
  },
  {
    icon: Lightbulb,
    title: 'Danışmanlık',
    description: 'Mimarlık ve tasarım konularında uzman danışmanlık hizmetleri.',
    features: ['Fizibilite analizi', 'Yasal süreçler', 'Sürdürülebilirlik', 'Maliyet optimizasyonu']
  }
];

export function ServicesPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-primary mb-6">
            Hizmetlerimiz
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mimarlık ve tasarım alanında kapsamlı hizmetler sunarak projelerinizi hayata geçiriyoruz.
          </p>
        </div>

        {/* Hizmetler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-lg mb-4">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl text-primary mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* İş Süreci */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl text-primary text-center mb-12">
            Çalışma Sürecimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Keşif & Analiz', description: 'İhtiyaçlarınızı anlıyor ve analiz ediyoruz.' },
              { step: '02', title: 'Konsept Tasarım', description: 'Yaratıcı çözümler geliştiriyoruz.' },
              { step: '03', title: 'Uygulama', description: 'Projeyi detaylandırıp uyguluyoruz.' },
              { step: '04', title: 'Teslim', description: 'Kaliteli sonucu size teslim ediyoruz.' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full mb-4 text-lg">
                  {phase.step}
                </div>
                <h3 className="text-lg text-primary mb-2">{phase.title}</h3>
                <p className="text-gray-600 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl text-primary mb-6">
            Projenizi Konuşalım
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Hayalinizdeki projeyi gerçeğe dönüştürmek için bizimle iletişime geçin. 
            Ücretsiz danışmanlık hizmeti ile başlayalım.
          </p>
          <Button asChild size="lg" className="px-8 py-3">
            <Link to="/iletisim">Ücretsiz Danışmanlık Alın</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}