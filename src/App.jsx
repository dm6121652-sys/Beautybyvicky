import React from 'react';
import MagneticCarousel, { DEFAULT_IMAGES } from './components/MagneticCarousel';
import About from './components/About';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Booking from './components/Booking';
import Footer from './components/Footer';
import { supabase } from './lib/supabase';

function Navbar() {
  const [scrollY, setScrollY] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blockWidth = Math.min(100, 30 + (scrollY / 300) * 70);
  const isExpanded = blockWidth > 80;

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="fixed top-0 w-full z-50 h-24 flex items-center px-5 md:px-12 transition-colors duration-300">
      
      {/* Expanding Center Block */}
      <div 
        className="absolute top-0 left-1/2 hidden h-full bg-[#FDFBF7] shadow-sm transform -translate-x-1/2 transition-all duration-75 ease-out z-0 md:block"
        style={{ width: `${blockWidth}vw` }}
      />

      {/* Left: Nav Links */}
      <div className={`relative z-10 hidden flex-1 gap-8 text-[11px] font-bold uppercase tracking-widest font-sans md:flex ${isExpanded ? 'text-[#3A2A20]' : 'text-white mix-blend-difference'}`}>
        <a href="#about" className="hover:opacity-70 transition-opacity">About Us</a>
        <a href="#services" className="hover:opacity-70 transition-opacity">Services</a>
      </div>
      
      {/* Center: Logo */}
      <div className="absolute left-1/2 z-10 flex -translate-x-1/2 flex-col items-center justify-center text-white drop-shadow-md md:static md:flex-1 md:translate-x-0 md:text-[#3A2A20] md:drop-shadow-none">
        <span className="text-[8px] tracking-[0.2em] uppercase font-sans mb-1 font-bold">Beauty by</span>
        <div className="text-3xl font-serif">Vickys</div>
      </div>
      
      {/* Right: Icon */}
      <div className={`relative z-10 hidden flex-1 justify-end md:flex ${isExpanded ? 'text-[#3A2A20]' : 'text-white mix-blend-difference'}`}>
        <a href="#booking" className="hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
        </a>
      </div>

      <button
        type="button"
        onClick={() => setMenuOpen(open => !open)}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        className="relative z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm md:hidden"
      >
        <span className="sr-only">Menu</span>
        <span className="flex w-4 flex-col gap-1.5">
          <span className={`h-px w-full bg-current transition-transform ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-full bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-px w-full bg-current transition-transform ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </span>
      </button>

      <div className={`absolute inset-x-0 top-0 z-10 bg-[#2f201f] px-7 pb-8 pt-28 text-center text-white transition-all duration-300 md:hidden ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-6 text-xs font-bold uppercase tracking-[0.22em]">
          <a onClick={closeMenu} href="#about">About us</a>
          <a onClick={closeMenu} href="#services">Services</a>
          <a onClick={closeMenu} href="#booking" className="rounded-full border border-white/40 px-5 py-3">Book appointment</a>
        </div>
      </div>
    </nav>
  );
}

function Hero({ images }) {
  const [winWidth, setWinWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = winWidth < 768
  const heroImages = isMobile ? [images?.[0] || DEFAULT_IMAGES[0]] : images

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Navbar />

      {/* Background Carousel */}
      <div className="absolute inset-0">
        <MagneticCarousel
          images={heroImages}
          collapsedWidth={isMobile ? winWidth : winWidth / 5}
          hoverWidth={isMobile ? winWidth : (winWidth / 5) * 1.5}
        />
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10 text-white text-center">
        <h2 className="text-[10px] tracking-[0.3em] font-sans uppercase mb-4 shadow-sm font-bold">Luxury Makeup Artistry</h2>
        <h1 className="text-4xl md:text-6xl font-serif italic mb-8 drop-shadow-lg leading-tight">
          Enhance Your<br />Natural Glow
        </h1>
        <a href="#booking" className="pointer-events-auto bg-white text-black px-6 py-3 rounded-full text-[10px] font-sans tracking-widest uppercase hover:bg-gray-100 transition-colors shadow-lg font-bold">
          Book an Appointment
        </a>
      </div>
    </div>
  );
}

function App() {
  const [magImages, setMagImages] = React.useState(DEFAULT_IMAGES)

  React.useEffect(() => {
    let mounted = true
    async function loadMag() {
      if (!supabase || typeof supabase.from !== 'function') return
      try {
        const keys = ['magnetic_0','magnetic_1','magnetic_2','magnetic_3','magnetic_4']
        const { data, error } = await supabase.from('assets').select('key,url').in('key', keys)
        if (error) {
          console.warn('Failed to load magnetic images', error)
          return
        }
        if (!mounted) return
        const map = {}
        (data || []).forEach(a => { map[a.key] = a.url })
        const images = []
        for (let i = 0; i < 5; i++) {
          const key = `magnetic_${i}`
          if (map[key]) images.push({ src: map[key] })
        }
        if (images.length) setMagImages(images)
      } catch (e) {
        console.error('Error loading magnetic images', e)
      }
    }
    loadMag()
    return () => { mounted = false }
  }, [])

  return (
    <div className="font-serif">
      <Hero images={magImages} />
      <About />
      <Services />
      <Booking />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
