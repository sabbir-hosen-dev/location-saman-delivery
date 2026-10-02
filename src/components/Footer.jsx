import React from 'react';
import { MapPin } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton.jsx';

export default function Footer() {
  return (
    <footer className="bg-[#10251f] text-white">
      <div className="container-width grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr]">
        <div>
          <a href="#home" className="inline-flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand">
              <MapPin size={22} />
            </span>
            <span className="text-lg font-extrabold">
              Location <span className="text-emerald-300">Saman Delivery</span>
            </span>
          </a>
          <p className="font-bangla mt-4 max-w-sm text-sm leading-7 text-slate-300">
            আপনার পছন্দের প্রোডাক্ট সহজে অর্ডার করুন। যেকোনো প্রশ্নে WhatsApp
            Business-এ যোগাযোগ করুন।
          </p>
        </div>
        <div>
          <h3 className="font-bangla font-bold">দ্রুত লিংক</h3>
          <div className="font-bangla mt-4 grid gap-3 text-sm text-slate-300">
            <a href="#products" className="hover:text-emerald-300">
              প্রোডাক্ট
            </a>
            <a href="#reviews" className="hover:text-emerald-300">
              কাস্টমার রিভিউ
            </a>
            <a href="#how-to-order" className="hover:text-emerald-300">
              অর্ডার করার নিয়ম
            </a>
            <a href="#terms" className="hover:text-emerald-300">
              শর্তাবলি ও পেমেন্ট
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bangla font-bold">যোগাযোগ করুন</h3>
          <p className="font-bangla mt-4 text-sm leading-7 text-slate-300">
            অর্ডার, অভিযোগ ও সহায়তার জন্য WhatsApp Business-এ মেসেজ দিন।
          </p>
          <WhatsAppButton className="mt-4 rounded-xl" />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-width flex flex-col justify-between gap-2 py-4 font-bangla text-xs text-slate-400 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Location Saman Delivery. সর্বস্বত্ব
            সংরক্ষিত।
          </span>
          <span>আপনার আস্থাই আমাদের অনুপ্রেরণা।</span>
        </div>
      </div>
    </footer>
  );
}
