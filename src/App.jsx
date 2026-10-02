import React, { useState } from 'react';
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
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('আসসালামু আলাইকুম, Location Saman Delivery থেকে জানতে চাই।')}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Home />
        <Products />
        <Reviews reviews={reviews} setReviews={setReviews} />
        <Contact />
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
