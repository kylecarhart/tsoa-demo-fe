"use client";

import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import toast from "react-hot-toast";
import { LuCheckCircle, LuX } from "react-icons/lu";
import { OrdersApi } from "../../@generated/src";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clear, selectQuantity } from "../../redux/slices/cartSlice";
import { closeCart } from "../../redux/slices/layoutSlice";
import { handleApiErrorResponse } from "../../utils/handleApiErrorResponse";
import Button from "../Button/Button";
import styles from "./Cart.module.css";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useRef } from "react";

interface Props {}

export default function Cart({}: Props) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const layout = useAppSelector((state) => state.layout);
  const quantity = useAppSelector(selectQuantity);
  const ref = useRef(null);

  // useOutsideClick(ref, () => {
  //   dispatch(closeCart());
  // });

  const { data, error, mutateAsync, isLoading } = useMutation({
    mutationFn: () => new OrdersApi().createOrder({ orderRequest: cart }),
  });

  async function handleCheckout() {
    try {
      const order = await mutateAsync();

      dispatch(clear());
      dispatch(closeCart());

      toast.success("Order placed!");
    } catch (e) {
      const error = await handleApiErrorResponse(e);
      toast.error(error.message);
    }
  }

  function handleCartClose() {
    dispatch(closeCart());
  }

  const cartClasses = clsx(styles.cart, {
    [styles.isOpen]: layout.isCartOpen,
  });

  return (
    <aside className={cartClasses} ref={ref}>
      <LuX onClick={handleCartClose} className={styles.closeButton} size={24} />
      <div>
        <h2>My Cart</h2>
        <div>
          {cart.items.map((orderItem) => {
            return (
              <div key={orderItem.item.id} className={styles.item}>
                <div>
                  <div className={styles.itemName}>{orderItem.item.name}</div>
                  <div>Quantity: {orderItem.quantity}</div>
                  <div>Price: ${orderItem.item.price.toFixed(2)}</div>
                </div>
                <div>
                  ${(orderItem.item.price * orderItem.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
          <div className={styles.item}>
            <div className={styles.subTotal}>Subtotal:</div>
            <div>${cart.total.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div className={styles.orderButton}>
        <Button
          disabled={!quantity}
          text="Order"
          isLoading={isLoading}
          icon={<LuCheckCircle />}
          onClick={() => handleCheckout()}
        />
      </div>
    </aside>
  );
}
