NU LIMITS — Shop source
=======================

Futuristic storefront in the "Nu Limits" theme: hero with outlined type and
scanline motion, frosted inventory panel with paged slots, product view,
bag, checkout, plus an admin "Manage store" panel for adding/removing
inventory slots, switching backgrounds and editing store copy.

WHAT'S INSIDE
-------------
src/pages/Shop.jsx                  the storefront page
src/components/shop/*.jsx           all shop components (18 files)
src/lib/shop.js                     price formatting, defaults, background list
base44/entities/ShopItem.jsonc      product records (name, price, image, stock, sizes)
base44/entities/ShopOrder.jsonc     checkout orders
base44/entities/ShopSettings.jsonc  store copy + active background + currency
reference/index.css                 full stylesheet (font import, nu tokens, utilities)
reference/tailwind.config.js        full config (nu colors, font, glow, animations)
reference/App.jsx                   route registration example

REQUIREMENTS
------------
- React 18 + Vite, Tailwind CSS 3, framer-motion, lucide-react, react-router-dom
- A Base44 app for data storage and image uploads
  (the code imports `base44` from `@/api/base44Client`)

INTEGRATING INTO ANOTHER REACT + BASE44 APP
-------------------------------------------
1. Copy base44/entities/*.jsonc into that app's base44/entities/ folder.
2. Copy src/pages/Shop.jsx, src/components/shop/ and src/lib/shop.js into the same paths.
3. index.css: copy the Google Fonts @import line to the very top, then copy the
   "Nu Limits shop surface" block (.nu-scope + the @layer utilities rules).
4. tailwind.config.js: merge the `nu` color block, `fontFamily.nu`,
   `boxShadow` ('nu-glow', 'nu-soft') and the nu-* keyframes + animations.
5. Register the route, e.g. <Route path="/shop" element={<Shop />} />.
6. Add at least one ShopSettings record and a few ShopItem records
   (the Manage store panel can create the items for you once an admin is signed in).

INTEGRATING INTO A PLAIN HTML SITE
----------------------------------
This page is a React app backed by the Base44 database, so it does not drop into
a static .html file on its own. Publish this app and link or embed it instead:

  <a href="https://YOUR-PUBLISHED-ADDRESS/">Enter the shop</a>

  <iframe src="https://YOUR-PUBLISHED-ADDRESS/"
          style="width:100%;height:100vh;border:0"
          title="Nu Limits shop" allowfullscreen></iframe>

Replace YOUR-PUBLISHED-ADDRESS with the live address shown after publishing.
The Manage store panel (menu > Manage store) has both snippets ready to copy.

NOTES
-----
- Product images uploaded in Manage store use public file storage, so anyone
  with the image link can open them (required for a public shopfront).
- Checkout records each order in ShopOrder; no card payment is wired up yet.
- ShopItem and ShopSettings writes are admin-only via row-level security.
