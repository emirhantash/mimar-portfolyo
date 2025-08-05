# Mimarlık Portfolyo Backend API

Bu proje, mimarlık portfolyo sitesi için Node.js + Express + PostgreSQL backend API'sidir.

## 🚀 Kurulum

### Gereksinimler
- Node.js (v16+)
- PostgreSQL
- Yarn veya npm

### 1. Dependencies Yükleme
```bash
yarn install
```

### 2. Environment Dosyası
```bash
cp env.example .env
```

`.env` dosyasını düzenleyin:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/mimar_portfolyo"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=5000
NODE_ENV=development
```

### 3. Veritabanı Kurulumu
```bash
# Prisma client oluştur
yarn db:generate

# Veritabanı şemasını oluştur
yarn db:push

# (Opsiyonel) Prisma Studio'yu aç
yarn db:studio
```

### 4. İlk Admin Kullanıcısını Oluştur
```bash
# API'yi başlat
yarn dev

# POST /api/auth/register endpoint'ini kullan
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "password123"
  }'
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Giriş yap
- `POST /api/auth/register` - İlk admin kullanıcısını oluştur
- `GET /api/auth/me` - Mevcut kullanıcı bilgilerini al

### Projects
- `GET /api/projects` - Tüm projeleri listele
- `GET /api/projects?featured=true` - Öne çıkan projeleri listele
- `GET /api/projects/:id` - Tek proje detayı
- `POST /api/projects` - Yeni proje oluştur (Admin)
- `PUT /api/projects/:id` - Proje güncelle (Admin)
- `DELETE /api/projects/:id` - Proje sil (Admin)

### Testimonials
- `GET /api/testimonials` - Tüm yorumları listele
- `GET /api/testimonials?active=true` - Aktif yorumları listele
- `POST /api/testimonials` - Yeni yorum oluştur (Admin)
- `PUT /api/testimonials/:id` - Yorum güncelle (Admin)
- `DELETE /api/testimonials/:id` - Yorum sil (Admin)

### Services
- `GET /api/services` - Tüm hizmetleri listele
- `POST /api/services` - Yeni hizmet oluştur (Admin)
- `PUT /api/services/:id` - Hizmet güncelle (Admin)
- `DELETE /api/services/:id` - Hizmet sil (Admin)

### Team
- `GET /api/team` - Tüm ekip üyelerini listele
- `POST /api/team` - Yeni ekip üyesi oluştur (Admin)
- `PUT /api/team/:id` - Ekip üyesi güncelle (Admin)
- `DELETE /api/team/:id` - Ekip üyesi sil (Admin)

### Contact
- `POST /api/contact` - İletişim mesajı gönder
- `GET /api/contact` - Tüm mesajları listele (Admin)
- `PATCH /api/contact/:id/read` - Mesajı okundu olarak işaretle (Admin)
- `DELETE /api/contact/:id` - Mesaj sil (Admin)

## 🔧 Geliştirme

```bash
# Development server başlat
yarn dev

# Production build
yarn start

# Veritabanı migration
yarn db:migrate

# Prisma Studio
yarn db:studio
```

## 🔒 Güvenlik

- JWT tabanlı authentication
- Role-based access control (ADMIN, EDITOR)
- Rate limiting
- Input validation
- CORS protection
- Helmet security headers

## 📁 Proje Yapısı

```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth, validation middleware
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── prisma/
│   └── schema.prisma    # Database schema
├── uploads/             # File uploads
└── package.json
``` 