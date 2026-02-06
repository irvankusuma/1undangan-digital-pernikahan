const stats = [
  { label: "Total Undangan", value: 128 },
  { label: "Total Viewer", value: 12450 },
  { label: "Viewer Bulan Ini", value: 2311 },
];

const invitations = [
  { name: "Dewi & Arief", slug: "dewi-arief", viewers: 320 },
  { name: "Rani & Edo", slug: "rani-edo", viewers: 280 },
  { name: "Putri & Fajar", slug: "putri-fajar", viewers: 190 },
];

export default function AdminPage() {
  return (
    <main className="section">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <p style={{ color: "var(--muted)" }}>
          Kelola undangan, tamu, metode pembayaran, dan statistik secara terpusat.
        </p>

        <div className="grid grid-3" style={{ marginTop: 24 }}>
          {stats.map((stat) => (
            <div className="card" key={stat.label}>
              <p style={{ color: "var(--muted)", margin: 0 }}>{stat.label}</p>
              <h2 style={{ marginTop: 8 }}>{stat.value}</h2>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3>Undangan Aktif</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Nama Acara</th>
                <th>Slug</th>
                <th>Viewer</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((item) => (
                <tr key={item.slug}>
                  <td>{item.name}</td>
                  <td>
                    <span className="tag">{item.slug}</span>
                  </td>
                  <td>{item.viewers}</td>
                  <td>
                    <button className="button button-secondary">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
