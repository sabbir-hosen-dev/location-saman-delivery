import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X, ShieldCheck } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/siteData.js';

const PRODUCTS = ['ক্যান্ডি', 'চিনি', 'পাতা'];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [location, setLocation] = useState('');

  // Modal open থাকলে background scroll বন্ধ থাকবে
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleProduct = product => {
    setSelectedProducts(current =>
      current.includes(product)
        ? current.filter(item => item !== product)
        : [...current, product]
    );
  };

  const handleOrder = event => {
    event.preventDefault();

    if (selectedProducts.length === 0 || !location.trim()) return;

    const message = [
      'আসসালামু আলাইকুম, Saman Delivery থেকে অর্ডার করতে চাই।',
      '',
      `লোকেশন: ${location.trim()}`,
      `যা লাগবে: ${selectedProducts.join(', ')}`,
      '',
      'আমাকে বিস্তারিত জানাবেন।',
    ].join('\n');

    const phone = String(WHATSAPP_NUMBER || '').replace(/\D/g, '');

    if (!phone) {
      window.alert(
        'WhatsApp নম্বর সেট করা নেই। data/siteData.js ফাইলে WHATSAPP_NUMBER চেক করুন।'
      );
      return;
    }

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <>
      {/* WhatsApp Order Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
        <MessageCircle size={20} />
        WhatsApp অর্ডার করুন
      </button>

      {/* Modal: পুরো পেজের মাঝখানে দেখাবে */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
            onMouseDown={event => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}>
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="saman-order-title"
              className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 text-gray-900 shadow-2xl sm:p-6">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="ফর্ম বন্ধ করুন"
                className="absolute right-3 top-3 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
                <X size={21} />
              </button>

              {/* Title */}
              <h2 id="saman-order-title" className="pr-9 text-xl font-bold">
                অর্ডারের বিস্তারিত
              </h2>

              {/* Notice */}
              <div className="mt-4 flex gap-3 rounded-xl bg-green-50 p-3 text-sm text-green-900">
                <ShieldCheck className="mt-0.5 shrink-0" size={21} />

                <p>
                  <strong className="block">
                    আপনার আস্থাই আমাদের অনুপ্রেরণা।
                  </strong>
                  <span className='text-[12px]'>
                    {' '}
                    আপনার ও রাইডারের গোপনীয়তা আমাদের অগ্রাধিকার। নিরাপত্তার
                    স্বার্থে হাতে হাতে নয়, শুধুমাত্র নির্ধারিত লোকেশনে সামান
                    দেওয়া হয়।
                  </span>
                  
                </p>
              </div>

              {/* Payment Notice */}
              <div className="mt-3 flex items-center gap-2"></div>

              {/* Payment Notice */}
              {/* <div className="mt-3 flex items-center gap-3 rounded-xl border border-pink-100 bg-pink-50 p-3 text-sm text-gray-700">
                <img
                  src="https://i.ibb.co.com/tTshJjmc/bkash.png"
                  alt="bkash"
                  className="h-9 w-9 shrink-0 rounded-md object-contain"
                  border="0"></img>

                <div className="min-w-0">
                  <strong className="block text-sm leading-5 text-gray-900">
                    নিরাপদ পেমেন্ট
                  </strong>

                  <p className="mt-1 text-xs font-bold leading-5 text-gray-700">
                    আপনার সর্বোচ্চ নিরাপত্তার জন্য বিকাশের মাধ্যমে পেমেন্ট করুন।
                  </p>
                </div>
              </div> */}

              {/* Order Form */}
              <form onSubmit={handleOrder} className="mt-5 space-y-5">
                {/* Product Selection */}
                <fieldset>
                  <legend className="mb-3 text-sm font-semibold">
                    আপনার কী লাগবে? <span className="text-red-600">*</span>
                  </legend>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {PRODUCTS.map(product => (
                      <label
                        key={product}
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition ${
                          selectedProducts.includes(product)
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-green-400'
                        }`}>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product)}
                          onChange={() => toggleProduct(product)}
                          className="h-4 w-4 accent-green-600"
                        />

                        {/* ইমোজি শুধু Modal-এর অপশনে থাকবে */}
                        <span className="font-bold">
                          {product}
                          {product === 'ক্যান্ডি' && '🍬 '}
                          {product === 'চিনি' && '🧊 '}
                          {product === 'পাতা' && '🍁 '}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Location Input */}
                <div>
                  <label
                    htmlFor="saman-location"
                    className="mb-2 block text-sm font-semibold">
                    আপনার লোকেশন <span className="text-red-600">*</span>
                  </label>

                  <input
                    id="saman-location"
                    type="text"
                    value={location}
                    onChange={event => setLocation(event.target.value)}
                    placeholder="শহর / দেশ "
                    required
                    autoComplete="off"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={selectedProducts.length === 0 || !location.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50">
                  <MessageCircle size={20} />
                  WhatsApp অর্ডার করুন
                </button>

                {/* Instructions */}
                <p className="text-center text-sm leading-6 text-gray-600">
                  <strong>সামান আপনার, দায়িত্ব আমাদের।</strong> <br />
                  পেমেন্ট করার পর অবশ্যই স্ক্রিনশট দিবেন। <br />
                  সামান যেখানে রাখব, সেই জায়গার ছবি বা ভিডিও করে দিবেন।
                </p>
              </form>
            </section>
          </div>,
          document.body
        )}
    </>
  );
}
