import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Wizard from './pages/Wizard';
import Results from './pages/Results';
import Education from './pages/Education';
import Business from './pages/Business';
import Installers from './pages/Installers';
import Article from './pages/Article';
import Legal from './pages/Legal';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wizard" element={<Wizard />} />
            <Route path="/results" element={<Results />} />
            <Route path="/education" element={<Education />} />
            <Route path="/education/article/:slug" element={<Article />} />
            <Route path="/business" element={<Business />} />
            <Route path="/installers" element={<Installers />} />
            <Route path="/legal/:documentId" element={<Legal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
