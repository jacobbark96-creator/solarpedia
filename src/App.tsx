import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Wizard from './pages/Wizard';
import Results from './pages/Results';
import Education from './pages/Education';
import Business from './pages/Business';
import Installers from './pages/Installers';
import Article from './pages/Article';
import Glossary from './pages/Glossary';
import Legal from './pages/Legal';
import Thanks from './pages/Thanks';
import LeadCaptureCTA from './components/LeadCaptureCTA';
import SolarPanelQuotes from './pages/SolarPanelQuotes';
import SolarPanelQuotesCity from './pages/SolarPanelQuotesCity';
import BestSolarInstallers from './pages/BestSolarInstallers';
import BestSolarInstallersCity from './pages/BestSolarInstallersCity';
import CommercialSolarQuotesUK from './pages/CommercialSolarQuotesUK';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/education" element={<Education />} />
            <Route path="/education/article/:slug" element={<Article />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/business" element={<Business />} />
            <Route path="/installers" element={<Installers />} />
            <Route path="/legal/:documentId" element={<Legal />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/solar-panel-quotes" element={<SolarPanelQuotes />} />
            <Route path="/solar-panel-quotes/:citySlug" element={<SolarPanelQuotesCity />} />
            <Route path="/best-solar-installers" element={<BestSolarInstallers />} />
            <Route path="/best-solar-installers/:citySlug" element={<BestSolarInstallersCity />} />
            <Route path="/commercial-solar-quotes-uk" element={<CommercialSolarQuotesUK />} />
          </Routes>
          <LeadCaptureCTA />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
