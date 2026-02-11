import './App.css';
import { useAccount } from 'wagmi';
import { LanguageProvider } from './i18n/LanguageContext';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  const { isConnected } = useAccount();

  return (
    <LanguageProvider>
      <div className="app">
        <ParticleField />
        <div className="grid-bg" />
        <div className="noise-overlay" />
        <Navbar />
        {isConnected ? <Dashboard /> : <LandingPage />}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
