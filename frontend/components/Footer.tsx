import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="text-white font-medium">M</span>
              </div>
              <span className="text-lg text-primary">Mimar Adı</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Modern mimarlık ve tasarım çözümleri ile hayallerinizi gerçeğe dönüştürüyoruz.
            </p>
          </div>

          {/* İletişim Bilgileri */}
          <div className="space-y-4">
            <h3 className="text-primary">İletişim</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={16} />
                <span>+90 212 XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail size={16} />
                <span>info@mimaradiniz.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin size={16} />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="space-y-4">
            <h3 className="text-primary">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p>&copy; 2024 Mimar Adı. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}