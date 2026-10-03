// নিজের WhatsApp Business নম্বর বসাও: দেশের কোডসহ, + বা space ছাড়া।
export const WHATSAPP_NUMBER = '+8801943993180';

{/* <img src="https://i.ibb.co.com/NnmXTgD3/cann.jpg" alt="cann" border="0">
<img src="https://i.ibb.co.com/8DYW5PqL/can.jpg" alt="can" border="0">
<img src="https://i.ibb.co.com/gMVXVH3K/c.jpg" alt="c" border="0"></img> */}

export const products = [
  {
    id: 1,
    name: 'চিনি',
    description: 'সব চিনি মিষ্টি না রে পাগলা.!!',
    price: '৩০০',
    priceTitle: 'করে ১ গ্রাম',
    tag: 'জনপ্রিয়',
    image: 'https://i.ibb.co.com/5xfrpFmb/ice.jpg',
  },
  {
    id: 2,
    name: 'কেন্ডি',
    description: 'যে নামাইছে লেয়ার সেই জানে কেন্ডির কি পাওয়ার...R7 ',
    price: '৫০',
    tag: 'নতুন',
    priceTitle: 'করে ১ পিস',
    image: 'https://i.ibb.co.com/gMVXVH3K/c.jpg',
  },
  {
    id: 3,
    name: 'পাতা',
    description: 'দুঃখ ভুলালানোর ঔষধ, পিনিক',
    price: '২০০',
    tag: 'ট্রেন্ডিং',
    priceTitle: ' ১৫ গ্রাম',
    image:
      'https://i.ibb.co.com/vpmZPZg/Whats-App-Image-2026-10-03-at-1-33-38-AM.jpg',
  },
];

export const initialReviews = [
  {
    name: 'Rahim Ahmed',
    location: 'দাম্মাম',
    rating: 5,
    text: 'অর্ডার করা সহজ ছিল।  সামান ভালোভাবে হাতে পেয়েছি। কারেন্ট জীনস মামমা',
  },
  {
    name: 'Siyam',
    location: 'সিকু',
    rating: 5,
    text: 'টাকা দেওয়ার ২০ মিনিট এর মদ্দে সমান পাইছি',
  },
  {
    name: 'Tanvir Hasan',
    location: 'রিয়াদ',
    rating: 4,
    text: 'পণ্যের মান ভালো। যোগাযোগ করতে পেরেছি সহজেই। সার্ভিসে সন্তুষ্ট। লেট হইসে ইকটু ১৫ মিনিট বলছিল ২৫ মিনিট লাগাই ছে',
  },
];

export const money = amount => `৳${amount.toLocaleString('en-US')}`;
