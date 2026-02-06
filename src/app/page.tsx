import Link from "next/link";

const features = [
  "Link undangan unik & mudah dibagikan",
  "Musik otomatis via YouTube audio",
  "Galeri, countdown, dan Google Maps",
  "Tracking visitor per undangan",
  "Amplop digital multi metode",
  "Dashboard admin dengan statistik",
];

export default function HomePage() {
  return (
    <main>
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="container grid grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="badge">Full-stack Invitation Platform</span>
            <h1 style={{ fontSize: 42, margin: "16px 0" }}>
              Undangan Digital Modern, Mobile-first, dan Siap Deploy
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 18 }}>
              Arsitektur scalable untuk mengelola undangan, tamu, musik latar, dan
              amplop digital lengkap dengan statistik viewer.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <Link className="button" href="/invite/demo-wedding">
                Lihat Contoh Undangan
              </Link>
              <Link className="button button-secondary" href="/admin">
                Demo Dashboard
              </Link>
            </div>
          </div>
          <div className="card">
            <h3>Highlight Fitur</h3>
            <ul style={{ paddingLeft: 16 }}>
              {features.map((item) => (
                <li key={item} style={{ margin: "10px 0" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-3">
          <div className="card">
            <h3>Arsitektur Sistem</h3>
            <p style={{ color: "var(--muted)" }}>
              Next.js (App Router) sebagai frontend + API, Prisma ORM, PostgreSQL,
              JWT auth, dan deployment ke Vercel/VPS.
            </p>
          </div>
          <div className="card">
            <h3>Struktur Folder</h3>
            <p style={{ color: "var(--muted)" }}>
              src/app untuk UI & API, prisma/ untuk schema, src/lib untuk helper
              JWT & Prisma.
            </p>
          </div>
          <div className="card">
            <h3>Skema Database</h3>
            <p style={{ color: "var(--muted)" }}>
              users, invitations, guests, viewers, payment_methods,
              caption_templates, music_tracks.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div className="container grid grid-2">
          <div>
            <h2>Contoh Caption Template Dinamis</h2>
            <div className="card" style={{ marginTop: 16 }}>
              <p style={{ margin: 0 }}>
                Hai <strong>{{"{{nama_tamu}}"}}</strong>, kami mengundang Anda ke
                acara <strong>{{"{{nama_acara}}"}}</strong> pada
                <strong> {{"{{tanggal}}"}}</strong>. Detail lengkap di
                <strong> {{"{{link_undangan}}"}}</strong>.
              </p>
            </div>
          </div>
          <div>
            <h2>Contoh API CRUD</h2>
            <div className="card" style={{ marginTop: 16 }}>
              <p style={{ margin: 0 }}>
                GET /api/invitations?userId=xxx<br />
                POST /api/invitations<br />
                PUT /api/invitations/:id<br />
                DELETE /api/invitations/:id
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
