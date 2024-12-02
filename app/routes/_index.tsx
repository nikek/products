import type { MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";
import Table from "~/components/Table/Table";
import ProductGrid from "~/components/ProductGrid/ProductGrid";
import ViewToggle from "~/components/ViewToggle/ViewToggle";
import Search from "~/components/Search/Search";
import type { LayoutTypes } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "UIDB" },
    { name: "description", content: "Analyze devices and more." },
  ];
};

export default function Index() {
  const [layout, setLayout] = useState<LayoutTypes>("list");
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <section>
        <Search setSearch={setSearch} />
        <ViewToggle layout={layout} setLayout={setLayout} />
      </section>
      {layout === "list" && <Table search={search} />}
      {layout === "grid" && <ProductGrid search={search} />}
    </>
  );
}
