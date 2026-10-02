// Optional reusable banner section. Import this in App.jsx if you want a separate promo banner.
import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton.jsx';

export default function Banner() {
  return (
    <section className="bg-brand py-10 text-white">
      <div className="container-width flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-bangla text-sm font-semibold text-emerald-100">
            Location Saman Delivery
          </p>
          <h2 className="mt-2 font-bangla text-2xl font-bold sm:text-3xl">
            অর্ডার করতে সাহায্য লাগবে?
          </h2>
          <p className="font-bangla mt-2 text-sm text-white/80">
            WhatsApp Business-এ আমাদের সঙ্গে যোগাযোগ করুন।
          </p>
        </div>
        <WhatsAppButton
          className="bg-white text-brand hover:bg-emerald-50"
          message="আসসালামু আলাইকুম, অর্ডার করতে সাহায্য চাই।">
          {' '}
          <MessageCircle size={17} /> WhatsApp-এ যোগাযোগ{' '}
          <ArrowRight size={16} />
        </WhatsAppButton>
      </div>
    </section>
  );
}
