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

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    setSelected(
      Array.from(event.target.form.elements)
        .filter((e) => (e as HTMLInputElement).checked)
        .map((e) => (e as HTMLInputElement).value)
    );
  };

  const handleReset = () => {
    setSelected([]);
  };

  useEffect(() => {
    setFilter(selected);
  }, [selected]);

  return (
    <DialogTrigger>
      <Button className="btn">Filter</Button>
      <Popover>
        <Dialog>
          <form
            action="#"
            onSubmit={(e) => e.preventDefault()}
            onChange={handleChange}
          >
            <fieldset className={classes.lineFilter}>
              <h2>Product Line</h2>
              <ol>
                {lines.map((line) => (
                  <li key={line.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected.includes(line.id)}
                        value={line.id}
                      />
                      {line.name}
                    </label>
                  </li>
                ))}
              </ol>
              <button
                className="btn btn-danger"
                disabled={!selected.length}
                onClick={handleReset}
              >
                Reset
              </button>
            </fieldset>
          </form>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
