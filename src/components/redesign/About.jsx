const VALUES = [
  { title: 'Reliability', description: 'We deliver what we promise, every time.' },
  { title: 'Integrity', description: 'Transparency and honesty guide all our operations.' },
  { title: 'Customer-Centricity', description: 'Your cargo is our top priority.' },
  { title: 'Innovation', description: 'We embrace technology to optimize logistics.' },
  { title: 'Speed & Efficiency', description: 'We move fast without compromising quality.' },
  { title: 'Global Mindset', description: 'Personal attention with global reach.' },
  { title: 'Compliance & Safety', description: 'Every shipment meets global standards.' },
  { title: 'Local Care', description: 'Rooted in India, wired for the world.' }
];

export default function About() {
  return (
    <section id="about">
      <div className="about-wrap">
        <div className="about-block">
          <div className="kicker">Our mission</div>
          <h3>Shipping, simplified.</h3>
          <p>To simplify customs clearance and global logistics by providing reliable, efficient, and transparent freight solutions — connecting businesses to the world through ocean, air, land, and customs expertise.</p>
        </div>
        <div className="about-block">
          <div className="kicker">Our vision</div>
          <h3>A competitive advantage.</h3>
          <p>To create a world where shipping is no longer a challenge, but a competitive advantage for every business we serve — fast, compliant, and dependable at every border.</p>
        </div>
      </div>

      <div className="values-grid">
        {VALUES.map(value => (
          <div className="value" key={value.title}>
            <div className="dot" />
            <h4>{value.title}</h4>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
