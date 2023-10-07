"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Item, ItemsApi } from "../@generated/src";
import ItemCard from "../components/Item/ItemCard";
import { handleApiErrorResponse } from "../utils/handleApiErrorResponse";
import styles from "./page.module.css";
import Cart from "../components/Cart/Cart";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function getItems() {
      try {
        const items = await new ItemsApi().getAllItems();
        setItems(items);
      } catch (e) {
        const error = await handleApiErrorResponse(e);
        toast.error(error.message);
      }
    }

    getItems();
  }, []);

  return (
    <>
      <div className={styles.main}>
        <h1>Items</h1>
        <div className={styles.itemContainer}>
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
