import type { Product, ViewTypes } from "~/types";

import classes from "./DeviceList.module.css";
import { Link } from "@remix-run/react";
import { memo } from "react";

const List = memo(
  ({ items, layout }: { items: Product[]; layout: ViewTypes }) => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    return items.map((d, i) => (
      <article
        key={d.id}
        className={classes.card}
        onMouseEnter={(e) => {
          // Preload bigger image if we hover over a list item
          const timer = setTimeout(() => {
            let img = new Image();
            img.src = `https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${
              d.id
            }/default/${d.images.default}.png&w=${280}`;
          }, 150);

          const img = e.currentTarget.querySelector("img");
          if (img) {
            img.style.viewTransitionName = "img" + d.id;
          }

          const cleanup = () => {
            clearTimeout(timer);
          };
          e.currentTarget.addEventListener("mouseleave", cleanup, {
            once: true,
          });
        }}
      >
        <Link
          to={`/devices/${d.id}${layout === "grid" ? "?view=grid" : ""}`}
          className={classes.cardLink}
          viewTransition={reducedMotion}
        >
          <figure>
            <img
              src={`https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${
                d.id
              }/default/${d.images.default}.png&w=${84}`}
              alt=""
              loading="lazy"
              style={{
                viewTransitionName: i < 30 ? "img" + d.id : "initial",
                aspectRatio: "1/1",
              }}
            />
          </figure>
          <div className={classes.content}>
            <span className={classes.line}>{d.line.name}</span>
            <p className={classes.name}>{d.product.name}</p>
            <p className={classes.short}>{d.product.abbrev}</p>
          </div>
        </Link>
      </article>
    ));
  }
);

export default function DeviceList({
  items,
  layout = "grid",
}: {
  items: Product[];
  layout?: "grid" | "list";
}) {
  return (
    <section className={`${classes.wrapper} ${classes[layout]}`}>
      <header>
        <span className={classes.line}>Product Line</span>
        <span className={classes.name}>Name</span>
      </header>
      <List items={items} layout={layout} />
    </section>
  );
}
