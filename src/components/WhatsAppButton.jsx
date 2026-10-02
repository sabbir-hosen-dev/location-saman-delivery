import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/siteData.js';

export default function WhatsAppButton({
  children = 'WhatsApp-এ অর্ডার করুন',
  message = 'আসসালামু আলাইকুম, Location Saman Delivery থেকে অর্ডার করতে চাই।',
  className = '',
}) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand/20 ${className}`}>
      <MessageCircle size={18} /> {children}
    </a>
  );
}
