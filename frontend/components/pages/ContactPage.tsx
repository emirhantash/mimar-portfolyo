import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    value: '+90 212 XXX XX XX',
    description: 'Pazartesi - Cuma, 09:00 - 18:00'
  },
  {
    icon: Mail,
    title: 'E-posta',
    value: 'info@mimaradiniz.com',
    description: '24 saat içinde yanıt veriyoruz'
  },
  {
    icon: MapPin,
    title: 'Adres',
    value: 'Beşiktaş, İstanbul',
    description: 'Ofisimizi ziyaret edebilirsiniz'
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    value: 'Pazartesi - Cuma',
    description: '09:00 - 18:00'
  }
];

export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submit logic here
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-primary mb-6">
            İletişim
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Projeleriniz hakkında konuşmak için bizimle iletişime geçin. Size en uygun çözümü birlikte bulalım.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Formu */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl text-primary mb-6">Bize Yazın</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Proje Türü</Label>
                  <select 
                    id="project" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Seçiniz</option>
                    <option value="konut">Konut</option>
                    <option value="ticari">Ticari</option>
                    <option value="ic-mimarlik">İç Mimarlık</option>
                    <option value="danismanlik">Danışmanlık</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mesajınız</Label>
                  <Textarea 
                    id="message" 
                    rows={6} 
                    placeholder="Projeniz hakkında detaylar..."
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  Mesaj Gönder
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl text-primary mb-6">İletişim Bilgileri</h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg flex-shrink-0">
                            <IconComponent size={20} />
                          </div>
                          <div>
                            <h3 className="text-lg text-primary mb-1">{info.title}</h3>
                            <p className="text-gray-900 mb-1">{info.value}</p>
                            <p className="text-sm text-gray-600">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Sosyal Medya */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg text-primary mb-4">Sosyal Medya</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Harita */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg text-primary mb-4">Ofis Konumu</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Google Maps Haritası</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}