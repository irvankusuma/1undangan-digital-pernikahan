# Undangan Digital Full-stack

Platform undangan digital berbasis link unik dengan musik YouTube, galeri, countdown, amplop digital, dan dashboard admin.

## Arsitektur Sistem

- **Frontend**: Next.js (App Router) untuk halaman undangan dan admin dashboard.
- **Backend**: Next.js API Routes (REST) + Prisma ORM.
- **Database**: PostgreSQL (disesuaikan ke MySQL bila diperlukan).
- **Auth**: JWT via endpoint `/api/auth/login`.
- **Deployment**: Vercel (frontend + API), atau VPS (Node + PostgreSQL).

## Struktur Folder

```
.
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── admin/
│   │   ├── invite/[slug]/
│   │   └── page.tsx
│   ├── components/
│   └── lib/
└── package.json
```

## Skema Database

Tabel wajib tersedia di `prisma/schema.prisma`:

- users
- invitations
- guests
- viewers
- payment_methods
- caption_templates
- music_tracks

## Contoh API CRUD

- **Invitations**: `/api/invitations`
- **Guests**: `/api/guests`
- **Payment methods**: `/api/payment-methods`
- **Viewers**: `/api/viewers`
- **Music tracks**: `/api/music-tracks`
- **Caption templates**: `/api/captions`

## Contoh UI Dashboard

Halaman demo tersedia di `/admin` menampilkan ringkasan statistik dan tabel undangan aktif.

## Contoh Caption Template Dinamis

Gunakan placeholder:

```
Hai {{nama_tamu}}, kami mengundang Anda ke acara {{nama_acara}} pada {{tanggal}}.
Detail lengkap: {{link_undangan}}
```

## Contoh Implementasi YouTube Audio

Komponen `YouTubeAudio` memakai Iframe API, autoplay, loop, dan kontrol tanpa video.

## Deploy

1. Set `DATABASE_URL` dan `JWT_SECRET` pada environment.
2. Jalankan `npm run prisma:migrate`.
3. Deploy ke Vercel atau jalankan `npm run build && npm start` di VPS.
