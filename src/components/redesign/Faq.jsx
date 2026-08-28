import { PlusIcon } from './Icons';

const FAQS = [
  {
    q: 'What documents do I need for customs clearance?',
    a: "Typically a commercial invoice, packing list, bill of lading or airway bill, and your Import Export Code (IEC). Depending on the cargo, certificates of origin or product-specific licenses may also apply — we'll tell you exactly what's needed once we know what's shipping."
  },
  {
    q: 'Which regions do you operate in?',
    a: "We're based in New Delhi and coordinate shipments across India, connecting into global ocean and air trade lanes for import and export cargo."
  },
  {
    q: 'Can you handle door-to-door shipments?',
    a: 'Yes. We can manage the full journey — customs clearance, ocean or air freight, and final-mile road delivery — under a single point of contact, or just the pieces you need.'
  },
  {
    q: 'How do I get a quote?',
    a: "Use the form below, message us on WhatsApp, or call directly — share what's moving, from where, to where, and we'll get back with pricing and a timeline."
  }
];

// The accordion's open/close behavior is wired up imperatively by initRedesign() (it toggles
// the "open" class and max-height inline style, matching the original prototype exactly), so
// this component just renders the static structure it operates on.
export default function Faq() {
  return (
    <section id="faq">
      <div className="section-head">
        <div className="kicker">Good to know</div>
        <h2>Frequently asked questions</h2>
        <p>The questions we hear most from businesses shipping for the first time — or switching partners.</p>
      </div>
      <div className="faq-list">
        {FAQS.map(item => (
          <div className="faq-item" key={item.q}>
            <button type="button" className="faq-q" aria-expanded="false">
              <span>{item.q}</span>
              <PlusIcon />
            </button>
            <div className="faq-a"><p>{item.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
