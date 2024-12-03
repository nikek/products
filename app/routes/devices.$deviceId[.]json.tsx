import type { LoaderFunction } from "@remix-run/cloudflare";
import uidb from "../public.json";

export const loader: LoaderFunction = async ({ params }) => {
  const deviceId = params.deviceId;
  console.log("deviceId", deviceId);

  if (!deviceId) {
    throw new Response("Device ID is required", { status: 400 });
  }

  const device = uidb.devices.find((d) => d.id === deviceId);

  if (!device) {
    throw new Response("Device not found", { status: 404 });
  }

  return Response.json(device);
};
