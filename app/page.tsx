"use client";
import { useState } from "react";
import { Item, ItemsApi, OrdersApi } from "../@generated/src";
import styles from "./page.module.css";
import ItemCard from "../components/Item/ItemCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setOrders } from "../redux/slices/orderSlice";
import { clear } from "../redux/slices/cartSlice";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  async function handleCheckout() {
    const ordersApi = new OrdersApi();
    const order = await ordersApi.createOrder({ orderRequest: cart });
    if (order) {
      const orders = await ordersApi.getAllOrders();
      dispatch(clear());
      dispatch(setOrders(orders));
    }
  }

  return (
    <main>
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
      <div>
        <h1>Cart</h1>
        <div>
          {cart.items.map((orderItem) => {
            return (
              <div key={orderItem.item.id}>
                <div>{orderItem.item.name}</div>
                <div>{orderItem.quantity}</div>
              </div>
            );
          })}
          <div>${cart.total}</div>
        </div>
      </div>
      <button onClick={() => handleCheckout()}>Order</button>
    </main>
  );
}
