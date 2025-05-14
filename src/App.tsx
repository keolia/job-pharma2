import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';
import RecruiterSpace from './pages/RecruiterSpace';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import './i18n';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-transparent">
        <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />
        <main className="pt-2 pb-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/recruiter" element={<RecruiterSpace />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default React.memo(App);