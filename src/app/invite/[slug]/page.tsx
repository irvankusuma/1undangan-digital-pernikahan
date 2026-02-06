import Countdown from "@/components/Countdown";
import YouTubeAudio from "@/components/YouTubeAudio";
import ViewerTracker from "@/components/ViewerTracker";

const gallery = [
  "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=800",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800",
];

const tracks = [
  {
    id: "1",
    title: "Lagu Pembuka",
    youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    id: "2",
    title: "Lagu Favorit",
    youtubeUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
  },
];

export default function InvitationDetailPage() {
  return (
    <main className="section">
      <ViewerTracker invitationId="demo-invitation-id" />
      <div className="container grid grid-2">
        <div>
          <span className="badge">Wedding Invitation</span>
          <h1 style={{ fontSize: 36 }}>Dewi & Arief</h1>
          <p style={{ color: "var(--muted)" }}>
            Sabtu, 25 Oktober 2025 · 19.00 WIB
          </p>
          <div className="card" style={{ marginTop: 16 }}>
            <h3>Countdown Acara</h3>
            <Countdown target="2025-10-25T12:00:00Z" />
          </div>
          <div className="card" style={{ marginTop: 16 }}>
            <h3>Lokasi</h3>
            <p>Hotel Merdeka, Jakarta</p>
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.948765221799!2d-122.08424968469024!3d37.42206597982554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb0b1c5f5b987%3A0xa1cc03c5a8d49886!2sGoogleplex!5e0!3m2!1sen!2sid!4v1615971317631!5m2!1sen!2sid"
              width="100%"
              height="220"
              loading="lazy"
              style={{ border: 0, borderRadius: 12 }}
            />
          </div>
        </div>
        <div className="grid">
          <YouTubeAudio tracks={tracks} />
          <div className="card">
            <h3>Galeri</h3>
            <div className="grid grid-2" style={{ marginTop: 12 }}>
              {gallery.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt="Galeri"
                  style={{ width: "100%", borderRadius: 12, height: 160, objectFit: "cover" }}
                />
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Share Undangan</h3>
            <p style={{ color: "var(--muted)" }}>
              https://undangan-digital.app/invite/dewi-arief
            </p>
            <button className="button">Salin Link</button>
          </div>
        </div>
      </div>
    </main>
  );
}
