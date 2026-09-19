import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const today = new Date().toISOString().slice(0, 10)
const prettyDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

export default function AvailabilityManager({ onMessage }) {
  const [dates, setDates] = useState([])
  const [blockedDate, setBlockedDate] = useState('')
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const [dailyLimit, setDailyLimit] = useState(3)

  const load = async () => {
    const [{ data, error }, settings] = await Promise.all([
      supabase.from('unavailable_dates').select('*').gte('unavailable_date', today).order('unavailable_date'),
      supabase.from('business_settings').select('daily_booking_limit').eq('id', true).maybeSingle()
    ])
    if (error) { onMessage('Could not load unavailable dates. Run the updated SQL setup first.'); return }
    setDates(data || [])
    if (settings.data?.daily_booking_limit) setDailyLimit(settings.data.daily_booking_limit)
  }

  useEffect(() => { load() }, [])

  const blockDate = async (event) => {
    event.preventDefault()
    if (!blockedDate) return
    setBusy(true)
    const { error } = await supabase.from('unavailable_dates').insert({ unavailable_date: blockedDate, reason: reason.trim() || null })
    setBusy(false)
    if (error) { onMessage(error.code === '23505' ? 'That date is already blocked.' : `Could not block date: ${error.message}`); return }
    setBlockedDate(''); setReason(''); onMessage('Date blocked. Clients can no longer submit a booking for it.'); load()
  }

  const unblock = async (id) => {
    setBusy(true)
    const { error } = await supabase.from('unavailable_dates').delete().eq('id', id)
    setBusy(false)
    if (error) { onMessage(`Could not reopen date: ${error.message}`); return }
    onMessage('Date reopened for bookings.'); load()
  }

  const saveLimit = async (event) => {
    event.preventDefault(); setBusy(true)
    const { error } = await supabase.from('business_settings').update({ daily_booking_limit: Number(dailyLimit) }).eq('id', true)
    setBusy(false)
    onMessage(error ? `Could not save daily limit: ${error.message}` : 'Daily booking limit updated.')
  }

  return <div className="max-w-3xl">
    <div className="mb-7"><p className="text-sm text-[#817576]">Block dates when Vicky is unavailable. Clients cannot submit a request for any date shown below.</p></div>
    <form onSubmit={saveLimit} className="mb-6 rounded-2xl border border-[#ede6e2] bg-white p-5 sm:p-6"><h2 className="font-serif text-xl">Daily booking capacity</h2><p className="mt-1 text-sm text-[#817576]">Once this number of requests is reached for a date, new clients will see “fully booked.”</p><div className="mt-4 flex flex-wrap items-end gap-3"><label><span className="mb-2 block text-xs font-bold text-[#776a6b]">Maximum bookings per day</span><input required min="1" max="100" type="number" value={dailyLimit} onChange={e => setDailyLimit(e.target.value)} className="w-44 rounded-xl border border-[#e4dbd7] px-3 py-2.5 text-sm outline-none focus:border-[#a96369]"/></label><button disabled={busy} className="rounded-xl bg-[#382425] px-5 py-3 text-xs font-bold text-white disabled:opacity-60">Save capacity</button></div></form>
    <form onSubmit={blockDate} className="rounded-2xl border border-[#ede6e2] bg-white p-5 sm:p-6">
      <h2 className="font-serif text-xl">Block a date</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_1.5fr_auto] sm:items-end">
        <label className="block"><span className="mb-2 block text-xs font-bold text-[#776a6b]">Date</span><input required min={today} type="date" value={blockedDate} onChange={e => setBlockedDate(e.target.value)} className="w-full rounded-xl border border-[#e4dbd7] px-3 py-2.5 text-sm outline-none focus:border-[#a96369]" /></label>
        <label className="block"><span className="mb-2 block text-xs font-bold text-[#776a6b]">Reason <span className="font-normal text-[#a69b9b]">optional</span></span><input value={reason} maxLength="120" onChange={e => setReason(e.target.value)} placeholder="e.g. Out of town" className="w-full rounded-xl border border-[#e4dbd7] px-3 py-2.5 text-sm outline-none focus:border-[#a96369]" /></label>
        <button disabled={busy} className="rounded-xl bg-[#382425] px-5 py-3 text-xs font-bold text-white disabled:opacity-60">{busy ? 'Saving…' : 'Block date'}</button>
      </div>
    </form>
    <section className="mt-6 overflow-hidden rounded-2xl border border-[#ede6e2] bg-white"><div className="flex items-center justify-between border-b border-[#eee8e4] p-5"><h2 className="font-serif text-xl">Unavailable dates</h2><span className="text-xs text-[#938788]">{dates.length} blocked</span></div>{dates.length ? <div className="divide-y divide-[#f0ebe8]">{dates.map(item => <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="text-sm font-bold">{prettyDate(item.unavailable_date)}</p>{item.reason && <p className="mt-1 text-xs text-[#8d8182]">{item.reason}</p>}</div><button disabled={busy} onClick={() => unblock(item.id)} className="rounded-lg border border-[#dfd5d1] px-3 py-1.5 text-xs font-bold text-[#805258]">Reopen date</button></div>)}</div> : <p className="px-5 py-12 text-center text-sm text-[#95898a]">No dates are blocked. Clients can request any future date.</p>}</section>
  </div>
}
