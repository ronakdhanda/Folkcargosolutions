const STEPS = [
  { num: '01', title: 'Book', description: "Tell us what's moving and where. We scope the right mix of ocean, air, road and customs handling for your shipment." },
  { num: '02', title: 'Clear', description: 'Our team manages documentation and compliance end-to-end, so cargo clears customs without costly hold-ups.' },
  { num: '03', title: 'Deliver', description: 'From port to warehouse to final mile — your goods arrive on time, in full, tracked every step of the way.' }
];

export default function Process() {
  return (
    <section id="process">
      <div className="section-head">
        <div className="kicker">How it works</div>
        <h2>Three steps to zero friction</h2>
      </div>
      <div className="process">
        {STEPS.map(step => (
          <div className="process-row" key={step.num}>
            <div className="pnum">{step.num}</div>
            <div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
