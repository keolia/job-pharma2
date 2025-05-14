import React from 'react';
import Hero from '../components/Hero';
import OffersPreview from '../components/OffersPreview';
import Testimonials from '../components/Testimonials';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <OffersPreview />
      <Testimonials />
    </>
  );
};

export default Home;