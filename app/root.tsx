import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/cloudflare";

import "./styles.css";
import Header from "./components/Header/Header";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://www.ui.com", crossOrigin: "anonymous" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");
  }, []);

  return (
    <html lang="en" className="no-js">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico?v3" sizes="any" />
        <link rel="icon" href="/favicon.svg?v3" type="image/svg+xml" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const status =
    error && typeof error === "object" && "status" in error
      ? (error.status as number)
      : 500;

  console.log(error);

  return (
    <main className="not-found">
      <div>
        <h1>{status}</h1>

        <h2>
          {error && typeof error === "object" && "statusText" in error
            ? (error.statusText as string)
            : "Internal server error"}
        </h2>
        <p>
          {error instanceof Error
            ? error.message
            : status === 404
            ? "The page you're looking for doesn't exist or has been moved."
            : ""}
        </p>
        <Link to="/" className=" cta">
          Return Home
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return <Outlet />;
}
