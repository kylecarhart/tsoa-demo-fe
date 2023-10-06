import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "../Button/Button";
import { LuPanelRightClose, LuShoppingBag, LuX } from "react-icons/lu";
import { OrdersApi } from "../../@generated/src";
import { clear, close } from "../../redux/slices/cartSlice";
import { setOrders } from "../../redux/slices/orderSlice";
import toast from "react-hot-toast";
import { handleApiErrorResponse } from "../../utils/handleApiErrorResponse";
import styles from "./Cart.module.css";
import clsx from "clsx";

type Props = {};

export default function Cart({}: Props) {
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

  const cartClasses = clsx(styles.cart, {
    [styles.isOpen]: cart.isOpen,
  });

  function handleCartClose() {
    dispatch(close());
  }

  return (
    <aside className={cartClasses}>
      <LuX onClick={handleCartClose} className={styles.closeButton} size={24} />
      <div>
        <div>Cart</div>
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
    </aside>
  );
}
