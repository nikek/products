import { flushSync } from "react-dom";
import classes from "./ViewToggle.module.css";
import type { LayoutTypes } from "~/types";

const ListIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 2C1.77614 2 2 1.77614 2 1.5C2 1.22386 1.77614 1 1.5 1C1.22386 1 1 1.22386 1 1.5C1 1.77614 1.22386 2 1.5 2ZM1.5 7.5C1.77614 7.5 2 7.27614 2 7C2 6.72386 1.77614 6.5 1.5 6.5C1.22386 6.5 1 6.72386 1 7C1 7.27614 1.22386 7.5 1.5 7.5ZM1.5 13C1.77614 13 2 12.7761 2 12.5C2 12.2239 1.77614 12 1.5 12C1.22386 12 1 12.2239 1 12.5C1 12.7761 1.22386 13 1.5 13ZM1.5 3C2.32843 3 3 2.32843 3 1.5C3 0.671573 2.32843 0 1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3ZM13.25 0.75H4.75C4.336 0.75 4 1.086 4 1.5C4 1.914 4.336 2.25 4.75 2.25H13.25C13.664 2.25 14 1.914 14 1.5C14 1.086 13.664 0.75 13.25 0.75ZM1.5 8.5C2.32843 8.5 3 7.82843 3 7C3 6.17157 2.32843 5.5 1.5 5.5C0.671573 5.5 0 6.17157 0 7C0 7.82843 0.671573 8.5 1.5 8.5ZM13.25 6.25H4.75C4.336 6.25 4 6.586 4 7C4 7.414 4.336 7.75 4.75 7.75H13.25C13.664 7.75 14 7.414 14 7C14 6.586 13.664 6.25 13.25 6.25ZM1.5 14C2.32843 14 3 13.3284 3 12.5C3 11.6716 2.32843 11 1.5 11C0.671573 11 0 11.6716 0 12.5C0 13.3284 0.671573 14 1.5 14ZM13.25 11.75H4.75C4.336 11.75 4 12.086 4 12.5C4 12.914 4.336 13.25 4.75 13.25H13.25C13.664 13.25 14 12.914 14 12.5C14 12.086 13.664 11.75 13.25 11.75Z"
      fill="#838691"
    />
  </svg>
);

const GridIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 0H5.5C6.052 0 6.5 0.448 6.5 1V5.5C6.5 6.052 6.052 6.5 5.5 6.5H1C0.448 6.5 0 6.052 0 5.5V1C0 0.448 0.448 0 1 0ZM5.5 5.5V1H1V5.5H5.5Z"
      fill="#838691"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 7.5H5.5C6.052 7.5 6.5 7.948 6.5 8.5V13C6.5 13.552 6.052 14 5.5 14H1C0.448 14 0 13.552 0 13V8.5C0 7.948 0.448 7.5 1 7.5ZM5.5 13V8.5H1V13H5.5Z"
      fill="#838691"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 0H8.5C7.948 0 7.5 0.448 7.5 1V5.5C7.5 6.052 7.948 6.5 8.5 6.5H13C13.552 6.5 14 6.052 14 5.5V1C14 0.448 13.552 0 13 0ZM13 1V5.5H8.5V1H13Z"
      fill="#838691"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5 7.5H13C13.552 7.5 14 7.948 14 8.5V13C14 13.552 13.552 14 13 14H8.5C7.948 14 7.5 13.552 7.5 13V8.5C7.5 7.948 7.948 7.5 8.5 7.5ZM13 13V8.5H8.5V13H13Z"
      fill="#838691"
    />
  </svg>
);

export default function ViewToggle({
  layout,
  setLayout,
}: {
  layout: LayoutTypes;
  setLayout: React.Dispatch<React.SetStateAction<LayoutTypes>>;
}) {
  const handleChange = (layout: LayoutTypes) => {
    if (
      "startViewTransition" in document &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches ===
        true
    ) {
      document.startViewTransition(() => {
        flushSync(() => {
          setLayout(layout);
        });
      });
    } else {
      setLayout(layout);
    }
  };
  return (
    <div className={classes.viewToggle}>
      <button
        className={`btn${layout === "list" ? " active" : ""}`}
        onClick={() => handleChange("list")}
      >
        <ListIcon />
      </button>
      <button
        className={`btn${layout === "grid" ? " active" : ""}`}
        onClick={() => handleChange("grid")}
      >
        <GridIcon />
      </button>
    </div>
  );
}
