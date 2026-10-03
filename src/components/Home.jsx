
import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Truck,
  Zap,
} from 'lucide-react'
import WhatsAppButton from './WhatsAppButton.jsx'
import { products, money } from '../data/siteData.js'

export default function Home() {
  const [currentProduct, setCurrentProduct] = useState(0)

  // Swipe / drag refs
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const mouseStartX = useRef(0)
  const isDragging = useRef(false)

  // =========================
  // NEXT PRODUCT
  // =========================
  const nextProduct = () => {
    if (!products?.length) return

    setCurrentProduct(prev =>
      (prev + 1) % products.length
    )
  }

  // =========================
  // PREVIOUS PRODUCT
  // =========================
  const previousProduct = () => {
    if (!products?.length) return

    setCurrentProduct(prev =>
      prev === 0
        ? products.length - 1
        : prev - 1
    )
  }

  // =========================
  // AUTOMATIC PRODUCT SLIDER
  // =========================
  useEffect(() => {
    if (!products?.length) return

    const interval = setInterval(() => {
      setCurrentProduct(prev =>
        (prev + 1) % products.length
      )
    }, 7000)

    return () => clearInterval(interval)
  }, [])

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

    // ছোট movement ignore করবে
    if (Math.abs(distance) < 50) return

    if (distance > 0) {
      // Swipe Left
      nextProduct()
    } else {
      // Swipe Right
      previousProduct()
    }
  }

  // =========================
  // MOUSE DRAG
  // =========================
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
      // Drag Left
      nextProduct()
    } else {
      // Drag Right
      previousProduct()
    }
  }

  const handleMouseLeave = () => {
    isDragging.current = false
  }

  if (!products?.length) return null

  const product = products[currentProduct]

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#f0faf6] via-white to-[#edf5ff]"
    >
      <div className="container-width grid min-h-[510px] items-center gap-10 py-14 md:grid-cols-2 md:py-20">

        <div className="relative z-10">

          <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-2 font-bangla text-xs font-bold text-brand shadow-sm">
            <Zap size={14} />
            আপনার পছন্দ, আপনার সুবিধায়
          </span>

          <h1 className="mt-6 max-w-xl font-bangla text-4xl font-bold leading-[1.25] tracking-tight text-slate-900 sm:text-5xl lg:text-[54px]">
            আপনার প্রয়জনিও{' '}
            <span className="text-brand">সামান </span>
            এখন আরও সহজে
          </h1>

          <p className="mt-5 max-w-lg font-bangla text-base leading-8 text-slate-600 sm:text-lg">
            Location Saman Delivery-তে পণ্য দেখুন, WhatsApp Business-এ অর্ডার
            নিশ্চিত করুন। সহজ যোগাযোগ ও নির্ভরযোগ্য সেবাই আমাদের লক্ষ্য।
          </p>

          <div className="mt-7 flex flex-wrap gap-3">

            <WhatsAppButton message="আসসালামু আলাইকুম, Location Saman Delivery থেকে অর্ডার করতে চাই। আমাকে বিস্তারিত জানাবেন।" />

            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-brand/30 hover:text-brand"
            >
              প্রোডাক্ট দেখুন
              <ArrowRight size={17} />
            </a>

          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 font-bangla text-sm text-slate-600">

            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-brand" />
              নিরাপদ যোগাযোগ
            </span>

            <span className="flex items-center gap-2">
              <Headphones size={17} className="text-brand" />
              WhatsApp সাপোর্ট
            </span>

            <span className="flex items-center gap-2">
              <PackageCheck size={17} className="text-brand" />
              অর্ডার আপডেট
            </span>

          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[530px]">

          <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-brand/10 blur-2xl" />

          <div className="absolute -right-5 bottom-4 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-4">

            {/* Automatic + Swipe Product Slider */}
            <div className="col-span-2 overflow-hidden rounded-[28px] border border-white bg-white p-3 shadow-soft">

              <div
                className="relative overflow-hidden rounded-[20px] cursor-grab active:cursor-grabbing select-none touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >

                <img
                  key={currentProduct}
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className="h-52 w-full rounded-[20px] object-cover animate-product-slide sm:h-64"
                />

              </div>

              <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-4">

                <div>
                  <p className="font-semibold text-slate-900">
                    {product.name}
                  </p>

                  <p className="font-bangla mt-1 text-sm text-slate-500">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center">

                  <span className="whitespace-nowrap rounded-full bg-brand-light px-3 py-1.5 text-sm font-bold text-brand">
                    {money(product.price)}
                  </span>

                  <div className="mt-2 text-[12px]">
                    {product.priceTitle}
                  </div>

                </div>

              </div>
            </div>
            {/* End Product Slider */}

            <div className="absolute -right-2 top-5 hidden rounded-2xl border border-white bg-white px-4 py-3 shadow-soft sm:block">

              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <BadgeCheck size={17} className="text-brand" />
                সহজ অর্ডার
              </div>

              <p className="font-bangla mt-1 text-xs text-slate-500">
                সামান আপনার, দায়িত্ব আমাদের।
              </p>

            </div>

            <div className="col-span-2 flex items-center justify-between rounded-2xl border border-white bg-white/90 p-4 shadow-sm">

              <div className="flex items-center gap-3">

                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-light text-brand">
                  <Truck size={20} />
                </span>

                <div>

                  <p className="font-bangla font-bold text-slate-800">
                    অর্ডার থেকে ডেলিভারি
                  </p>

                  <p className="font-bangla text-xs text-slate-500">
                    সব তথ্য WhatsApp-এ নিশ্চিত করুন
                  </p>

                </div>

              </div>

              <ArrowDownRight
                size={20}
                className="text-brand"
              />

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

