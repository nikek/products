import uidb from "../../public.json";

import classes from "./ProductGrid.module.css";

export default function ProductGrid({ search }: { search: string }) {
  return (
    <section className={classes.grid}>
      {uidb.devices
        .filter((d) =>
          d.product.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((d, i) => (
          <div
            key={d.id}
            className={classes.card}
            style={
              {
                "--delay": `${i * 20 > 1000 ? 1000 : i * 20}ms`,
              } as React.CSSProperties
            }
          >
            <img
              src={`https://images.svc.ui.com/?u=https://static.ui.com/fingerpri
nt/ui/images/${d.id}/default/${d.images.default}.png&w=${125}`}
              alt=""
              width={125}
              style={{ viewTransitionName: i < 30 ? "img" + d.id : "initial" }}
            />
            <p>{d.line.name}</p>
            <p>{d.product.name}</p>
          </div>
        ))}
    </section>
  );
}
