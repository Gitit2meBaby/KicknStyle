"use client";
import React, { useState, useCallback } from "react";
import styles from "../styles/header.module.css";
import CartCounter from "./CartCounter";
import CartModal from "./CartModal";

const CartBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.cartHolder}
        onClick={handleClick}
        aria-label="Open cart"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 20 20"
          height="1.4em"
          width="1.4em"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
        <CartCounter />
      </button>

      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CartBtn;
