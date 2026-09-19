import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const initialForm = { firstName: '', lastName: '', phone: '', email: '', service: 'Bridal Glam', preferredDate: '', details: '' }

export default function Booking({ services = [], selectedService }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [unavailableDates, setUnavailableDates] = useState([])
  const update = (field) => (event) => setForm(current => ({ ...current, [field]: event.target.value }))

  useEffect(() => {
    if (!supabase) return
    supabase.from('unavailable_dates').select('unavailable_date').then(({ data }) => setUnavailableDates((data || []).map(item => item.unavailable_date)))
  }, [])

  useEffect(() => {
    if (selectedService) setForm(current => ({ ...current, service: selectedService }))
  }, [selectedService])

  async function submitBooking(event) {
    event.preventDefault()
    if (!supabase) { setStatus('Booking is temporarily unavailable. Please contact us directly.'); return }
    if (unavailableDates.includes(form.preferredDate)) { setStatus('Sorry, this date is unavailable. Please choose another date.'); return }
    setSubmitting(true); setStatus('')
    try {
      const { data, error } = await supabase.rpc('create_booking_request', {
        p_customer_name: `${form.firstName} ${form.lastName}`.trim(),
        p_phone: form.phone || null,
        p_email: form.email,
        p_service: form.service,
        p_preferred_date: form.preferredDate,
        p_notes: form.details || null
      })
      if (error) throw error
      if (!data?.ok) { setStatus(data?.message || 'This date is no longer available. Please choose another.'); return }
      setForm(initialForm)
      setStatus('Your request is in — Vicky will be in touch within 24 hours to confirm your appointment.')
    } catch (error) {
      setStatus('We could not submit your request right now. Please try again or contact us directly.')
    } finally { setSubmitting(false) }
  }

  return <div id="booking" className="min-h-screen w-full bg-[#FDFBF7] py-24 px-8 flex items-center justify-center">
    <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-5/12 bg-[#3A2A20] text-[#FDFBF7] p-10 flex flex-col justify-between">
        <div><h2 className="text-3xl font-serif mb-4">Reserve Your Glam</h2><p className="text-[13px] font-sans opacity-80 leading-relaxed mb-8">Fill out the form with your details and preferred date. We will get back to you within 24 hours to confirm your appointment.</p><div className="space-y-6 text-[13px] font-sans"><div><strong className="block mb-1 uppercase tracking-widest text-[10px]">Studio Location</strong><p className="opacity-80">16, Oreofe street<br/>Surulere</p></div><div><strong className="block mb-1 uppercase tracking-widest text-[10px]">Contact</strong><p className="opacity-80">beautybyvicky@gmail.com<br/>+234907493055</p></div></div></div>
      </div>
      <div className="w-full md:w-7/12 p-10 lg:p-14">
        <form className="space-y-6" onSubmit={submitBooking}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="First Name"><input required value={form.firstName} onChange={update('firstName')} type="text" className="booking-input" placeholder="Jane"/></Field><Field label="Last Name"><input required value={form.lastName} onChange={update('lastName')} type="text" className="booking-input" placeholder="Doe"/></Field></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="Phone Number"><input required value={form.phone} onChange={update('phone')} type="tel" className="booking-input" placeholder="+234 900 000 0000"/></Field><Field label="Email Address"><input required value={form.email} onChange={update('email')} type="email" className="booking-input" placeholder="jane@example.com"/></Field></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="Service Needed"><select value={form.service} onChange={update('service')} className="booking-input">{services.map(service => <option key={service.title} value={service.title}>{service.title}</option>)}</select></Field><Field label="Preferred Date"><input required value={form.preferredDate} onChange={update('preferredDate')} type="date" min={new Date().toISOString().split('T')[0]} className="booking-input text-gray-500"/>{form.preferredDate && unavailableDates.includes(form.preferredDate) && <p className="mt-2 text-xs text-red-700">This date is unavailable. Please select another.</p>}</Field></div>
          <Field label="Additional Details"><textarea value={form.details} onChange={update('details')} rows="3" className="booking-input resize-none" placeholder="Tell us about your event..."/></Field>
          <div className="pt-4"><label className="text-[10px] font-sans uppercase tracking-widest text-[#8C7A70] mb-2 block">Client Booking Policy</label><div className="h-32 overflow-y-auto p-4 border border-gray-200 rounded-lg text-[11px] font-sans text-gray-500 leading-relaxed mb-4 bg-gray-50"><p className="mb-2"><strong>PAYMENT POLICY</strong><br/>A 50% deposit is required to secure your appointment. Deposits are non-refundable once a booking is confirmed.</p><p className="mb-2"><strong>CANCELLATION & RESCHEDULING</strong><br/>Please give at least 48 hours notice for changes. Same-day cancellations and no-shows forfeit the deposit.</p><p><strong>APPOINTMENT PREPARATION</strong><br/>Please arrive with a clean face and communicate any allergies or skin sensitivities before your appointment.</p></div><label className="flex items-start gap-2 cursor-pointer"><input required type="checkbox" className="mt-1"/><span className="text-[11px] font-sans text-[#8C7A70]">By checking this box, you confirm that you have read, understood and agreed to the booking policies above.</span></label></div>
          <button disabled={submitting} className="w-full bg-[#3A2A20] disabled:opacity-60 text-white py-4 rounded-full text-[10px] font-sans tracking-widest uppercase hover:bg-black transition-colors mt-4">{submitting ? 'Sending Request...' : 'Submit Request'}</button>
          {status && <p className={`text-center text-xs leading-5 ${status.startsWith('Your') ? 'text-green-700' : 'text-red-700'}`}>{status}</p>}
        </form>
      </div>
    </div>
  </div>
}

function Field({ label, children }) { return <div className="flex flex-col"><label className="text-[10px] font-sans uppercase tracking-widest text-[#8C7A70] mb-2">{label}</label>{children}</div> }
