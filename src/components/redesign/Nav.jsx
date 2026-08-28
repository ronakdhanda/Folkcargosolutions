import brandmark from '../../assets/redesign/brandmark.png';

export default function Nav() {
  return (
    <nav>
      <div className="logo">
        <img className="mark" src={brandmark} alt="Folk Cargo Solutions logo" /> FOLK CARGO SOLUTIONS
      </div>
      <div className="nav-links">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#process">Process</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
      </div>
      <a href="#contact" className="nav-cta">Get a Quote</a>
    </nav>
  );
}
