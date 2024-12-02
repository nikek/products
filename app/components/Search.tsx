import { flushSync } from "react-dom";

export default function Search({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChange = (search: string) => {
    if (
      "startViewTransition" in document &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches ===
        true
    ) {
      document.startViewTransition(() => {
        flushSync(() => {
          setSearch(search);
        });
      });
    } else {
      setSearch(search);
    }
  };

  return (
    <>
      {" "}
      <input
        type="text"
        name="search"
        id="search"
        onChange={(e) => {
          handleChange(e.currentTarget.value);
        }}
      />
    </>
  );
}
