import React from 'react';

const services = [
  {
    title: "Bridal Glam",
    price: "From $250",
    description: "Flawless, long-lasting makeup tailored for your special day. Includes a full consultation, skin prep, and premium lashes.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Soft Glam",
    price: "From $150",
    description: "A beautifully blended, radiant look perfect for events, photoshoots, or date nights. Enhances your features without feeling heavy.",
    image: "https://images.unsplash.com/photo-1512496015851-a1cbfc38d011?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Editorial & Creative",
    price: "Custom",
    description: "Bold, artistic makeup for fashion shoots and creative projects. Designed to look striking on camera under professional lighting.",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Services() {
  return (
    <div id="services" className="min-h-screen w-full bg-[#FDFBF7] py-24 px-8 flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <h2 className="text-[10px] tracking-[0.3em] font-sans uppercase mb-4 text-[#8C7A70]">What We Offer</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3A2A20]">Our Services</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="relative w-full h-[220px] mb-6 rounded-2xl overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-xl font-serif font-semibold text-[#3A2A20]">{service.title}</h3>
              </div>
              
              <p className="font-sans text-[13px] leading-relaxed text-[#8C7A70] mb-8 flex-grow">
                {service.description}
              </p>
              
              <button className="w-full py-3 border border-[#3A2A20] text-[#3A2A20] rounded-full text-[10px] font-sans tracking-widest uppercase hover:bg-[#3A2A20] hover:text-white transition-colors">
                Book This Service
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
