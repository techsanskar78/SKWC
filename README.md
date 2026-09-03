# Shri Krishna Wedding Collection

A premium, production-ready website for a bridal fashion & jewellery business, built with Next.js (App Router), TypeScript and Tailwind CSS. Google Sheets is the business data store; Google Drive hosts images. The customer journey is optimized for enquiries, WhatsApp leads and appointment bookings — not online checkout.

## 1. Features

**Customer site**
- Editorial homepage (hero, featured categories, new arrivals, bridal & jewellery sections, testimonials, store CTA)
- Full catalogue at `/collections` with search, category/occasion filters, sale/rental/new/featured toggles, and sorting
- Product detail pages with image gallery, sizes/colours/material, structured data (SEO) and sticky mobile CTAs
- Dedicated `/rental` and `/sale` collections
- Enquiry modal (product + contact page) and `/book-appointment` form — both write to Google Sheets
- Floating WhatsApp button with configurable number and contextual messages
- Wishlist (localStorage, no login required)
- `/gallery` masonry lookbook, `/about`, `/contact`, legal pages
- `sitemap.xml`, `robots.txt`, OpenGraph metadata, per-product SEO

**Catalogue & shop data**
- Google Spreadsheet is the source of truth — add or edit products, gallery and settings in the sheet (no admin panel)
- Customer enquiries and appointment requests write into the `ENQUIRIES` and `APPOINTMENTS` tabs

## 2. Tech Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons · googleapis (Google Sheets + Drive) · Zod (validation)

There is no separate Express/FastAPI server. HTTP routes stay in Next.js (`/api/enquiries`, `/api/appointments`). Google Sheets access, validation, and models live in the `backend/` package and run in-process with the Next.js server — same APIs, same cookies, same behaviour.

## 3. Folder Structure

```
SKWC/
├── frontend/                 Next.js app (UI + thin /api route handlers)
│   ├── public/
│   ├── src/
│   │   ├── app/              pages, layouts, /api/enquiries, /api/appointments
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/         catalogue facade → backend
│   │   ├── utils/
│   │   └── types/            re-exports backend models
│   ├── package.json
│   ├── next.config.js
│   └── .env.example
│
├── backend/                  Google Sheets data layer (no extra HTTP server)
│   ├── src/
│   │   ├── controllers/      enquiry + appointment write handlers
│   │   ├── routes/           public backend API used by Next.js routes
│   │   ├── services/         GoogleSheetsService
│   │   ├── models/           Product, Enquiry, Appointment, …
│   │   ├── config/           env flags
│   │   ├── database/         Google JWT + Sheets client
│   │   └── utils/            demo data + Drive URL helpers
│   ├── package.json
│   └── .env.example
│
├── .env.example
├── .gitignore
└── README.md
```

## 4. Quick Start (runs immediately, no credentials needed)

```bash
cd backend
npm install

cd ../frontend
npm install
npm run dev
```

From the repo root you can also run `npm run install:all` then `npm run dev`.

Open http://localhost:3000 — the site runs on **demo data** (`backend/src/utils/demo-data.ts`) until you connect a real Google Sheet. Enquiry and appointment writes persist once Sheets is configured.

**Backend**

```bash
cd backend
npm install
npm run dev     # TypeScript check in watch mode (HTTP is served by Next.js)
npm run build   # TypeScript check
```

To build for production locally:
```bash
cd frontend
npm run build
npm run start
```

## 5. Environment setup

Copy examples, then fill in values (never commit the real files):

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

