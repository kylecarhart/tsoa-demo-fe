"use client";
import { useState } from "react";
import { Item, ItemsApi } from "../@generated/src";
import styles from "./page.module.css";
import ItemCard from "../components/Item/ItemCard";

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
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
