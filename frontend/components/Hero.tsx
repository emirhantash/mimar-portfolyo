import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-50">
      {/* Hero Görseli */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Modern Architecture"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Hero İçeriği */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-primary mb-6 tracking-tight">
          Modern Mimarlık
          <br />
          <span className="text-gray-600">Çözümleri</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Yaratıcı tasarım anlayışı ve modern teknoloji ile mekânları dönüştürüyor, 
          hayallerinizi gerçeğe dönüştürüyoruz.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="px-8 py-3">
            <Link to="/projeler">Projelerimizi İnceleyin</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-3">
            <Link to="/iletisim">İletişime Geçin</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}