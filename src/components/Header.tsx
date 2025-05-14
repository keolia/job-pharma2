import React, { useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ menuOpen, toggleMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || null);
    };
    
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    navigate('/', { replace: true });
  }, [navigate]);

  const handleMenuItemClick = useCallback(() => {
    if (menuOpen) {
      toggleMenu();
    }
  }, [menuOpen, toggleMenu]);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-10 print:relative">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <Link 
          to="/" 
          className="flex items-center gap-3 transition-transform duration-200 hover:scale-105"
          title="Retour à l'accueil"
          onClick={handleMenuItemClick}
        >
          <img 
            src="/images/PharmaJob3.jpeg" 
            alt="Job-Pharma Logo" 
            className="h-16 w-auto object-contain"
          />
          <span className="text-[#1abc9c] text-2xl font-bold">JOB-PHARMA</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">{t('nav.about')}</Link>
          <Link className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`} to="/jobs">{t('nav.jobs')}</Link>
          <Link className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`} to="/blog">{t('nav.blog')}</Link>
          <Link className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`} to="/pricing">{t('nav.pricing')}</Link>
          
          {userEmail ? (
            <div className="flex items-center gap-4 ml-4">
              <span className="text-sm text-gray-600">{userEmail}</span>
              <button 
                onClick={handleLogout}
                className="button text-base bg-red-500 hover:bg-red-600 text-white"
                title={t('common.logout')}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link className="ml-4 button shadow text-base text-white" to="/recruiter">
              <User className="h-4 w-4 mr-2 inline" />
              {t('nav.recruiter')}
            </Link>
          )}
          <LanguageToggle />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <LanguageToggle />
          <button 
            className="flex items-center justify-center p-2 rounded-lg text-green-700 hover:bg-green-50 focus:outline-none transition duration-150"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <span className="text-2xl">×</span> : <span className="text-2xl">☰</span>}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 animate-fadeIn">
          <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link 
              className={`nav-link block py-2 px-3 ${location.pathname === '/' ? 'active' : ''}`} 
              to="/"
              onClick={handleMenuItemClick}
            >
              {t('nav.about')}
            </Link>
            <Link 
              className={`nav-link block py-2 px-3 ${location.pathname === '/jobs' ? 'active' : ''}`} 
              to="/jobs"
              onClick={handleMenuItemClick}
            >
              {t('nav.jobs')}
            </Link>
            <Link 
              className={`nav-link block py-2 px-3 ${location.pathname === '/blog' ? 'active' : ''}`} 
              to="/blog"
              onClick={handleMenuItemClick}
            >
              {t('nav.blog')}
            </Link>
            <Link 
              className={`nav-link block py-2 px-3 ${location.pathname === '/pricing' ? 'active' : ''}`} 
              to="/pricing"
              onClick={handleMenuItemClick}
            >
              {t('nav.pricing')}
            </Link>
            
            {userEmail ? (
              <div className="flex items-center justify-between py-2 px-3">
                <span className="text-sm text-gray-600">{userEmail}</span>
                <button 
                  onClick={handleLogout}
                  className="button text-base bg-red-500 hover:bg-red-600 text-white"
                  title={t('common.logout')}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link 
                className="button shadow text-base w-full text-center py-3 mt-2 text-white" 
                to="/recruiter"
                onClick={handleMenuItemClick}
              >
                <User className="h-4 w-4 mr-2 inline" />
                {t('nav.recruiter')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;