import React, { useState } from 'react';

const aboutImages = [
  "SaveClip.App_649437419_18072472262542474_362457672412877832_n.jpg",
  "SaveClip.App_649594978_18072472310542474_5746388519295994587_n.jpg",
  "SaveClip.App_649513764_18072472274542474_4793150705997754731_n.jpg"
];

export default function About() {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImage = () => {
    setCurrentImg((prev) => (prev + 1) % aboutImages.length);
  };

  const prevImage = () => {
    setCurrentImg((prev) => (prev - 1 + aboutImages.length) % aboutImages.length);
  };

  return (
    <div id="about" className="min-h-screen flex items-center justify-center py-20 px-8" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Text Content */}
        <div className="text-[#3A2A20] pr-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            About Beauty<br />by Vicky
          </h2>

          <div className="space-y-5 font-sans text-[13px] leading-relaxed text-[#8C7A70]">
            <p>
              As the lead makeup artist at Beauty by Vicky, I've spent over 5 years helping women look and feel their absolute best.
            </p>
            <p>
              I specialize in everything from soft, radiant glam to bold bridal looks — ensuring flawless, timeless makeup that enhances your natural beauty and photographs beautifully in any light.
            </p>
            <p>
              My passion is creating personalized beauty experiences that celebrate your unique features. Every appointment begins with a conversation, so we can craft a look that leaves you feeling more confident than when you arrived.
            </p>
          </div>

          <a href="#booking" className="inline-block mt-10 bg-white text-[#3A2A20] border border-gray-200 px-6 py-3 rounded-full text-[10px] font-sans tracking-widest uppercase hover:bg-gray-50 transition-colors shadow-sm">
            Book Now
          </a>

        </div>

        {/* Right Image Carousel */}
        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
          {aboutImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="About Vicky"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                index === currentImg ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* Controls */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            <button
              onClick={prevImage}
              className="w-8 h-8 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white/20 transition backdrop-blur-sm"
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 15L12 9L6 15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="w-8 h-8 rounded-full border border-white/50 text-white flex items-center justify-center hover:bg-white/20 transition backdrop-blur-sm"
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

