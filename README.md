# Products from UIDB

This project uses Remix and is deployed to Cloudflare Workers.

- 📖 [Remix docs](https://remix.run/docs)
- 📖 [Remix Cloudflare docs](https://remix.run/guides/vite#cloudflare)

## Development

Run the dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

If you don't already have an account, then [create a cloudflare account here](https://dash.cloudflare.com/sign-up) and after verifying your email address with Cloudflare, go to your dashboard and set up your free custom Cloudflare Workers subdomain.

Once that's done, you should be able to deploy your app:

```sh
npm run deploy
```

## Styling

This project uses CSS modules to scope styles.

## Todo

- [x] Fonts
- [ ] Test main flows
- [x] Header
  - [x] HeaderLogo with hover and focus effects
- [ ] Action bar
  - [x] String search
    - [x] Search as you type
    - [x] Custom filter
    - [x] Highlight search term
  - [ ] Filter on product line using multiselect popover
  - [x] Toggle views (extra: using transitions)
- [x] Table view
- [x] Grid view
- [ ] Single product page
  - [ ] 404 page

## Highlights

- Stagger animation on table rows entering
- View transition when switching to grid view
- View transition to single product page
- Respect reduced motion preferences
- Clickable table row
