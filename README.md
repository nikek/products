# Products from UIDB

This project uses Remix and is deployed to Cloudflare Workers.

## Features
- 🔍 Device search as you type
- 🏷️ Filter by product lines
- 📱 Responsive grid/list views
- ⚡ View transitions animations
- 🎨 Consistent UI styling with custom properties

## Tech Stack
- Framework: [Remix](https://remix.run)
- Deployment: [Remix Cloudflare docs](https://remix.run/guides/vite#cloudflare)
- UI Components: [React Aria](https://react-spectrum.adobe.com/react-aria/)
- Testing: [Playwright](https://playwright.dev)
- Styling: [CSS Modules](https://github.com/css-modules/css-modules)

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
- [x] Test main flows
- [x] Header
  - [x] HeaderLogo with hover and focus effects
- [x] Action bar
  - [x] String search
    - [x] Search as you type
    - [x] Custom filter
    - [x] Highlight search term
  - [x] Filter on product line using multiselect popover
  - [x] Toggle views (extra: using transitions)
- [x] Table view
- [x] Grid view
- [x] Single product page
  - [x] 404 page

## Highlights

- View transition when switching to grid view
- View transition to single product page
- Respect reduced motion preferences
- Clickable table row (it's not a table, it's grid and each row is using subgrid to lay out its children aligned in columns)
- Responsive design, works on mobile
- Using css containment to enhance performance
- Using the same html structure for listed items and grid items, so we don't have to draw all 525 items when switching view, we only change the css.

## Future improvements

- [ ] Add eslint
- [ ] More component tests with vitest and testing-library
- [ ] Fix cases where text is overflowing or wrapping
- [ ] Put shared state in a zustand store or similar, it will:
  - Drastically reduce props passing clutter by subscribing to only the state need where it is needed instead.
  - Reduce re-renders
  - Make it possible to have business logic in action functions that only affect the state store
  - Easily sync and persist state to localstorage and the address bar, further cleaning up manual handling of query params.