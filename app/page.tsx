"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Item, ItemsApi, OrdersApi } from "../@generated/src";
import ItemCard from "../components/Item/ItemCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clear } from "../redux/slices/cartSlice";
import { setOrders } from "../redux/slices/orderSlice";
import { handleApiErrorResponse } from "../utils/handleApiErrorResponse";
import styles from "./page.module.css";
import Button from "../components/Button/Button";
import { LuPlusSquare, LuShoppingBag } from "react-icons/lu";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  async function handleCheckout() {
    const ordersApi = new OrdersApi();
    try {
      const order = await ordersApi.createOrder({ orderRequest: cart });
      const orders = await ordersApi.getAllOrders();

      dispatch(clear());
      dispatch(setOrders(orders));

      toast.success(`Order placed! Id: ${order.id}`);
    } catch (e) {
      const error = await handleApiErrorResponse(e);
      toast.error(error.message);
    }
  }

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
    <main>
      <h1>Items</h1>
      <div className={styles.itemContainer}>
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
      <Button
        text="Order"
        icon={<LuShoppingBag />}
        onClick={() => handleCheckout()}
      />
    </main>
  );
}
