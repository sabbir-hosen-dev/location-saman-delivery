import React, { useState } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton.jsx';

const links = [
  ['হোম', '#home'],
  ['প্রোডাক্ট', '#products'],
  ['রিভিউ', '#reviews'],
  ['অর্ডার নিয়ম', '#how-to-order'],
  ['যোগাযোগ', '#contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-width flex h-[72px] items-center justify-between gap-4">
        <a
          href="#home"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Location Saman Delivery home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
            <MapPin size={22} />
          </span>
          <span>
            <span className="block text-lg font-extrabold leading-tight tracking-tight text-slate-900">
              লোকেশনে সামান <span className="text-brand"> ডেলিভারি</span>
            </span>
            <span className="font-bangla text-xs text-slate-500">
              সহজ অর্ডার, নির্ভরযোগ্য সার্ভিস
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-bangla text-sm font-semibold text-slate-600 transition hover:text-brand">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden sm:block">
          <WhatsAppButton className="rounded-xl px-4 py-2.5 text-xs" />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
          aria-label="মেনু খুলুন">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav className="container-width grid gap-1 border-t border-slate-100 py-3 md:hidden">
          {links.map(([label, href]) => (
            <a
              onClick={() => setOpen(false)}
              key={href}
              href={href}
              className="rounded-lg px-3 py-2.5 font-bangla text-sm font-semibold text-slate-700 hover:bg-brand-light hover:text-brand">
              {label}
            </a>
          ))}
          <WhatsAppButton className="mt-2 rounded-xl" />
        </nav>
      )}
    </header>
  );
}
