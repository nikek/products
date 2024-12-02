import type { MetaFunction } from "@remix-run/cloudflare";
import { useEffect, useState } from "react";
import Table from "~/components/Table/Table";
import ProductGrid from "~/components/ProductGrid/ProductGrid";
import ViewToggle from "~/components/ViewToggle/ViewToggle";
import Search from "~/components/Search/Search";
import type { LayoutTypes, Product } from "~/types";

import uidb from "../public.json";
import { flushSync } from "react-dom";

export const meta: MetaFunction = () => {
  return [
    { title: "UIDB" },
    { name: "description", content: "Analyze devices and more." },
  ];
};

export default function Index() {
  const [layout, setLayout] = useState<LayoutTypes>("list");
  const [layoutUsed, setLayoutUsed] = useState<LayoutTypes>("list");

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
          setLayoutUsed(layout);
        });
      });
    } else {
      setLayoutUsed(layout);
    }
  }, [layout]);

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
        <ViewToggle layout={layoutUsed} setLayout={setLayout} />
      </section>
      {layoutUsed === "list" && <Table items={items} />}
      {layoutUsed === "grid" && <ProductGrid items={items} />}
    </>
  );
}
