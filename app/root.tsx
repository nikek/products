import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/cloudflare";

import classes from "./styles.module.css";
import HeaderLogo from "./components/HeaderLogo/HeaderLogo";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://www.ui.com", crossOrigin: "anonymous" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className={classes.header}>
          <HeaderLogo />
          <p>Devices</p>
          <p>Niklas Ek</p>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
