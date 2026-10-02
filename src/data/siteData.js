// নিজের WhatsApp Business নম্বর বসাও: দেশের কোডসহ, + বা space ছাড়া।
export const WHATSAPP_NUMBER = '+8801943993180'

export const products = [
  {
    id: 1,
    name: 'চিনি',
    description: 'দৈনন্দিন ব্যবহার ও ভ্রমণের জন্য টেকসই বোতল।',
    price: "৩০০",
    priceTitle:"করে ১ গ্রাম",
    tag: 'জনপ্রিয়',
    image: '/public/ice.jpg',
  },
  {
    id: 2,
    name: 'কেন্ডি',
    description: 'স্বচ্ছ সাউন্ড ও আরামদায়ক ব্যবহারের অভিজ্ঞতা।',
    price: "৫০",
    tag: 'নতুন',
    priceTitle:"করে ১ পিস",
    image: '/public/cendy.jpg',
  },
  {
    id: 3,
    name: 'পাতা',
    description: 'স্টাইলিশ ডিজাইন, প্রয়োজনীয় ফিচার একসঙ্গে।',
    price: "২০০",
    tag: 'ট্রেন্ডিং',
    priceTitle:" ১৫ গ্রাম",
    image: '/public/pata.jpeg',
  },
]

export const initialReviews = [
  { name: 'Rahim Ahmed', location: 'ঢাকা', rating: 5, text: 'অর্ডার করা সহজ ছিল। WhatsApp-এ দ্রুত রিপ্লাই পেয়েছি এবং পণ্য ভালোভাবে হাতে পেয়েছি।' },
  { name: 'Mim Akter', location: 'গাজীপুর', rating: 5, text: 'সাপোর্ট ভালো ছিল। অর্ডারের আপডেট পেয়েছি, পুরো প্রক্রিয়াটাও সহজ।' },
  { name: 'Tanvir Hasan', location: 'টাঙ্গাইল', rating: 4, text: 'পণ্যের মান ভালো। যোগাযোগ করতে পেরেছি সহজেই। সার্ভিসে সন্তুষ্ট।' },
]

export const money = (amount) => `৳${amount.toLocaleString('en-US')}`
