# Elijah Adeyeye Portfolio

Personal site built with React and Vite, hosted on Vercel. Pages are prerendered to static HTML at build time so search engines can read them.

## Commands

- `npm run dev`: start the local dev server
- `npm run build:full`: build the site and prerender every page into `dist`
- `npm run lint`: run ESLint

## Adding a page

Add the route to `src/AppRoutes.jsx` and to `ROUTES_TO_PRERENDER` in `prerender.mjs`. Routes missing from that list return a 404 in production and aren't in the sitemap. The sitemap is generated from the same list.

## Environment variables (Vercel)

- `RESEND_API_KEY` and `RESEND_FROM_EMAIL`: send contact form messages

## Database setup

Run `supabase/portfolio_newsletter_subscribers.sql` once in the Supabase SQL Editor to enable the newsletter form.
