import React, { useEffect, useState } from 'react';
import i18n from './i18n.js';
import { getTranslation, uiTranslations } from './locale/domTranslations.js';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Products from './components/Products.jsx';
import Reviews from './components/Reviews.jsx';
import Contact from './components/Contact.jsx';
import OrderRules from './components/OrderRules.jsx';
import Footer from './components/Footer.jsx';
import { initialReviews, WHATSAPP_NUMBER } from './data/siteData.js';
import FixedSeftyNotice from './components/FixedSeftyNotice.jsx';

export default function App() {
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
    const textCache = new WeakMap();
    const attrCache = new WeakMap();
    const normalize = value => String(value).replace(/\s+/g, ' ').trim();

    const translateText = node => {
      if (!node || !node.nodeValue) return;
      const current = node.nodeValue;
      const cached = textCache.get(node);
      if (!/[\u0980-\u09ff]/.test(current) && !(cached && current === cached.last)) return;
      const source = cached && current === cached.last ? cached.source : current;
      const trimmed = source.trim();
      if (!trimmed) return;
      let translated = getTranslation(trimmed, (i18n.resolvedLanguage || i18n.language || 'bn').split('-')[0]);
      if (translated === trimmed && (i18n.resolvedLanguage || i18n.language) !== 'bn') {
        let combined = trimmed;
        for (const phrase of Object.keys(uiTranslations).sort((a, b) => b.length - a.length)) {
          if (combined.includes(phrase)) combined = combined.split(phrase).join(getTranslation(phrase, (i18n.resolvedLanguage || i18n.language).split('-')[0]));
        }
        translated = combined;
      }
      const leading = source.match(/^\s*/)?.[0] || '';
      const trailing = source.match(/\s*$/)?.[0] || '';
      const output = leading + translated + trailing;
      textCache.set(node, { source, last: output });
      if (current !== output) node.nodeValue = output;
    };

    const translatableAttributes = ['placeholder', 'aria-label', 'title', 'alt'];
    const translateElement = element => {
      if (!element || element.nodeType !== 1) return;
      translatableAttributes.forEach(attribute => {
        if (!element.hasAttribute(attribute)) return;
        const current = element.getAttribute(attribute);
        let cache = attrCache.get(element);
        if (!cache) { cache = {}; attrCache.set(element, cache); }
        if (!/[\u0980-\u09ff]/.test(current) && !(cache[attribute] && current === cache[attribute].last)) return;
        const source = cache[attribute] && current === cache[attribute].last ? cache[attribute].source : current;
        const output = getTranslation(source, (i18n.resolvedLanguage || i18n.language || 'bn').split('-')[0]);
        cache[attribute] = { source, last: output };
        if (current !== output) element.setAttribute(attribute, output);
      });
    };

    const scan = root => {
      if (!root) return;
      if (root.nodeType === 3) { translateText(root); return; }
      if (root.nodeType === 1) translateElement(root);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement?.closest('script,style,textarea')) continue;
        translateText(node);
      }
      if (root.querySelectorAll) root.querySelectorAll('*').forEach(translateElement);
    };

    const applyLanguage = language => {
      const code = (language || 'bn').split('-')[0];
      document.documentElement.lang = code;
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
      const pageTitles = {
        bn: 'Saman Delivery | সহজ অর্ডার, নির্ভরযোগ্য সার্ভিস',
        en: 'Saman Delivery | Easy Ordering, Reliable Service',
        ar: 'Saman Delivery | طلب سهل وخدمة موثوقة',
      };
      const descriptions = {
        bn: 'Location Saman Delivery — সহজে পছন্দ করুন, WhatsApp-এ অর্ডার করুন।',
        en: 'Location Saman Delivery — choose easily and order through WhatsApp.',
        ar: 'Location Saman Delivery — اختر بسهولة واطلب عبر واتساب.',
      };
      document.title = pageTitles[code] || pageTitles.bn;
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta) descriptionMeta.setAttribute('content', descriptions[code] || descriptions.bn);
      scan(document.body);
    };

    const onLanguageChanged = language => applyLanguage(language);
    i18n.on('languageChanged', onLanguageChanged);
    applyLanguage(i18n.resolvedLanguage || i18n.language || 'bn');
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.type === 'characterData') translateText(record.target);
        else if (record.type === 'attributes') translateElement(record.target);
        else record.addedNodes.forEach(scan);
      });
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: translatableAttributes });
    return () => { observer.disconnect(); i18n.off('languageChanged', onLanguageChanged); };
  }, []);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('আসসালামু আলাইকুম, Saman Delivery থেকে জানতে চাই।')}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Home />
        <Contact />
        <Products />
        <Reviews reviews={reviews} setReviews={setReviews} />

        <OrderRules />
        <FixedSeftyNotice />
      </main>
      <Footer />
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp-এ যোগাযোগ করুন"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#20c76a] text-white shadow-lg shadow-green-900/20 transition hover:scale-105">
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
