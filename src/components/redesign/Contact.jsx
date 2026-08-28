import officeMapImg from '../../assets/redesign/office_map.jpg';
import { CopyIcon, WhatsAppBubbleIcon } from './Icons';

const WHATSAPP_HREF = 'https://wa.me/919254992649?text=Hi%20Folk%20Cargo%20Solutions%2C%20I%27d%20like%20to%20get%20a%20quote.';
const ADDRESS = 'Office No. I, L-96, Shubhraj Complex, Old Rangpuri Road, Mahipalpur Ext., New Delhi - 110037';
const PHONE = '+91 92549 92649';
const EMAIL = 'folkcargosolutions@gmail.com';
const DIRECTIONS_HREF = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(ADDRESS);

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-panel">
        <div className="kicker">Get in touch</div>
        <h2>Let's move your cargo forward.</h2>
        <p>Tell us about your shipment — we'll handle the red tape.</p>

        <div className="contact-grid">
          <div className="contact-form-block">
            <span className="pin-dot pin-cyan" aria-hidden="true" />
            <form id="contactForm" noValidate>
              <div className="form-row">
                <label>Name<input type="text" name="from_name" autoComplete="name" required /></label>
                <label>Email<input type="email" name="email" autoComplete="email" required /></label>
              </div>
              <label>Phone (optional)<input type="tel" name="phone" autoComplete="tel" /></label>
              <label>Shipment details<textarea name="message" rows="4" required placeholder="What's moving, from where, to where?" /></label>
              <button type="submit" className="btn btn-primary">Send via Email →</button>
              <p className="form-note" id="formNote">We'll email your request straight to our team — no app required.</p>
            </form>
            <div className="quick-actions">
              <span className="action-pair">
                <a href={`mailto:${EMAIL}`} target="_top" rel="noopener noreferrer" className="btn-mini btn-mini-ghost">Email Us</a>
                <button type="button" className="copy-btn" data-copy={EMAIL} aria-label="Copy email address"><CopyIcon /></button>
              </span>
              <span className="action-pair">
                <a href="tel:+919254992649" target="_top" rel="noopener noreferrer" className="btn-mini btn-mini-ghost">Call Us</a>
                <button type="button" className="copy-btn" data-copy={PHONE} aria-label="Copy phone number"><CopyIcon /></button>
              </span>
              <a href={WHATSAPP_HREF} target="_top" rel="noopener noreferrer" className="btn-mini btn-mini-whatsapp">
                <WhatsAppBubbleIcon /> WhatsApp
              </a>
            </div>
            <p className="copy-hint">On some devices or embedded previews, Email Us / Call Us won't auto-open an app — use the copy icon to grab the address or number instead, or reach us instantly on WhatsApp.</p>
          </div>

          <div className="locations-col">
            <div className="location-card">
              <div className="map-visual" aria-hidden="true">
                <img src={officeMapImg} alt="" loading="lazy" />
                <span className="pin-ring" style={{ left: '50%', top: '50%' }} />
                <span className="map-badge">Mahipalpur, New Delhi</span>
              </div>
              <div className="location-body">
                <div className="card-tag" style={{ position: 'static' }}>Head Office</div>
                <h3>Folk Cargo Solutions Pvt. Ltd.</h3>
                <p id="officeAddress">
                  {ADDRESS}<br />
                  <span style={{ color: 'var(--text-faint)' }}>Contact person: Lokesh Dhanda</span>
                </p>
                <a id="directionsLink" href={DIRECTIONS_HREF} target="_top" rel="noopener noreferrer" className="btn btn-ghost" style={{ width: '100%', textAlign: 'center' }}>Get Directions →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <div><span>Address</span>{ADDRESS}<button type="button" className="copy-inline" data-copy={ADDRESS} aria-label="Copy address"><CopyIcon /></button></div>
          <div><span>Phone</span>{PHONE}<button type="button" className="copy-inline" data-copy={PHONE} aria-label="Copy phone number"><CopyIcon /></button></div>
          <div><span>Email</span>{EMAIL}<button type="button" className="copy-inline" data-copy={EMAIL} aria-label="Copy email address"><CopyIcon /></button></div>
          <div><span>Contact Person</span>Lokesh Dhanda</div>
        </div>
      </div>
    </section>
  );
}
