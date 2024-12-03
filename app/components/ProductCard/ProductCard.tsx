import classes from "./ProductCard.module.css";
import { Product } from "../../types";

export default function ProductCard({ d, i }: { d: Product; i: number }) {
  return (
    <article
      className={classes.card}
      style={
        {
          "--delay": `${i * 20 > 1000 ? 1000 : i * 20}ms`,
        } as React.CSSProperties
      }
    >
      <figure>
        <img
          src={`https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${
            d.id
          }/default/${d.images.default}.png&w=${84}`}
          alt=""
          loading="lazy"
          style={{ viewTransitionName: i < 30 ? "img" + d.id : "initial" }}
        />
      </figure>
      <span className={classes.label}>{d.line.name}</span>
      <p className={classes.name}>{d.product.name}</p>
      <p className={classes.short}>{d.product.abbrev}</p>
    </article>
  );
}
