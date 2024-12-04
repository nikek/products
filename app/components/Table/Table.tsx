import classes from "./Table.module.css";
import uidb from "../../public.json";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import type { Product } from "~/types";

export default function Table({ items }: { items: Product[] }) {
  return (
    <div className={classes.tableWrapper}>
      <table className={classes.myTable}>
        <colgroup>
          <col style={{ width: "40px" }} />
          <col style={{ width: "50%" }} />
          <col style={{ width: "50%" }} />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>Product Line</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d, i) => (
            <tr
              key={d.id}
              style={
                {
                  "--delay": `${i * 20 > 1000 ? 1000 : i * 20}ms`,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                // Preload image if we hover over it for more than 100ms
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

                const cleanup = () => clearTimeout(timer);
                e.currentTarget.addEventListener("mouseleave", cleanup, {
                  once: true,
                });
              }}
            >
              <td>
                <Link
                  to={`devices/${d.id}`}
                  className={classes.link}
                  viewTransition
                ></Link>
                <img
                  id={`img${d.id}`}
                  src={`https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${
                    d.id
                  }/default/${d.images.default}.png&w=${24}`}
                  alt=""
                  width={24}
                  loading="lazy"
                  style={{
                    viewTransitionName: i < 30 ? "img" + d.id : "initial",
                  }}
                />
              </td>
              <td>{d.line.name}</td>
              <td>{d.product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
