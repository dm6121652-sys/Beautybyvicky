import React, { useState } from 'react';

const faqs = [
  {
    question: "How do I secure my booking & what is the payment policy?",
    answer: "A 50% deposit is required to secure your appointment date and time. Your appointment is not confirmed until this deposit is received. The remaining 50% balance is due immediately after your makeup session. Please note that deposits are non-refundable once confirmed."
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer: "If you need to change your appointment, please notify us as early as possible. Your deposit may be transferred to one rescheduled appointment with at least 48 hours notice (must be within 7 days of the original date, subject to availability). Same-day cancellations, no-shows, or a second reschedule will result in the loss of your deposit."
  },
  {
    question: "What happens if I am late?",
    answer: "We allow a 15-minute grace period. After 15 minutes, a ₦10,000 lateness fee will apply for every additional 30 minutes. If your lateness significantly affects another client’s appointment, your session may need to be shortened or cancelled."
  },
  {
    question: "How should I prepare for my appointment?",
    answer: "Please arrive with a clean face unless otherwise communicated. We encourage you to bring reference photos if you have a specific look in mind. Please communicate any allergies or skin sensitivities beforehand. Kindly avoid bringing unnecessary guests."
  },
  {
    question: "Do you offer home service bookings?",
    answer: "Yes, we do. Please ensure the location is accessible and ready at the scheduled time. For very early appointments or locations requiring special travel arrangements, additional logistics fees may apply and will be communicated before confirmation."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="w-full bg-white py-16 px-8 flex justify-center">
      <div className="max-w-3xl mx-auto w-full">
        
        <div className="text-center mb-12">
          <h2 className="text-[10px] tracking-[0.3em] font-sans uppercase mb-3 text-[#8C7A70]">Got Questions?</h2>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#3A2A20]">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-gray-200 pb-3 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center py-3">
                <h3 className="text-[15px] font-serif font-semibold text-[#3A2A20]">{faq.question}</h3>
                <span className="text-[#8C7A70] text-xl font-light">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="font-sans text-[12px] text-[#8C7A70] leading-relaxed pb-4 pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
