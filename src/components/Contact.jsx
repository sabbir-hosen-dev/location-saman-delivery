
import React, { useState } from 'react'
import {
  Clock3,
  MessageCircle,
  Send,
  ShieldCheck,
  Upload,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { WHATSAPP_NUMBER } from '../data/siteData.js'

// Google Apps Script Web App URL এখানে বসাবে
const GOOGLE_SHEET_API =
  'https://script.google.com/macros/s/AKfycbxWsWRyI_cNMqUW8iiWZrHXR6buQBMY9nRoqsIk_ob3jmTM-HU2VJbVKS7cxvX54ulX/exec'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    payment: '',
    location: '',
    message: '',
  })

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = e => {
    const file = e.target.files?.[0]

    if (!file) return

    setError('')

    // শুধু image allow
    if (!file.type.startsWith('image/')) {
      setError('শুধু JPG, PNG বা WebP image upload করুন।')
      return
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError('Image সর্বোচ্চ 5MB হতে পারবে।')
      return
    }

    setImage(file)

    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImage(null)
    setPreview('')
  }

  const submit = async e => {
    e.preventDefault()

    setError('')
    setSent(false)

    if (!form.payment) {
      setError('Payment মাধ্যম নির্বাচন করুন।')
      return
    }

    if (!image) {
      setError('Payment screenshot upload করুন।')
      return
    }

    if (!GOOGLE_SHEET_API || GOOGLE_SHEET_API.includes('YOUR_')) {
      setError('Google Sheet API URL সেট করা হয়নি।')
      return
    }

    try {
      setSending(true)
      setUploading(true)

      // Image কে base64 করা
      const imageBase64 = await fileToBase64(image)

      // Google Apps Script-এ পাঠানো
      // Apps Script ImgBB-তে image upload করবে
      // এবং Sheet-এ সব data save করবে
      const response = await fetch(GOOGLE_SHEET_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          payment: form.payment,
          location: form.location,
          message: form.message,
          image: imageBase64,
          imageName: image.name,
          imageType: image.type,
        }),
      })

      setUploading(false)

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Submit failed')
      }

      setSent(true)

      // WhatsApp message
      const whatsappMessage = `Location Saman Delivery — অভিযোগ/ফিডব্যাক

নাম: ${form.name}
ফোন: ${form.phone}
Payment: ${form.payment}
লোকেশন: ${form.location}
অভিযোগ: ${form.message}

Payment Screenshot:
${result.imageUrl || 'Image uploaded successfully'}`

      // Form reset
      setForm({
        name: '',
        phone: '',
        payment: '',
        location: '',
        message: '',
      })

      setImage(null)
      setPreview('')

      // WhatsApp open
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        '_blank',
        'noopener,noreferrer'
      )
    } catch (err) {
      console.error(err)

      setUploading(false)
      setError(
        err.message ||
          'তথ্য পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="section-space">
      <div className="container-width grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">

        {/* LEFT SIDE — DESIGN SAME */}
        <div>
          <span className="section-kicker font-bangla">
            আমরা শুনতে প্রস্তুত
          </span>

          <h2 className="font-bangla mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            আপনার কোনো অভিযোগ বা পরামর্শ আছে?
          </h2>

          <p className="font-bangla mt-4 leading-8 text-slate-600">
            আপনার সমস্যা বা মতামত আমাদের জানান। ফর্মটি জমা দিলে
            তথ্য সংরক্ষণ করা হবে এবং WhatsApp Business-এ মেসেজ
            তৈরি হবে।
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
                  অর্ডার, অভিযোগ ও সহায়তার জন্য
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
                  সহজ যোগাযোগ
                </p>

                <p className="font-bangla mt-1 text-sm text-slate-500">
                  আপনার তথ্য পাঠানোর আগে যাচাই করে নিন।
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* FORM — DESIGN SAME */}
        <form
          onSubmit={submit}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-8"
        >
          <h3 className="font-bangla text-xl font-bold text-slate-900">
            অভিযোগ / ফিডব্যাক বক্স
          </h3>

          <p className="font-bangla mt-1 text-sm text-slate-500">
            * চিহ্নিত তথ্যগুলো পূরণ করুন।
          </p>

          {/* NAME + PHONE */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <label className="font-bangla text-sm font-semibold text-slate-700">
              আপনার নাম *

              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
                placeholder="নাম লিখুন"
              />
            </label>

            <label className="font-bangla text-sm font-semibold text-slate-700">
              মোবাইল নম্বর *

              <input
                required
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
                placeholder="01XXXXXXXXX"
              />
            </label>

          </div>

          {/* PAYMENT */}
          <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            Payment করেছেন *

            <select
              required
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-brand"
            >
              <option value="">
                Payment মাধ্যম নির্বাচন করুন
              </option>

              <option value="Card">
                Card
              </option>

              <option value="bKash">
                bKash
              </option>
            </select>
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
              placeholder="আপনার লোকেশন / ঠিকানা লিখুন"
            />
          </label>

          {/* SCREENSHOT */}
          <div className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            Payment Screenshot *

            <label
              htmlFor="payment-screenshot"
              className="mt-2 flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 py-5 text-center transition hover:border-brand"
            >
              {uploading ? (
                <>
                  <Loader2
                    size={25}
                    className="animate-spin text-brand"
                  />

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

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full bg-white text-slate-700 shadow"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload
                    size={25}
                    className="text-slate-400"
                  />

                  <span className="mt-2 text-sm text-slate-500">
                    Screenshot Upload করুন
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    JPG, PNG অথবা WebP — সর্বোচ্চ 5MB
                  </span>
                </>
              )}

              <input
                id="payment-screenshot"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* MESSAGE */}
          <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
            অভিযোগ বা পরামর্শ লিখুন *

            <textarea
              required
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-brand"
              placeholder="বিস্তারিত লিখুন..."
            />
          </label>

          {/* ERROR */}
          {error && (
            <p className="font-bangla mt-3 text-sm text-red-500">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {sent && (
            <p className="font-bangla mt-3 flex items-center gap-2 text-sm text-brand">
              <CheckCircle2 size={17} />
              আপনার অভিযোগ সফলভাবে সংরক্ষণ হয়েছে।
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={sending}
            className="font-bangla mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                পাঠানো হচ্ছে...
              </>
            ) : (
              <>
                <Send size={16} />
                 পাঠান
              </>
            )}
          </button>
        </form>

      </div>
    </section>
  )
}

/**
 * File → Base64
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result

      // data:image/png;base64,XXXX
      const base64 = result.split(',')[1]

      resolve(base64)
    }

    reader.onerror = reject

    reader.readAsDataURL(file)
  })
}

