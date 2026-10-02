import React from 'react';
import SectionTitle from './SectionTitle.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import { products, money } from '../data/siteData.js';

export default function Products() {
  return (
    <section id="products" className="section-space">
      <div className="container-width">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="আমাদের কালেকশন"
            title="পছন্দের প্রোডাক্ট বেছে নিন"
            description="প্রোডাক্টের বিস্তারিত দেখুন এবং সরাসরি WhatsApp Business-এ অর্ডার করুন।"
          />
          <span className="mb-9 hidden font-bangla text-sm text-slate-500 sm:block">
            মোট ৩টি প্রোডাক্ট
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-soft">
              <div className="relative overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 font-bangla text-xs font-bold text-brand shadow-sm">
                  {product.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  {product.name}
                </h3>
                <p className="font-bangla mt-2 min-h-12 text-sm leading-6 text-slate-500">
                  {product.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="md:flex md:gap-1 flex-wrap">
                    <p className="text-2xl font-extrabold text-brand">
                      {money(product.price)}
                    </p>
                    <span className="text-[13px] md:mt-[10px]">{product.priceTitle}</span>
                  </div>

                  <WhatsAppButton
                    className="rounded-xl px-3.5 py-2.5 text-xs"
                    message={`আসসালামু আলাইকুম, আমি Location Saman Delivery থেকে "${product.name}" অর্ডার করতে চাই। দাম: ${money(product.price)}। অর্ডারের নিয়ম জানাবেন।`}>
                    অর্ডার করুন
                  </WhatsAppButton>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="font-bangla mt-5 text-xs leading-6 text-slate-400">
          * প্রোডাক্টের দাম, স্টক ও ডেলিভারি চার্জ অর্ডার নিশ্চিত করার আগে
          WhatsApp-এ যাচাই করে নিন।
        </p>
      </div>
    </section>
  );
}
