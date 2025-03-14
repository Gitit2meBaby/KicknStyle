"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../styles/cartModal.module.scss";

const CART_UPDATE_EVENT = "cartUpdate";

const CartModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const calculateSubtotal = (items) => {
    return items.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
  };

  useEffect(() => {
    const updateCart = () => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
      setCartItems(items);
      setSubtotal(calculateSubtotal(items));
    };

    // Initial load
    updateCart();

    // Custom event handler for cart updates
    const handleCartUpdate = () => {
      updateCart();
    };

    window.addEventListener(CART_UPDATE_EVENT, handleCartUpdate);

    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    };
  }, [isOpen]); // Still keep isOpen to refresh when modal opens

  const updateItemQuantity = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    setSubtotal(calculateSubtotal(updatedItems));

    // Update cart count
    const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", newCount.toString());

    // Dispatch custom event for cart counter
    window.dispatchEvent(
      new CustomEvent(CART_UPDATE_EVENT, {
        detail: { totalItems: newCount },
      })
    );
  };

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    setSubtotal(calculateSubtotal(updatedItems));

    // Update cart count
    const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", newCount.toString());

    // Dispatch custom event for cart counter
    window.dispatchEvent(
      new CustomEvent(CART_UPDATE_EVENT, {
        detail: { totalItems: newCount },
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Votre Panier</h2>

        {cartItems.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                  </div>

                  <div className={styles.itemDetails}>
                    {item.variants && (
                      <p className={styles.variant}>
                        {Object.entries(item.variants).map(
                          ([key, value], index, arr) => (
                            <React.Fragment key={key}>
                              <strong>{key}</strong>: {value}
                              {index < arr.length - 1 ? ", " : ""}
                            </React.Fragment>
                          )
                        )}
                      </p>
                    )}
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className={styles.quantityBtn}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className={styles.quantityBtn}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className={styles.removeBtn}
                  >
                    Retirer
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.cartFooter}>
              <div className={styles.subtotal}>
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                className={styles.checkoutBtn}
                onClick={() => {
                  onClose();
                  router.push("/commande");
                }}
              >
                Passer à la caisse
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
