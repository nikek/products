import invariant from "tiny-invariant";
import uidb from "../public.json";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/server-runtime";
import Device from "~/components/DeviceSingle/DeviceSingle";
import type { Product } from "~/types";

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<{
  current: Product;
  prev?: Product;
  next?: Product;
}> => {
  invariant(params.deviceId, "Missing device id");

  const deviceIndex = uidb.devices.findIndex((d) => d.id === params.deviceId);

  if (deviceIndex === -1)
    throw new Response("No device found", { status: 404 });

  return {
    current: uidb.devices[deviceIndex] as Product,
    prev: uidb.devices[deviceIndex - 1] as Product | undefined,
    next: uidb.devices[deviceIndex + 1] as Product | undefined,
  };
};

const LeftCaret = ({ style }: { style?: React.CSSProperties }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M12.5 16C12.367 16 12.235 15.947 12.136 15.843L7.287 10.701C7.102 10.513 7 10.264 7 9.99998C7 9.73598 7.102 9.48698 7.287 9.29898L12.136 4.15697C12.325 3.95597 12.642 3.94697 12.843 4.13597C13.044 4.32597 13.053 4.64197 12.864 4.84297L8 9.99998L8.01 10.01L12.864 15.156C13.053 15.357 13.044 15.673 12.843 15.863C12.746 15.955 12.623 16 12.5 16Z"
      fill="#838691"
    />
  </svg>
);

export default function devices() {
  const { current, prev, next } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <main>
      <nav style={{ margin: "1rem", display: "flex", gap: "4px" }}>
        <div style={{ flex: 1, justifyItems: "flex-start" }}>
          <Link
            className="btn big-btn-shadow btn-back"
            to={`/${searchParams.get("view") === "grid" ? "?view=grid" : ""}`}
            viewTransition={
              typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: no-preference)")
                .matches
            }
          >
            <LeftCaret /> Back
          </Link>
        </div>
        {prev ? (
          <Link className="btn big-btn-shadow" to={`/devices/${prev?.id}`}>
            <LeftCaret />
          </Link>
        ) : null}
        {next ? (
          <Link className="btn big-btn-shadow" to={`/devices/${next?.id}`}>
            <LeftCaret style={{ transform: "rotate(180deg)" }} />
          </Link>
        ) : null}
      </nav>
      <Device device={current} />
    </main>
  );
}
