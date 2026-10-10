import React, { useState } from 'react';
import {
  Clock3,
  MessageCircle,
  Send,
  ShieldCheck,
  Upload,
  X,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

// Keep your existing import
import { WHATSAPP_NUMBER } from '../data/siteData.js';

// Google Apps Script Web App URL
const GOOGLE_SHEET_API =
  'https://script.google.com/macros/s/AKfycbzRML0qyxL3piwdMbkfcd5EfC_bsj5nXraywdmFGltGveBz0jpLQs6T9bjavqDaOTQW/exec';

const PRODUCT_OPTIONS = ['ক্যান্ডি', 'চিনি', 'পাতা'];

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  riderPhone: '',
  products: [],
  quantity: '',
  location: '',
  payment: '',
  paidAmount: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    setError('');
  };

  const handleProductChange = product => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(item => item !== product)
        : [...prev.products, product],
    }));

    setError('');
  };

  const handleImageChange = e => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError('');
    setSent(false);

    if (!file.type.startsWith('image/')) {
      setError('শুধু JPG, PNG অথবা WebP ছবি আপলোড করুন।');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('ছবির সাইজ সর্বোচ্চ 5MB হতে পারবে।');
      e.target.value = '';
      return;
    }

    setImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(typeof reader.result === 'string' ? reader.result : '');
    };

    reader.onerror = () => {
      setError('ছবি পড়তে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreview('');

    const input = document.getElementById('payment-screenshot');

    if (input) {
      input.value = '';
    }

    setError('');
  };

  const submit = async e => {
    e.preventDefault();

    setError('');
    setSent(false);
    setShowSuccess(false);

    if (form.products.length === 0) {
      setError('আপনি কোন সামান দিয়েছিলেন, অন্তত একটি নির্বাচন করুন।');
      return;
    }

    if (!image) {
      setError('Payment Screenshot আপলোড করুন।');
      return;
    }

    if (!GOOGLE_SHEET_API) {
      setError('Google Sheet API URL সেট করা হয়নি।');
      return;
    }

    const email = form.email.trim();

    if (!email) {
      setError('আপনার Email ঠিকানা লিখুন।');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('সঠিক Email ঠিকানা লিখুন।');
      return;
    }

    try {
      setSending(true);
      setUploading(true);

      const imageBase64 = await fileToBase64(image);

      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email,
        riderPhone: form.riderPhone.trim(),
        products: form.products,
        quantity: form.quantity.trim(),
        location: form.location.trim(),
        payment: form.payment,
        paidAmount: form.paidAmount.trim(),
        message: form.message.trim(),
        image: imageBase64,
        imageName: image.name,
        imageType: image.type,
      };

      const response = await fetch(GOOGLE_SHEET_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      // Read the raw response first
      const responseText = await response.text();
      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        console.error(
          'Google Apps Script returned non-JSON:',
          response.status,
          responseText.slice(0, 500)
        );

        throw new Error(
          'Google Apps Script থেকে JSON পাওয়া যায়নি। Deployment URL, access permission এবং latest deployment পরীক্ষা করুন।'
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'তথ্য সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।'
        );
      }

      setUploading(false);
      setSent(true);
      setShowSuccess(true);

      const whatsappMessage = `Saman Delivery — সামান না পাওয়া / কম পাওয়ার অভিযোগ

আপনার সামান আমাদের দায়িত্ব।

গ্রাহকের নাম: ${form.name}
গ্রাহকের ফোন: ${form.phone}
গ্রাহকের Email: ${email}
রাইডারের ফোন: ${form.riderPhone}
সামানের ধরন: ${form.products.join(', ')}
সামানের পরিমাণ: ${form.quantity}
লোকেশন: ${form.location}
Payment মাধ্যম: ${form.payment}
পরিশোধিত টাকা: ${form.paidAmount}

গ্রাহকের অভিযোগ / মতামত:
${form.message}

Payment Screenshot:
${result.imageUrl || 'Google Sheet-এ সংরক্ষিত হয়েছে।'}

অনুগ্রহ করে অভিযোগটি যাচাই করে প্রয়োজনীয় ব্যবস্থা নিন।`;

      // Keep this message available if you later want a WhatsApp button.
      void whatsappMessage;
      void WHATSAPP_NUMBER;

      setForm({ ...INITIAL_FORM });
      setImage(null);
      setPreview('');

      const fileInput = document.getElementById('payment-screenshot');

      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      console.error('Complaint submission error:', err);

      setError(err.message || 'তথ্য পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSending(false);
      setUploading(false);
    }
  };

  return (
    <section id="contact" className="section-space">
      {/* TOP SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
          <div
            role="status"
            aria-live="polite"
            className="flex w-full max-w-md items-start gap-3 rounded-2xl border border-green-200 bg-white p-4 shadow-2xl">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={23} />
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-bangla font-bold text-slate-900">
                অভিযোগ সফলভাবে জমা হয়েছে!
              </p>

              <p className="font-bangla mt-1 text-sm leading-6 text-slate-600">
                আপনার তথ্য সংরক্ষণ করা হয়েছে। আমরা আপনার সঙ্গে যোগাযোগ করব।
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              aria-label="সফলতার বার্তা বন্ধ করুন"
              className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
              <X size={19} />
            </button>
          </div>
        </div>
      )}

      <div className="container-width grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        {/* LEFT SIDE — DESIGN SAME */}
        <div>
          <span className="section-kicker font-bangla">আপনার পাশে আমরা</span>

          <h2 className="font-bangla mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            সামান না পেলে বা কম পেলে এই ফর্মটি পূরণ করুন
          </h2>

          <p className="font-bangla mt-4 leading-8 text-slate-600">
            আপনার সামান না পেলে বা পরিমাণে কম পেলে নিচের ফর্মটি পূরণ করে অভিযোগ
            জানান। আমরা আপনার সঙ্গে যোগাযোগ করব এবং বিষয়টি যাচাই করে প্রয়োজনীয়
            ব্যবস্থা নেব।
          </p>

          <p className="font-bangla mt-3 rounded-xl bg-brand-light p-4 font-bold leading-7 text-slate-800">
            আপনার সামান আমাদের দায়িত্ব।
          </p>

          <p className="font-bangla mt-3 leading-7 text-slate-600">
            রাইডারের আচরণ খারাপ হলে, সামান না দিলে অথবা কম দিলে অবশ্যই অভিযোগ
            করুন। আপনার অভিযোগ যাচাই করে যথাযথ ব্যবস্থা নেওয়া হবে।
          </p>

          <div className="mt-7 space-y-4">
            <div className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand">
                <MessageCircle size={19} />
              </span>

              <div>
                <p className="font-bangla font-bold text-slate-800">
                  WhatsApp Business
                </p>
                <p className="font-bangla mt-1 text-sm text-slate-500">
                  অভিযোগ ও সহায়তার জন্য
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand">
                <Clock3 size={19} />
              </span>

              <div>
                <p className="font-bangla font-bold text-slate-800">
                  সাপোর্ট টাইম
                </p>
                <p className="font-bangla mt-1 text-sm text-slate-500">
                  সাপোর্টের সময় WhatsApp-এ নিশ্চিত করুন।
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand">
                <ShieldCheck size={19} />
              </span>

              <div>
                <p className="font-bangla font-bold text-slate-800">
                  আপনার অভিযোগ আমাদের কাছে গুরুত্বপূর্ণ
                </p>
                <p className="font-bangla mt-1 text-sm text-slate-500">
                  সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM — DESIGN SAME */}
        <form
          onSubmit={submit}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-8">
          <h3 className="font-bangla text-xl font-bold text-slate-900">
            সামান না পাওয়া / কম পাওয়ার অভিযোগ
          </h3>

          <p className="font-bangla mt-1 text-sm text-slate-500">
            * সবগুলো তথ্য পূরণ করা বাধ্যতামূলক।
          </p>

          {/* CUSTOMER NAME + PHONE */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="font-bangla text-sm font-semibold text-slate-700">
              আপনার নাম *
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
                placeholder="আপনার নাম লিখুন"
              />
            </label>

            <label className="font-bangla text-sm font-semibold text-slate-700">
              আপনার ফোন নম্বর *
              <input
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
                placeholder="ফোন নম্বর লিখুন"
              />
            </label>
          </div>

          {/* CUSTOMER EMAIL — NEW FIELD */}
          <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            আপনার Email ঠিকানা *
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
              placeholder="আপনার Email লিখুন"
            />
          </label>

          {/* RIDER PHONE */}
          <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            রাইডারের ফোন নম্বর *
            <input
              required
              type="tel"
              name="riderPhone"
              value={form.riderPhone}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
              placeholder="রাইডারের ফোন নম্বর লিখুন"
            />
          </label>

          {/* PRODUCTS */}
          <fieldset className="font-bangla mt-4 rounded-xl border border-slate-200 p-4">
            <legend className="px-1 text-sm font-semibold text-slate-700">
              আপনি কী সামান দিয়েছিলেন? *
            </legend>

            <p className="mb-3 text-xs font-normal text-slate-500">
              একাধিক সামান নির্বাচন করতে পারবেন।
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {PRODUCT_OPTIONS.map(product => (
                <label
                  key={product}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition ${
                    form.products.includes(product)
                      ? 'border-brand bg-brand-light text-slate-900'
                      : 'border-slate-200 text-slate-700 hover:border-brand'
                  }`}>
                  <input
                    type="checkbox"
                    checked={form.products.includes(product)}
                    onChange={() => handleProductChange(product)}
                    className="h-4 w-4 accent-current"
                  />
                  {product}
                </label>
              ))}
            </div>
          </fieldset>

          {/* QUANTITY */}
          <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            সামানের পরিমাণ কত ছিল? *
            <input
              required
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
              placeholder="যেমন: ২ গ্রাম চিনি, 10 পিস ক্যান্ডি"
            />
          </label>

          {/* LOCATION */}
          <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            আপনার লোকেশন *
            <input
              required
              name="location"
              value={form.location}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
              placeholder="আপনার লোকেশন / সম্পূর্ণ ঠিকানা"
            />
          </label>

          {/* PAYMENT METHOD */}
          <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            Payment মাধ্যম *
            <select
              required
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-brand">
              <option value="">Payment মাধ্যম নির্বাচন করুন</option>
              <option value="Card">Card</option>
              <option value="bKash">bKash</option>
            </select>
          </label>

          {/* PAID AMOUNT */}
          <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            কত টাকা দিয়েছেন? *
            <input
              required
              type="number"
              min="0"
              step="any"
              name="paidAmount"
              value={form.paidAmount}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
              placeholder="টাকার পরিমাণ লিখুন"
            />
          </label>

          {/* PAYMENT SCREENSHOT */}
          <div className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            Payment Screenshot *
            <label
              htmlFor="payment-screenshot"
              className="mt-2 flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 py-5 text-center transition hover:border-brand">
              {uploading ? (
                <>
                  <Loader2 size={25} className="animate-spin text-brand" />
                  <span className="mt-2 text-sm text-slate-500">
                    Screenshot upload হচ্ছে...
                  </span>
                </>
              ) : preview ? (
                <div className="relative w-full">
                  <img
                    src={preview}
                    alt="Payment screenshot preview"
                    className="mx-auto max-h-48 rounded-xl object-contain"
                  />

                  <span className="mt-2 block text-xs font-normal text-slate-500">
                    অন্য ছবি দিতে চাইলে এখানে ক্লিক করুন।
                  </span>
                </div>
              ) : (
                <>
                  <Upload size={25} className="text-slate-400" />

                  <span className="mt-2 text-sm text-slate-500">
                    Screenshot Upload করুন
                  </span>

                  <span className="mt-1 text-xs font-normal text-slate-400">
                    JPG, PNG অথবা WebP — সর্বোচ্চ 5MB
                  </span>
                </>
              )}

              <input
                id="payment-screenshot"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                required={!image}
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {image && (
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="break-all text-xs font-normal text-slate-500">
                  {image.name}
                </span>

                <button
                  type="button"
                  onClick={removeImage}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs text-red-500 hover:bg-red-50">
                  <X size={14} />
                  ছবি সরান
                </button>
              </div>
            )}
          </div>

          {/* COMPLAINT / FEEDBACK */}
          <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            আপনার মতামত বা অভিযোগ *
            <textarea
              required
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
              placeholder="কী সমস্যা হয়েছে বিস্তারিত লিখুন..."
            />
          </label>

          {/* ERROR */}
          {error && (
            <p
              role="alert"
              className="font-bangla mt-3 flex items-start gap-2 text-sm text-red-500">
              <AlertTriangle size={17} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          {/* SUCCESS INLINE */}
          {sent && (
            <p className="font-bangla mt-3 flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 size={17} />
              আপনার অভিযোগ সফলভাবে সংরক্ষণ হয়েছে।
            </p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={sending}
            className="font-bangla mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70">
            {sending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                পাঠানো হচ্ছে...
              </>
            ) : (
              <>
                <Send size={16} />
                অভিযোগ পাঠান
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

/**
 * File → Base64
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== 'string') {
        reject(new Error('ছবি পড়তে সমস্যা হয়েছে।'));
        return;
      }

      const base64 = result.split(',')[1];

      if (!base64) {
        reject(new Error('ছবিটি সঠিকভাবে পড়া যায়নি।'));
        return;
      }

      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error('ছবি পড়তে সমস্যা হয়েছে। আবার চেষ্টা করুন।'));
    };

    reader.readAsDataURL(file);
  });
}
