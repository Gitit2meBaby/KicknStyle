"use client";
import React, { useEffect, useState } from "react";

import styles from "../styles/cart.module.css";

const CartCounter = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartCount = localStorage.getItem("cartCount");
    if (cartCount) {
      setCartCount(cartCount);
    }
  }, []);

  return (
    <div className={styles.cartCounter}>
      <span>{cartCount}</span>
    </div>
  );
};

export default CartCounter;
