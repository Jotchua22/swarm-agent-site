import './App.css';
import { LanguageProvider } from './i18n/LanguageContext';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <ParticleField />
        <div className="grid-bg" />
        <div className="noise-overlay" />
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <CtaSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
