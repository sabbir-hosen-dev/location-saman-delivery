import React, { useEffect, useState } from 'react';

function FixedSeftyNotice() {
  const [isOpen, setIsOpen] = useState(false);

  // Website load হওয়ার 2 seconds পরে notice open হবে
  // Open থাকার 5 seconds পরে automatically minimize হবে
  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeTimer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => clearTimeout(closeTimer);
  }, [isOpen]);

  const toggleNotice = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="fixed bottom-24 right-5 z-40">
      {/* Notice Card */}
      <div
        className={`
          absolute bottom-0 right-0
          w-[calc(100vw-6.5rem)] max-w-sm
          origin-bottom-right
          rounded-2xl border border-orange-200
          bg-white px-4 py-3
          shadow-lg shadow-slate-900/10
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          sm:w-96
          ${
            isOpen
              ? 'translate-y-0 scale-100 opacity-100 pointer-events-auto'
              : 'translate-y-3 scale-90 opacity-0 pointer-events-none'
          }
        `}>
        <div className="flex items-start gap-3">
          {/* Icon */}
          <button
            type="button"
            onClick={toggleNotice}
            aria-label="নোটিশ বন্ধ করুন"
            className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-500 transition-transform duration-300 hover:scale-105 active:scale-95">
            <span className="text-base">⚠</span>
          </button>

          {/* Text */}
          <div className="pr-1">
            <p className="font-bangla text-sm font-bold text-slate-800">
              {' '}
              আপনার নিরাপত্তা ও রাইডারদের প্রাইভেসি{' '}
            </p>
            <p className="font-bangla mt-1 text-xs leading-5 text-slate-500">
              আপনার নিরাপত্তা ও রাইডারদের প্রাইভেসির জন্য হাতে হাতে সামান দেওয়া
              হয় না। শুধুমাত্র লোকেশনে সামান দেওয়া হয়।
            </p>
          </div>
        </div>
      </div>

      {/* Minimized Icon */}
      <button
        type="button"
        onClick={toggleNotice}
        aria-label="নিরাপত্তা নোটিশ দেখুন"
        className={`
          relative grid h-11 w-11 place-items-center
          rounded-xl border border-orange-200
          bg-white text-orange-500
          shadow-lg shadow-slate-900/10
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:scale-105
          active:scale-95
          ${
            isOpen
              ? 'pointer-events-none scale-75 opacity-0'
              : 'pointer-events-auto scale-100 opacity-100'
          }
        `}>
        <span className="text-lg">⚠</span>

        {/* Small pulse */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-xl border border-orange-300 animate-ping opacity-20" />
        )}
      </button>
    </div>
  );
}

export default FixedSeftyNotice;
