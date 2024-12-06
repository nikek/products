import type { MetaFunction } from "@remix-run/cloudflare";
import { useEffect, useState } from "react";
import ViewToggle from "~/components/ViewToggle/ViewToggle";
import Search from "~/components/Search/Search";
import type { ViewTypes, Product } from "~/types";

import uidb from "../public.json";
import Filter from "~/components/Filter/Filter";
import { flushSync } from "react-dom";
import { useSearchParams } from "@remix-run/react";
import ProductList from "~/components/DeviceList/DeviceList";

const lines = Array.from(
  uidb.devices
    .reduce((map, d) => {
      map.set(d.line.id, { id: d.line.id, name: d.line.name });
      return map;
    }, new Map())
    .values()
);

export const meta: MetaFunction = () => {
  return [
    { title: "UIDB" },
    { name: "description", content: "Analyze devices and more." },
  ];
};

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamView =
    (searchParams.get("view") as "grid" | "list") ?? "list"; // get type safe view param or default to list
  const [view, setView] = useState<ViewTypes>(searchParamView);

  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string[]>([]);
  const [items, setItems] = useState<Product[]>(uidb.devices);

  useEffect(() => {
    const subset = uidb.devices.filter(
      (d) =>
        d.product.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter.length === 0 || filter.includes(d.line.id))
    );
    setItems(subset);
  }, [search, filter]);

  useEffect(() => {
    if (view === searchParamView) return;
    if (
      "startViewTransition" in document &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches ===
        true
    ) {
      document.startViewTransition(() => {
        flushSync(() => {
          setView(searchParamView);
        });
      });
    } else {
      setView(searchParamView);
    }
  }, [searchParams.get("view")]);

  return (
    <>
      <section className="controls">
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Search setSearch={setSearch} />
          <small style={{ width: "max-content", whiteSpace: "nowrap" }}>
            {items.length} devices
          </small>
        </div>
        <ViewToggle
          view={view}
          setView={(view: string) =>
            setSearchParams(new URLSearchParams({ view }))
          }
        />
        <Filter lines={lines} setFilter={setFilter} />
      </section>
      <ProductList items={items} layout={view} />
    </>
  );
}
