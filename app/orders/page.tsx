"use client";

import { useQuery } from "@tanstack/react-query";
import { OrdersApi } from "../../@generated/src";
import styles from "./page.module.css";

export default function Orders() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => new OrdersApi().getAllOrders(),
  });

  return (
    <div>
      {data?.map((order) => (
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
