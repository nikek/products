import uidb from "../../public.json";
import ProductCard from "../ProductCard/ProductCard";

import classes from "./ProductGrid.module.css";

export default function ProductGrid({ search }: { search: string }) {
  return (
    <section className={classes.grid}>
      {uidb.devices
        .filter((d) =>
          d.product.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((d, i) => (
          <ProductCard key={d.id} i={i} d={d} />
        ))}
    </section>
  );
}
