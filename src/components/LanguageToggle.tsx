import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
      aria-label={i18n.language === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      <Languages className="h-5 w-5" />
      <span>{i18n.language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageToggle;