export type LayoutTypes = "list" | "grid";
export type Product = {
  id: string;
  line: {
    name: string;
  };
  product: {
    name: string;
  };
  images: {
    default: string;
  };
};
