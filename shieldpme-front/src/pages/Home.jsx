import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Pricing from '../components/home/Pricing';

export default function Home() {
  const location = useLocation();

  // Links como "/#about" rolam até a seção correspondente
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Pricing />
    </>
  );
}
