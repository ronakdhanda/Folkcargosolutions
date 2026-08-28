import RedesignPage from './RedesignPage';

// The site was redesigned with a full-page WebGL/GSAP treatment (see src/RedesignPage.jsx and
// src/lib/initRedesign.js). The previous component tree (Navbar/Home/Services/Goal/About/
// ContactUs/ContactUsModal, driven by Tailwind + framer-motion) still lives under
// src/components/ but is no longer rendered — kept in place rather than deleted in case any
// copy or structure from it is still useful for reference.
function App() {
  return <RedesignPage />;
}

export default App;
