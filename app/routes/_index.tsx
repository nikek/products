import type { MetaFunction } from "@remix-run/cloudflare";
import { useEffect, useState } from "react";
import Table from "~/components/Table/Table";
import ProductGrid from "~/components/ProductGrid/ProductGrid";
import ViewToggle from "~/components/ViewToggle/ViewToggle";
import Search from "~/components/Search/Search";
import type { ViewTypes, Product } from "~/types";

import uidb from "../public.json";
import { flushSync } from "react-dom";
import { useSearchParams } from "@remix-run/react";

type SearchParams = {
  view: "grid" | "list";
};

function getTypedSearchParam<T extends keyof SearchParams>(
  searchParams: URLSearchParams,
  key: T,
  defaultValue: SearchParams[T]
): SearchParams[T] {
  return (searchParams.get(key) as SearchParams[T]) ?? defaultValue;
}

export const meta: MetaFunction = () => {
  return [
    { title: "UIDB" },
    { name: "description", content: "Analyze devices and more." },
  ];
};

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamView = getTypedSearchParam(searchParams, "view", "list");
  const [view, setView] = useState<ViewTypes>(searchParamView);

  const [search, setSearch] = useState<string>("");
  const [items, setItems] = useState<Product[]>(uidb.devices);

  useEffect(() => {
    const subset = uidb.devices.filter((d) =>
      d.product.name.toLowerCase().includes(search.toLowerCase())
    );
    setItems(subset);
  }, [search]);

  useEffect(() => {
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
      <section
        style={{
          marginInline: 32,
          display: "flex",
          marginBlock: "1rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <Search setSearch={setSearch} />
        </div>
        <ViewToggle
          view={view}
          setView={(view: string) =>
            setSearchParams(new URLSearchParams({ view }))
          }
        />
      </section>
      {view === "list" && <Table items={items} />}
      {view === "grid" && <ProductGrid items={items} />}
    </>
  );
}
