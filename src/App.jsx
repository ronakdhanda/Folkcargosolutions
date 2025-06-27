import './App.css';
import Navbar  from './components/NavBar/Navbar';
import { Home } from './components/Home/Home';
import  About  from './components/About/About';
import { Services } from './components/Services/Services';
import Goal  from './components/goals/Goal';
import ContactUs from './components/Contact/ContactUs';
import ContactUsModal from './components/contactusmodal/ContactUsModal';

function App() {
  return (
 <div className="overflow-hidden text-neutral-300 antialiased slection:bg-cyan-300  selection:text-cyan-900">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      <div className="container mx-auto px-8">
        <Navbar />
        <Home />
        <Services/>
        <Goal />
        <About/>
        <ContactUs />
        <ContactUsModal />
      </div>
    </div>
  );
}
export default App;
