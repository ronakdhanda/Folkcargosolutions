const STATS = [
  { count: 12, suffix: null, label: 'Years Combined Expertise' },
  { count: 40, suffix: null, label: 'Cities Served Across India' },
  { count: 3, suffix: null, label: 'Freight Modes, One Partner' },
  { count: 24, suffix: '/7', label: 'Support Coverage' }
];

export default function StatsStrip() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="stats-strip">
        {STATS.map(stat => (
          <div className="stat" key={stat.label}>
            <div className="num">
              <span className="num-value" data-count={stat.count}>0</span>
              {stat.suffix && <span className="num-suffix">{stat.suffix}</span>}
            </div>
            <div className="label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
