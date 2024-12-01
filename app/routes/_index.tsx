import type { MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";
import Table from "~/components/Table/Table";
import { flushSync } from "react-dom";
import ProductGrid from "~/components/ProductGrid/ProductGrid";

export const meta: MetaFunction = () => {
  return [
    { title: "UIDB" },
    { name: "description", content: "Analyze devices and more." },
  ];
};

export default function Index() {
  const size = 48;
  const [isList, setIsList] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <section>
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
        />
        <button
          onClick={() => {
            if ("startViewTransition" in document) {
              document.startViewTransition(() => {
                flushSync(() => {
                  setIsList(!isList);
                });
              });
            } else {
              setIsList(!isList);
            }
          }}
        >
          Toggle
        </button>
      </section>
      {isList ? <Table search={search} /> : <ProductGrid search={search} />}
    </>
  );
}
