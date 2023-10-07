"use client";

import { useEffect, useState } from "react";
import { Order, OrdersApi } from "../../@generated/src";
import { handleApiErrorResponse } from "../../utils/handleApiErrorResponse";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function getItems() {
      try {
        const orders = await new OrdersApi().getAllOrders();
        setOrders(orders);
      } catch (e) {
        const error = await handleApiErrorResponse(e);
        toast.error(error.message);
      }
    }

    getItems();
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className={styles.order}>
          <div>{order.id}</div>
          <div>
            {order.items.map((orderItem) => (
              <div key={orderItem.item.id}>
                <div>{orderItem.item.name}</div>
                <div>{orderItem.item.price}</div>
                <div>{orderItem.quantity}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
