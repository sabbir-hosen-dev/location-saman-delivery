import React, { useState } from 'react'
import { Clock3, MessageCircle, Send, ShieldCheck } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../data/siteData.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', order: '', message: '' })
  const [sent, setSent] = useState(false)
  const submit = e => {
    e.preventDefault()
    const msg = `Location Saman Delivery — অভিযোগ/ফিডব্যাক\nনাম: ${form.name}\nফোন: ${form.phone || 'দেওয়া হয়নি'}\nঅর্ডার আইডি: ${form.order || 'দেওয়া হয়নি'}\nবিস্তারিত: ${form.message}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }
  return (
    <section id="contact" className="section-space"><div className="container-width grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
      <div><span className="section-kicker font-bangla">আমরা শুনতে প্রস্তুত</span><h2 className="font-bangla mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">আপনার কোনো অভিযোগ বা পরামর্শ আছে?</h2><p className="font-bangla mt-4 leading-8 text-slate-600">আপনার সমস্যা বা মতামত আমাদের জানান। ফর্মটি জমা দিলে WhatsApp Business-এ মেসেজ তৈরি হবে। সেখান থেকে Send করে পাঠিয়ে দিন।</p>
        <div className="mt-7 space-y-4"><div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand"><MessageCircle size={19} /></span><div><p className="font-bangla font-bold text-slate-800">WhatsApp Business</p><p className="font-bangla mt-1 text-sm text-slate-500">অর্ডার, অভিযোগ ও সহায়তার জন্য</p></div></div><div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand"><Clock3 size={19} /></span><div><p className="font-bangla font-bold text-slate-800">সাপোর্ট টাইম</p><p className="font-bangla mt-1 text-sm text-slate-500">সাপোর্টের সময় WhatsApp-এ নিশ্চিত করুন।</p></div></div><div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand"><ShieldCheck size={19} /></span><div><p className="font-bangla font-bold text-slate-800">সহজ যোগাযোগ</p><p className="font-bangla mt-1 text-sm text-slate-500">আপনার তথ্য পাঠানোর আগে যাচাই করে নিন।</p></div></div></div>
      </div>
      <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-8"><h3 className="font-bangla text-xl font-bold text-slate-900">অভিযোগ / ফিডব্যাক বক্স</h3><p className="font-bangla mt-1 text-sm text-slate-500">* চিহ্নিত তথ্যগুলো পূরণ করুন।</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="font-bangla text-sm font-semibold text-slate-700">আপনার নাম *<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand" placeholder="নাম লিখুন" /></label><label className="font-bangla text-sm font-semibold text-slate-700">মোবাইল নম্বর<input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand" placeholder="01XXXXXXXXX" /></label></div>
        <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">অর্ডার আইডি (যদি থাকে)<input value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand" placeholder="যেমন: LD-1001" /></label>
        <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">অভিযোগ বা পরামর্শ লিখুন *<textarea required rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand" placeholder="বিস্তারিত লিখুন..." /></label>
        {sent && <p className="font-bangla mt-3 text-sm text-brand">WhatsApp খুললে মেসেজটি পাঠাতে Send চাপুন।</p>}<button className="font-bangla mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark"><Send size={16} /> WhatsApp-এ পাঠান</button>
      </form>
    </div></section>
  )
}
