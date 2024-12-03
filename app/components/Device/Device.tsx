import type { Product } from "~/types";
import classes from "../components/Device/Device.module.css";

export default function Device({ device }: { device: Product }) {
  return <div>hej {device.product.name}</div>;
}
