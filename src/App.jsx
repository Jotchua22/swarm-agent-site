import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { LanguageProvider } from './i18n/LanguageContext';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import TickerBar from './components/TickerBar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Tokenomics from './components/Tokenomics';
import Whitepaper from './components/Whitepaper';
import Footer from './components/Footer';
import BuyWidget from './components/BuyWidget';

function AppContent() {
  const { isConnected } = useAccount();

  return (
    <div className="app">
      <ParticleField />
      <div className="grid-bg" />
      <div className="noise-overlay" />
      <Navbar />
      <TickerBar />
      <Routes>
        <Route path="/" element={isConnected ? <Dashboard /> : <LandingPage />} />
        <Route path="/tokenomics" element={<Tokenomics />} />
        <Route path="/whitepaper" element={<Whitepaper />} />
      </Routes>
      <Footer />
      <BuyWidget />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
