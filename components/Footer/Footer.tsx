import React from "react";
import styles from "./Footer.module.css";

interface Props {}

export default function Footer({}: Props) {
  return (
    <footer className={styles.footer}>
      Copyright © 2023 Kyle Carhart - All Rights Reserved.
    </footer>
  );
}
