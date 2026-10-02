import React from 'react'
import { Check, CreditCard, MessageCircle, ShoppingBag, Truck } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

const steps = [
  ['প্রোডাক্ট বেছে নিন', 'পছন্দের প্রোডাক্ট ও দাম দেখে নিন।', ShoppingBag],
  ['WhatsApp-এ যোগাযোগ', 'অর্ডার বাটনে চাপ দিয়ে বিস্তারিত জানান।', MessageCircle],
  ['পেমেন্ট নিশ্চিত করুন', 'কার্ড বা bKash পেমেন্টের পদ্ধতি নিশ্চিত করুন।', CreditCard],
  ['ডেলিভারি নিন', 'ঠিকানা ও ডেলিভারির সময় নিশ্চিত করুন।', Truck],
]

export default function OrderRules() {
  return <>
    <section id="how-to-order" className="section-space bg-[#f7fbf9]"><div className="container-width"><SectionTitle eyebrow="সহজ চারটি ধাপ" title="অর্ডার করার নিয়ম" description="অর্ডার দেওয়ার আগে নিচের ধাপগুলো অনুসরণ করুন।" center /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([title, desc, Icon], i) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand"><Icon size={21} /></span><span className="text-3xl font-extrabold text-brand/15">0{i + 1}</span></div><h3 className="font-bangla mt-5 text-lg font-bold text-slate-900">{title}</h3><p className="font-bangla mt-2 text-sm leading-6 text-slate-500">{desc}</p></div>)}</div></div></section>
    <section id="terms" className="section-space"><div className="container-width grid gap-8 md:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 p-6 sm:p-8"><h3 className="font-bangla text-xl font-bold text-slate-900">অর্ডারের শর্তাবলি</h3><ul className="font-bangla mt-5 space-y-3 text-sm leading-6 text-slate-600">{['অর্ডার নিশ্চিত করার আগে পণ্যের স্টক ও দাম WhatsApp-এ যাচাই করুন।','ডেলিভারি চার্জ ও সম্ভাব্য সময় অর্ডার নিশ্চিত করার সময় জানিয়ে দেওয়া হবে।','পেমেন্ট করার আগে প্রাপকের তথ্য ও মোট টাকা ভালোভাবে যাচাই করুন।','পণ্য ফেরত বা পরিবর্তনের শর্ত অর্ডারের আগে জেনে নিন।','ভুল বা অসম্পূর্ণ ঠিকানার কারণে ডেলিভারি দেরি হতে পারে।'].map(item => <li key={item} className="flex gap-3"><Check size={17} className="mt-1 shrink-0 text-brand" />{item}</li>)}</ul></div>
      <div className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8"><h3 className="flex items-center gap-2 font-bangla text-xl font-bold"><CreditCard className="text-emerald-300" /> পেমেন্ট পদ্ধতি</h3><p className="font-bangla mt-2 text-sm leading-6 text-slate-300">কার্ড বা bKash পেমেন্ট সম্পর্কে জানতে WhatsApp-এ যোগাযোগ করুন। ওয়েবসাইটে কোনো payment gateway যুক্ত করা হয়নি।</p><div className="mt-5 grid gap-3 sm:grid-cols-2">
        <WhatsAppButton className="rounded-xl bg-white text-slate-900 hover:bg-slate-100" message="আসসালামু আলাইকুম, Location Saman Delivery-তে Card Payment সম্পর্কে জানতে চাই।">Card Payment</WhatsAppButton>
        <WhatsAppButton className="rounded-xl bg-[#e2136e] hover:bg-[#bd0f5b]" message="আসসালামু আলাইকুম, Location Saman Delivery-তে bKash Payment সম্পর্কে জানতে চাই।">bKash Payment</WhatsAppButton>
      </div><p className="font-bangla mt-5 text-xs leading-6 text-slate-400">পেমেন্টের আগে WhatsApp-এ সঠিক পেমেন্ট নির্দেশনা ও প্রাপকের তথ্য নিশ্চিত করুন। এই বাটনগুলো WhatsApp খুলবে, সরাসরি পেমেন্ট করবে না।</p></div>
    </div></section>
  </>
}
