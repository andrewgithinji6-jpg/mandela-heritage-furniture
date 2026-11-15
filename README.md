# Mandela Heritage Furnitures (pitch concept)

React + Vite + Tailwind. Content lives in `src/data/*.json` and is edited through Decap CMS at `/admin`.

## Run locally
npm install && npm run dev   (build: npm run build, output in dist/)

## Deploy on Cloudflare Pages
1. Push this folder to a GitHub repo (branch `main`).
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git. Framework preset: Vite (or build command `npm run build`, output directory `dist`).
3. The `functions/` folder is picked up automatically (it powers the CMS login). No `_redirects` file is needed: with no top-level 404.html, Pages serves index.html for unknown paths (single-page app mode).
4. Optional: attach the client's domain under Custom domains.

## Client admin (Decap CMS at /admin, GitHub login)
1. GitHub > Settings > Developer settings > OAuth Apps > New OAuth App.
   Homepage URL: your live site. Authorization callback URL: `https://YOUR-SITE/api/callback`.
2. Copy the Client ID and generate a Client Secret.
3. Cloudflare Pages project > Settings > Variables and Secrets: add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (secret) for Production, then redeploy.
4. Edit `public/admin/config.yml`: set `repo` (owner/name), `base_url`, `site_url`, `display_url` to the real values, commit and push.
5. Give the client a free GitHub account and add it as a collaborator (Write access) on the repo. They log in at `/admin` with "Login with GitHub".
Optional hardening: protect `/admin*` with Cloudflare Access (Zero Trust) so only the client's email can reach it.

The client can add/edit/hide pieces and photos, change featured collections, and update WhatsApp, email, hours and address. Each save commits to Git and Cloudflare rebuilds the site (about a minute).

## Still to confirm with the showroom
Dimensions, materials, finishes, delivery, care, payment, company history. Placeholders say "shared on enquiry".

## Prices
Prices in `src/data/pieces.json` are indicative placeholders so the design can be pitched. Replace them with the showroom's real prices in the admin (Furniture pieces > Price) before launch. The note shown under prices is editable in Contact and opening hours > Price note.
