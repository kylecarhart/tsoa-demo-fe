"use client";

import { useQuery } from "@tanstack/react-query";
import { ItemsApi } from "../@generated/src";
import ItemCard from "../components/Item/ItemCard";
import styles from "./page.module.css";

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["items"],
    queryFn: () => new ItemsApi().getAllItems(),
  });

  return (
    <>
      <div className={styles.main}>
        <h1>Items</h1>
        <div className={styles.itemContainer}>
          {data?.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
