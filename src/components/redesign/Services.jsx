import multimodalImg from '../../assets/redesign/multimodal.jpg';
import warehousingImg from '../../assets/redesign/warehousing.jpg';
import fleetImg from '../../assets/redesign/fleet.jpg';
import customsImg from '../../assets/redesign/customs.jpg';
import { CardIcons } from './Icons';

const SERVICES = [
  {
    id: 'multimodal',
    pinClass: '',
    image: multimodalImg,
    imageAlt: 'Cargo plane, container ship and freight truck moving together at dusk',
    tag: 'Multimodal',
    title: 'Ocean, Air & Road Freight',
    description: 'Comprehensive logistics solutions to ensure your goods are delivered on time and in perfect condition — by sea, air, or road.'
  },
  {
    id: 'warehousing',
    pinClass: 'pin-cyan',
    image: warehousingImg,
    imageAlt: 'Trucks loading at a warehouse dock',
    tag: 'Storage',
    title: 'Warehousing',
    description: 'Modern, secure storage facilities with advanced inventory management and flexible options that optimize your supply chain.'
  },
  {
    id: 'fleet',
    pinClass: '',
    image: fleetImg,
    imageAlt: 'Freight trucks and cargo planes moving through a night-time logistics hub',
    tag: 'Ground Fleet',
    title: 'Transportation',
    description: 'Reliable road transport across regions with a modern fleet and expert drivers — timely, safe, hassle-free delivery.'
  },
  {
    id: 'customs',
    pinClass: 'pin-cyan',
    image: customsImg,
    imageAlt: 'Container ship arriving at port at sunset',
    tag: 'Compliance',
    title: 'Customs Clearance',
    description: "Our expert team handles documentation and compliance end-to-end, so your cargo clears borders without delays."
  }
];

export default function Services() {
  return (
    <section id="services">
      <div className="section-head">
        <div className="kicker">What we move</div>
        <h2>One partner, every mode of freight</h2>
        <p>Comprehensive logistics built around your supply chain — engineered for speed, compliance, and zero surprises.</p>
      </div>
      <div className="services-grid">
        {SERVICES.map(service => {
          const Icon = CardIcons[service.id];
          return (
            <div className="card" data-service={service.id} key={service.id}>
              <span className={`pin-dot ${service.pinClass}`} aria-hidden="true" />
              <div className="card-media">
                <img src={service.image} alt={service.imageAlt} />
                <div className="card-tag">{service.tag}</div>
              </div>
              <div className="card-body">
                <div className="card-icon"><Icon /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="card-actions">
                  <button type="button" className="btn-mini btn-mini-primary" data-open-modal={service.id}>Read More</button>
                  <a href="#contact" className="btn-mini btn-mini-ghost" data-talk-expert="true">Talk to an Expert</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { SERVICES };
