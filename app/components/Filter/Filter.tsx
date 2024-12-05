import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import classes from "./Filter.module.css";
import { useEffect, useState } from "react";

type FilterProps = { id: string; name: string }[];

export default function Filter({
  lines,
  setFilter,
}: {
  lines: FilterProps;
  setFilter: (filter: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  // Single function to handle both checkbox changes and form reset
  const handleSelection = (value?: string[]) => {
    const newSelection = value ?? [];
    setSelected(newSelection);
    setFilter(newSelection);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSelection(
      e.target.checked
        ? [...selected, value]
        : selected.filter((id) => id !== value)
    );
  };

  return (
    <DialogTrigger>
      <Button className="btn">Filter</Button>
      <Popover>
        <Dialog className={classes.lineFilter}>
          <h2>Product Line</h2>
          <ol>
            {lines.map((line) => (
              <li key={line.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selected.includes(line.id)}
                    value={line.id}
                    onChange={handleCheckboxChange}
                  />
                  {line.name}
                </label>
              </li>
            ))}
          </ol>
          <button
            className="btn btn-danger"
            disabled={!selected.length}
            onClick={() => handleSelection()}
            type="button"
          >
            Reset
          </button>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
