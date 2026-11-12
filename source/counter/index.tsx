"use client";
import { classNames } from "@sharadox/web-library/class-name";
import { useState } from "react";
import type { CounterProperties } from "@sharadox/privacy-web-library/counter/type";
import styles from "./index.module.scss";

/** An example client component with a CSS module: restyle it through `className`. */
export function Counter({ label, className }: CounterProperties) {
  const [count, setCount] = useState(0);
  return (
    <button type="button" className={classNames(styles.counter, className)} onClick={() => setCount(count + 1)}>
      {label} {count}
    </button>
  );
}
