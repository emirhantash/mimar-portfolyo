const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Veritabanı seed işlemi başlatılıyor...');
  
  try {
    // Admin kullanıcısı oluştur
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@mimarportfolyo.com' },
      update: {},
      create: {
        email: 'admin@mimarportfolyo.com',
        name: 'Admin Kullanıcı',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    
    console.log(`👤 Admin kullanıcısı oluşturuldu: ${admin.email}`);
    
    // Projeler ekle
    const projects = [
      {
        title: 'Modern Villa Projesi',
        description: 'Doğa ile iç içe minimalist tasarım anlayışıyla tasarlanmış modern villa projesi. Sürdürülebilir malzemeler ve enerji verimli çözümler kullanılarak inşa edildi.',
        location: 'İstanbul, Beykoz',
        year: '2024',
        category: 'Konut',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isFeatured: true,
      },
      {
        title: 'Kurumsal Ofis Binası',
        description: 'Sürdürülebilir mimarlık ilkeleri ve çevre dostu yaklaşımla tasarlanan çok katlı ofis kompleksi. Açık ofis planları ve ortak alanlar çalışanlar arası iş birliğini teşvik ediyor.',
        location: 'İstanbul, Levent',
        year: '2023',
        category: 'Ticari',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isFeatured: true,
      },
      {
        title: 'Boutique Otel',
        description: 'Tarihi dokular ile modern konforu harmanlayan butik otel tasarımı. Eski yapının karakterini korurken çağdaş dokunuşlarla misafirlerine benzersiz bir deneyim sunuyor.',
        location: 'Antalya, Kaleiçi',
        year: '2023',
        category: 'Turizm',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isFeatured: true,
      },
      {
        title: 'Kültür Merkezi',
        description: 'Şehrin merkezinde çok amaçlı bir kültür merkezi. Konser salonu, sergi alanları ve atölyeler içerir. Yerel malzemeler kullanılarak modern bir tasarım elde edildi.',
        location: 'İzmir, Konak',
        year: '2022',
        category: 'Kültürel',
        image: 'https://images.unsplash.com/photo-1582711012124-a56cf82307a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isFeatured: false,
      },
      {
        title: 'Loft Daire Renovasyonu',
        description: 'Eski bir endüstriyel binanın modern bir loft daireye dönüşümü. Açık plan yerleşimi ve endüstriyel detaylarla karakteristik bir yaşam alanı yaratıldı.',
        location: 'İstanbul, Karaköy',
        year: '2022',
        category: 'Renovasyon',
        image: 'https://images.unsplash.com/photo-1574739782594-db4ead022697?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        isFeatured: false,
      }
    ];
    
    // Mevcut projeleri temizle
    await prisma.project.deleteMany();
    
    // Yeni projeleri ekle
    for (const project of projects) {
      await prisma.project.create({
        data: project
      });
    }
    
    console.log(`🏗️ ${projects.length} proje eklendi`);
    
    // Müşteri görüşleri ekle
    const testimonials = [
      {
        name: 'Ahmet Yılmaz',
        title: 'Villa Sahibi',
        content: 'Hayal ettiğimizden bile güzel bir ev ortaya çıktı. Her detayda özen ve profesyonellik vardı.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        isActive: true,
      },
      {
        name: 'Elif Demir',
        title: 'Şirket Sahibi',
        content: 'Ofisimiz artık çalışanlarımızın en sevdiği yer. Fonksiyonellik ve estetik mükemmel birleşmiş.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        isActive: true,
      },
      {
        name: 'Mehmet Kaya',
        title: 'Otel İşletmecisi',
        content: 'Misafirlerimizden sürekli övgü alıyoruz. Tasarım gerçekten fark yaratıyor.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        isActive: true,
      },
      {
        name: 'Ayşe Öztürk',
        title: 'Kültür Merkezi Yöneticisi',
        content: 'İhtiyaçlarımızı tam olarak anlayıp, fonksiyonel ve estetik bir mimari tasarım sundular. İş birliğinden çok memnun kaldık.',
        rating: 4,
        isActive: true,
      }
    ];
    
    // Mevcut görüşleri temizle
    await prisma.testimonial.deleteMany();
    
    // Yeni görüşleri ekle
    for (const testimonial of testimonials) {
      await prisma.testimonial.create({
        data: testimonial
      });
    }
    
    console.log(`📣 ${testimonials.length} müşteri görüşü eklendi`);
    
    // Hizmetleri ekle
    const services = [
      {
        title: 'Mimari Tasarım',
        description: 'Konsept tasarımdan uygulama projelerine kadar kapsamlı mimari tasarım hizmeti sunuyoruz.',
        icon: 'home',
        isActive: true,
      },
      {
        title: 'İç Mekan Tasarımı',
        description: 'Fonksiyonel ve estetik iç mekan tasarımları ile yaşam ve çalışma alanlarınızı dönüştürüyoruz.',
        icon: 'layout',
        isActive: true,
      },
      {
        title: 'Renovasyon',
        description: 'Mevcut yapıların yenilenmesi ve dönüştürülmesi için yaratıcı çözümler üretiyoruz.',
        icon: 'tool',
        isActive: true,
      },
      {
        title: 'Peyzaj Tasarımı',
        description: 'Doğa ile uyumlu, sürdürülebilir ve estetik dış mekan tasarımları geliştiriyoruz.',
        icon: 'trees',
        isActive: true,
      },
      {
        title: 'Proje Yönetimi',
        description: 'Tasarım aşamasından inşaatın tamamlanmasına kadar proje yönetimi hizmeti sunuyoruz.',
        icon: 'clipboard-list',
        isActive: true,
      }
    ];
    
    // Mevcut hizmetleri temizle
    await prisma.service.deleteMany();
    
    // Yeni hizmetleri ekle
    for (const service of services) {
      await prisma.service.create({
        data: service
      });
    }
    
    console.log(`🛎️ ${services.length} hizmet eklendi`);
    
    // Ekip üyelerini ekle
    const teamMembers = [
      {
        name: 'Ali Yılmaz',
        title: 'Kurucu & Baş Mimar',
        bio: '15 yılı aşkın deneyimiyle ulusal ve uluslararası projelere imza atmış, yenilikçi tasarım anlayışını sürdürülebilirlik ilkeleriyle birleştiren mimar.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        email: 'ali@mimarportfolyo.com',
        linkedin: 'https://linkedin.com/in/aliyilmaz',
        isActive: true,
      },
      {
        name: 'Zeynep Demir',
        title: 'Kıdemli İç Mimar',
        bio: 'Fonksiyonelliği estetikle buluşturan tasarım anlayışıyla tanınan, 10 yıllık deneyime sahip uzman iç mimar.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        email: 'zeynep@mimarportfolyo.com',
        linkedin: 'https://linkedin.com/in/zeynepdemir',
        isActive: true,
      },
      {
        name: 'Murat Kaya',
        title: 'Mimar & Proje Yöneticisi',
        bio: 'Karmaşık projeleri başarıyla yöneten, teknik uzmanlığı ve problem çözme becerisiyle tanınan deneyimli mimar.',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        email: 'murat@mimarportfolyo.com',
        linkedin: 'https://linkedin.com/in/muratkaya',
        isActive: true,
      }
    ];
    
    // Mevcut ekip üyelerini temizle
    await prisma.teamMember.deleteMany();
    
    // Yeni ekip üyelerini ekle
    for (const member of teamMembers) {
      await prisma.teamMember.create({
        data: member
      });
    }
    
    console.log(`👥 ${teamMembers.length} ekip üyesi eklendi`);
    
    console.log('✅ Seed işlemi başarıyla tamamlandı!');
    
  } catch (error) {
    console.error('❌ Seed işlemi sırasında hata:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Seed işlemi başarısız:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
