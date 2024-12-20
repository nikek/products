import {
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Text,
} from "react-aria-components";
import uidb from "../../public.json";

const items = uidb.devices;

import classes from "./Search.module.css";
import { useState } from "react";
import type { Product } from "~/types";

const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={classes.searchIcon}
  >
    <path
      d="M13.8529 13.1465L11.0059 10.3025C11.9369 9.21149 12.4999 7.79749 12.4999 6.25049C12.4999 2.79849 9.70188 0.000488281 6.24988 0.000488281C2.79788 0.000488281 -0.00012207 2.79849 -0.00012207 6.25049C-0.00012207 9.70249 2.79788 12.5005 6.24988 12.5005C7.79488 12.5005 9.20788 11.9385 10.2989 11.0095L13.1469 13.8535C13.2449 13.9515 13.3719 13.9995 13.4999 13.9995C13.6279 13.9995 13.7559 13.9505 13.8539 13.8525C14.0489 13.6585 14.0489 13.3415 13.8529 13.1465ZM0.999878 6.25049C0.999878 3.35549 3.35488 1.00049 6.24988 1.00049C9.14488 1.00049 11.4999 3.35549 11.4999 6.25049C11.4999 9.14549 9.14488 11.5005 6.24988 11.5005C3.35488 11.5005 0.999878 9.14549 0.999878 6.25049Z"
      fill="#838691"
    />
  </svg>
);

const regex = (substring: string) => new RegExp(`(${substring})`, "gi");

function formatText(str: string, substring: string) {
  if (!substring) return str;
  return str.replace(regex(substring), "<mark>$1</mark>");
}

export default function Search({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filterItems = (items: Product[], searchTerm: string) => {
    if (!searchTerm) return items;
    const searchRegex = regex(searchTerm);
    return items.filter(
      (item) =>
        searchRegex.test(item.product.name) ||
        searchRegex.test(item.product.abbrev)
    );
  };

  const filteredItems = filterItems(items, searchTerm);

  return (
    <div className={classes.searchBox}>
      <ComboBox
        allowsCustomValue={true} // To search for sub-strings not matching any exact item
        onInputChange={(value) => {
          setSearch(value);
          setSearchTerm(value);
        }}
      >
        <div className={classes.searchInput}>
          <Label>
            <span className="visually-hidden">Search</span>
            <SearchIcon />
          </Label>
          <Input placeholder="Search" />
        </div>
        <Popover>
          <ListBox>
            {filteredItems.map((d, i) => (
              <ListBoxItem
                key={i}
                textValue={d.product.name.toLocaleLowerCase()}
              >
                <Text
                  slot="label"
                  dangerouslySetInnerHTML={{
                    __html: formatText(d.product.name, searchTerm),
                  }}
                />
                <Text
                  slot="description"
                  dangerouslySetInnerHTML={{
                    __html: formatText(d.product.abbrev, searchTerm),
                  }}
                />
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </ComboBox>
    </div>
  );
}
