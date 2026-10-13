
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle, X, ShieldCheck } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../data/siteData.js'

const PRODUCTS = ['ক্যান্ডি', 'চিনি', 'পাতা']

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [location, setLocation] = useState('')

  // Modal open থাকলে background page scroll বন্ধ থাকবে
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const toggleProduct = (product) => {
    setSelectedProducts((current) =>
      current.includes(product)
        ? current.filter((item) => item !== product)
        : [...current, product],
    )
  }

  const handleOrder = (event) => {
    event.preventDefault()

    if (selectedProducts.length === 0 || !location.trim()) return

    const message = [
      'আসসালামু আলাইকুম, Saman Delivery।',
      '',
      'আমার অর্ডারের বিস্তারিত:',
      `আমার প্রয়োজন: ${selectedProducts.join(', ')}`,
      `আমার লোকেশন: ${location.trim()}`,
      '',
      'পেমেন্ট করার পর অবশ্যই স্ক্রিনশট পাঠাব। সামান যেখানে রাখতে হবে, সেই জায়গার ছবি বা ভিডিও পাঠাব।',
    ].join('\n')

    const phone = String(WHATSAPP_NUMBER || '').replace(/\D/g, '')

    if (!phone) {
      window.alert(
        'WhatsApp নম্বর সেট করা নেই। data/siteData.js ফাইলে WHATSAPP_NUMBER চেক করুন।',
      )
      return
    }

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <>
      {/* WhatsApp Order Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        <MessageCircle size={20} />
        WhatsApp-এ অর্ডার করুন
      </button>

      {/* Modal: Render directly inside document.body */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false)
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="saman-order-title"
              className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 text-gray-900 shadow-2xl sm:p-6"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="ফর্ম বন্ধ করুন"
                className="absolute right-3 top-3 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={21} />
              </button>

              {/* Modal Title */}
              <h2
                id="saman-order-title"
                className="pr-9 text-xl font-bold"
              >
                অর্ডারের বিস্তারিত
              </h2>

              {/* Privacy Notice */}
              <div className="mt-4 flex gap-3 rounded-xl bg-green-50 p-3 text-sm text-green-900">
                <ShieldCheck
                  className="mt-0.5 shrink-0"
                  size={21}
                />

                <p>
                  <strong className="block">
                    আপনার তথ্য গোপন থাকবে
                  </strong>
                  আপনার নিরাপত্তা নিশ্চিত করে সামান পৌঁছে দেব।
                </p>
              </div>

              {/* Order Form */}
              <form onSubmit={handleOrder} className="mt-5 space-y-5">
                {/* Product Selection */}
                <fieldset>
                  <legend className="mb-3 text-sm font-semibold">
                    আপনার কী লাগবে?{' '}
                    <span className="text-red-600">*</span>
                  </legend>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {PRODUCTS.map((product) => (
                      <label
                        key={product}
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition ${
                          selectedProducts.includes(product)
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-green-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product)}
                          onChange={() => toggleProduct(product)}
                          className="h-4 w-4 accent-green-600"
                        />

                        {product}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Location Input */}
                <div>
                  <label
                    htmlFor="saman-location"
                    className="mb-2 block text-sm font-semibold"
                  >
                    আপনার লোকেশন{' '}
                    <span className="text-red-600">*</span>
                  </label>

                  <input
                    id="saman-location"
                    type="text"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    placeholder="শহর/দেশ লিখুন"
                    required
                    autoComplete="off"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    selectedProducts.length === 0 ||
                    !location.trim()
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <MessageCircle size={20} />
                  WhatsApp-এ অর্ডার করুন
                </button>

                {/* Order Instructions */}
                <p className="text-center text-sm leading-6 text-gray-600">
                  পেমেন্ট করার পর অবশ্যই স্ক্রিনশট দিবেন।
                  <br />
                  সামান যেখানে রাখবেন, সেই জায়গার ছবি বা
                  ভিডিও করে দিবেন।
                </p>
              </form>
            </section>
          </div>,
          document.body,
        )}
    </>
  )
}
