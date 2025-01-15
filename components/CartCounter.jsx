"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/cart.module.scss";

const CART_UPDATE_EVENT = "cartUpdate";

const CartCounter = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Function to update cart count from localStorage
    const updateCartCount = () => {
      const count = localStorage.getItem("cartCount");
      setCartCount(parseInt(count) || 0);
    };

    // Initial count
    updateCartCount();

    // Handler for custom cart update event
    const handleCartUpdate = (e) => {
      console.log("Cart update event received:", e.detail);
      updateCartCount();
    };

    // Handler for storage events (from other tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === "cartCount") {
        updateCartCount();
      }
    };

    // Listen for both custom and storage events
    window.addEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    window.addEventListener("storage", handleStorageChange);

    // Check for updates periodically (as a fallback)
    const intervalId = setInterval(updateCartCount, 1000);

    // Cleanup
    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, handleCartUpdate);
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.cartCounter}>
      <span>{cartCount}</span>
    </div>
  );
};

export default CartCounter;
