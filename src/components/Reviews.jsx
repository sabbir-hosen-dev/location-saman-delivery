import React, { useState } from 'react'
import { Send, Star } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'

export default function Reviews({ reviews, setReviews }) {
  const [form, setForm] = useState({ name: '', location: '', rating: '5', text: '' })
  const [notice, setNotice] = useState('')
  const submit = e => {
    e.preventDefault()
    setReviews([{ ...form, rating: Number(form.rating) }, ...reviews])
    setForm({ name: '', location: '', rating: '5', text: '' })
    setNotice('রিভিউটি এই পেজে যোগ হয়েছে। ধন্যবাদ!')
  }
  return (
    <section id="reviews" className="section-space bg-[#f7fbf9]">
      <div className="container-width"><SectionTitle eyebrow="কাস্টমারদের মতামত" title="কাস্টমার রিভিউ" description="আপনার অভিজ্ঞতা অন্য কাস্টমারদের সিদ্ধান্ত নিতে সাহায্য করতে পারে।" />
        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="grid gap-4 sm:grid-cols-2">{reviews.slice(0, 4).map((review, i) => <article key={`${review.name}-${i}`} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-brand-light font-bold text-brand">{review.name.slice(0, 1)}</div><div><h3 className="font-bold text-slate-800">{review.name}</h3><p className="font-bangla mt-0.5 text-xs text-slate-400">{review.location || 'কাস্টমার'}</p></div></div><div className="flex gap-0.5 text-amber-400">{Array.from({ length: 5 }, (_, n) => <Star key={n} size={13} fill={n < review.rating ? 'currentColor' : 'none'} />)}</div></div><p className="font-bangla mt-4 text-sm leading-7 text-slate-600">“{review.text}”</p></article>)}</div>
          <form onSubmit={submit} className="rounded-3xl border border-brand/10 bg-white p-5 shadow-soft sm:p-7"><span className="section-kicker font-bangla">আপনার মতামত</span><h3 className="font-bangla mt-3 text-2xl font-bold text-slate-900">রিভিউ লিখুন</h3><p className="font-bangla mt-2 text-sm leading-6 text-slate-500">আপনার কেনাকাটার অভিজ্ঞতা আমাদের জানান।</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2"><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="আপনার নাম *" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand" /><input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="আপনার জেলা (ঐচ্ছিক)" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand" /></div>
            <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">আপনার রেটিং</label><select value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"><option value="5">★★★★★ — ৫ স্টার</option><option value="4">★★★★☆ — ৪ স্টার</option><option value="3">★★★☆☆ — ৩ স্টার</option><option value="2">★★☆☆☆ — ২ স্টার</option><option value="1">★☆☆☆☆ — ১ স্টার</option></select>
            <textarea required rows="4" value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="আপনার অভিজ্ঞতা লিখুন..." className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand" />
            {notice && <p role="status" className="font-bangla mt-3 text-sm font-semibold text-brand">{notice}</p>}<button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-bangla text-sm font-bold text-white hover:bg-brand-dark"><Send size={16} /> রিভিউ জমা দিন</button><p className="font-bangla mt-3 text-xs leading-5 text-slate-400">রিভিউ আপাতত শুধু এই পেজে দেখা যাবে; স্থায়ীভাবে রাখতে backend/database লাগবে।</p>
          </form>
        </div>
      </div>
    </section>
  )
}
