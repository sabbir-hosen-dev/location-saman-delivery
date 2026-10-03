
import React, { useEffect, useRef, useState } from 'react'
import { Send, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'

const STORAGE_KEY = 'location-saman-delivery-reviews'

export default function Reviews({ reviews, setReviews }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    rating: '5',
    text: '',
  })

  const [notice, setNotice] = useState('')
  const [currentReview, setCurrentReview] = useState(0)

  // Swipe related
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // LocalStorage থেকে review load
  useEffect(() => {
    try {
      const savedReviews = localStorage.getItem(STORAGE_KEY)

      if (savedReviews) {
        const parsedReviews = JSON.parse(savedReviews)

        if (Array.isArray(parsedReviews)) {
          setReviews(parsedReviews)
        }
      }
    } catch (error) {
      console.error('Failed to load reviews:', error)
    }
  }, [setReviews])

  // Review পরিবর্তন হলে LocalStorage-এ save
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reviews)
      )
    } catch (error) {
      console.error('Failed to save reviews:', error)
    }
  }, [reviews])

  // Review submit
  const submit = e => {
    e.preventDefault()

    const newReview = {
      ...form,
      rating: Number(form.rating),
    }

    const updatedReviews = [
      newReview,
      ...reviews,
    ]

    setReviews(updatedReviews)
    setCurrentReview(0)

    setForm({
      name: '',
      location: '',
      rating: '5',
      text: '',
    })

    setNotice('রিভিউটি এই পেজে যোগ হয়েছে। ধন্যবাদ!')

    setTimeout(() => {
      setNotice('')
    }, 3000)
  }

  // সর্বোচ্চ 4টি review
  const sliderReviews = reviews.slice(0, 4)

  // Next review
  const nextReview = () => {
    if (sliderReviews.length <= 1) return

    setCurrentReview(prev =>
      prev === sliderReviews.length - 1 ? 0 : prev + 1
    )
  }

  // Previous review
  const previousReview = () => {
    if (sliderReviews.length <= 1) return

    setCurrentReview(prev =>
      prev === 0 ? sliderReviews.length - 1 : prev - 1
    )
  }

  // =========================
  // TOUCH SWIPE
  // =========================

  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchMove = e => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const distance =
      touchStartX.current - touchEndX.current

    // Minimum swipe distance
    if (Math.abs(distance) < 50) return

    if (distance > 0) {
      // Swipe Left
      nextReview()
    } else {
      // Swipe Right
      previousReview()
    }
  }

  // =========================
  // MOUSE DRAG
  // =========================

  const mouseStartX = useRef(0)
  const isDragging = useRef(false)

  const handleMouseDown = e => {
    mouseStartX.current = e.clientX
    isDragging.current = true
  }

  const handleMouseUp = e => {
    if (!isDragging.current) return

    const distance =
      mouseStartX.current - e.clientX

    isDragging.current = false

    if (Math.abs(distance) < 50) return

    if (distance > 0) {
      nextReview()
    } else {
      previousReview()
    }
  }

  const handleMouseLeave = () => {
    isDragging.current = false
  }

  // Auto slider
  useEffect(() => {
    if (sliderReviews.length <= 1) return

    const interval = setInterval(() => {
      setCurrentReview(prev =>
        prev === sliderReviews.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [sliderReviews.length])

  // Review কমে গেলে current index ঠিক রাখা
  useEffect(() => {
    if (
      sliderReviews.length > 0 &&
      currentReview >= sliderReviews.length
    ) {
      setCurrentReview(0)
    }
  }, [sliderReviews.length, currentReview])

  return (
    <section
      id="reviews"
      className="section-space bg-[#f7fbf9]"
    >
      <div className="container-width">

        <SectionTitle
          eyebrow="কাস্টমারদের মতামত"
          title="কাস্টমার রিভিউ"
          description="আপনার অভিজ্ঞতা অন্য কাস্টমারদের সিদ্ধান্ত নিতে সাহায্য করতে পারে।"
        />

        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_.85fr]">

          {/* ================= REVIEW SLIDER ================= */}
          <div className="relative">

            {sliderReviews.length > 0 ? (
              <div className="relative overflow-hidden">

                {/* Review Card */}
                <div
                  key={`${sliderReviews[currentReview].name}-${currentReview}`}

                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}

                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}

                  className="cursor-grab select-none rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-500 ease-in-out active:cursor-grabbing touch-pan-y"
                >
                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-light font-bold text-brand">
                        {sliderReviews[currentReview].name.slice(0, 1)}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-800">
                          {sliderReviews[currentReview].name}
                        </h3>

                        <p className="font-bangla mt-0.5 text-xs text-slate-400">
                          {sliderReviews[currentReview].location || 'কাস্টমার'}
                        </p>
                      </div>

                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 text-amber-400">
                      {Array.from(
                        { length: 5 },
                        (_, n) => (
                          <Star
                            key={n}
                            size={13}
                            fill={
                              n <
                              sliderReviews[currentReview].rating
                                ? 'currentColor'
                                : 'none'
                            }
                          />
                        )
                      )}
                    </div>

                  </div>

                  <p className="font-bangla mt-4 min-h-[84px] text-sm leading-7 text-slate-600">
                    “{sliderReviews[currentReview].text}”
                  </p>
                </div>

                {/* ================= NAVIGATION ================= */}
                {sliderReviews.length > 1 && (
                  <div className="mt-4 flex items-center justify-between">

                    {/* Previous Arrow - Invisible */}
                    <button
                      type="button"
                      onClick={previousReview}
                      aria-label="Previous review"
                      className="grid h-10 w-10 place-items-center rounded-full opacity-0 pointer-events-none"
                    >
                      <ChevronLeft size={19} />
                    </button>

                    {/* Dots */}
                    <div className="flex items-center gap-1.5">
                      {sliderReviews.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCurrentReview(index)}
                          aria-label={`Review ${index + 1}`}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentReview === index
                              ? 'w-6 bg-brand'
                              : 'w-2 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Next Arrow - Invisible */}
                    <button
                      type="button"
                      onClick={nextReview}
                      aria-label="Next review"
                      className="grid h-10 w-10 place-items-center rounded-full opacity-0 pointer-events-none"
                    >
                      <ChevronRight size={19} />
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm">
                <p className="font-bangla text-sm text-slate-400">
                  এখনো কোনো রিভিউ নেই।
                </p>
              </div>
            )}

          </div>

          {/* ================= REVIEW FORM ================= */}
          <form
            onSubmit={submit}
            className="rounded-3xl border border-brand/10 bg-white p-5 shadow-soft sm:p-7"
          >
            <span className="section-kicker font-bangla">
              আপনার মতামত
            </span>

            <h3 className="font-bangla mt-3 text-2xl font-bold text-slate-900">
              রিভিউ লিখুন
            </h3>

            <p className="font-bangla mt-2 text-sm leading-6 text-slate-500">
              আপনার কেনাকাটার অভিজ্ঞতা আমাদের জানান।
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">

              <input
                required
                value={form.name}
                onChange={e =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="আপনার নাম *"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand"
              />

              <input
                value={form.location}
                onChange={e =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                placeholder="আপনার লোকেসন"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand"
              />

            </div>

            <label className="font-bangla mt-4 block text-sm font-semibold text-slate-700">
              আপনার রেটিং
            </label>

            <select
              value={form.rating}
              onChange={e =>
                setForm({
                  ...form,
                  rating: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              <option value="5">
                ★★★★★ — ৫ স্টার
              </option>

              <option value="4">
                ★★★★☆ — ৪ স্টার
              </option>

              <option value="3">
                ★★★☆☆ — ৩ স্টার
              </option>

              <option value="2">
                ★★☆☆☆ — ২ স্টার
              </option>

              <option value="1">
                ★☆☆☆☆ — ১ স্টার
              </option>
            </select>

            <textarea
              required
              rows="4"
              value={form.text}
              onChange={e =>
                setForm({
                  ...form,
                  text: e.target.value,
                })
              }
              placeholder="আপনার অভিজ্ঞতা লিখুন..."
              className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand"
            />

            {notice && (
              <p
                role="status"
                className="font-bangla mt-3 text-sm font-semibold text-brand"
              >
                {notice}
              </p>
            )}

            <button
              type="submit"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-bangla text-sm font-bold text-white hover:bg-brand-dark"
            >
              <Send size={16} />
              রিভিউ জমা দিন
            </button>

            <p className="font-bangla mt-3 text-xs leading-5 text-slate-400">
              রিভিউ আপনার এই ডিভাইসের ব্রাউজারে সংরক্ষণ থাকবে।
            </p>
          </form>

        </div>
      </div>
    </section>
  )
}

