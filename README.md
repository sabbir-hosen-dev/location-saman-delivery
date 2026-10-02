# Location Saman Delivery — React + Tailwind CSS

## Run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Section-wise JSX structure

- `src/components/Navbar.jsx` — navigation and brand
- `src/components/Home.jsx` — hero/home section
- `src/components/Banner.jsx` — optional standalone banner section
- `src/components/Products.jsx` — three product cards
- `src/components/Reviews.jsx` — reviews and review form
- `src/components/Contact.jsx` — complaint/feedback form that opens WhatsApp
- `src/components/OrderRules.jsx` — order steps, terms, Card and bKash buttons
- `src/components/Footer.jsx` — footer
- `src/components/WhatsAppButton.jsx` — reusable WhatsApp CTA
- `src/components/SectionTitle.jsx` — reusable section heading
- `src/data/siteData.js` — WhatsApp number, products, sample reviews and price formatter

## Before using

1. Replace `8801XXXXXXXXX` in `src/data/siteData.js` with your WhatsApp Business number, country code included, without `+`, spaces or dashes.
2. Update product names, prices, descriptions and image URLs in `src/data/siteData.js`.
3. Replace the sample reviews with real customer reviews.
4. Card and bKash buttons only open WhatsApp with a prepared message. No payment gateway is integrated.
5. Reviews are frontend-only and will not persist after refresh. A backend/database is needed for permanent storage.
# location-saman-delivery
