import { useState } from "react";
import css from "./Counter.module.scss";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((state) => state + 1);

  return (
    <div>
      {count}
      <br />
      <br />
      <button className={css.root} onClick={increment}>
        increment
      </button>
    </div>
  );
};
