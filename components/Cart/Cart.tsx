import clsx from "clsx";
import toast from "react-hot-toast";
import { LuCheckCircle, LuX } from "react-icons/lu";
import { OrdersApi } from "../../@generated/src";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrders } from "../../redux/slices/orderSlice";
import { handleApiErrorResponse } from "../../utils/handleApiErrorResponse";
import Button from "../Button/Button";
import styles from "./Cart.module.css";
import { clear } from "../../redux/slices/cartSlice";
import { closeCart } from "../../redux/slices/layoutSlice";

type Props = {};

export default function Cart({}: Props) {
  const cart = useAppSelector((state) => state.cart);
  const layout = useAppSelector((state) => state.layout);
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
          text="Order"
          icon={<LuCheckCircle />}
          onClick={() => handleCheckout()}
        />
      </div>
    </aside>
  );
}
