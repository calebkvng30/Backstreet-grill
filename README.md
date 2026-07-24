# Backstreet Grill — Website

A responsive, conversion-focused website for Backstreet Grill (15 Stanley St, Richmond Hill, Gqeberha), built around online menu browsing, a WhatsApp order cart, and local SEO.

## Project structure

```
backstreet-grill/
├── index.html          # Main page
├── src/
│   ├── styles.css       # All styling
│   └── script.js        # Menu tabs, cart logic, WhatsApp checkout
├── assets/
│   └── images/          # Compressed photos used on the site
├── package.json
└── README.md
```

## Features

- Full categorized menu (Starters, Black Iron mains, Sides & Sauces, Burgers, Cocktails, Sweets, Wine)
- "+" add-to-cart on every priced item, with a slide-in cart drawer and quantity controls
- One-tap **WhatsApp checkout** — builds an itemized order message and opens it in WhatsApp, sent to +27 67 327 6265
- Local SEO: Restaurant schema.org markup (address, geo, rating, hours), meta tags, sitemap-friendly single page
- Fully responsive, no build step or dependencies — plain HTML/CSS/JS

## Before you launch

- **Hours**: currently set to Tue–Sat, 5pm–10pm (dinner only), pieced together from a door sign photo. Confirm this is exact.
- **Sweets pricing**: brownie, sticky toffee pudding, crème brûlée etc. have no listed prices, so they show "Ask server" instead of an add-to-cart button. Send prices if you want them orderable too.
- **Domain**: the canonical URL and schema markup use a placeholder `https://backstreetgrill.co.za/` — update once you have a real domain.

## Deploying

### GitHub Pages
1. Create a new repo (e.g. `backstreet-grill`) and push all files in this folder to it.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — your site will be live at `https://<your-username>.github.io/backstreet-grill/` within a minute or two.

### Netlify
1. Drag and drop this folder into [app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo for auto-deploys.
2. No build command needed — it's a static site.

### Vercel
1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: "Other". No build command needed.

### cPanel / shared hosting
1. Zip the contents of this folder and upload via File Manager, or connect via FTP.
2. Extract into `public_html/` (or a subfolder if using a subdomain).

## Editing the menu

Menu items live in `index.html` inside each `.item-list` block, written as a simple shorthand that `src/script.js` parses automatically:

```
ITEM:Name:Description (optional):Price:unique-id
```

Leave the description blank (`::`) if there isn't one. Set price to `0` to show "Ask server" instead of an add-to-cart button (used for items without a listed price).
