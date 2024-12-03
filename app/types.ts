export type ViewTypes = "list" | "grid";
export interface Product {
  id: string;
  line: {
    name: string;
    id: string;
  };
  product: {
    name: string;
    abbrev: string;
  };
  images: {
    default: string;
  };
  unifi?: {
    network?: {
      numberOfPorts?: number;
      radios?: {
        [key: string]:
          | {
              gain?: number;
              maxPower?: number;
              maxSpeedMegabitsPerSecond?: number;
            }
          | undefined;
      };
    };
  };
}
