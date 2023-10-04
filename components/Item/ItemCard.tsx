"use client";
import React from "react";
import { Item } from "../../@generated/src";
import styles from "./ItemCard.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { addItem } from "../../redux/slices/cartSlice";

interface Props {
  item: Item;
}

export default function ItemCard({ item }: Props) {
  const dispatch = useAppDispatch();

  const { id, name, description, price } = item;
  return (
    <div className={styles.card}>
      <div>{name}</div>
      <div>{description}</div>
      <div>{price}</div>
      <button
        onClick={() => {
          dispatch(addItem(item));
        }}
      >
        Add
      </button>
    </div>
  );
}
