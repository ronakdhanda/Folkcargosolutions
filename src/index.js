import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Note: intentionally not wrapped in <React.StrictMode>. The redesigned page boots a
// Three.js/GSAP scene imperatively in a single effect (see src/lib/initRedesign.js) —
// StrictMode's development-only double-invoke of effects would briefly create two WebGL
// contexts and two animation loops before the first is torn down. The cleanup function it
// returns is still correct and runs on real unmount; this only opts out of the extra
// dev-time double-mount, which has no effect on the production build.
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
