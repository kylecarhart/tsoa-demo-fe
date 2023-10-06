"use client";

import Link from "next/link";
import { LuShoppingBag } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectQuantity } from "../../redux/slices/cartSlice";
import Placeholder from "../Placeholder/Placeholder";
import styles from "./Header.module.css";
import { openCart } from "../../redux/slices/layoutSlice";

interface Props {}

export default function Header({}: Props) {
  const quantity = useAppSelector(selectQuantity);
  const dispatch = useAppDispatch();

  function handleOpenCart() {
    dispatch(openCart());
  }

  return (
    <header className={styles.header}>
      <Placeholder className={styles.logo} width={128} height={64} />
      <nav className={styles.nav}>
        <Link className={styles.link} href="/">
          Home
        </Link>
        <Link className={styles.link} href="/orders">
          My Orders
        </Link>
      </nav>
      <button onClick={handleOpenCart} className={styles.bag}>
        <LuShoppingBag size={32} />
        <div className={styles.quantityCircle}>{quantity}</div>
      </button>
    </header>
  );
}
