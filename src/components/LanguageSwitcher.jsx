import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown, Check } from 'lucide-react';

const languages = [
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩', native: 'Bangla' },
  { code: 'en', label: 'English', flag: '🇬🇧', native: 'English' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', native: 'Arabic' },
];

const STORAGE_KEY = 'saman-language-manual-choice';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const active = (
    localStorage.getItem('saman-language-manual-choice') ||
    localStorage.getItem('saman-language') ||
    i18n.resolvedLanguage ||
    i18n.language ||
    'bn'
  ).split('-')[0];
  const selected =
    languages.find(language => language.code === active) || languages[0];

  useEffect(() => {
    const handlePointer = event => {
      if (rootRef.current && !rootRef.current.contains(event.target))
        setOpen(false);
    };
    const handleKey = event => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const changeLanguage = async language => {
    await i18n.changeLanguage(language);

    try {
      localStorage.setItem('saman-language-manual-choice', language);
      localStorage.setItem('saman-language', language);
    } catch {
      // Storage unavailable হলে ভাষা পরিবর্তন তবুও কাজ করবে।
    }

    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose website language"
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand/50 hover:bg-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand/20">
        <Languages size={17} className="shrink-0 text-brand" />
        {/* <span>{selected.flag}</span> */}
        <span className='hidden md:block'>{selected.label}</span>
        <ChevronDown
          size={15}
          className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Website language"
          className="absolute right-0 top-full z-[100] mt-2 w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl shadow-slate-900/10">
          <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Website language
          </p>
          {languages.map(language => {
            const isSelected = active === language.code;
            return (
              <button
                key={language.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => changeLanguage(language.code)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${isSelected ? 'bg-brand-light text-brand' : 'text-slate-700 hover:bg-slate-50'}`}>
                {/* <span className="text-lg">{language.flag}</span> */}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">
                    {language.label}
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    {language.native}
                  </span>
                </span>
                {isSelected && (
                  <Check size={16} className="shrink-0 text-brand" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
