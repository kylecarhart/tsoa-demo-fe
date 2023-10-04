"use client";
import { useState } from "react";
import { Item, ItemsApi } from "../@generated/src";
import styles from "./page.module.css";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <main className={styles.main}>
      <button
        onClick={() => {
          new ItemsApi().getAllItems().then((items) => {
            setItems(items);
          });
        }}
      >
        Test button click
      </button>
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.id}</div>
        ))}
      </div>
    </main>
  );
}
