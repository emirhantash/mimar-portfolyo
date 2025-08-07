# 🏢 Mimar Portfolyo

<div align="center">
  
![Mimar Portfolyo](https://img.shields.io/badge/Mimar-Portfolyo-black?style=for-the-badge)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

Modern ve profesyonel bir mimarlık portfolyo web sitesi. İçerik yönetimini kolaylaştıran güçlü bir admin paneline sahiptir.

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Mimar+Portfolyo+Screenshot" alt="Mimar Portfolyo Screenshot" width="800"/>
</div>

## ✨ Özellikler

<table>
  <tr>
    <td width="50%">
      <h3>🎨 Portfolyo Sitesi</h3>
      <ul>
        <li>Modern ve responsive tasarım</li>
        <li>Proje vitrin galerisi</li>
        <li>Hizmet ve referans bölümleri</li>
        <li>İletişim formu</li>
        <li>SEO dostu yapı</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🔐 Admin Paneli</h3>
      <ul>
        <li>JWT tabanlı kimlik doğrulama</li>
        <li>Proje, hizmet ve referans yönetimi</li>
        <li>Ekip üyelerini düzenleme</li>
        <li>İletişim mesajlarını görüntüleme</li>
        <li>Portfolyo sitesi ile uyumlu tasarım</li>
      </ul>
    </td>
  </tr>
</table>

## 🛠️ Teknolojiler

<table>
  <tr>
    <td width="50%">
      <h3>💻 Frontend</h3>
      <ul>
        <li>React</li>
        <li>TypeScript</li>
        <li>TailwindCSS</li>
        <li>React Router</li>
        <li>Radix UI + Shadcn/ui bileşenleri</li>
        <li>Lucide icons</li>
      </ul>
    </td>
    <td width="50%">
      <h3>⚙️ Backend</h3>
      <ul>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>PostgreSQL</li>
        <li>Prisma ORM</li>
        <li>JWT kimlik doğrulama</li>
        <li>Multer (dosya yükleme)</li>
      </ul>
    </td>
  </tr>
</table>

## 🚀 Uygulama Mimarisi

```
mimar-portfolyo/
├── frontend/                # React uygulaması
│   ├── admin/               # Admin paneli
│   │   ├── components/      # Admin UI bileşenleri
│   │   ├── layouts/         # Admin sayfa düzenleri
│   │   ├── pages/           # Admin sayfaları
│   │   └── styles/          # Admin özel stilleri
│   ├── components/          # Paylaşılan UI bileşenleri
│   │   ├── ui/              # Temel UI bileşenleri
│   │   └── figma/           # Figma'dan aktarılan bileşenler
│   ├── src/                 # Kaynak kodları
│   │   ├── api.ts           # API entegrasyonu
│   │   └── adminApi.ts      # Admin API entegrasyonu
│   └── styles/              # Global stil dosyaları
└── backend/                 # Express.js sunucusu
    ├── prisma/              # Veritabanı şemaları
    ├── src/                 # Sunucu kaynak kodları
    │   ├── controllers/     # Route kontrolcüleri
    │   ├── middleware/      # Ara yazılımlar
    │   ├── routes/          # API endpoint'leri
    │   └── utils/           # Yardımcı fonksiyonlar
    └── uploads/             # Yüklenen dosyalar
```

## ⚙️ Kurulum

### Gereksinimler

- Node.js (v18+)
- PostgreSQL veritabanı
- pnpm, yarn veya npm paket yöneticisi

### Adımlar

<details>
<summary><b>1️⃣ Repoyu klonlayın</b></summary>

```bash
git clone https://github.com/emirhantash/mimar-portfolyo.git
cd mimar-portfolyo
```
</details>

<details>
<summary><b>2️⃣ Backend kurulumu</b></summary>

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
</details>

<details>
<summary><b>3️⃣ Frontend kurulumu</b></summary>

```bash
cd frontend
npm install
# veya yarn install
# veya pnpm install

# Geliştirme sunucusunu başlatın
npm run dev
```
</details>

## 🔧 Admin Paneli

Yeni eklenen admin paneli portfolyo sitesini kolayca yönetmenizi sağlar:

- 📊 Dashboard ile genel bakış
- 🏗️ Proje yönetimi (ekleme, düzenleme, silme)
- 🛠️ Hizmet yönetimi
- 👥 Ekip üyeleri yönetimi
- 💬 Gelen mesajları görüntüleme
- ⭐ Referans yönetimi

Admin paneline erişim: `http://localhost:3000/admin`

**Varsayılan giriş bilgileri:**
- **Email**: admin@example.com
- **Şifre**: password123

## 📱 Ekran Görüntüleri

<table>
  <tr>
    <td><img src="https://via.placeholder.com/400x200?text=Ana+Sayfa" alt="Ana Sayfa"/></td>
    <td><img src="https://via.placeholder.com/400x200?text=Projeler+Sayfası" alt="Projeler Sayfası"/></td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/400x200?text=Admin+Dashboard" alt="Admin Dashboard"/></td>
    <td><img src="https://via.placeholder.com/400x200?text=Admin+Projeler" alt="Admin Projeler"/></td>
  </tr>
</table>

## 📄 Lisans

[Apache-2.0 license](LICENSE)

---

<div align="center">
  
Developed with ❤️ by [Emirhan Taş](https://github.com/emirhantash)
  
</div>