| File | Variables |
| --- | --- |
| `frontend/.env.local` | `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, optional analytics IDs |
| `backend/.env` | `GOOGLE_SHEETS_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_DRIVE_FOLDER_ID` |

Frontend `next.config.js` loads `backend/.env` into the Next.js **server** process. Those values are not exposed to the browser. Never prefix Google credentials with `NEXT_PUBLIC_`.

On Vercel, set the project Root Directory to `frontend` and add **both** frontend and backend variables in the Vercel dashboard (the `backend/.env` file is gitignored and will not be present on the host).

## 6. Connecting Google Sheets (your real data store)

1. Create a new Google Sheet with **7 tabs**, named exactly:
   `PRODUCTS`, `CATEGORIES`, `ENQUIRIES`, `APPOINTMENTS`, `TESTIMONIALS`, `GALLERY`, `SETTINGS`.
2. Add header rows matching the columns below (row 1). Data starts at row 2.

   **PRODUCTS**: `id, product_code, name, slug, category, subcategory, collection, description, short_description, price, sale_price, rental_price, rental_available, purchase_available, sizes, colors, material, fabric, occasion, tags, main_image, gallery_images, featured, new_arrival, sale, status, created_at, updated_at`
   *(list-type columns — sizes/colors/occasion/tags/gallery_images — are pipe-separated, e.g. `S|M|L|XL`)*

   **CATEGORIES**: `id, name, slug, description, image, status, display_order`

   **ENQUIRIES**: `enquiry_id, customer_name, mobile, email, product_id, product_name, message, source, created_at, status, admin_notes`

   **APPOINTMENTS**: `appointment_id, customer_name, mobile, email, appointment_date, preferred_time, occasion, product, requirement, created_at, status, admin_notes`

   **TESTIMONIALS**: `id, customer_name, testimonial, rating, image, status, display_order`

   **GALLERY**: `id, title, category, image_url, description, display_order, status`

   **SETTINGS**: two columns, no header needed — column A is the key, column B is the value, one row per setting: `business_name`, `phone`, `whatsapp_number`, `email`, `address`, `google_maps_url`, `business_hours`, `instagram_url`, `facebook_url`, `logo`, `favicon`, `homepage_headline`, `homepage_subtitle`.

3. **Create a Google Service Account** (Google Cloud Console → IAM & Admin → Service Accounts → Create). Download its JSON key.
4. Enable the **Google Sheets API** and **Google Drive API** for that project.
5. Share your spreadsheet with the service account's email (found in the JSON key as `client_email`) — give it **Editor** access.
6. In `backend/.env` (copy from `backend/.env.example`), set:
   ```
   GOOGLE_SHEETS_ID=<the id from the sheet's URL>
   GOOGLE_SERVICE_ACCOUNT_EMAIL=<client_email from the JSON key>
   GOOGLE_PRIVATE_KEY="<private_key from the JSON key, keep the \n escapes and the quotes>"
   GOOGLE_DRIVE_FOLDER_ID=<the id from the Drive folder URL>
   ```
   Share the Drive folder with the same service account email as **Editor**.
7. Restart the frontend dev server. The site now reads/writes your real sheet through `GoogleSheetsService` (`backend/src/services/sheets.service.ts`) — nothing else talks to Sheets directly.

## 7. Connecting Google Drive

1. Create a Drive folder for product/gallery images.
2. Share it with the service account email as **Editor**.
3. Put Drive share links (or file IDs) in the `main_image` / `image_url` columns of the spreadsheet.

## 8. Deployment (Vercel)

1. Push this repository to GitHub.
2. Import it in Vercel.
3. Set **Root Directory** to `frontend`.
4. Add all variables from `frontend/.env.example` and `backend/.env.example` in Vercel → Settings → Environment Variables (production values, not the placeholders).
5. Set `NEXT_PUBLIC_SITE_URL` to your real domain (needed for correct sitemap/canonical URLs).
6. Deploy. Attach your custom domain in Vercel → Domains.

## 9. Backup Strategy (V1 Google Sheets data store)

- **Duplicate the sheet** regularly: File → Make a copy, dated (e.g. `SKWC Data — backup 2026-09-01`).
- **Download** as `.xlsx` for offline backups: File → Download → Microsoft Excel.
- Keep the service account's JSON key somewhere safe (password manager) — it's the only credential that can be lost without being regenerable from the Sheets UI.

## 10. Future Migration (Sheets → PostgreSQL/Supabase)

The frontend never calls the Google Sheets API directly — everything goes through `GoogleSheetsService` (`backend/src/services/sheets.service.ts`), which exposes plain async methods (`getProducts`, `createEnquiry`, etc.) returning typed objects from `backend/src/models/index.ts`. To migrate:

1. Write an equivalent service implementing the same method signatures against your new database.
2. Swap the service used by backend controllers / `GoogleSheetsService`.
3. No page or component needs to change — they only depend on the `Product`/`Enquiry`/etc. shapes, not on Sheets.

## 11. What's Deliberately Left as Placeholders

Per the project brief, nothing fabricated is shipped as real content: business address, phone, email, hours, social links, testimonials and about-page copy are all placeholders (`demo-data.ts` and the Settings sheet) until you fill them in the `SETTINGS` sheet. Demo products use local images in `frontend/public/images` — replace them by adding rows in the `PRODUCTS` sheet with Google Drive image links.

## 12. Testing Checklist

Before going live, verify: enquiry submission (product page + contact page) appears in the ENQUIRIES sheet, appointment submission appears in APPOINTMENTS, WhatsApp links open with the right number and message, search/filters on `/collections`, wishlist persists across refresh, `/sitemap.xml` and `/robots.txt` resolve, and `npm run build` (from `frontend/`) completes with no type errors.
