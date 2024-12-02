import type { Product } from "~/types";
import ProductCard from "../ProductCard/ProductCard";

import classes from "./ProductGrid.module.css";

export default function ProductGrid({ items }: { items: Product[] }) {
  return (
    <section className={classes.grid}>
      {items.map((d, i) => (
        <ProductCard key={d.id} i={i} d={d} />
      ))}
    </section>
  );
}
