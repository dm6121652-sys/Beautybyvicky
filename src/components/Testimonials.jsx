import React from 'react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Bride",
    review: "Vicky was absolutely incredible. My bridal makeup stayed flawless for 14 hours through happy tears, dancing, and humidity. She completely understood the soft glam look I was going for!"
  },
  {
    name: "Elena Rodriguez",
    role: "Model",
    review: "As a working model, I've sat in many makeup chairs, but Vicky's attention to detail and skin prep is unmatched. She truly enhances your natural features rather than masking them."
  },
  {
    name: "Jessica Chen",
    role: "Birthday Glam",
    review: "I booked Vicky for my 30th birthday and she made me feel like an absolute queen. The whole process was so relaxing and the final result was beyond what I imagined."
  }
];

export default function Testimonials() {
  return (
    <div id="testimonials" className="w-full bg-white py-24 px-8 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <h2 className="text-[10px] tracking-[0.3em] font-sans uppercase mb-4 text-[#8C7A70]">Client Love</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3A2A20]">Testimonials</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="p-8 text-center flex flex-col items-center">
              <div className="text-[#8C7A70] mb-6">
                {/* 5 Stars */}
                <svg className="w-5 h-5 inline-block mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <svg className="w-5 h-5 inline-block mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <svg className="w-5 h-5 inline-block mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <svg className="w-5 h-5 inline-block mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <svg className="w-5 h-5 inline-block mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <p className="font-serif italic text-lg text-[#3A2A20] leading-relaxed mb-6">"{t.review}"</p>
              <div>
                <h4 className="font-sans font-semibold text-[#3A2A20] text-[13px]">{t.name}</h4>
                <span className="text-[10px] uppercase tracking-widest text-[#8C7A70]">{t.role}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
