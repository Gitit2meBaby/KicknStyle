"use client";
import { useState, useEffect } from "react";
import styles from "../styles/shipping.module.scss";

import hoodieShipping from "../lib/hoodieShippingData";
import tshirtShipping from "../lib/shirtShippingData";

const Shipping = () => {
  const [selectedCountry, setSelectedCountry] = useState("FR");
  const [cartItems, setCartItems] = useState([]);

  // Get cart items on mount
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  // Function to determine if a product is a shirt based on description
  const isProductShirt = (description = "") => {
    const desc = description.toLowerCase();
    return !desc.includes("sweat à capuche") && !desc.includes("hoodie");
  };

  // Calculate shipping costs for the current cart
  const calculateCurrentShipping = () => {
    if (!cartItems.length) return 0;

    const shirtItems = cartItems.filter((item) =>
      isProductShirt(item.description)
    );
    const hoodieItems = cartItems.filter(
      (item) => !isProductShirt(item.description)
    );

    let totalShipping = 0;

    // Calculate shirt shipping if there are shirts
    if (shirtItems.length > 0) {
      const shirtInfo = tshirtShipping[selectedCountry];
      totalShipping +=
        shirtInfo.basePrice +
        (shirtItems.reduce((sum, item) => sum + item.quantity, 0) - 1) *
          shirtInfo.additionalPrice;
    }

    // Calculate hoodie shipping if there are hoodies
    if (hoodieItems.length > 0) {
      const hoodieInfo = hoodieShipping[selectedCountry];
      totalShipping +=
        hoodieInfo.basePrice +
        (hoodieItems.reduce((sum, item) => sum + item.quantity, 0) - 1) *
          hoodieInfo.additionalPrice;
    }

    return totalShipping;
  };

  // Get shipping info to display
  const getShippingDisplay = () => {
    const shirtInfo = tshirtShipping[selectedCountry];
    const hoodieInfo = hoodieShipping[selectedCountry];

    return {
      name: shirtInfo.name,
      delivery: shirtInfo.delivery,
      shirtBasePrice: shirtInfo.basePrice,
      shirtAdditionalPrice: shirtInfo.additionalPrice,
      hoodieBasePrice: hoodieInfo.basePrice,
      hoodieAdditionalPrice: hoodieInfo.additionalPrice,
    };
  };

  const countryInfo = getShippingDisplay();

  return (
    <div className={styles.shippingContainer}>
      <h2>Information de Livraison</h2>

      <div className={styles.searchContainer}>
        <label htmlFor="country">Sélectionnez votre pays:</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className={styles.countrySelect}
        >
          {Object.entries(tshirtShipping)
            .sort((a, b) => a[1].name.localeCompare(b[1].name))
            .map(([code, data]) => (
              <option key={code} value={code}>
                {data.name}
              </option>
            ))}
        </select>
      </div>

      {countryInfo && (
        <div className={styles.shippingInfo}>
          <div className={styles.infoRow}>
            <span>Pays:</span>
            <span>{countryInfo.name}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Délai de livraison estimé:</span>
            <span>{countryInfo.delivery}</span>
          </div>
          <div className={styles.infoRow}>
            <span>Frais de port T-shirt:</span>
            <span>
              Premier article: €{countryInfo.shirtBasePrice.toFixed(2)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span>Articles T-shirt supplémentaires:</span>
            <span>€{countryInfo.shirtAdditionalPrice.toFixed(2)}/article</span>
          </div>
          <div className={styles.infoRow}>
            <span>Frais de port Sweat à capuche:</span>
            <span>
              Premier article: €{countryInfo.hoodieBasePrice.toFixed(2)}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span>Articles Sweat à capuche supplémentaires:</span>
            <span>€{countryInfo.hoodieAdditionalPrice.toFixed(2)}/article</span>
          </div>

          {cartItems.length > 0 && (
            <div className={styles.cartTotal}>
              <div className={styles.infoRow}>
                <span>Total frais de port estimés:</span>
                <span>€{calculateCurrentShipping().toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shipping;
