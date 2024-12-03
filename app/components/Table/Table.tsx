import classes from "./Table.module.css";
import uidb from "../../public.json";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import type { Product } from "~/types";

export default function Table({ items }: { items: Product[] }) {
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    setDone(true);
  });
  return (
    <div className={classes.tableWrapper}>
      <table className={classes.myTable}>
        <colgroup>
          <col style={{ width: "max-content" }} />
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
              className={done ? "" : classes.transparent}
              style={
                {
                  "--delay": `${i * 20 > 1000 ? 1000 : i * 20}ms`,
                } as React.CSSProperties
              }
              onClick={(e) => {
                console.log(e);
                (e.target as HTMLElement).querySelector("a")!.click();
              }}
            >
              <td>
                <Link
                  to={`devices/${d.id}`}
                  className={classes.link}
                  viewTransition
                ></Link>
                <img
                  src={`https://images.svc.ui.com/?u=https://static.ui.com/fingerpri
nt/ui/images/${d.id}/default/${d.images.default}.png&w=${24}`}
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
