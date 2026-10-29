# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

```
# Development server (http://localhost:3000)
node node_modules/next/dist/bin/next dev

# Production build
node node_modules/next/dist/bin/next build

# Start production server
node node_modules/next/dist/bin/next start

# Lint
node node_modules/next/dist/bin/next lint
```

> Note: `npx next ...` or `next ...` may not resolve correctly; use the explicit `node node_modules/next/dist/bin/next` form as defined in `package.json` scripts. There is no test framework configured.

## Architecture Overview

**GiftPortal** is a fully client-side Next.js 14 (App Router) premium gifting e-commerce storefront. There is no backend — all persistence is via `localStorage` through a service layer designed for eventual MongoDB Atlas migration.

### Routes

- `/` — Renders `<Marketplace />`, the main storefront shell
- `/admin` — Renders `<AdminPanel />` as a standalone page (also accessible inline from `/` via a hidden footer link)

### Data Flow

`lib/db.js` is the single data service. All its methods are `async` and guard against SSR (`typeof window === 'undefined'`). It reads/writes to `localStorage` under fixed keys (`giftportal_inventory`, `giftportal_orders`, etc.) and fires `window.dispatchEvent(new Event('storage'))` after every write to trigger cross-component re-sync.

`data/products.js` holds the static seed arrays (`PRODUCTS`, `DEALS`) that `lib/db.js` falls back to when localStorage is empty.

### Product Data Shape

```js
{
  id: Number,
  name: String,
  emoji: String,
  tag: String | null,
  cat: 'fruit' | 'veg' | 'fruit-combo' | 'veg-combo' | 'exotic' | 'premium-veg',
  rating: Number,
  img: String,          // Unsplash URL
  isSoldOut: Boolean,   // optional, admin-togglable
  types: [
    {
      label: String,    // e.g. "Premium", "Regular"
      variants: [{ label: String, price: Number, original: Number }]
    }
  ]
}
```

Cart item keys use the format `"${product.id}-${typeLabel}-${variantLabel}"` to differentiate the same product across types/variants.

### Component Responsibilities

- **`Marketplace`** — Top-level state owner. Holds user session, cart, products, deals, orders, notifications. Handles checkout (`db.saveOrder`), auth, and real-time sync via `storage` events. Conditionally renders `<AdminPanel>` inline when `isAdminOpen` is true (in addition to the dedicated `/admin` route).
- **`AdminPanel`** — Fully self-contained admin UI with its own PIN-based login. PIN is matched against the `giftportal_admins` localStorage key. Manages all admin tabs (dashboard, orders, logistics, inventory, deals, coupons, areas, customers, admins & vendors, system settings) entirely within this single component.
- **`Cart`** — Multi-step drawer (cart → address → payment). Reads `areas`, `coupons`, and `settings` from `db` to compute delivery fee and validate coupon codes.
- **`AuthModal`** — Customer auth using username + 4-digit PIN stored per-user at `user_${username}` in localStorage.
- **`Sidebar`** — Static category list; filters are driven by `cat` field on products.

### Order Lifecycle

1. Customer places order → `db.saveOrder()` assigns a 4-digit ID, auto-assigns an approved vendor matching the delivery area (if any).
2. Admin sees order in **Order Desk** tab → accepts or rejects.
3. On accept → appears in **Logistics** tab for delivery assignment (junior admin, internal vendor, or third-party prompt).
4. Admin marks **Delivered** (requires confirmation) → locks the order row.
5. Customer can submit a one-time rating from "My Orders" after delivery.

### Admin Credentials (default, stored in localStorage on first load)

- Super admin: `admin` / PIN `1234` — full permissions
- Junior admin: `jr_admin` / PIN `0000` — orders + logistics only

### Cross-tab Sync

Any `db.save*` call dispatches `new Event('storage')` on `window`. Both `Marketplace` and `AdminPanel` listen for `storage` events to reload data, enabling live-sync between open tabs.

### Path Alias

`@/*` resolves to the project root (configured in `jsconfig.json`). Use `@/lib/db`, `@/data/products`, `@/components/...`, etc.

### Styling Notes

- Tailwind CSS with custom font (`Poppins` via Google Fonts in `layout.js`), custom animations (`marquee`, `pop-in`, `slide-up`, `shake`), and a `card-hover` box-shadow utility — all defined in `tailwind.config.js`.
- `clsx` + `tailwind-merge` are available for conditional class merging.
- Icon library: `lucide-react` (transpiled via `next.config.mjs`).
