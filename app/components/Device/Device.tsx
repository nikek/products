import type { Product } from "~/types";
import classes from "./Device.module.css";
import { Link } from "@remix-run/react";

export default function Device({ device }: { device: Product }) {
  console.log(device);
  const maxPower = device.unifi?.network?.radios?.na?.maxPower;
  const maxSpeed = device.unifi?.network?.radios?.na?.maxSpeedMegabitsPerSecond;
  const numberOfPorts = device.unifi?.network?.numberOfPorts;

  return (
    <article className={classes.article}>
      <figure>
        <img
          src={`https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${
            device.id
          }/default/${device.images.default}.png&w=${280}`}
          alt=""
          style={{ viewTransitionName: "img" + device.id, aspectRatio: "1/1" }}
        />
      </figure>
      <div>
        <header>
          <h1 className={classes.h1}>{device.product.name}</h1>
          <p className={classes.line}>{device.line.name}</p>
        </header>
        <dl>
          <dt>Line</dt>
          <dd>{device.line.name}</dd>
          <dt>ID</dt>
          <dd>{device.line.id}</dd>
          <dt>Name</dt>
          <dd>{device.product.name}</dd>
          <dt>Short Name</dt>
          <dd>{device.product.abbrev}</dd>
          {maxPower ? (
            <>
              <dt>Max. Power</dt>
              <dd>{maxPower}</dd>
            </>
          ) : null}
          {maxSpeed ? (
            <>
              <dt>Speed</dt>
              <dd>{maxSpeed}</dd>
            </>
          ) : null}
          {numberOfPorts ? (
            <>
              <dt>Number of Ports</dt>
              <dd>{numberOfPorts}</dd>
            </>
          ) : null}
        </dl>
        <Link
          to={`/devices/${device.id}.json`}
          className={classes.jsonLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          View JSON
        </Link>
      </div>
    </article>
  );
}
