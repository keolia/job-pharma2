import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-green-50 to-green-100 mt-10 py-7 border-t border-green-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="mb-2">
              <span className="text-green-700 font-bold">JOB-PHARMA</span> by Keolia IT &copy; 2024 - Job-Board spécialisé dans l'univers des officines
            </div>
            <div className="flex items-center gap-2 text-green-800 hover:text-green-600 transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@job-pharma.fr" className="hover:underline">info@job-pharma.fr</a>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <img 
                src="/images/cci-officiel.jpg" 
                alt="CCI Officiel" 
                className="h-12 object-contain"
              />
              <img 
                src="/images/ordrepharmaciens.jpeg" 
                alt="Ordre des Pharmaciens" 
                className="h-12 object-contain"
              />
            </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/" className="footer-link text-green-900 hover:text-green-700 transition-colors">{t('nav.about')}</Link>
            <Link to="/jobs" className="footer-link text-green-900 hover:text-green-700 transition-colors">{t('nav.jobs')}</Link>
            <Link to="/blog" className="footer-link text-green-900 hover:text-green-700 transition-colors">{t('nav.blog')}</Link>
            <Link to="/pricing" className="footer-link text-green-900 hover:text-green-700 transition-colors">{t('nav.pricing')}</Link>
            <Link to="/recruiter" className="footer-link text-green-900 hover:text-green-700 transition-colors">{t('nav.recruiter')}</Link>
            <Link to="/privacy" className="footer-link text-green-900 hover:text-green-700 transition-colors">Confidentialité</Link>
            <Link to="/terms" className="footer-link text-green-900 hover:text-green-700 transition-colors">Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;