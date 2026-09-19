import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A1A1A] text-white py-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-serif mb-2">Vickys</h2>
          <p className="text-[10px] font-sans uppercase tracking-widest text-gray-400">Luxury Makeup Artistry</p>
        </div>

        {/* Links */}
        <div className="flex gap-8 text-[11px] font-sans uppercase tracking-widest">
          <a href="#about" className="hover:text-gray-400 transition-colors">About</a>
          <a href="#services" className="hover:text-gray-400 transition-colors">Services</a>
          <a href="#booking" className="hover:text-gray-400 transition-colors">Book</a>
        </div>

        {/* Socials & Copyright */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end">
          <div className="flex gap-4 mb-4">
            <a href="https://www.instagram.com/beautybyvicky___/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 8h-3a2 2 0 0 0-2 2v10"/><line x1="8" x2="12" y1="14" y2="14"/></svg>
            </a>
          </div>
          <p className="text-[10px] font-sans text-gray-500 tracking-widest uppercase">&copy; {new Date().getFullYear()} Beauty by Vicky. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
