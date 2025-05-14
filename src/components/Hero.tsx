import React, { useState, useEffect } from 'react';
import { Search, FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  const slides = [
    {
      url: '/images/carousselvrai.jpg',
      alt: 'Carrousel principal'
    },
    {
      url: '/images/caroussel1.jpg',
      alt: 'Carrousel 1'
    },
    {
      url: '/images/pharma-indoor.jpeg',
      alt: 'Intérieur de pharmacie'
    }
  ];

  useEffect(() => {
    // Preload images
    Promise.all(
      slides.map((slide) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => [...prev, true]);
            resolve();
          };
          img.src = slide.url;
        });
      })
    );

    // Start carousel
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Job-Pharma",
    "url": "https://job-pharma.com",
    "logo": "https://job-pharma.com/logo.png",
    "description": "Plateforme de recrutement spécialisée dans le secteur pharmaceutique",
    "sameAs": [
      "https://www.linkedin.com/company/job-pharma",
      "https://twitter.com/jobpharma"
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <section className="max-w-5xl mx-auto px-4 mt-4 mb-2 pb-3" id="about">
        <div className="rounded-xl overflow-hidden relative h-[600px] bg-gradient-to-b from-gray-800 to-gray-900">
          {/* Carousel */}
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'opacity'
                }}
              >
                {imagesLoaded[index] && (
                  <img
                    src={slide.url}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0.6 }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-center p-6 md:p-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-100 mb-4">
              {t('hero.subtitle')}
            </p>
            <ul className="text-sm text-gray-200 mb-6 pl-4 list-disc grid grid-cols-1 sm:grid-cols-2 gap-1">
              <li>{t('hero.features.verified')}</li>
              <li>{t('hero.features.sorting')}</li>
              <li>{t('hero.features.highlight')}</li>
              <li>{t('hero.features.application')}</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/jobs" className="button shadow flex items-center justify-center text-base text-white">
                <Search className="h-4 w-4 mr-2" />
                {t('hero.buttons.viewJobs')}
              </Link>
              <Link to="/recruiter" className="button shadow flex items-center justify-center text-base">
                <FilePlus className="h-4 w-4 mr-2" />
                <span className="text-white">{t('hero.buttons.postJob')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(Hero);