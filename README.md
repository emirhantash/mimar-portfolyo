# Mimar Portfolyo

Modern ve profesyonel bir mimarlık portfolyo web sitesi. React, TypeScript, TailwindCSS ile geliştirilmiş frontend ve Node.js, Express, PostgreSQL ile geliştirilmiş backend içerir.

## Özellikler

- Modern ve responsive tasarım
- Proje vitrin sayfası
- Hizmet ve referans bölümleri
- İletişim formu
- Admin paneli ile içerik yönetimi
- JWT tabanlı kimlik doğrulama

## Teknolojiler

### Frontend

- React
- TypeScript
- TailwindCSS
- React Router
- Radix UI bileşenleri

### Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT kimlik doğrulama

## Kurulum

### Gereksinimler

- Node.js (v18+)
- PostgreSQL veritabanı
- pnpm, yarn veya npm paket yöneticisi

### Adımlar

1. Repoyu klonlayın

   ```bash
   git clone https://github.com/emirhantash/mimar-portfolyo.git
   cd mimar-portfolyo
   ```

2. Backend için:

   ```bash
   cd backend
   npm install
   # veya yarn install
   # veya pnpm install
   
   # .env dosyasını oluşturun
   cp env.example .env
   # .env dosyasını düzenleyin ve veritabanı bilgilerini girin
   
   # Veritabanını oluşturun
   npm run db:push
   
   # Sunucuyu başlatın
   npm run dev
   ```

3. Frontend için:

   ```bash
   cd frontend
   npm install
   # veya yarn install
   # veya pnpm install
   
   # Geliştirme sunucusunu başlatın
   npm run dev
   ```

## Lisans

Apache-2.0 license
