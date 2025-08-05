import { Avatar, AvatarFallback } from '../ui/avatar';
import { Award, Users, Building, Calendar, User } from 'lucide-react';

const stats = [
  { icon: Building, label: 'Tamamlanan Proje', value: '150+' },
  { icon: Users, label: 'Mutlu Müşteri', value: '300+' },
  { icon: Award, label: 'Ödül', value: '15' },
  { icon: Calendar, label: 'Deneyim Yılı', value: '12' },
];

export function AboutPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-primary mb-6">
            Hakkımızda
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Modern mimarlık ve sürdürülebilir tasarım anlayışı ile her projede benzersiz çözümler sunuyoruz.
          </p>
        </div>

        {/* Ana İçerik */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  <User size={24} />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg text-primary">Mimar Adı</h3>
                <p className="text-gray-600">Kurucu Mimar</p>
              </div>
            </div>
            <h2 className="text-3xl text-primary">Tasarım Felsefemiz</h2>
            <p className="text-gray-600 leading-relaxed">
              Mimarlık, sadece binalar inşa etmek değil; yaşam alanları yaratmak, 
              insanların günlük hayatlarını daha iyi hale getirmektir. Her projemizde 
              işlevsellik, estetik ve sürdürülebilirlik arasında mükemmel dengeyi yakalamaya odaklanıyoruz.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Doğa ile uyum içinde, çevre dostu malzemeler kullanarak gelecek nesillere 
              daha yaşanabilir bir dünya bırakma hedefiyle çalışıyoruz. Her proje bizim için 
              yeni bir hikaye ve benzersiz bir deneyimdir.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg text-primary mb-2">Eğitim</h3>
                <p className="text-gray-600">İTÜ Mimarlık Fakültesi</p>
                <p className="text-gray-600">Yüksek Lisans - Harvard GSD</p>
              </div>
              <div>
                <h3 className="text-lg text-primary mb-2">Uzmanlık</h3>
                <p className="text-gray-600">Sürdürülebilir Mimarlık</p>
                <p className="text-gray-600">Konut & Ticari Projeler</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="text-center">
              <Avatar className="h-32 w-32 mx-auto mb-4">
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  <User size={48} />
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-gray-500">Profil Fotoğrafı</p>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl text-primary text-center mb-12">
            Sayılarla Başarılarımız
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-lg mb-4">
                    <IconComponent size={24} />
                  </div>
                  <div className="text-2xl md:text-3xl text-primary mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vizyon & Misyon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl text-primary mb-4">Vizyonumuz</h3>
            <p className="text-gray-600 leading-relaxed">
              Türkiye'nin öncü mimarlık ofislerinden biri olarak, uluslararası standartlarda 
              projeler üreterek dünya çapında tanınan bir marka haline gelmek.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl text-primary mb-4">Misyonumuz</h3>
            <p className="text-gray-600 leading-relaxed">
              İnovatif tasarım çözümleri ile müşterilerimizin hayallerini gerçeğe dönüştürmek 
              ve sürdürülebilir mimarlık anlayışını yaygınlaştırmak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}