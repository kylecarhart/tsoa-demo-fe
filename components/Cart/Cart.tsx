import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import { LuCheckCircle, LuX } from "react-icons/lu";
import { OrdersApi } from "../../@generated/src";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clear, selectQuantity } from "../../redux/slices/cartSlice";
import { closeCart } from "../../redux/slices/layoutSlice";
import { setOrders } from "../../redux/slices/orderSlice";
import { handleApiErrorResponse } from "../../utils/handleApiErrorResponse";
import Button from "../Button/Button";
import styles from "./Cart.module.css";

interface Props {}

export default function Cart({}: Props) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const layout = useAppSelector((state) => state.layout);
  const quantity = useAppSelector(selectQuantity);
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout() {
    const ordersApi = new OrdersApi();
    try {
      setIsLoading(true);
      const order = await ordersApi.createOrder({ orderRequest: cart });
      const orders = await ordersApi.getAllOrders();

      dispatch(clear());
      dispatch(setOrders(orders));
      dispatch(closeCart());

      toast.success("Order placed!");
    } catch (e) {
      const error = await handleApiErrorResponse(e);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCartClose() {
    dispatch(closeCart());
  }

  const cartClasses = clsx(styles.cart, {
    [styles.isOpen]: layout.isCartOpen,
  });

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
          <div>
            <div>Subtotal</div>
            <div>${cart.total}</div>
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
