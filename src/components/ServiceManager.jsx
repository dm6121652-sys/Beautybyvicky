import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const BUCKET = import.meta.env.VITE_SUPABASE_BUCKET || 'Public'
const blank = { title: '', description: '', price: '', image_url: '' }

export default function ServiceManager({ onMessage }) {
  const [services, setServices] = useState([])
  const [form, setForm] = useState(blank)
  const [imageFile, setImageFile] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const update = key => event => setForm(current => ({ ...current, [key]: event.target.value }))
  const load = async () => { const { data, error } = await supabase.from('services').select('*').order('sort_order'); if (error) onMessage('Could not load services. Run the updated SQL setup first.'); else setServices(data || []) }
  useEffect(() => { load() }, [])

  const save = async event => {
    event.preventDefault(); setBusy(true)
    try {
      let imageUrl = form.image_url || null
      if (imageFile) {
        const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')
        const path = `services/${Date.now()}_${safeName}`
        const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, imageFile)
        if (uploadError) throw new Error(`Image upload: ${uploadError.message}`)
        imageUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
      }
      const payload = { title: form.title.trim(), description: form.description.trim(), price: form.price.trim() || null, image_url: imageUrl }
      const result = editingId ? await supabase.from('services').update(payload).eq('id', editingId) : await supabase.from('services').insert({ ...payload, sort_order: services.length })
      if (result.error) throw new Error(`Service save: ${result.error.message}`)
      setForm(blank); setImageFile(null); setEditingId(null); window.dispatchEvent(new Event('services-updated')); onMessage(editingId ? 'Service and image updated.' : 'Service added.'); load()
    } catch (error) { onMessage(`Could not save service — ${error.message}`) }
    finally { setBusy(false) }
  }

  const edit = item => { setEditingId(item.id); setImageFile(null); setForm({ title: item.title || '', description: item.description || '', price: item.price || '', image_url: item.image_url || '' }) }
  const cancel = () => { setEditingId(null); setImageFile(null); setForm(blank) }
  const remove = async item => { if (!window.confirm(`Delete “${item.title}”?`)) return; setBusy(true); const { error } = await supabase.from('services').delete().eq('id', item.id); setBusy(false); if (error) { onMessage(`Could not delete service: ${error.message}`); return }; window.dispatchEvent(new Event('services-updated')); onMessage('Service deleted.'); load() }

  return <div className="max-w-4xl"><p className="mb-7 text-sm text-[#817576]">Add, edit, or remove the services clients can choose from on the website.</p><form onSubmit={save} className="rounded-2xl border border-[#ede6e2] bg-white p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><h2 className="font-serif text-xl">{editingId ? 'Edit service' : 'Add a service'}</h2>{editingId && <button type="button" onClick={cancel} className="text-xs font-bold text-[#9c6267]">Cancel edit</button>}</div><div className="mt-5 grid gap-4 sm:grid-cols-2"><Input label="Service name" value={form.title} onChange={update('title')} required placeholder="e.g. Bridal Glam"/><Input label="Price label" value={form.price} onChange={update('price')} placeholder="e.g. From ₦50,000"/><label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold text-[#776a6b]">Description</span><textarea required rows="3" value={form.description} onChange={update('description')} placeholder="Describe this service…" className="w-full rounded-xl border border-[#e4dbd7] px-3 py-2.5 text-sm outline-none focus:border-[#a96369]"/></label><label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold text-[#776a6b]">Service image <span className="font-normal text-[#a69b9b]">{editingId ? '— choose a file only to replace the current image' : ''}</span></span><input type="file" accept="image/*" onChange={event => setImageFile(event.target.files?.[0] || null)} className="block w-full rounded-xl border border-[#e4dbd7] p-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#f6e9e7] file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#805258]"/>{(imageFile || form.image_url) && <div className="mt-3 flex items-center gap-3"><img src={imageFile ? URL.createObjectURL(imageFile) : form.image_url} alt="Selected service preview" className="h-16 w-16 rounded-lg object-cover"/><span className="text-xs text-[#8d8182]">{imageFile ? imageFile.name : 'Current image'}</span></div>}</label></div><button disabled={busy} className="mt-5 rounded-xl bg-[#382425] px-5 py-3 text-xs font-bold text-white disabled:opacity-60">{busy ? 'Saving…' : editingId ? 'Save changes' : 'Add service'}</button></form><section className="mt-6 overflow-hidden rounded-2xl border border-[#ede6e2] bg-white"><div className="flex items-center justify-between border-b border-[#eee8e4] p-5"><h2 className="font-serif text-xl">Website services</h2><span className="text-xs text-[#938788]">{services.length} services</span></div>{services.length ? <div className="divide-y divide-[#f0ebe8]">{services.map(item => <div key={item.id} className="flex items-center gap-4 px-5 py-4"><div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f5eeeb]">{item.image_url && <img src={item.image_url} alt="" className="h-full w-full object-cover"/>}</div><div className="min-w-0 flex-1"><p className="font-bold">{item.title}</p><p className="mt-1 truncate text-xs text-[#8d8182]">{item.description}</p></div><button onClick={() => edit(item)} className="text-xs font-bold text-[#805258]">Edit</button><button disabled={busy} onClick={() => remove(item)} className="text-xs font-bold text-red-600">Delete</button></div>)}</div> : <p className="px-5 py-12 text-center text-sm text-[#95898a]">No services added yet.</p>}</section></div>
}
function Input({ label, className = '', ...props }) { return <label className={className}><span className="mb-2 block text-xs font-bold text-[#776a6b]">{label}</span><input {...props} className="w-full rounded-xl border border-[#e4dbd7] px-3 py-2.5 text-sm outline-none focus:border-[#a96369]"/></label> }
